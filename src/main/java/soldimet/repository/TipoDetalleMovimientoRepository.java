package soldimet.repository;

import soldimet.domain.TipoDetalleMovimiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoDetalleMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDetalleMovimientoRepository extends JpaRepository<TipoDetalleMovimiento, Long> {

}
