package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoDetallePedido;

/**
 * Spring Data SQL repository for the EstadoDetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoDetallePedidoRepository extends JpaRepository<EstadoDetallePedido, Long> {}
