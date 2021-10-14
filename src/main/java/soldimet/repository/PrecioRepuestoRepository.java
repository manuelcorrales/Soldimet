package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.PrecioRepuesto;

/**
 * Spring Data SQL repository for the PrecioRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioRepuestoRepository extends JpaRepository<PrecioRepuesto, Long> {}
