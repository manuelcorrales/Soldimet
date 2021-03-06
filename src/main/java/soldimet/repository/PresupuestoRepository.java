package soldimet.repository;

import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.Presupuesto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Presupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoRepository extends JpaRepository<Presupuesto, Long>, JpaSpecificationExecutor<Presupuesto> {

    public List<Presupuesto> findAll(Specification specification);

    public List<Presupuesto> findByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);
}
