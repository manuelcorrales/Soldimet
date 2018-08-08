package soldimet.repository;

import soldimet.domain.MovimientoPedido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MovimientoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoPedidoRepository extends JpaRepository<MovimientoPedido, Long> {

}
