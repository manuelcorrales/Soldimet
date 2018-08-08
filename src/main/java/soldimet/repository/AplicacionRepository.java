package soldimet.repository;

import soldimet.domain.Aplicacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Aplicacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AplicacionRepository extends JpaRepository<Aplicacion, Long> {

}
