package soldimet.repository.extendedRepository;

import soldimet.domain.Caja;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.Movimiento;
import soldimet.domain.SubCategoria;
import soldimet.domain.Sucursal;
import soldimet.domain.TipoMovimiento;
import soldimet.repository.MovimientoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


/**
 * Spring Data  repository for the Movimiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtendedMovimientoRepository extends MovimientoRepository {

        List<Movimiento> findByCajaAndEstado(Caja caja, EstadoMovimiento estado);

        List<Movimiento> findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstadoAndSubCategoriaIn(
            List<Sucursal> sucursales,
            LocalDate fechaInicio,
            LocalDate fechaFin,
            EstadoMovimiento estado,
            List<SubCategoria> subcategorias
        );

        List<Movimiento> findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstadoAndSubCategoriaIn(
            List<Sucursal> sucursales,
            LocalDate fechaInicio,
            LocalDate fechaFin,
            EstadoMovimiento estado,
            Set<SubCategoria> subcategorias
        );

		List<Movimiento> findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstadoAndTipoMovimiento(
				List<Sucursal> sucursales, LocalDate currentMonthFirstDay, LocalDate currentMonthLastDay,
				EstadoMovimiento estado, TipoMovimiento tipoMovimiento);



		List<Movimiento> findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstado(
				List<Sucursal> sucursales, LocalDate currentMonthFirstDay, LocalDate currentMonthLastDay,
				EstadoMovimiento estado);

    @EntityGraph(attributePaths = {
        "estado",
        "tipoMovimiento",
        "empleado",
        "empleado.persona",
        "empleado.sucursal",
        "subCategoria",
        "medioDePago",
        "medioDePago.formaDePago",
        "medioDePago.medioDePagoCheque",
        "medioDePago.medioDePagoCheque.banco"
    })
    public Page<Movimiento> findByEstadoNombreEstadoAndSubCategoriaNombreSubCategoriaContainsAndCajaSucursalIdOrderByIdDesc(
            String estado, String filtro, Long sucursalId, Pageable paging);

    @EntityGraph(attributePaths = {
        "estado",
        "tipoMovimiento",
        "empleado",
        "empleado.persona",
        "empleado.sucursal",
        "subCategoria",
        "medioDePago",
        "medioDePago.formaDePago",
        "medioDePago.medioDePagoCheque",
        "medioDePago.medioDePagoCheque.banco"
    })
    public Page<Movimiento> findByFechaGreaterThanEqualAndFechaLessThanEqualAndEstadoNombreEstadoAndSubCategoriaNombreSubCategoriaContainsAndCajaSucursalIdOrderByIdDesc(
            LocalDate fechaInicio, LocalDate fechaFin, String estado, String filtro, Long sucursalId, Pageable paging);

}
