/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import ModeloDeClases.Empleado;
import ModeloDeClases.EstadoPersona;
import ModeloDeClases.RolEmpleado;
import indireccion.IndireccionPersistencia;
import org.hibernate.SessionFactory;

/**
 *
 * @author Manu
 */
public class RolIdentificado {

    private static Empleado empleado;
    public static SessionFactory factoriaSesiones;

     private static class Loader {
         static RolIdentificado INSTANCE = new RolIdentificado();
     }





     public static RolIdentificado getInstance() {


         return Loader.INSTANCE;
     }


     public Boolean identificarse(String user,String pass){

         IndireccionPersistencia.getInstance().iniciarTransaccion();

         EstadoPersona estadoAlta = (EstadoPersona)IndireccionPersistencia.getInstance()
                 .Buscar("*", "EstadoPersona as est", "est.habilitado= true and est.nombreEstadoPersona= 'Alta'");

         //busco el empleado con estos datos
         Empleado employee = (Empleado)IndireccionPersistencia.getInstance()
                 .Buscar("*",
                         Empleado.class.getSimpleName()+" as emp, Persona as per",
                         "emp.usuario= '"+user+"' and emp.pass= '"+pass+"' "
                                 + "and per.estado= '"+estadoAlta.getOidEstadoPersona()+"'"
                                         + " and per.oid= emp.oid");

         if(employee!=null){
             //el usuario si existe
             empleado=employee;
             IndireccionPersistencia.getInstance().cerrarTransaccion();
             return true;
         }else{
             //el usuario no existe
             IndireccionPersistencia.getInstance().cerrarTransaccion();
             return false;
         }

     }

     public RolEmpleado getRol(){


         return empleado.getRol();
     }
}
