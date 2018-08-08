package soldimet.repository;

import soldimet.domain.DetallePedido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {

}
