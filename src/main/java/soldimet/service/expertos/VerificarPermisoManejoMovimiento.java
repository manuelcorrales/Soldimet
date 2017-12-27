/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;

/**
 *
 * @author Manu
 */
public class VerificarPermisoManejoMovimiento extends ObservableSimple{
    private  String mesPosibleDeBusqueda;


    private final String errorPermisoInsuficiente ="Este movimiento fue creado hace mas de 24hrs, necesita permisos para eliminar";



    public VerificarPermisoManejoMovimiento(ControladorErroresSimple observador) {
        super(observador);
    }

    protected void verificarPermisoEliminarMovimiento()throws ExceptionStringSimple{

        if(new ExpertoPermisos().verificarPermisoEliminarMovimiento()){

            //el usuario puede eliminar este movimiento
            //no hago nada

        }else{

            //no tiene suficientes permisos, anulo y aviso por pantalla

            throw new ExceptionStringSimple(errorPermisoInsuficiente,this.getClass().getName());
        }
}






}
