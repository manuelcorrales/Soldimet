package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.TipoMovimiento;
import soldimet.repository.TipoMovimientoRepository;

/**
 * Spring Data  repository for the TipoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTipoMovimientoRepository extends TipoMovimientoRepository {
    TipoMovimiento findByNombreTipoMovimiento(String nombreTipoMovimiento);
}
