package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.DetalleMovimiento;

/**
 * Spring Data SQL repository for the DetalleMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetalleMovimientoRepository extends JpaRepository<DetalleMovimiento, Long> {}
