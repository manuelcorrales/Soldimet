package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.EstadoDetallePedidoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoDetallePedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoDetallePedidoRepository extends EstadoDetallePedidoRepository {

    EstadoDetallePedido findByNombreEstado(String nombreEstado);
}
