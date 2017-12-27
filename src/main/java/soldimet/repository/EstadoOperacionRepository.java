package soldimet.repository;

import soldimet.domain.EstadoOperacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoOperacionRepository extends JpaRepository<EstadoOperacion, Long> {

}
