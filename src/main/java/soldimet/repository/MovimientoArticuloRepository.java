package soldimet.repository;

import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoArticulo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MovimientoArticulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoArticuloRepository extends JpaRepository<MovimientoArticulo, Long> {

}
