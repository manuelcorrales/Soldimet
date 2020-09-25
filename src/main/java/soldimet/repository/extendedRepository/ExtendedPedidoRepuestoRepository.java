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

    public List<PedidoRepuesto> findAllByOrderByIdDesc();

    public List<PedidoRepuesto> findByEstadoPedidoRepuesto(EstadoPedidoRepuesto estadoPedidoRepuesto);

    public PedidoRepuesto findPedidoRepuestoByDetallePedidosIn(DetallePedido detallePedido);

    public Long countByEstadoPedidoRepuesto(EstadoPedidoRepuesto estadoPedidoRepuesto);
}
