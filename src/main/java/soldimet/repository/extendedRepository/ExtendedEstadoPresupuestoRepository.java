package soldimet.repository.extendedRepository;

import soldimet.domain.EstadoPresupuesto;
import soldimet.repository.EstadoPresupuestoRepository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedEstadoPresupuestoRepository extends EstadoPresupuestoRepository {

    EstadoPresupuesto findByNombreEstado(String nombreEstado);

    List<EstadoPresupuesto> findByNombreEstadoIn(List<String> estados);
}
