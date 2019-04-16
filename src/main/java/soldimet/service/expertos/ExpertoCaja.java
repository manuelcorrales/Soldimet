package soldimet.service.expertos;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.joda.time.MonthDay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soldimet.constant.Globales;
import soldimet.converter.CajaConverter;
import soldimet.domain.Caja;
import soldimet.domain.Empleado;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.MedioDePago;
import soldimet.domain.Movimiento;
import soldimet.domain.Persona;
import soldimet.domain.Sucursal;
import soldimet.repository.CajaRepository;
import soldimet.repository.EmpleadoRepository;
import soldimet.repository.EstadoMovimientoRepository;
import soldimet.repository.MedioDePagoRepository;
import soldimet.repository.MovimientoRepository;
import soldimet.repository.PersonaRepository;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;

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
    private PersonaRepository personaRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private CajaRepository cajaRepository;

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private EstadoMovimientoRepository estadoMovimientoRepository;

    @Autowired
    private Globales globales;

    @Autowired
    private CajaConverter cajaConverter;

    @Autowired
    private MedioDePagoRepository medioDePagoRepository;

    public ExpertoCaja() {

    }

    public DTOCajaCUConsultarMovimientos buscarMovimientosDia() {

        Empleado empleado = this.getCurrentEmployee();
        Sucursal sucursal = empleado.getSucursal();

        Caja cajaDia = cajaRepository.findFirstByFechaGreaterThanEqualAndSucursal(this.currentMonth(), sucursal);
        log.debug("Caja día : {}", cajaDia);

        if (cajaDia == null) {
            cajaDia = this.AbrirCaja(sucursal);
        }

        // Float montoMensual = calcularTotalMesActual();

        List<Movimiento> movimientos = movimientoRepository.findByCaja(cajaDia);

        DTOCajaCUConsultarMovimientos dto = cajaConverter.cajaACajaMovimiento(cajaDia, movimientos);
        dto.setTotalMensual(cajaDia.getSaldo());

        return dto;
    }

    private Float calcularTotalMesActual() {

        LocalDate fechaMesActual = LocalDate.now().withDayOfMonth(1).withMonth(MonthDay.now().MONTH_OF_YEAR);
        List<Caja> listaCajaMes = cajaRepository.findByFechaGreaterThanEqual(fechaMesActual);

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

            movimientoDto.setFecha(LocalDate.now());
            movimientoDto.setEstado(estadoAlta);
            movimientoDto.setEmpleado(this.getCurrentEmployee());

            Caja cajaDia = cajaRepository.findFirstByFechaGreaterThanEqualAndSucursal(
                this.currentMonth(),
                movimientoDto.getEmpleado().getSucursal()
            );
            if (cajaDia == null) {
                cajaDia = this.AbrirCaja(movimientoDto.getEmpleado().getSucursal());
            }
            movimientoDto.setCaja(cajaDia);


            // Guardo el medio de pago creado con los datos puntuales de este movimiento
            // antes de guardar el movimiento
            MedioDePago medioDePagoMovimiento = movimientoDto.getMedioDePago();
            medioDePagoMovimiento = medioDePagoRepository.save(medioDePagoMovimiento);
            movimientoDto.setMedioDePago(medioDePagoMovimiento);

            Movimiento newMovimiento = movimientoRepository.save(movimientoDto);

            this.actualizarSaldoCaja(cajaDia, newMovimiento);

            return newMovimiento;

        }catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    private Caja AbrirCaja(Sucursal sucursal) {

        Caja ultimaCaja = cajaRepository.findFirstByFechaGreaterThanEqualAndSucursal(
            this.currentMonth(),
            sucursal
        );
        //creo una fecha actual y le doy formato (puede ser yyyy/MM/dd HH:mm:ss)
        Caja cajaDiaHoy = new Caja();

        Float saldo = new Float(0);
        if (ultimaCaja != null) {
            saldo = ultimaCaja.getSaldo();
        }

        cajaDiaHoy.setSaldo(saldo);
        cajaDiaHoy.setFecha(LocalDate.now());
        cajaDiaHoy.setSucursal(sucursal);
        cajaDiaHoy.setHoraApertura(Instant.now());

        //GUARDO LA CAJA
        return cajaRepository.save(cajaDiaHoy);


    }

    private Empleado getCurrentEmployee() {

        List<Persona> personas = personaRepository.findByUserIsCurrentUser();
        if (personas.isEmpty()) {
            return null;
        }

        Empleado empleado = empleadoRepository.findByPersona(personas.get(0));
        return empleado;
    }

    private LocalDate currentMonth() {
        return LocalDate.now().withDayOfMonth(1);
    }

    private Caja actualizarSaldoCaja(Caja caja, Movimiento movimiento) {
        Float saldo = caja.getSaldo();
        if ( movimiento.getTipoMovimiento().getNombreTipoMovimiento().equals(globales.nombre_Tipo_Movimiento_Ingreso)) {
            saldo += movimiento.getImporte();
        } else {
            saldo -= movimiento.getImporte();
        }
        return cajaRepository.save(caja);
    }


}
