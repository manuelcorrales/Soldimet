package soldimet.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
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

    public List<Presupuesto> findBySucursalAndFechaCreacionGreaterThanEqualAndFechaCreacionLessThanEqualAndEstadoPresupuestoIn(
        Sucursal sucursal, LocalDate fechaInicio, LocalDate fechaFin, List<EstadoPresupuesto> estados
    );

    public Long countByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public Presupuesto findByDetallePresupuestosIn(DetallePresupuesto detallePresupuesto);

    public Presupuesto findFirstByDetallePresupuestosAplicacionAndDetallePresupuestosCilindradaAndModeloOrderByIdDesc(
        Aplicacion aplicacion,
        Cilindrada cilindrada,
        Boolean modelo
    );

}
