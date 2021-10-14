package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.CostoRepuesto;

/**
 * Spring Data SQL repository for the CostoRepuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostoRepuestoRepository extends JpaRepository<CostoRepuesto, Long> {}
