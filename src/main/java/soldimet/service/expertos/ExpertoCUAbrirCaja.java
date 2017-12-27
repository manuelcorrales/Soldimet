package soldimet.service.expertos;

import ModeloDeClases.Caja;
import indireccion.IndireccionPersistencia;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
public class ExpertoCUAbrirCaja {

    private Caja cajaDia;

    public ExpertoCUAbrirCaja() {

    }

    public Boolean cajaEstaAbierta() {
        try {
            if (cajaDia == null) {
                IndireccionPersistencia.getInstance().iniciarTransaccion();

                //creo una fecha actual y le doy formato (puede ser yyyy/MM/dd HH:mm:ss)
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
                Date date = new Date();

                cajaDia = (Caja) IndireccionPersistencia.getInstance().Buscar("*", "Caja as caj", "caj.fecha= " + dateFormat.format(date));
                IndireccionPersistencia.getInstance().cerrarTransaccion();

                return cajaDia!=null;

            } else {
                return true;
            }
        } catch (NullPointerException e) {
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

                mensaje.setMensaje("La caja se abrio el día de hoy a las " + dateFormat.format(cajaDia.getHoraApertura())
                        + " y se cerro a las " + dateFormat.format(cajaDia.getHoraCierre()) + ". Desea volverla a abrir?");
                return mensaje;

            } else {

                //la caja ya esta abierta y no se ha cerrado
                mensaje.setMensaje("La caja ya se encuentra abierta.");
                return mensaje;

            }

        } else {
            //la caja esta cerrada

            mensaje.setMensaje("La caja se encuentra cerrada. No puede realizar movimientos");
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
        } else {

        }

    }

    private void AbrirCaja() {

        //creo una fecha actual y le doy formato (puede ser yyyy/MM/dd HH:mm:ss)
        Caja cajaDiaHoy = new Caja();

        cajaDiaHoy.setFecha(new Date());

        cajaDiaHoy.setHoraApertura(new Date());

        //GUARDO LA CAJA
        IndireccionPersistencia.getInstance().guardar(cajaDiaHoy);

    }

    //me fijo si la caja del dia ya fue abierta
    public Caja getCaja() {
        return cajaDia;
    }

}
