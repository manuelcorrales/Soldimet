package soldimet.repository;

import soldimet.domain.EstadoOperacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoOperacionRepository extends JpaRepository<EstadoOperacion, Long> {

}
