package soldimet.repository;

import soldimet.domain.EstadoPersona;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPersonaRepository extends JpaRepository<EstadoPersona, Long> {

    EstadoPersona findByNombreEstado(String nombreEstado);
}
