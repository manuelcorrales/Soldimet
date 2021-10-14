package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.TipoDetalleMovimiento;

/**
 * Spring Data SQL repository for the TipoDetalleMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDetalleMovimientoRepository extends JpaRepository<TipoDetalleMovimiento, Long> {}
