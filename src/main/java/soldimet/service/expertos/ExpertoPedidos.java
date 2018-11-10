package soldimet.service.expertos;

import java.util.List;
import java.util.concurrent.Delayed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soldimet.constant.Globales;
import soldimet.converter.PedidoConverter;
import soldimet.converter.ProveedorConverter;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoDetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPersona;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Persona;
import soldimet.domain.Proveedor;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.CostoRepuestoRepository;
import soldimet.repository.DetallePedidoRepository;
import soldimet.repository.EstadoDetallePedidoRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.ProveedorRepository;
import soldimet.repository.TipoRepuestoRepository;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.dto.DTOProveedor;

@Service
public class ExpertoPedidos {

    @Autowired
    private Globales globales;

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
    private CostoRepuestoRepository costoRepuestoRepository;

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;

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

        List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findAllByOrderByIdDesc();

        return pedidoConverter.convertirPedidosAPedidosCabeceras(pedidos);
    }

    public CostoRepuesto updateDetallePedido(CostoRepuesto costoRepuesto, Long detallePedidoId) {
        try {
            costoRepuesto.setArticulo(articuloRepository.getOne(costoRepuesto.getArticulo().getId()));
            costoRepuesto.setProveedor(proveedorRepository.getOne(costoRepuesto.getProveedor().getId()));
            costoRepuesto.setTipoRepuesto(tipoRepuestoRepository.getOne(costoRepuesto.getTipoRepuesto().getId()));

            DetallePedido detallePedido = detallePedidoRepository.getOne(detallePedidoId);
            detallePedido.addCostoRepuesto(costoRepuesto);
            this.updateEstadoDetalle(detallePedido, null);
            PedidoRepuesto pedidoRepuesto = pedidoRepuestoRepository
                    .findPedidoRepuestoByDetallePedidosIn(detallePedido);
            EstadoPedidoRepuesto estadoPedidoRepuesto = this.needToUpdatePedido(pedidoRepuesto);

            if (estadoPedidoRepuesto != null) {
                pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
                pedidoRepuestoRepository.save(pedidoRepuesto);
                detallePedido = detallePedidoRepository.getOne(detallePedido.getId());

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
        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO)
                || pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL)) {
            for (DetallePedido detallePedido : pedidoRepuesto.getDetallePedidos()) {
                if (!detallePedido.getEstadoDetallePedido().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO)) {
                    return estadoPedidoRepuestoRepository
                            .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL);
                }
            }
            return estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO);
        }
        if (pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado().equals(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO)
                || pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL)) {
            for (DetallePedido detallePedido : pedidoRepuesto.getDetallePedidos()) {
                if (!detallePedido.getEstadoDetallePedido().getNombreEstado()
                        .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO)) {
                    return estadoPedidoRepuestoRepository
                            .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO_PARCIAL);
                }
            }
            return estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);
        }

        return null;

    }

    public void updateEstadoDetalle(DetallePedido detallePedido, EstadoDetallePedido estado) {

        if (estado == null) {
            estado = this.needsToUpdateDetalle(detallePedido);
        }

        if (estado != null) {
            detallePedido.setEstadoDetallePedido(estado);
        }
    }

    private EstadoDetallePedido needsToUpdateDetalle(DetallePedido detallePedido) {
        Boolean needsToUpdate = true;
        if (detallePedido.getEstadoDetallePedido().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO)) {
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
                return estadoDetallePedidoRepuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO);
            }
        }

        if (detallePedido.getEstadoDetallePedido().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PEDIDO)) {
            // Needs to update to Recibido
            for (CostoRepuesto costoRepuesto : detallePedido.getCostoRepuestos()) {
                // Falta agregar el atributo de recibido
                // if (!costoRepuesto.isRecibido()) {
                    // needsToUpdate = false
                // }
            }
            // if (needsToUpdate) {
            //     return estadoDetallePedidoRepuestoRepository
            //             .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_RECIBIDO);
            // }
        }

        // Doesn't needs to update
        return null;

    }

    public CostoRepuesto recibirRepuesto(CostoRepuesto costoRepuesto, Long detallePedidoId) {

        try {
            DetallePedido detallePedido = detallePedidoRepository.getOne(detallePedidoId);
            for (CostoRepuesto costoRepuesto2: detallePedido.getCostoRepuestos()) {
                if (costoRepuesto.getId().equals(costoRepuesto2.getId())) {
                    costoRepuesto = costoRepuesto2;
                }
            }
            //Falta asignar el valor de que esta recibido
            this.updateEstadoDetalle(detallePedido, null);
            PedidoRepuesto pedidoRepuesto = pedidoRepuestoRepository
                    .findPedidoRepuestoByDetallePedidosIn(detallePedido);
            EstadoPedidoRepuesto estadoPedidoRepuesto = this.needToUpdatePedido(pedidoRepuesto);

            if (estadoPedidoRepuesto != null) {
                pedidoRepuesto.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
                pedidoRepuestoRepository.save(pedidoRepuesto);
                detallePedido = detallePedidoRepository.getOne(detallePedido.getId());

            } else {
                detallePedido = detallePedidoRepository.save(detallePedido);
            }

            return detallePedido.filterCostoRepuesto(costoRepuesto);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
