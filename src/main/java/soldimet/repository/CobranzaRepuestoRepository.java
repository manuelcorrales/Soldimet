package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CobranzaRepuesto;

/**
 * Spring Data SQL repository for the CobranzaRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CobranzaRepuestoRepository extends JpaRepository<CobranzaRepuesto, Long> {}
