package soldimet.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import soldimet.domain.DetallePresupuesto;

/**
 * Spring Data SQL repository for the DetallePresupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetallePresupuestoRepository extends JpaRepository<DetallePresupuesto, Long> {}
