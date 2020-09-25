package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoOperacion;
import soldimet.repository.EstadoOperacionRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoOperacionRepository extends EstadoOperacionRepository {

    EstadoOperacion findByNombreEstado(String nombreEstado);
}
