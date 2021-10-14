package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.DetallePedido;

/**
 * Spring Data SQL repository for the DetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {}
