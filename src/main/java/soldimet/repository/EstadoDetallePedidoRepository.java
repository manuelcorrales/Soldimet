package soldimet.repository;

import soldimet.domain.EstadoDetallePedido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoDetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoDetallePedidoRepository extends JpaRepository<EstadoDetallePedido, Long> {

    EstadoDetallePedido findByNombreEstado(String nombreEstado);
}
