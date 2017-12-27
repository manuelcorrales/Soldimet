/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ModeloDeClases.EstadoMovimiento;
import ModeloDeClases.Movimiento;
import indireccion.IndireccionPersistencia;

/**
 *
 * @author Manu
 */
public class ExpertoCUCancelarMovimiento {


    public void eliminarMovimiento(String movimiento){


        EstadoMovimiento estadoBaja = (EstadoMovimiento)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoMovimiento", "nombreEstadoMovimiento= Baja");

        EstadoMovimiento estadoAlta = (EstadoMovimiento)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoMovimiento", "nombreEstadoMovimiento= Alta");

        Movimiento mov = (Movimiento)IndireccionPersistencia.getInstance()
                .Buscar("*","Movimiento", "movimientoID= "+movimiento+" and estado= "+estadoAlta);

        mov.setEstado(estadoBaja);

        //GUARDAR MOVIMIENDO CAMBIADO
        IndireccionPersistencia.getInstance().update(mov);

    }

}
