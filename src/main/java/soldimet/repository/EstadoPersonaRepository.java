package soldimet.repository;

import soldimet.domain.EstadoPersona;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPersonaRepository extends JpaRepository<EstadoPersona, Long> {

    EstadoPersona findByNombreEstado(String nombreEstado);
}
