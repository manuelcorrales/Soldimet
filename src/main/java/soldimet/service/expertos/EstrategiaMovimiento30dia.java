/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;
import ModeloDeClases.Caja;
import ModeloDeClases.Cobranza;
import ModeloDeClases.CobranzaPresupuesto;
import ModeloDeClases.CobranzaGenerico;
import ModeloDeClases.Movimiento;
import ModeloDeClases.Pago;
import indireccion.IndireccionPersistencia;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Calendar;
import java.util.List;
/**
 *
 * @author Manu
 */
public class EstrategiaMovimiento30dia extends EstrategiaMovimiento{

    private final int meses = -1; //busco lo que esta 31 dias antes (ultimo mes)

    public  ArrayList<Caja> buscarMovimientos(){

         ArrayList<DTOMovimientos> listaDTO =  new ArrayList();

        Date fecha = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(fecha); // Configuramos la fecha del dia
        calendar.add(Calendar.MONTH, meses);  // numero de días a añadir, o restar en caso de días<0 (resto 30)


        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");

        //formateo la fecha despues que restarle los 30 dias y  busco--dateFormat.format(calendar.getTime())
        ArrayList<Caja> listaCaja = (ArrayList<Caja>)IndireccionPersistencia.getInstance()
                .Buscar("*","caja", "fecha>="+dateFormat.format(calendar.getTime()));



    return listaCaja;
}
}
