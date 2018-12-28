package soldimet.service.expertos;

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
import soldimet.domain.Caja;
import soldimet.domain.Movimiento;
import soldimet.repository.CajaRepository;
import soldimet.repository.MovimientoRepository;
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

    @Autowired
    private CajaRepository cajaRepository;

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private Globales globales;

    @Autowired
    private CajaConverter cajaConverter;

	public ExpertoCaja(){

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
        for (Caja caja: listaCajaMes) {
            montoTotalMes += caja.getSaldo();
        }
        return montoTotalMes;
    }


}
