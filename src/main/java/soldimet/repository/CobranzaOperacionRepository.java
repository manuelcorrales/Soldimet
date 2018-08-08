package soldimet.repository;

import soldimet.domain.CobranzaOperacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CobranzaOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobranzaOperacionRepository extends JpaRepository<CobranzaOperacion, Long> {

}
