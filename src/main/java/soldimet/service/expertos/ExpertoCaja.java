package soldimet.service.expertos;

import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soldimet.constant.Globales;
import soldimet.converter.CajaConverter;
import soldimet.domain.Authority;
import soldimet.domain.Caja;
import soldimet.domain.Empleado;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.MedioDePago;
import soldimet.domain.Movimiento;
import soldimet.domain.SubCategoria;
import soldimet.domain.Sucursal;
import soldimet.domain.TipoMovimiento;
import soldimet.repository.MedioDePagoRepository;
import soldimet.repository.SucursalRepository;
import soldimet.repository.extendedRepository.ExtendedCajaRepository;
import soldimet.repository.extendedRepository.ExtendedCategoriaPagoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoMovimientoRepository;
import soldimet.repository.extendedRepository.ExtendedMovimientoRepository;
import soldimet.repository.extendedRepository.ExtendedSubCategoriaRepository;
import soldimet.security.AuthoritiesConstants;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;
import soldimet.utils.MathUtils;


/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
@Service
@Transactional
public class ExpertoCaja {

    private final Logger log = LoggerFactory.getLogger(ExpertoCaja.class);

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    @Autowired
    private ExtendedCajaRepository cajaRepository;

    @Autowired
    private ExtendedMovimientoRepository movimientoRepository;

    @Autowired
    private ExtendedEstadoMovimientoRepository estadoMovimientoRepository;

    @Autowired
    private Globales globales;

    @Autowired
    private CajaConverter cajaConverter;

    @Autowired
    private MedioDePagoRepository medioDePagoRepository;

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private ExtendedCategoriaPagoRepository categoriaRepository;

    @Autowired
    private ExtendedSubCategoriaRepository subCategoriaRepository;

    public ExpertoCaja() {

    }

    public DTOCajaCUConsultarMovimientos getMovimientosSucursal(Long sucursalId, Integer mes, Integer anio) {

        Empleado empleado = expertoUsuarios.getEmpleadoLogeado();
        Sucursal sucursal = empleado.getSucursal();
        List<Caja> listaCajas = new ArrayList<Caja>();
        if (sucursalId != null && this.tieneAccesoATodosLosMovimientos(empleado) && mes > 0) {
            sucursal = sucursalRepository.findById(sucursalId).get();
            LocalDate fechaInicio = this.formatearFecha(mes, anio);
            LocalDate fechaFin = this.formatearFecha(mes, anio).plusMonths(1).minusDays(1);
            listaCajas = cajaRepository.findByFechaGreaterThanEqualAndFechaLessThanEqualAndSucursalOrderByFechaAsc(
                fechaInicio,
                fechaFin,
                sucursal
            );
        } else {
            Caja cajaDia = this.findCajaDelDia(sucursal);
            listaCajas.add(cajaDia);
        }
        EstadoMovimiento estadoAlta = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);
        Float totalMes = this.calcularTotalMesActual(sucursal);
        return cajaConverter.cajaADTO(listaCajas, estadoAlta, totalMes);
    }

    private LocalDate formatearFecha(Integer mes, Integer anio) {
        // Creo la fecha para coincidir solo con el mes
        String strMes = "";
        if ( mes < 10) {
            strMes += "0";
        }
        strMes += mes;
        String fechaMes = anio + "-" + strMes + "-01";
        return LocalDate.parse(fechaMes).withDayOfMonth(1);
    }

    private Float calcularTotalMesActual(Sucursal sucursal) {

        List<Caja> listaCajaMes = this.findCajasDelMes(sucursal);

        Float montoTotalMes = new Float(0);
        for (Caja caja : listaCajaMes) {

            montoTotalMes += caja.getSaldo();
        }
        return montoTotalMes;
    }

    public Movimiento guardarNuevoMovimiento(Movimiento movimientoDto) {
        try {
            EstadoMovimiento estadoAlta = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);

            // update movimiento params
            movimientoDto.setFecha(this.currentDay());
            movimientoDto.setEstado(estadoAlta);
            movimientoDto.setEmpleado(expertoUsuarios.getEmpleadoLogeado());

            // Ajusto el signo del total del movimiento dependiento si es un ingreso o egreso
            if (movimientoDto.getTipoMovimiento().getNombreTipoMovimiento().equals(globales.nombre_Tipo_Movimiento_Egreso)) {
                Float totalMovimiento = movimientoDto.getImporte() * -1;
                movimientoDto.setImporte(totalMovimiento);
            }

            Caja cajaDia = this.findCajaDelDia(movimientoDto.getEmpleado().getSucursal());
            movimientoDto.setCaja(cajaDia);


            // Guardo el medio de pago creado con los datos puntuales de este movimiento
            // antes de guardar el movimiento
            MedioDePago medioDePagoMovimiento = movimientoDto.getMedioDePago();
            medioDePagoMovimiento = medioDePagoRepository.save(medioDePagoMovimiento);
            movimientoDto.setMedioDePago(medioDePagoMovimiento);

            // Guardo la subcategoria
            movimientoDto.setSubCategoria( subCategoriaRepository.save(movimientoDto.getSubCategoria()) );

            this.actualizarSaldoCaja(cajaDia, movimientoDto);

            Movimiento newMovimiento = movimientoRepository.save(movimientoDto);

            return newMovimiento;

        }catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    private Caja AbrirCaja(Sucursal sucursal) {

        Caja cajaDiaHoy = new Caja();

        cajaDiaHoy.setSaldo(new Float(0));
        cajaDiaHoy.setFecha(this.currentDay());
        cajaDiaHoy.setSucursal(sucursal);
        cajaDiaHoy.setHoraApertura(Instant.now());

        //GUARDO LA CAJA
        return cajaRepository.save(cajaDiaHoy);
    }

    private LocalDate currentDay() {
        return LocalDate.now();
    }

    private LocalDate currentMonthFirstDay() {
        return YearMonth.now().atDay(1);
    }

    private LocalDate currentMonthLastDay() {
        return YearMonth.now().atEndOfMonth();

    }

    public Caja findCajaDelDia(Sucursal sucursal) {
        Caja cajaDia = cajaRepository.findFirstByFechaGreaterThanEqualAndSucursal(
            this.currentDay(),
            sucursal
        );
        if (cajaDia == null) {
            cajaDia = this.AbrirCaja(sucursal);
        }
        return cajaDia;
    }

    public List<Caja> findCajasDelMes(Sucursal sucursal) {
        LocalDate fechaInicioMes = this.currentMonthFirstDay();
        LocalDate fechaFinMes = this.currentMonthLastDay();
        return  cajaRepository.findByFechaGreaterThanEqualAndFechaLessThanEqualAndSucursalOrderByFechaAsc(fechaInicioMes, fechaFinMes, sucursal);
    }

    private Caja actualizarSaldoCaja(Caja caja, Movimiento movimiento) {
        Float saldo = caja.getSaldo();
        String estadoMovimiento = movimiento.getEstado().getNombreEstado();

        /*
            Los valores de los movimientos y el saldo de caja se guardan con SIGNO
            Saldo = 10
            Movimiento = 3
            EL VALOR DEL SALDO EN CAJA ES DIARIO
            * Ingreso Alta:
                Saldo = 13
            * Ingreso Baja:
                Saldo = 7
            *Egreso Alta:
                Saldo = 7
            *Egreso Baja:
                Saldo = 13
        */
        if(estadoMovimiento.equals(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA)){
            saldo = saldo + movimiento.getImporte();
        } else {
            saldo = saldo - movimiento.getImporte();
        }

        caja.setSaldo(saldo);

        return caja;
    }

	public Movimiento borrarMovimiento(Long idMovimiento) throws NoSuchElementException{

        Movimiento movimientoAEliminar = movimientoRepository.findById(idMovimiento).get();
        EstadoMovimiento estadoBaja = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_BAJA);
        movimientoAEliminar.setEstado(estadoBaja);
        this.actualizarSaldoCaja(movimientoAEliminar.getCaja(), movimientoAEliminar);
        Movimiento movimiento = movimientoRepository.save(movimientoAEliminar);
        return movimiento;

    }

    private Boolean tieneAccesoATodosLosMovimientos(Empleado empleado) {
        Set<Authority> authorities = empleado.getPersona().getUser().getAuthorities();

        List<String> authoritiesNames = new ArrayList<String>();
        // Spring permite filtrar todo a nivel de endpoint por eso filtro así
        // nternamente
        // Tambien se puede pero creando una relacion entre el objeto presupuesto y el
        // user (malisimo)
        for (Authority authority : authorities) {
            authoritiesNames.add(authority.getName());
        }

        return authoritiesNames.contains(AuthoritiesConstants.ADMIN)
                || authoritiesNames.contains(AuthoritiesConstants.JEFE);
    }

    public Float getGastoMensualProveedores() {

        Float pagoAcumulado= new Float(0);
        List<Sucursal> sucursales = sucursalRepository.findAll();
        EstadoMovimiento estado = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);
        Set<SubCategoria> subCategorias = categoriaRepository.findByNombreCategoriaPago(globales.CATEGORIA_PROVEEDORES).getSubCategorias();

        for (Movimiento movimiento: movimientoRepository.findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstadoAndSubCategoriaIn(
            sucursales, this.currentMonthFirstDay(), this.currentMonthLastDay(), estado, subCategorias
        )){
            pagoAcumulado += movimiento.getImporte();
        }
        return MathUtils.roundFloat(pagoAcumulado);

    }

    public Float getGastoMensualFerreteria() {

        Float gastoFerreteriaAcumulado= new Float(0);
        List<Sucursal> sucursales = sucursalRepository.findAll();
        EstadoMovimiento estado = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);
        Set<SubCategoria> subCategorias = categoriaRepository.findByNombreCategoriaPago(globales.CATEGORIA_Ferreteria).getSubCategorias();

        for (Movimiento movimiento: movimientoRepository.findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstadoAndSubCategoriaIn(
            sucursales, this.currentMonthFirstDay(), this.currentMonthLastDay(), estado, subCategorias
        )){
            gastoFerreteriaAcumulado += movimiento.getImporte();
        }
        return MathUtils.roundFloat(gastoFerreteriaAcumulado);

    }

    public Float getGastoMensualRepuestos() {

        Float pagoAcumulado= new Float(0);
        List<Sucursal> sucursales = sucursalRepository.findAll();
        EstadoMovimiento estado = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);
        Set<SubCategoria> subCategorias = categoriaRepository.findByNombreCategoriaPago(globales.CATEGORIA_REPUESTOS).getSubCategorias();

        for (Movimiento movimiento: movimientoRepository.findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstadoAndSubCategoriaIn(
            sucursales, this.currentMonthFirstDay(), this.currentMonthLastDay(), estado, subCategorias
        )){
            pagoAcumulado += movimiento.getImporte();
        }
        return MathUtils.roundFloat(pagoAcumulado);

    }

    public List<Movimiento> getMovimientosMensuales(TipoMovimiento tipoMovimiento, Sucursal sucursal) {

        List<Sucursal> sucursales;
        sucursales = new ArrayList<>();
        sucursales.add(sucursal);
        EstadoMovimiento estado = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);

        return movimientoRepository.findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstadoAndTipoMovimiento(
            sucursales, this.currentMonthFirstDay(), this.currentMonthLastDay(), estado, tipoMovimiento);
    }

    public List<Movimiento> getMovimientosMensuales() {

        List<Sucursal> sucursales = sucursalRepository.findAll();
        EstadoMovimiento estado = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);

        return movimientoRepository.findByCajaSucursalInAndCajaFechaGreaterThanEqualAndCajaFechaLessThanEqualAndEstado(
            sucursales, this.currentMonthFirstDay(), this.currentMonthLastDay(), estado
        );
    }

}
