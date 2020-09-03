package soldimet.repository;

import soldimet.domain.EstadoPresupuesto;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPresupuestoRepository extends JpaRepository<EstadoPresupuesto, Long> {

    EstadoPresupuesto findByNombreEstado(String nombreEstado);

    List<EstadoPresupuesto> findByNombreEstadoIn(List<String> estados);
}
