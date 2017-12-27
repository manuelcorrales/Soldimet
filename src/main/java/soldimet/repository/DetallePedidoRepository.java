package soldimet.repository;

import soldimet.domain.DetallePedido;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {

}
