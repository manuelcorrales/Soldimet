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

    private Long empleadoID;
    private String nombre;
    private String sucursal;
    private Long sucursalId;

    public DTOEmpleado() {}

    /**
     * @return the sucursalId
     */
    public Long getSucursalId() {
        return sucursalId;
    }

    /**
     * @param sucursalId the sucursalId to set
     */
    public void setSucursalId(Long sucursalId) {
        this.sucursalId = sucursalId;
    }

    /**
     * @return the sucursal
     */
    public String getSucursal() {
        return sucursal;
    }

    /**
     * @param sucursal the sucursal to set
     */
    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }

    public DTOEmpleado(Long empleadoID, String nombre, String sucursal, Long sucursalId) {
        this.empleadoID = empleadoID;
        this.nombre = nombre;
        this.sucursal = sucursal;
        this.sucursalId = sucursalId;
    }

    public Long getEmpleadoID() {
        return empleadoID;
    }

    public void setEmpleadoID(Long empleadoID) {
        this.empleadoID = empleadoID;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
