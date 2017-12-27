/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import Exceptions.ExceptionStringSimple;
import ModeloDeClases.EstadoMovimiento;
import ModeloDeClases.Movimiento;
import indireccion.IndireccionPersistencia;

/**
 *
 * @author Manu
 */

//EL CONTROL DE SI PUEDE O NO BORRAR UN MOVIMIENTO ANTERIOR LO MANEJO EN LA GUI
//si, es horrible pero no se me ocurrio mas nada
public class ExpertoCUEliminarMovimientoCaja {

    private final String errorEstadoMovimiento ="Este movimiento no esta dado de alta";
    private final String errorPermisoInsuficiente ="Este movimiento fue creado hace mas de 24hrs, necesita permisos para eliminar eliminar";

    public void eliminarMovimiento(int movimientoID){

        indireccion.IndireccionPersistencia.getInstance()
                .iniciarTransaccion();
        try{
            Movimiento mov =(Movimiento)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Movimiento as mov", "mov.movimientoID= "+movimientoID);
            verificarPermiso(mov);

            EstadoMovimiento estadoAlta =(EstadoMovimiento)IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoMovimiento as est", "est.nombreEstadoMovimiento= Alta");

            if(mov.getEstado().equals(estadoAlta)){
                //cambio el estado del movimiento
                EstadoMovimiento estadoBaja =(EstadoMovimiento)IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoMovimiento as est", "est.nombreEstadoMovimiento= Baja");

                mov.setEstado(estadoBaja);

            IndireccionPersistencia.getInstance().guardar(mov);
            IndireccionPersistencia.getInstance().commit();

            }else{
                throw new ExceptionStringSimple(errorEstadoMovimiento,this.getClass().getName());

            }

        }catch(ExceptionStringSimple|NullPointerException e){

            indireccion.IndireccionPersistencia.getInstance().rollback();
            IndireccionPersistencia.getInstance().rollback();
        }




    }

    //verifico que pueda eliminar el movimiento si tiene mas de 24 hrs de creacion
    private void verificarPermiso (Movimiento movimiento) throws ExceptionStringSimple{

        if(new ExpertoPermisos().verificarPermisoEliminarMovimiento()){

            //el usuario puede eliminar este movimiento
            //no hago nada

        }else{

            //no tiene suficientes permisos, anulo y aviso por pantalla

            throw new ExceptionStringSimple(errorPermisoInsuficiente,this.getClass().getName());
        }

    }
}
