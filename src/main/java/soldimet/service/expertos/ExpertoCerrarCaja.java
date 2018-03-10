package soldimet.service.expertos;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import org.joda.time.Days;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.constant.Globales;
import soldimet.domain.Caja;
import soldimet.repository.CajaRepository;
import soldimet.service.dto.DTOMensajeCerrarCaja;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
@Service
@Transactional
public class ExpertoCerrarCaja {

    private Caja cajaDia;
    public Boolean cajaAbierta;

    @Autowired
    private CajaRepository cajaRepository;

    @Autowired
    private Globales globales;

	public ExpertoCerrarCaja(){

	}

    public Caja getCajaDia() {
        return cajaDia;
    }

    public void setCajaDia(Caja cajaDia) {
        this.cajaDia = cajaDia;
    }



	public DTOMensajeCerrarCaja VerEstadoCaja(){

            DTOMensajeCerrarCaja mensaje = new DTOMensajeCerrarCaja();

            //busco si existe una instancia caja con la fecha del dia
            cajaDia = cajaRepository.findByFecha(LocalDate.now());
            if(cajaDia==null){

                //si no existe una instancia de caja
                //Dar aviso por pantalla que no se ha abierto aun la caja del dia
                mensaje.setMensaje(globales.MENSAJE_CAJA_AUN_CERRADA);
                cajaAbierta = false;

            }else{
                this.setCajaDia(cajaDia);

                if(cajaDia.getHoraCierre()==null){//reviso que aun no se haya cerrado la caja

                    mensaje.setMensaje(globales.MENSAJE_CAJA_CERRADA);
                    cajaAbierta = true;
                    return mensaje;
                }else{

                    //la caja ya esta cerrada
                    cajaAbierta= false;
                    mensaje.setMensaje(globales.MENSAJE_CAJA_YA_CERRADA);
                }


            }

            return null;
        }

        public void cerrarCaja(){
            //creo una nueva hora con la hora a la que cierro la caja
            this.cajaDia.setHoraCierre(Instant.now());

        }




}
