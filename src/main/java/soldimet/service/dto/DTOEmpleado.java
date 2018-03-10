/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

/**
 *
 * @author manu_
 */
public class DTOEmpleado {


    private int empleadoID;
    private String nombre;
    private String apellido;

    public DTOEmpleado() {
    }

    public DTOEmpleado(int empleadoID, String nombre, String apellido) {
        this.empleadoID = empleadoID;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public int getEmpleadoID() {
        return empleadoID;
    }

    public void setEmpleadoID(int empleadoID) {
        this.empleadoID = empleadoID;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }



}
