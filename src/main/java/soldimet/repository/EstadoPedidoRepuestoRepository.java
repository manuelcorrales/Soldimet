package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoPedidoRepuesto;

/**
 * Spring Data SQL repository for the EstadoPedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPedidoRepuestoRepository extends JpaRepository<EstadoPedidoRepuesto, Long> {}
