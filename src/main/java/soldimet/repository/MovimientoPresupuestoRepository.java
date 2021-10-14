package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.MovimientoPresupuesto;

/**
 * Spring Data SQL repository for the MovimientoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoPresupuestoRepository extends JpaRepository<MovimientoPresupuesto, Long> {}
