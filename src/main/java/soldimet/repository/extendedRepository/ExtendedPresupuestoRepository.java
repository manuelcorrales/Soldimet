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
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Presupuesto entity.
 */
@Repository
public interface ExtendedPresupuestoRepository extends PresupuestoRepository {

    public String queryPresupuestoFiltrandoSucursal = "SELECT "
            + "pre.*, det.* "
            + "FROM presupuesto pre "
            + "INNER JOIN estado_presupuesto est ON pre.estado_presupuesto_id=est.id "
            + "INNER JOIN cliente cli ON pre.cliente_id=cli.id "
            + "INNER JOIN persona per ON cli.persona_id=per.id "
            + "INNER JOIN detalle_presupuesto det ON det.presupuesto=pre.id "
            + "INNER JOIN motor mot ON det.motor_id=mot.id "
            + "INNER JOIN aplicacion apl ON det.aplicacion_id=apl.id "
            + "INNER JOIN tipo_parte_motor tipo ON det.tipo_parte_motor_id=tipo.id "
            + "INNER JOIN cilindrada cil ON det.cilindrada_id=cil.id WHERE "
            + "pre.modelo=:modelo OR (pre.sucursal_id=:sucursal AND ("
            + "per.nombre like :filtro OR per.apellido like :filtro)) ORDER BY pre.id DESC";

    public List<Presupuesto> findAll(Specification specification);

    public Page<Presupuesto> findAllByOrderByIdDesc(Pageable pageable);

    @EntityGraph(attributePaths = { "detallePresupuestos", "detallePresupuestos.motor", "sucursal",
            "detallePresupuestos.aplicacion", "detallePresupuestos.tipoParteMotor", "detallePresupuestos.cilindrada",
            "detallePresupuestos.cobranzaOperacions", "detallePresupuestos.cobranzaRepuestos",
            "detallePresupuestos.cobranzaRepuestos.articulo.marca", "detallePresupuestos.cobranzaRepuestos.articulo.tipoRepuesto",
            "detallePresupuestos.cobranzaRepuestos.articulo", "detallePresupuestos.cobranzaRepuestos.tipoRepuesto", "detallePresupuestos.cobranzaOperacions.operacion",
            "cliente", "cliente.persona", "estadoPresupuesto" })
    public Page<Presupuesto> findDistinctByClientePersonaNombreContainsOrClientePersonaApellidoContainsOrDetallePresupuestosMotorMarcaMotorContainsOrDetallePresupuestosAplicacionNombreAplicacionContainsOrderByIdDesc(
            String nombre, String apellido, String motor, String aplicacion, Pageable pageable);

    @EntityGraph(attributePaths = { "detallePresupuestos", "detallePresupuestos.motor",
            "detallePresupuestos.aplicacion", "detallePresupuestos.tipoParteMotor", "detallePresupuestos.cilindrada",
            "detallePresupuestos.cobranzaOperacions", "detallePresupuestos.cobranzaRepuestos", "cliente",
            "cliente.persona", "estadoPresupuesto" })
    public Page<Presupuesto> findByClientePersonaNombreContainsOrClientePersonaApellidoContainsOrDetallePresupuestosMotorMarcaMotorContainsOrDetallePresupuestosAplicacionNombreAplicacionContainsAndSucursalAndModeloOrderByIdDesc(
        String nombre,
        String apellido,
        String motor,
        String aplicacion,
        Sucursal sucursal,
        Boolean isModelo,
        Pageable pageable
    );

    public List<Presupuesto> findByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public List<Presupuesto> findBySucursalAndFechaCreacionGreaterThanEqualAndFechaCreacionLessThanEqualAndEstadoPresupuestoIn(
            Sucursal sucursal, LocalDate fechaInicio, LocalDate fechaFin, List<EstadoPresupuesto> estados);

    public Long countByEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto);

    public Presupuesto findByDetallePresupuestosIn(DetallePresupuesto detallePresupuesto);

    public Presupuesto findFirstByDetallePresupuestosAplicacionIdAndDetallePresupuestosCilindradaIdOrderByModeloDescIdDesc(
            Long aplicacionIdd, Long cilindradaId);

}
