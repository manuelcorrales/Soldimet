package soldimet.repository;

import java.util.List;

import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.PedidoRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import soldimet.domain.Presupuesto;


/**
 * Spring Data JPA repository for the PedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidoRepuestoRepository extends JpaRepository<PedidoRepuesto, Long>, JpaSpecificationExecutor<PedidoRepuesto> {

    public PedidoRepuesto findByPresupuesto(Presupuesto presupuesto);

    public List<PedidoRepuesto> findAllByOrderByIdDesc();

    public List<PedidoRepuesto> findByEstadoPedidoRepuesto( EstadoPedidoRepuesto estadoPedidoRepuesto);

    public PedidoRepuesto findPedidoRepuestoByDetallePedidosIn(DetallePedido detallePedido);
}
