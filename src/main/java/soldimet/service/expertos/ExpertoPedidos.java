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
import soldimet.domain.Authority;
import soldimet.domain.CobranzaOperacion;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.DetallePedido;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.Empleado;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.domain.EstadoDetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.repository.extendedRepository.ExtendedArticuloRepository;
import soldimet.repository.extendedRepository.ExtendedCostoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedDetallePedidoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoCostoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoDetallePedidoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoPedidoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedPedidoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedTipoRepuestoRepository;
import soldimet.security.AuthoritiesConstants;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.utils.MathUtils;

@Service
public class ExpertoPedidos {

    private final Logger log = LoggerFactory.getLogger(ExpertoPedidos.class);

    @Autowired
    private Globales globales;

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    @Autowired
    private ExpertoRepuestos expertoRepuestos;

    @Autowired
    private ExtendedEstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private ExtendedEstadoDetallePedidoRepository estadoDetallePedidoRepuestoRepository;

    @Autowired
    private ExtendedArticuloRepository articuloRepository;

    @Autowired
    private PedidoConverter pedidoConverter;

    @Autowired
    private ExtendedPedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private ExtendedDetallePedidoRepository detallePedidoRepository;

    @Autowired
    private ExtendedEstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

    @Autowired
    private ExtendedTipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private ExtendedCostoRepuestoRepository costoRepuestoRepository;

    public List<PedidoRepuesto> getPedidosPendientes() {
        EstadoPedidoRepuesto estadoPendiente = estadoPedidoRepuestoRepository.findByNombreEstado(
            globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO
        );

        // Falta filtrar los pedidos por la sucursal
        List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findByEstadoPedidoRepuesto(estadoPendiente);

        return pedidos;
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

    public CostoRepuesto updateCostoRepuesto(CostoRepuesto costoRepuesto) throws Exception {
        String nombreEstado = globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO;
        if (
            costoRepuesto.getEstado() != null &&
            costoRepuesto.getEstado().getNombreEstado() != null &&
            costoRepuesto.getEstado().getNombreEstado().equals(globales.NOMBRE_ESTADO_COSTO_REPUESTO_STOCK)
        ) {
            nombreEstado = costoRepuesto.getEstado().getNombreEstado();
        }
        EstadoCostoRepuesto estadoCostoRepuesto = estadoCostoRepuestoRepository.findByNombreEstado(nombreEstado);
        costoRepuesto.setEstado(estadoCostoRepuesto);
        costoRepuesto.setTipoRepuesto(tipoRepuestoRepository.getOne(costoRepuesto.getTipoRepuesto().getId()));
        if (costoRepuesto.getArticulo() != null) {
            costoRepuesto.setArticulo(articuloRepository.getOne(costoRepuesto.getArticulo().getId()));
        }
        costoRepuesto = costoRepuestoRepository.save(costoRepuesto);
        // Si saque el articulo del stock, lo descuento
        descontarStock(costoRepuesto);

        DetallePedido detallePedido = detallePedidoRepository.findByCostoRepuestosIn(costoRepuesto);
        detallePedido.addCostoRepuesto(costoRepuesto);
        detallePedido = this.transitionDetalle(detallePedido, null);

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

    private void descontarStock(CostoRepuesto costo) {
        if (costo.getEstado().getNombreEstado().equals(globales.NOMBRE_ESTADO_COSTO_REPUESTO_STOCK)) {
            expertoRepuestos.descontarStockDesdeArticuloyMedida(
                costo.getArticulo(),
                costo.getMedidaArticulo(),
                MathUtils.roundFloatToInteger(costo.getValor())
            );
        }
    }

    private EstadoPedidoRepuesto transitionPedidoToPedido(PedidoRepuesto pedidoRepuesto) {
        // si el pedido ya esta recibido parcial, no lo vuelvo a pedido o pedido parcial
        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado().equals(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL)) {
            return null;
        }
        EstadoPedidoRepuesto nuevoEstado = null;
        Set<DetallePedido> detalles = pedidoRepuesto.getDetallePedidos();

        int totalDetalles = detalles.size();
        int detallesPedidosPedidos = 0;
        int detallePedidoParcial = 0;
        int detalleRecibido = 0;
        for (DetallePedido detallePedido : detalles) {
            String estadoDetalle = detallePedido.getEstadoDetallePedido().getNombreEstado();
            if (estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO)) {
                detallesPedidosPedidos += 1;
            }
            if (estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO_PARCIAL)) {
                detallePedidoParcial += 1;
            }
            if (estadoDetalle.equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO)) {
                detalleRecibido += 1;
            }
        }

        // Si hay algun repuesto ya pedido lo marco como parcial
        if (detallePedidoParcial > 0 || detallesPedidosPedidos > 0) {
            nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL);
        }

        // Si ya pedi todos los repuestos, marco todo como pedido
        if (detallesPedidosPedidos == totalDetalles) {
            nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO);
        }
        // Si ya tengo en stock todos los repuestos, marco todo como recibido
        if (detalleRecibido == totalDetalles) {
            nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);
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
            nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL);
        }

        // Si ya recibi todos los repuestos, marco todo como recibido
        if (detallesRecibidos == totalDetalles) {
            nuevoEstado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);
        }

        return nuevoEstado;
    }

    public DetallePedido transitionDetalle(DetallePedido detallePedido, EstadoDetallePedido estadoDetalle) {
        if (estadoDetalle == null) {
            Set<CobranzaRepuesto> repuestosPresupuestados = detallePedido.getDetallePresupuesto().getCobranzaRepuestos();
            int totalRepuestos = repuestosPresupuestados.size();
            int repuestosPedidos = 0;
            int repuestosEnStock = 0;
            for (CobranzaRepuesto cobranzaRepuesto : repuestosPresupuestados) {
                for (CostoRepuesto costoRepuesto : detallePedido.getCostoRepuestos()) {
                    if (costoRepuesto.getTipoRepuesto().getId().equals(cobranzaRepuesto.getTipoRepuesto().getId())) {
                        repuestosPedidos += 1;
                        if (costoRepuesto.getEstado().getNombreEstado().equals(globales.NOMBRE_ESTADO_COSTO_REPUESTO_STOCK)) {
                            repuestosEnStock += 1;
                        }
                    }
                }
            }
            // Si ya pedi todos los repuestos, marco todo como pedido
            if (repuestosPedidos == totalRepuestos) {
                if (totalRepuestos == repuestosEnStock) {
                    // Todos los repuestos estaban en stock (lo marco como recibido de 1)
                    estadoDetalle =
                        estadoDetallePedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
                } else {
                    // algun repuesto fue pedido, los demas en stock
                    estadoDetalle = estadoDetallePedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO);
                }
            } else {
                // Si hay algun repuesto ya pedido lo marco como parcial
                if (repuestosPedidos > 0 && totalRepuestos > 1) {
                    estadoDetalle =
                        estadoDetallePedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO_PARCIAL);
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
            if (
                costoRepuesto.getEstado().getNombreEstado().equals(globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO) ||
                costoRepuesto.getEstado().getNombreEstado().equals(globales.NOMBRE_ESTADO_COSTO_REPUESTO_STOCK)
            ) {
                repuestosRecibidos += 1;
            }
        }
        // Si ya recibi todos los repuestos, marco todo como recibido
        if (repuestosRecibidos == totalRepuestos) {
            estadoDetalle = estadoDetallePedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
        } else {
            // Si hay algun repuesto ya recibido lo marco como parcial
            if (repuestosRecibidos > 0 && totalRepuestos > 1) {
                estadoDetalle =
                    estadoDetallePedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO_PARCIAL);
            }
        }

        if (estadoDetalle != null) {
            detallePedido.setEstadoDetallePedido(estadoDetalle);
        }

        return detallePedido;
    }

    public CostoRepuesto recibirRepuesto(CostoRepuesto costoRepuesto) {
        try {
            DetallePedido detallePedido = detallePedidoRepository.findByCostoRepuestosIn(costoRepuesto);
            PedidoRepuesto pedidoRepuesto = pedidoRepuestoRepository.findPedidoRepuestoByDetallePedidosIn(detallePedido);

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

            EstadoCostoRepuesto estadoRecibido = estadoCostoRepuestoRepository.findByNombreEstado(
                globales.NOMBRE_ESTADO_COSTO_REPUESTO_RECIBIDO
            );
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

        return authoritiesNames.contains(AuthoritiesConstants.ADMIN) || authoritiesNames.contains(AuthoritiesConstants.JEFE);
    }

    public PedidoRepuesto getPedido(Long pedidoId) {
        PedidoRepuesto pedido = pedidoRepuestoRepository.findCompleteById(pedidoId);
        return pedido;
    }
}
