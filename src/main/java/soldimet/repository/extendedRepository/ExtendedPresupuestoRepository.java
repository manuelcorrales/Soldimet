package soldimet.repository.extendedRepository;

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
import soldimet.repository.PresupuestoRepository;

import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Presupuesto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedPresupuestoRepository extends PresupuestoRepository {

    public List<Presupuesto> findAll(Specification specification);

    public Page<Presupuesto> findAllByOrderByIdDesc(Pageable pageable);

    @EntityGraph(attributePaths = { "detallePresupuestos", "detallePresupuestos.motor",
            "detallePresupuestos.aplicacion", "detallePresupuestos.tipoParteMotor", "detallePresupuestos.cilindrada",
            "cliente", "cliente.persona", "estadoPresupuesto" })
    public Page<Presupuesto> findDistinctByClientePersonaNombreContainsOrClientePersonaApellidoContainsOrDetallePresupuestosMotorMarcaMotorContainsOrderByIdDesc(
            String nombre, String apellido, String motor, Pageable pageable);

    @EntityGraph(attributePaths = { "detallePresupuestos", "detallePresupuestos.motor",
            "detallePresupuestos.aplicacion", "detallePresupuestos.tipoParteMotor", "detallePresupuestos.cilindrada",
            "cliente", "cliente.persona", "estadoPresupuesto" })
    public Page<Presupuesto> findBySucursalAndClientePersonaNombreContainsOrClientePersonaApellidoContainsOrDetallePresupuestosMotorMarcaMotorContainsOrderByIdDesc(
            Sucursal sucursal, String nombre, String apellido, String motor, Pageable pageable);

    public List<Presupuesto> findByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public List<Presupuesto> findBySucursalAndFechaCreacionGreaterThanEqualAndFechaCreacionLessThanEqualAndEstadoPresupuestoIn(
            Sucursal sucursal, LocalDate fechaInicio, LocalDate fechaFin, List<EstadoPresupuesto> estados);

    public Long countByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public Presupuesto findByDetallePresupuestosIn(DetallePresupuesto detallePresupuesto);

    public Presupuesto findFirstByDetallePresupuestosAplicacionAndDetallePresupuestosCilindradaAndModeloOrderByIdDesc(
            Aplicacion aplicacion, Cilindrada cilindrada, Boolean modelo);

}
