package soldimet.repository;

import soldimet.domain.Operacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Operacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperacionRepository extends JpaRepository<Operacion, Long> {

}
