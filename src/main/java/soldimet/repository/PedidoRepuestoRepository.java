package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.PedidoRepuesto;

/**
 * Spring Data SQL repository for the PedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidoRepuestoRepository extends JpaRepository<PedidoRepuesto, Long>, JpaSpecificationExecutor<PedidoRepuesto> {}
