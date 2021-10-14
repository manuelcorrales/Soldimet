package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoMovimiento;

/**
 * Spring Data SQL repository for the EstadoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoMovimientoRepository extends JpaRepository<EstadoMovimiento, Long> {}
