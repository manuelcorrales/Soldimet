package soldimet.repository.extendedRepository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoPresupuesto;
import soldimet.repository.EstadoPresupuestoRepository;

/**
 * Spring Data  repository for the EstadoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoPresupuestoRepository extends EstadoPresupuestoRepository {
    EstadoPresupuesto findByNombreEstado(String nombreEstado);

    List<EstadoPresupuesto> findByNombreEstadoIn(List<String> estados);
}
