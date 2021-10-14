package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.MovimientoPedido;

/**
 * Spring Data SQL repository for the MovimientoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoPedidoRepository extends JpaRepository<MovimientoPedido, Long> {}
