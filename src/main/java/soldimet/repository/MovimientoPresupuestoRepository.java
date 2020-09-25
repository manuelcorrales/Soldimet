package soldimet.repository;

import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoPresupuesto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MovimientoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoPresupuestoRepository extends JpaRepository<MovimientoPresupuesto, Long> {


}
