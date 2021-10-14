package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoOperacion;

/**
 * Spring Data SQL repository for the EstadoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoOperacionRepository extends JpaRepository<EstadoOperacion, Long> {}
