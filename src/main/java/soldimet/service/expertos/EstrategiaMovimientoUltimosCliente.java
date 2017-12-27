/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ModeloDeComportamiento;package soldimet.service.expertos;
import ModeloDeClases.Movimiento;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;

/**
 *
 * @author Manu
 */
public class EstrategiaMovimientoUltimosCliente extends EstrategiaMovimiento {


    @Override
    public  ArrayList<Movimiento> buscarMovimientos(){

        ArrayList<DTOMovimientos> listaDTO = new ArrayList();

        //busco todos los movimientos
        ArrayList<Movimiento> listaMovimientos = (ArrayList<Movimiento>)IndireccionPersistencia.getInstance()
                .Buscar("*", "Movimiento as mov", "mov.oid= mov.oid");


        return listaMovimientos;

    }




}
