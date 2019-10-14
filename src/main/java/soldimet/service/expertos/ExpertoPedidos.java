package soldimet.service.expertos;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
import soldimet.repository.ArticuloRepository;
import soldimet.repository.CostoRepuestoRepository;
import soldimet.repository.DetallePedidoRepository;
import soldimet.repository.EmpleadoRepository;
import soldimet.repository.EstadoCostoRepuestoRepository;
import soldimet.repository.EstadoDetallePedidoRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.ProveedorRepository;
import soldimet.repository.TipoRepuestoRepository;
import soldimet.security.AuthoritiesConstants;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.dto.DTOProveedor;

@Service
public class ExpertoPedidos {

    @Autowired
    private Globales globales;

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private EstadoDetallePedidoRepository estadoDetallePedidoRepuestoRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private PedidoConverter pedidoConverter;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private ProveedorConverter proveedorConverter;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;


    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private EstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

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
        if (!this.tieneAccesoATodosLosPedidos(empleado)){
            List<PedidoRepuesto> pedidosFiltrados = new ArrayList<PedidoRepuesto>();
            for (PedidoRepuesto pedido: pedidos){
                if (pedido.getPresupuesto().getSucursal().equals(
                    empleado.getSucursal())
                    ){
                        pedidosFiltrados.add(pedido);
                }
            }
            return pedidoConverter.convertirPedidosAPedidosCabeceras(pedidosFiltrados);
        }

        return pedidoConverter.convertirPedidosAPedidosCabeceras(pedidos);
    }

    public CostoRepuesto updateDetallePedido(CostoRepuesto costoRepuesto, Long detallePedidoId) {
        try {
            EstadoCostoRepuesto estadoPedido = estadoCostoRepuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO);
            costoRepuesto.setEstado(estadoPedido);
            costoRepuesto.setProveedor(proveedorRepository.getOne(costoRepuesto.getProveedor().getId()));
            costoRepuesto.setTipoRepuesto(tipoRepuestoRepository.getOne(costoRepuesto.getTipoRepuesto().getId()));

            DetallePedido detallePedido = detallePedidoRepository.getOne(detallePedidoId);
            detallePedido.addCostoRepuesto(costoRepuesto);
            detallePedido = this.updateEstadoDetalle(detallePedido, null);
            PedidoRepuesto pedidoRepuesto = pedidoRepuestoRepository
                    .findPedidoRepuestoByDetallePedidosIn(detallePedido);
            EstadoPedidoRepuesto estadoPedidoRepuesto = this.needToUpdatePedido(pedidoRepuesto);

            if (estadoPedidoRepuesto != null) {
                pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
                pedidoRepuesto = pedidoRepuestoRepository.save(pedidoRepuesto);
                detallePedido = pedidoRepuesto.filterDetallePedido(detallePedido);
            } else {
                detallePedido = detallePedidoRepository.save(detallePedido);
            }

            return detallePedido.filterCostoRepuesto(costoRepuesto);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    private EstadoPedidoRepuesto needToUpdatePedido(PedidoRepuesto pedidoRepuesto) {
        EstadoPedidoRepuesto nuevoEstado = null;

        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO)) {

            //si hay al menos 1 detalle Pedido lo dejo parcial
            for (DetallePedido detallePedido : pedidoRepuesto.getDetallePedidos()) {
                if (!detallePedido.getEstadoDetallePedido().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO)) {
                    nuevoEstado = estadoPedidoRepuestoRepository
                            .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL);
                }
            }

        }
        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
            .equals(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL)) {
            Boolean all_pedidos = true;
            Boolean any_recibido = false;
            // si estan todos pedido lo paso de parcial a pedido
            for (DetallePedido detallePedido: pedidoRepuesto.getDetallePedidos()) {
                if (!detallePedido.getEstadoDetallePedido().getNombreEstado().equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO)) {
                    all_pedidos = false;
                    if (detallePedido.getEstadoDetallePedido().getNombreEstado().equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO)) {
                       // si el que no esta pedido, esta recibido, paso a recibido parcial
                        any_recibido = true;
                        all_pedidos = true;
                    }
                }
            }

            if (all_pedidos) {
                //si estan todos pedido y hay al menos 1 recibido, paso a recibido parcial
                if (any_recibido) {
                    nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL);
                } else {
                    nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO);
                }
            }

        }
        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO)) {
            //si hay algun detalle recibido lo paso a recibido parcial
            for (DetallePedido detallePedido : pedidoRepuesto.getDetallePedidos()) {
                if (!detallePedido.getEstadoDetallePedido().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO)) {
                    nuevoEstado = estadoPedidoRepuestoRepository
                            .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL);
                }
            }

        }
        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL)
            ) {
            // si todos los detalles estan recibidos lo paso a recibido
            Boolean all_recibidos = true;
            for (DetallePedido detallePedido : pedidoRepuesto.getDetallePedidos()) {
                String estadoDetalle = detallePedido.getEstadoDetallePedido().getNombreEstado();
                if (!estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO)) {
                    all_recibidos = false;;
                }
            }
            if (all_recibidos) {
                nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);
            }
        }

        return nuevoEstado;

    }

    public DetallePedido updateEstadoDetalle(DetallePedido detallePedido, EstadoDetallePedido estado) {

        if (estado == null) {
            estado = this.needsToUpdateDetalle(detallePedido);
        }

        if (estado != null) {
            detallePedido.setEstadoDetallePedido(estado);
        }

        return detallePedido;

    }

    private EstadoDetallePedido needsToUpdateDetalle(DetallePedido detallePedido) {
        Boolean needsToUpdate = true;
        EstadoDetallePedido estadoDetalle = null;
        if (detallePedido.getEstadoDetallePedido().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PENDIENTE_DE_PEDIDO)) {
            // Needs to update to Pedido
            for (CobranzaRepuesto cobranzaRepuesto : detallePedido.getDetallePresupuesto().getCobranzaRepuestos()) {
                Boolean isPedido = false;
                for (CostoRepuesto costoRepuesto : detallePedido.getCostoRepuestos()) {
                    if (costoRepuesto.getTipoRepuesto() == cobranzaRepuesto.getTipoRepuesto()) {
                        isPedido = true;
                    }
                }
                if (!isPedido) {
                    needsToUpdate = false;
                }
            }

            if (needsToUpdate) {
                estadoDetalle = estadoDetallePedidoRepuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO);
            }
        }

        if (detallePedido.getEstadoDetallePedido().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO)
                || (estadoDetalle != null
                        && estadoDetalle.getNombreEstado().equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO))) {
            // Needs to update to Recibido
            for (CostoRepuesto costoRepuesto : detallePedido.getCostoRepuestos()) {
                if (!costoRepuesto.getEstado().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO)) {
                    needsToUpdate = false;
                }
            }
            if (needsToUpdate) {
                estadoDetalle = estadoDetallePedidoRepuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
            }
        }

        return estadoDetalle;

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
            detallePedido = this.updateEstadoDetalle(detallePedido, null);
            EstadoPedidoRepuesto estadoPedidoRepuesto = this.needToUpdatePedido(pedidoRepuesto);

            if (estadoPedidoRepuesto != null) {
                pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
                pedidoRepuestoRepository.save(pedidoRepuesto);
            } else {
                detallePedidoRepository.save(detallePedido);
            }

            return costoRepuesto;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Boolean tieneAccesoATodosLosPedidos(Empleado empleado) {
        Set<Authority> authorities = empleado.getPersona().getUser().getAuthorities();

        List<String> authoritiesNames = new ArrayList<String>();
        // Spring permite filtrar todo a nivel de endpoint por eso filtro así internamente
        // Tambien se puede pero creando una relacion entre el objeto presupuesto y el user (malisimo)
        for (Authority authority: authorities) {
            authoritiesNames.add(authority.getName());
        }

        return
            authoritiesNames.contains(AuthoritiesConstants.ADMIN) ||
            authoritiesNames.contains(AuthoritiesConstants.JEFE)
        ;
    }

}
