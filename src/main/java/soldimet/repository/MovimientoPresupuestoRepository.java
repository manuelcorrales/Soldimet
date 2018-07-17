package soldimet.repository;

import soldimet.domain.MovimientoPresupuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MovimientoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoPresupuestoRepository extends JpaRepository<MovimientoPresupuesto, Long> {

}
