package soldimet.repository;

import soldimet.domain.EstadoDetallePedido;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoDetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoDetallePedidoRepository extends JpaRepository<EstadoDetallePedido, Long> {

    EstadoDetallePedido findByNombreEstado(String nombreEstado);
}
