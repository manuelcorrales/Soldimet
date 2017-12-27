package soldimet.service.expertos;
import ModeloDeClases.Caja;

import indireccion.IndireccionPersistencia;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
public class ExpertoCerrarCaja {

    private Caja cajaDia;
    public Boolean cajaAbierta;

	public ExpertoCerrarCaja(){

	}

	public void finalize() throws Throwable {

	}

    public Caja getCajaDia() {
        return cajaDia;
    }

    public void setCajaDia(Caja cajaDia) {
        this.cajaDia = cajaDia;
    }



	public DTOMensajeCerrarCaja VerEstadoCaja(){
            IndireccionPersistencia.getInstance().iniciarTransaccion();
            DTOMensajeCerrarCaja mensaje = new DTOMensajeCerrarCaja();
            //creo una instancia fecha del dia de hoy con formato yyyy/MM/dd
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
            Date date = new Date();

            //busco si existe una instancia caja con la fecha del dia
            cajaDia = (Caja)IndireccionPersistencia.getInstance()
                    .Buscar("*","Caja as caj", "caj.fecha="+dateFormat.format(date));
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            if(cajaDia==null){

                //si no existe una instancia de caja
                //Dar aviso por pantalla que no se ha abierto aun la caja del dia
                mensaje.setMensaje("La caja hoy no se ha abierto.");
                cajaAbierta = false;

            }else{
                this.setCajaDia(cajaDia);

                if(cajaDia.getHoraCierre()==null){//reviso que aun no se haya cerrado la caja

                    //FALTA QUE SE CONECTE A INTERNET Y HAGA EL BACKUP DEL DIA
                    respaldar();

                    mensaje.setMensaje("Caja cerrada");
                    cajaAbierta = true;
                    return mensaje;
                }else{

                    //la caja ya esta cerrada
                    cajaAbierta= false;
                    mensaje.setMensaje("La caja ya esta cerrada");
                }


            }

            return null;
        }

        public void cerrarCaja(){

            //creo una nueva hora con la hora a la que cierro la caja
            Date horaCierre = new Date();

            this.cajaDia.setHoraCierre(horaCierre);

            IndireccionPersistencia.getInstance().iniciarTransaccion();
            IndireccionPersistencia.getInstance().guardar(this.cajaDia);


        }

    private void respaldar() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }




}
