package soldimet.repository;

import java.util.List;
import org.springframework.data.jpa.domain.Specification;

import soldimet.domain.DetallePresupuesto;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.Presupuesto;
import soldimet.domain.Sucursal;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Presupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PresupuestoRepository extends JpaRepository<Presupuesto, Long>, JpaSpecificationExecutor<Presupuesto> {

    public List<Presupuesto> findAll(Specification specification);

    public List<Presupuesto> findAllByOrderByIdDesc();

    public List<Presupuesto> findByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public List<Presupuesto> findBySucursal(Sucursal sucursal);

    public Long countByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public Presupuesto findByDetallePresupuestosIn(DetallePresupuesto detallePresupuesto);

}
