package soldimet.repository.extendedRepository;

import java.util.List;

import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.PedidoRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import soldimet.domain.Presupuesto;
import soldimet.repository.PedidoRepuestoRepository;


/**
 * Spring Data JPA repository for the PedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedPedidoRepuestoRepository extends PedidoRepuestoRepository {

    public PedidoRepuesto findByPresupuesto(Presupuesto presupuesto);

    @EntityGraph(attributePaths = {
            "estadoPedidoRepuesto",
            "detallePedidos",
            "presupuesto",
            "presupuesto.cliente",
            "presupuesto.cliente.persona",
            "presupuesto.estadoPresupuesto",
            "presupuesto.sucursal",
            "presupuesto.detallePresupuestos",
            "presupuesto.detallePresupuestos.motor",
            "presupuesto.detallePresupuestos.aplicacion",
            "presupuesto.detallePresupuestos.tipoParteMotor",
            "presupuesto.detallePresupuestos.cilindrada",
            "presupuesto.detallePresupuestos.cobranzaRepuestos",
            "detallePedidos",
            "detallePedidos.detallePresupuesto",
            "detallePedidos.estadoDetallePedido",
            "detallePedidos.costoRepuestos",
            "detallePedidos.costoRepuestos.estado",
            "detallePedidos.costoRepuestos.tipoRepuesto",
            "detallePedidos.costoRepuestos.medidaArticulo",
            "detallePedidos.costoRepuestos.articulo",
            "detallePedidos.costoRepuestos.articulo.marca",
        })
    public PedidoRepuesto findCompleteById(Long id);

    public List<PedidoRepuesto> findAllByOrderByIdDesc();

    public List<PedidoRepuesto> findByEstadoPedidoRepuesto(EstadoPedidoRepuesto estadoPedidoRepuesto);

    public PedidoRepuesto findPedidoRepuestoByDetallePedidosIn(DetallePedido detallePedido);

    public Long countByEstadoPedidoRepuesto(EstadoPedidoRepuesto estadoPedidoRepuesto);
}
