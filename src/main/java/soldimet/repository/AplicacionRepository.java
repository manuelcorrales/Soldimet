package soldimet.repository;

import java.util.List;
import soldimet.domain.Aplicacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Aplicacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AplicacionRepository extends JpaRepository<Aplicacion, Long> {

}
