package soldimet.repository.extendedRepository;

import soldimet.domain.TipoMovimiento;
import soldimet.repository.TipoMovimientoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedTipoMovimientoRepository extends TipoMovimientoRepository {

    TipoMovimiento findByNombreTipoMovimiento(String nombreTipoMovimiento);

}
