package soldimet.repository;

import soldimet.domain.TipoDetalleMovimiento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoDetalleMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDetalleMovimientoRepository extends JpaRepository<TipoDetalleMovimiento, Long> {

}
