package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoPersona;
import soldimet.repository.EstadoPersonaRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoPersonaRepository extends EstadoPersonaRepository {

    EstadoPersona findByNombreEstado(String nombreEstado);
}
