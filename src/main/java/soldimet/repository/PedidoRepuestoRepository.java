package soldimet.repository;

import soldimet.domain.PedidoRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidoRepuestoRepository extends JpaRepository<PedidoRepuesto, Long>, JpaSpecificationExecutor<PedidoRepuesto> {

}
