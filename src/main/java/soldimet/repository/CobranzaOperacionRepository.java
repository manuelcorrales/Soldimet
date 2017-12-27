package soldimet.repository;

import soldimet.domain.CobranzaOperacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CobranzaOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobranzaOperacionRepository extends JpaRepository<CobranzaOperacion, Long> {

}
