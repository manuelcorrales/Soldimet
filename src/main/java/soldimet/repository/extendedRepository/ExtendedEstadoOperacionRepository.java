package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoOperacion;
import soldimet.repository.EstadoOperacionRepository;

/**
 * Spring Data  repository for the EstadoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoOperacionRepository extends EstadoOperacionRepository {
    EstadoOperacion findByNombreEstado(String nombreEstado);
}
