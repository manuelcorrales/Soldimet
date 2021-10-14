package soldimet.service.expertos;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.constant.Globales;
import soldimet.domain.Caja;
import soldimet.repository.extendedRepository.ExtendedCajaRepository;
import soldimet.service.dto.DTOMensajeAbrirCaja;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
@Service
public class ExpertoCUAbrirCaja {

    private final Logger log = LoggerFactory.getLogger(ExpertoCUAbrirCaja.class);

    @Autowired
    private ExtendedCajaRepository cajaRepository;

    @Autowired
    private Globales globales;

    private Caja cajaDia;

    public ExpertoCUAbrirCaja() {}

    public Boolean cajaEstaAbierta() {
        try {
            if (cajaDia == null) {
                //creo una fecha actual y le doy formato (puede ser yyyy/MM/dd HH:mm:ss)
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
                Date date = new Date();

                cajaDia = cajaRepository.findByFecha(LocalDate.now());

                return cajaDia != null;
            } else {
                return true;
            }
        } catch (NullPointerException e) {
            log.error(e.getMessage());
            return false;
        }
    }

    public DTOMensajeAbrirCaja verEstadoCaja() {
        DTOMensajeAbrirCaja mensaje = new DTOMensajeAbrirCaja();

        if (cajaEstaAbierta()) {
            //la caja ya esta abierta
            if (cajaDia.getHoraCierre() == null) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
                //La caja se abrio a X hora y ahora se encuentra cerrada
                //preguntar si la quiere re abrir

                String mensajeConFecha1 = globales.MENSAJE_CAJA_CERRADA_VOLVER_A_ABRIR.replaceFirst(
                    globales.SIMBOLO_REEMPLAZAR,
                    dateFormat.format(cajaDia.getHoraApertura()).toString()
                );

                String mensajeConFecha2 = mensajeConFecha1.replaceFirst(
                    globales.SIMBOLO_REEMPLAZAR,
                    dateFormat.format(cajaDia.getHoraCierre()).toString()
                );

                mensaje.setMensaje(mensajeConFecha2);
                return mensaje;
            } else {
                //la caja ya esta abierta y no se ha cerrado
                mensaje.setMensaje(globales.MENSAJE_CAJA_YA_ABIERTA);
                return mensaje;
            }
        } else {
            //la caja esta cerrada

            mensaje.setMensaje(globales.MENSAJE_CAJA_CERRADA_SIN_MOVIMIENTOS);
            return mensaje;
        }
    }

    public void respuestaMensaje(Boolean respuesta) {
        Boolean aceptar = true;

        if (respuesta.equals(aceptar)) {
            //me fijo que la caja este cerrada para abrirla de nuevo por las dudas que la quiera abrir 2 veces
            if (cajaDia == null) {
                AbrirCaja();
            }
        } else {}
    }

    private void AbrirCaja() {
        //creo una fecha actual y le doy formato (puede ser yyyy/MM/dd HH:mm:ss)
        Caja cajaDiaHoy = new Caja();

        cajaDiaHoy.setFecha(LocalDate.now());

        cajaDiaHoy.setHoraApertura(Instant.now());

        //GUARDO LA CAJA
        cajaRepository.save(cajaDiaHoy);
    }

    //me fijo si la caja del dia ya fue abierta
    public Caja getCaja() {
        return cajaDia;
    }
}
