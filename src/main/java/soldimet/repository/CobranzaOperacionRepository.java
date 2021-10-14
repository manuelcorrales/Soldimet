package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CobranzaOperacion;

/**
 * Spring Data SQL repository for the CobranzaOperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobranzaOperacionRepository extends JpaRepository<CobranzaOperacion, Long> {}
