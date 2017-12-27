/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Empleado;
import ModeloDeClases.Persona;
import ModeloDeClases.RolEmpleado;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;

/**
 *
 * @author manu_
 */
public class ExpertoABMEmpleado extends ExpertoABMPersona {

    private final String mensajeErrorRol = "No se encontró el rol en la base de datos.\n Operación anulada.";

    private String usuario;
    private String contraseña;
    private String rol;

    public ExpertoABMEmpleado(ControladorErroresSimple observador) {
        super(observador);
    }

    public void crearEmpleado(String nombre, String calle, ArrayList<String> telefonos, String localidad, int numero, String usuario, String contraseña, String rol) {
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        crearPersona(nombre, calle, telefonos, localidad, numero);
    }

    public void modificarEmpleado(Integer id, String nombre, String calle, ArrayList<String> telefonos, int numeroCalle, String localidad, String usuario, String contraseña, String rol) {
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.rol = rol;
        modificarPersona(id, nombre, calle, telefonos, 0, localidad);
    }

    public void eliminarEmpleado(Integer id) {
            eliminarPersona(id);

    }

    @Override
    protected Persona buscarPersona() {
        return (Empleado) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Empleado as emp, Persona as per",
                            "per.nombre= '" + nombre + "' and per.estado= '" + estado.getOidEstadoPersona() + "' and per.oid=emp.oid");

    }

    @Override
    protected Persona crearNuevaPersona() {
        return new Empleado();
    }

    @Override
    protected void terminarPersona() throws ExceptionStringSimple{

        Empleado emp = (Empleado)persona;
        //busco el rol correspondiente

        RolEmpleado rolEmpleado = (RolEmpleado)IndireccionPersistencia.getInstance()
                .Buscar("*", "RolEmpleado as rol", "rol.habilitado = 'true' and rol.nombreRol= '"+rol+"'");
        if(rolEmpleado==null){
            throw new ExceptionStringSimple(mensajeErrorRol, this.toString());
        }else{
            emp.setRol(rolEmpleado);
        }

        //asigno usuario y contraseña
        emp.setUsuario(usuario);
        emp.setPass(contraseña);



    }

    @Override
    protected Persona buscarPersona(Integer id) {
        return (Empleado) IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "`Empleado as emp,`EstadoPersona` as est,`persona` as per",
                            "emp.empleadoID= '" + id + "' "
                            + "emp.oid=per.oid and "
                            + "per.estado= '" + String.valueOf(estado.getOidEstadoPersona()) + "'");
    }

    @Override
    protected void guardar() {
        IndireccionPersistencia.getInstance().guardar((Empleado)persona);
    }


}
