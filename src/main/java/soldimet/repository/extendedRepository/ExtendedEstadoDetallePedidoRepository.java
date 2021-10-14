package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.EstadoDetallePedidoRepository;

/**
 * Spring Data  repository for the EstadoDetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoDetallePedidoRepository extends EstadoDetallePedidoRepository {
    EstadoDetallePedido findByNombreEstado(String nombreEstado);
}
