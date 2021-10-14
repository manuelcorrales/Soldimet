package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoPersona;

/**
 * Spring Data SQL repository for the EstadoPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPersonaRepository extends JpaRepository<EstadoPersona, Long> {}
