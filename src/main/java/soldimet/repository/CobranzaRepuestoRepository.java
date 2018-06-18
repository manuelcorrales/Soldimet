package soldimet.repository;

import soldimet.domain.CobranzaRepuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CobranzaRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobranzaRepuestoRepository extends JpaRepository<CobranzaRepuesto, Long> {

}
