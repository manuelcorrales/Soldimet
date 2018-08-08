package soldimet.repository;

import soldimet.domain.CobranzaRepuesto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CobranzaRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobranzaRepuestoRepository extends JpaRepository<CobranzaRepuesto, Long> {

}
