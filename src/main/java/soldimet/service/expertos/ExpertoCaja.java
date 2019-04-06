package soldimet.service.expertos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.joda.time.DateTimeUtils;
import org.joda.time.Days;
import org.joda.time.MonthDay;
import org.joda.time.Months;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.config.JHipsterDefaults.Cache.Infinispan.Local;
import soldimet.constant.Globales;
import soldimet.converter.CajaConverter;
import soldimet.domain.Articulo;
import soldimet.domain.Caja;
import soldimet.domain.DetalleMovimiento;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.Movimiento;
import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.CajaRepository;
import soldimet.repository.EstadoMovimientoRepository;
import soldimet.repository.MovimientoRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PresupuestoRepository;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;
import soldimet.service.dto.DTOMensajeCerrarCaja;

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
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private ArticuloRepository articuloRepository;

    public ExpertoCaja() {

    }

    public DTOCajaCUConsultarMovimientos buscarMovimientosDia() {

        Caja cajaDia = cajaRepository.findByFecha(LocalDate.now());

        if (cajaDia == null) {
            cajaDia = new Caja();
            cajaDia.setFecha(LocalDate.now());
            cajaDia = cajaRepository.save(cajaDia);
        }

        Float montoMensual = calcularTotalMesActual();

        List<Movimiento> movimientos = movimientoRepository.findByCaja(cajaDia);

        DTOCajaCUConsultarMovimientos dto = cajaConverter.cajaACajaMovimiento(cajaDia, movimientos);
        dto.setTotalMensual(montoMensual);

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

            System.out.println(movimientoDto);
            Caja cajaDia = cajaRepository.findByFecha(LocalDate.now());
            EstadoMovimiento estadoAlta = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);

            // update movimiento params
            movimientoDto.setCaja(cajaDia);
            movimientoDto.setFecha(LocalDate.now());
            movimientoDto.setEstado(estadoAlta);
            movimientoDto.setTipoMovimiento(null);
            movimientoDto.setImporte(null);
            movimientoDto.setEmpleado(null);

            Movimiento newMovimiento = movimientoRepository.save(movimientoDto);

            return newMovimiento;

        }catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

}
