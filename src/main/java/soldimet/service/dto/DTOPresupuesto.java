/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;
import java.time.LocalDate;
import java.util.Date;
import java.util.ArrayList;

/**
 *
 * @author Manu
 */
public class DTOPresupuesto {

    private String cliente;
    private String estado;
    private Long codigo;
    private LocalDate fecha;
    private String motor;
    private double importe;
    private String sucursal;
    private Boolean isSoldadura;
    private double totalRepuestos;
    private double totalOperaciones;

    public DTOPresupuesto() {
    }

    @Override
    public String toString() {
        return "Presup: " + this.codigo;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getMotor() {
        return motor;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    public double getImporte() {
        return importe;
    }

    public void setImporte(double importe) {
        this.importe = importe;
    }

    public String getSucursal() {
        return sucursal;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }

    /**
     * @return the isSoldadura
     */
    public Boolean getIsSoldadura() {
        return isSoldadura;
    }

    /**
     * @param isSoldadura the isSoldadura to set
     */
    public void setIsSoldadura(Boolean isSoldadura) {
        this.isSoldadura = isSoldadura;
    }

    public void setTotalRepuestos(double totalRepuestos) {
        this.totalRepuestos = totalRepuestos;
    }

    public double getTotalRepuestos() {
        return totalRepuestos;
    }

    public void setTotalOperaciones(double totalOperaciones) {
        this.totalOperaciones = totalOperaciones;
    }

    public double getTotalOperaciones() {
        return totalOperaciones;
    }
}
