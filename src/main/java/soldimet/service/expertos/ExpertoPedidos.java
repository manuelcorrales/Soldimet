package soldimet.service.expertos;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soldimet.constant.Globales;
import soldimet.converter.PedidoConverter;
import soldimet.converter.ProveedorConverter;
import soldimet.domain.Authority;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.DetallePedido;
import soldimet.domain.Empleado;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.domain.EstadoDetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPersona;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Persona;
import soldimet.domain.Proveedor;
import soldimet.repository.extendedRepository.ExtendedDetallePedidoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoCostoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoDetallePedidoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoPedidoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoPersonaRepository;
import soldimet.repository.extendedRepository.ExtendedPedidoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedPersonaRepository;
import soldimet.repository.extendedRepository.ExtendedProveedorRepository;
import soldimet.repository.extendedRepository.ExtendedTipoRepuestoRepository;
import soldimet.security.AuthoritiesConstants;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.dto.DTOProveedor;

@Service
public class ExpertoPedidos {

    private final Logger log = LoggerFactory.getLogger(ExpertoCaja.class);

    @Autowired
    private Globales globales;

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    @Autowired
    private ExtendedEstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private ExtendedEstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private ExtendedEstadoDetallePedidoRepository estadoDetallePedidoRepuestoRepository;

    @Autowired
    private ExtendedProveedorRepository proveedorRepository;

    @Autowired
    private ExtendedPersonaRepository personaRepository;

    @Autowired
    private PedidoConverter pedidoConverter;

    @Autowired
    private ExtendedPedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private ProveedorConverter proveedorConverter;

    @Autowired
    private ExtendedDetallePedidoRepository detallePedidoRepository;

    @Autowired
    private ExtendedTipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private ExtendedEstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

    public List<PedidoRepuesto> getPedidosPendientes() {

        EstadoPedidoRepuesto estadoPendiente = estadoPedidoRepuestoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);

        // Falta filtrar los pedidos por la sucursal
        List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findByEstadoPedidoRepuesto(estadoPendiente);

        return pedidos;

    }

    public List<DTOProveedor> getProveedoresRepuestos() {

        EstadoPersona estadoActivo = estadoPersonaRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_ALTA);

        List<Persona> personasActivas = personaRepository.findByEstadoPersona(estadoActivo);

        List<Proveedor> proveedores = proveedorRepository.findByPersonaIn(personasActivas);

        return proveedorConverter.convertirListProveedorAListProveedorBusquedaDTO(proveedores);
    }

    public List<DTOPedidoCabecera> getPedidosCabecera() {

        Empleado empleado = expertoUsuarios.getEmpleadoLogeado();

        List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findAllByOrderByIdDesc();

        // Filtro por sucursal
        if (!this.tieneAccesoATodosLosPedidos(empleado)) {
            List<PedidoRepuesto> pedidosFiltrados = new ArrayList<PedidoRepuesto>();
            for (PedidoRepuesto pedido : pedidos) {
                if (pedido.getPresupuesto().getSucursal().equals(empleado.getSucursal())) {
                    pedidosFiltrados.add(pedido);
                }
            }
            return pedidoConverter.convertirPedidosAPedidosCabeceras(pedidosFiltrados);
        }

        return pedidoConverter.convertirPedidosAPedidosCabeceras(pedidos);
    }

    public CostoRepuesto updateDetallePedido(CostoRepuesto costoRepuesto, Long detallePedidoId) throws Exception {
        EstadoCostoRepuesto estadoPedido = estadoCostoRepuestoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO);
        costoRepuesto.setEstado(estadoPedido);
        costoRepuesto.setProveedor(proveedorRepository.getOne(costoRepuesto.getProveedor().getId()));
        costoRepuesto.setTipoRepuesto(tipoRepuestoRepository.getOne(costoRepuesto.getTipoRepuesto().getId()));

        DetallePedido detallePedido = detallePedidoRepository.getOne(detallePedidoId);
        detallePedido.addCostoRepuesto(costoRepuesto);
        detallePedido = this.transitionDetalleToPedido(detallePedido, null);

        PedidoRepuesto pedidoRepuesto = pedidoRepuestoRepository.findPedidoRepuestoByDetallePedidosIn(detallePedido);
        EstadoPedidoRepuesto estadoPedidoRepuesto = this.transitionPedidoToPedido(pedidoRepuesto);

        if (estadoPedidoRepuesto != null) {
            pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
            pedidoRepuesto = pedidoRepuestoRepository.save(pedidoRepuesto);
            detallePedido = pedidoRepuesto.filterDetallePedido(detallePedido);
        } else {
            detallePedido = detallePedidoRepository.save(detallePedido);
        }

        return detallePedido.filterCostoRepuesto(costoRepuesto);
    }

    private EstadoPedidoRepuesto transitionPedidoToPedido(PedidoRepuesto pedidoRepuesto) {
        // si el pedido ya esta recibido parcial, no lo vuelvo a pedido o pedido parcial
        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL)) {
            return null;
        }
        EstadoPedidoRepuesto nuevoEstado = null;
        Set<DetallePedido> detalles = pedidoRepuesto.getDetallePedidos();

        int totalDetalles = detalles.size();
        int detallesPedidosPedidos = 0;
        int detallePedidoParcial = 0;
        for (DetallePedido detallePedido : detalles) {
            String estadoDetalle = detallePedido.getEstadoDetallePedido().getNombreEstado();
            if (estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO)) {
                detallesPedidosPedidos += 1;
            }
            if (estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO_PARCIAL)) {
                detallePedidoParcial += 1;
            }
        }

        // Si hay algun repuesto ya pedido lo marco como parcial
        if (detallePedidoParcial > 0 || detallesPedidosPedidos > 0) {
            nuevoEstado = estadoPedidoRepuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL);
        }

        // Si ya pedi todos los repuestos, marco todo como pedido
        if (detallesPedidosPedidos == totalDetalles) {
            nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO);
        }

        return nuevoEstado;
    }

    private EstadoPedidoRepuesto transitionPedidoToRecibido(PedidoRepuesto pedidoRepuesto) {
        EstadoPedidoRepuesto nuevoEstado = null;
        Set<DetallePedido> detallesPedidos = pedidoRepuesto.getDetallePedidos();
        int totalDetalles = detallesPedidos.size();
        int detallesRecibidos = 0;
        int detallesRecibidosParcial = 0;

        for (DetallePedido detallePedido : detallesPedidos) {
            String estadoDetalle = detallePedido.getEstadoDetallePedido().getNombreEstado();
            if (estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO)) {
                detallesRecibidos += 1;
            }
            if (estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO_PARCIAL)) {
                detallesRecibidosParcial += 1;
            }
        }
        // Si hay algun repuesto ya recibido lo marco como parcial
        if (detallesRecibidosParcial > 0 || detallesRecibidos > 0) {
            nuevoEstado = estadoPedidoRepuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL);
        }

        // Si ya recibi todos los repuestos, marco todo como recibido
        if (detallesRecibidos == totalDetalles) {
            nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);
        }

        return nuevoEstado;

    }

    public DetallePedido transitionDetalleToPedido(DetallePedido detallePedido, EstadoDetallePedido estadoDetalle) {

        if (estadoDetalle == null) {
            Set<CobranzaRepuesto> repuestosPresupuestados = detallePedido.getDetallePresupuesto()
                    .getCobranzaRepuestos();
            int totalRepuestos = repuestosPresupuestados.size();
            int repuestosPedidos = 0;
            for (CobranzaRepuesto cobranzaRepuesto : repuestosPresupuestados) {
                for (CostoRepuesto costoRepuesto : detallePedido.getCostoRepuestos()) {
                    if (costoRepuesto.getTipoRepuesto().getId() == cobranzaRepuesto.getTipoRepuesto().getId()) {
                        repuestosPedidos += 1;
                    }
                }
            }
            // Si ya pedi todos los repuestos, marco todo como pedido
            if (repuestosPedidos == totalRepuestos) {
                estadoDetalle = estadoDetallePedidoRepuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO);
            } else {
                // Si hay algun repuesto ya pedido lo marco como parcial
                if (repuestosPedidos > 0 && totalRepuestos > 1) {
                    estadoDetalle = estadoDetallePedidoRepuestoRepository
                            .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO_PARCIAL);
                }
            }
        }

        if (estadoDetalle != null) {
            detallePedido.setEstadoDetallePedido(estadoDetalle);
        }

        return detallePedido;

    }

    public DetallePedido transitionDetalleToRecibido(DetallePedido detallePedido, EstadoDetallePedido estadoDetalle) {
        Set<CobranzaRepuesto> repuestosPresupuestados = detallePedido.getDetallePresupuesto().getCobranzaRepuestos();
        int totalRepuestos = repuestosPresupuestados.size();
        int repuestosRecibidos = 0;

        for (CostoRepuesto costoRepuesto : detallePedido.getCostoRepuestos()) {
            if (costoRepuesto.getEstado().getNombreEstado().equals(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO)) {
                repuestosRecibidos += 1;
            }
        }
        // Si ya recibi todos los repuestos, marco todo como recibido
        if (repuestosRecibidos == totalRepuestos) {
            estadoDetalle = estadoDetallePedidoRepuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
        } else {
            // Si hay algun repuesto ya recibido lo marco como parcial
            if (repuestosRecibidos > 0 && totalRepuestos > 1) {
                estadoDetalle = estadoDetallePedidoRepuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO_PARCIAL);
            }
        }

        if (estadoDetalle != null) {
            detallePedido.setEstadoDetallePedido(estadoDetalle);
        }

        return detallePedido;
    }

    public CostoRepuesto recibirRepuesto(CostoRepuesto costoRepuesto, Long detallePedidoId) {

        try {
            DetallePedido detallePedido = detallePedidoRepository.getOne(detallePedidoId);
            PedidoRepuesto pedidoRepuesto = pedidoRepuestoRepository
                    .findPedidoRepuestoByDetallePedidosIn(detallePedido);

            for (DetallePedido detallePedido2 : pedidoRepuesto.getDetallePedidos()) {
                if (detallePedido2.getId().equals(detallePedido.getId())) {
                    detallePedido = detallePedido2;
                    for (CostoRepuesto costoRepuesto2 : detallePedido.getCostoRepuestos()) {
                        if (costoRepuesto.getId().equals(costoRepuesto2.getId())) {
                            costoRepuesto = costoRepuesto2;
                        }
                    }
                }
            }

            EstadoCostoRepuesto estadoRecibido = estadoCostoRepuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO);
            costoRepuesto.setEstado(estadoRecibido);
            detallePedido = this.transitionDetalleToRecibido(detallePedido, null);
            EstadoPedidoRepuesto estadoPedidoRepuesto = this.transitionPedidoToRecibido(pedidoRepuesto);

            if (estadoPedidoRepuesto != null) {
                pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
                pedidoRepuestoRepository.save(pedidoRepuesto);
            } else {
                detallePedidoRepository.save(detallePedido);
            }

            return costoRepuesto;

        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    private Boolean tieneAccesoATodosLosPedidos(Empleado empleado) {
        Set<Authority> authorities = empleado.getPersona().getUser().getAuthorities();

        List<String> authoritiesNames = new ArrayList<String>();
        // Spring permite filtrar todo a nivel de endpoint por eso filtro así
        // nternamente
        // Tambien se puede pero creando una relacion entre el objeto presupuesto y el
        // user (malisimo)
        for (Authority authority : authorities) {
            authoritiesNames.add(authority.getName());
        }

        return authoritiesNames.contains(AuthoritiesConstants.ADMIN)
                || authoritiesNames.contains(AuthoritiesConstants.JEFE);
    }

    public PedidoRepuesto getPresupuesto(Long pedidoId) {
        PedidoRepuesto pedido = pedidoRepuestoRepository.findById(pedidoId).get();
        pedido.getDetallePedidos().iterator().next().getCostoRepuestos();
        pedido.getPresupuesto().getCliente();
        pedido.getPresupuesto().getDetallePresupuestos().iterator().next().getCobranzaOperacions().iterator().next();
        pedido.getPresupuesto().getDetallePresupuestos().iterator().next().getCobranzaRepuestos().iterator().next();
        return pedido;
    }

}
