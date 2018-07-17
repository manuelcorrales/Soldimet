package soldimet.repository;

import soldimet.domain.MovimientoPedido;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MovimientoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoPedidoRepository extends JpaRepository<MovimientoPedido, Long> {

}
