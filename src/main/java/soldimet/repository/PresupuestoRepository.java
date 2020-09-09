package soldimet.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<Presupuesto> findAllByOrderByIdDesc(Pageable pageable);

    @Query(value = "SELECT pre.* FROM presupuesto pre INNER JOIN cliente cli ON pre.cliente_id = cli.id INNER JOIN persona per ON cli.persona_id = per.id "
            + "INNER JOIN detalle_presupuesto det ON det.presupuesto = pre.id INNER JOIN motor mot ON mot.id = det.motor_id "
            + "WHERE per.nombre LIKE ?1% OR per.apellido LIKE ?1% OR pre.id LIKE ?1% OR mot.marca_motor LIKE ?1% ORDER BY pre.id DESC", countQuery = "SELECT count(pre.id) FROM presupuesto pre INNER JOIN cliente cli ON pre.cliente_id = cli.id INNER JOIN persona per ON cli.persona_id = per.id "
                    + "INNER JOIN detalle_presupuesto det ON det.presupuesto = pre.id INNER JOIN motor mot ON mot.id = det.motor_id "
                    + "WHERE per.nombre LIKE ?1% OR per.apellido LIKE ?1% OR pre.id LIKE ?1% OR mot.marca_motor LIKE ?1% ORDER BY pre.id DESC", nativeQuery = true)
    public Page<Presupuesto> filterAndPagePresupuestos(String filtro, Pageable pageable);

    public List<Presupuesto> findByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    @Query(value = "SELECT pre.* FROM presupuesto pre INNER JOIN cliente cli ON pre.cliente_id = cli.id INNER JOIN persona per ON cli.persona_id = per.id "
            + "INNER JOIN detalle_presupuesto det ON det.presupuesto = pre.id INNER JOIN motor mot ON mot.id = det.motor_id "
            + "WHERE pre.sucursal_id = ?2 AND (per.nombre LIKE ?1% OR per.apellido LIKE ?1% OR pre.id LIKE ?1% OR mot.marca_motor LIKE ?1%) ORDER BY pre.id DESC", countQuery = "SELECT count(pre.id) FROM presupuesto pre INNER JOIN cliente cli ON pre.cliente_id = cli.id INNER JOIN persona per ON cli.persona_id = per.id "
                    + "INNER JOIN detalle_presupuesto det ON det.presupuesto = pre.id INNER JOIN motor mot ON mot.id = det.motor_id "
                    + "WHERE pre.sucursal_id = ?2 AND (per.nombre LIKE ?1% OR per.apellido LIKE ?1% OR pre.id LIKE ?1% OR mot.marca_motor LIKE ?1%) ORDER BY pre.id DESC", nativeQuery = true)
    public Page<Presupuesto> findBySucursalfilterAndPageOrderByIdDesc(String filtro, Long sucursal, Pageable pageable);

    public List<Presupuesto> findBySucursalAndFechaCreacionGreaterThanEqualAndFechaCreacionLessThanEqualAndEstadoPresupuestoIn(
            Sucursal sucursal, LocalDate fechaInicio, LocalDate fechaFin, List<EstadoPresupuesto> estados);

    public Long countByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public Presupuesto findByDetallePresupuestosIn(DetallePresupuesto detallePresupuesto);

    public Presupuesto findFirstByDetallePresupuestosAplicacionAndDetallePresupuestosCilindradaAndModeloOrderByIdDesc(
            Aplicacion aplicacion, Cilindrada cilindrada, Boolean modelo);

}
