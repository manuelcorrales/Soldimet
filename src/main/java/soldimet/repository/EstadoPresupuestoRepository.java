package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.EstadoPresupuesto;

/**
 * Spring Data SQL repository for the EstadoPresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoPresupuestoRepository extends JpaRepository<EstadoPresupuesto, Long> {}
