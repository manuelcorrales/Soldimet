package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.Movimiento;

/**
 * Spring Data SQL repository for the Movimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {}
