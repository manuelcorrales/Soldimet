package soldimet.repository;

import soldimet.domain.TipoMovimiento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoMovimientoRepository extends JpaRepository<TipoMovimiento, Long> {

}
