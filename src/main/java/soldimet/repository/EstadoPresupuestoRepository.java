package soldimet.repository;

import soldimet.domain.EstadoPresupuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EstadoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPresupuestoRepository extends JpaRepository<EstadoPresupuesto, Long> {

    EstadoPresupuesto findByNombreEstado(String nombreEstado);
}
