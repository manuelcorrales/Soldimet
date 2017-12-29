package soldimet.repository;

import soldimet.domain.EstadoPedidoRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoPedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPedidoRepuestoRepository extends JpaRepository<EstadoPedidoRepuesto, Long> {

    EstadoPedidoRepuesto findByNombreEstado(String nombreEstado);
}
