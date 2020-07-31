package soldimet.repository;

import soldimet.domain.TipoMovimiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoMovimientoRepository extends JpaRepository<TipoMovimiento, Long> {

    TipoMovimiento findByNombreTipoMovimiento(String nombreTipoMovimiento);

}
