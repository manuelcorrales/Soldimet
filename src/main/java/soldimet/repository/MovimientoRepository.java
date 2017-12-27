package soldimet.repository;

import soldimet.domain.Movimiento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Movimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

}
