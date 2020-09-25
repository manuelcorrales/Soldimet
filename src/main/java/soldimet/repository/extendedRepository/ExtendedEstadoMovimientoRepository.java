package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoMovimiento;
import soldimet.repository.EstadoMovimientoRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoMovimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoMovimientoRepository extends EstadoMovimientoRepository {

    EstadoMovimiento findByNombreEstado(String nombreEstado);
}
