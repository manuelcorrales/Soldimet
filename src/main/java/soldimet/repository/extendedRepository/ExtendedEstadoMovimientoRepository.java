package soldimet.repository.extendedRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoMovimiento;
import soldimet.repository.EstadoMovimientoRepository;

/**
 * Spring Data  repository for the EstadoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoMovimientoRepository extends EstadoMovimientoRepository {
    EstadoMovimiento findByNombreEstado(String nombreEstado);
}
