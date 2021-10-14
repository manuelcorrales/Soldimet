package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;

/**
 * Spring Data  repository for the EstadoPedidoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoPedidoRepuestoRepository extends EstadoPedidoRepuestoRepository {
    EstadoPedidoRepuesto findByNombreEstado(String nombreEstado);
}
