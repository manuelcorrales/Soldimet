/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Persona;
import ModeloDeClases.Proveedor;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;

/**
 *
 * @author manu_
 */
public class ExpertoABMProveedor extends ExpertoABMPersona{



    public ExpertoABMProveedor(ControladorErroresSimple observador) {
        super(observador);
    }

    public void crearProveedor(String nombre, String calle, ArrayList<String> telefonos, String localidad, int numero){
        this.nombre = nombre;
        crearPersona(nombre, calle, telefonos, localidad, numero);
    }
    public void eliminarProveedor(Integer id){
        eliminarPersona(id);
    }
    public void modificarProveedor(Integer id, String nombre, String calle, ArrayList<String> telefonos, int numeroCalle, String localidad){
        this.nombre=nombre;
        modificarPersona(id, nombre, calle, telefonos, numeroCalle, localidad);
    }

    @Override
    protected Persona buscarPersona() {
        return (Proveedor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Proveedor as prov, Persona as per",
                            "per.nombre= '" + nombre + "' and per.estado= '" + estado.getOidEstadoPersona() + "' and per.oid=prov.oid");

    }

    @Override
    protected Persona crearNuevaPersona() {
        return new Proveedor();
    }

    @Override
    protected void terminarPersona() {
        //lleva los mismos datos que una persona normal asi que no hace nada
    }

    @Override
    protected Persona buscarPersona(Integer id) {
        return (Proveedor) IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "`Proveedor as prov ,`EstadoPersona` as est,`persona` as per",
                            "prov.idProveedor= '" + id + "' "
                            + "prov.oid=per.oid and "
                            + "per.estado= '" + String.valueOf(estado.getOidEstadoPersona()) + "'");
    }

    @Override
    protected void guardar() {
        IndireccionPersistencia.getInstance().guardar((Proveedor)persona);
    }

    public ArrayList<DTOProveedor> buscarProveedores(){


        try{
            ExpertoCUBuscarPersona experto = new ExpertoCUBuscarPersona();
            return experto.buscarTodosProveedores();



        }catch(ExceptionStringSimple e){

            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        }

    }

}
