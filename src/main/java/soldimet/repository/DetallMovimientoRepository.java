package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.DetallMovimiento;

/**
 * Spring Data SQL repository for the DetallMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetallMovimientoRepository extends JpaRepository<DetallMovimiento, Long> {}
