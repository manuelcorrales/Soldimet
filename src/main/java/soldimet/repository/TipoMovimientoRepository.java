package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.TipoMovimiento;

/**
 * Spring Data SQL repository for the TipoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoMovimientoRepository extends JpaRepository<TipoMovimiento, Long> {}
