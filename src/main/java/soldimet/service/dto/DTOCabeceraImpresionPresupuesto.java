/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

/**
 *
 * @author Manu
 */
public class DTOCabeceraImpresionPresupuesto {

    private String numeroPresupuesto;
    private String cliente;
    private String domicilio;
    private String localidad;
    private String telefono;
    private String fecha;
    private String motor;
    private String formaDePago;
    private String observaciones;
    private String totalManoObra;
    private String totalRepuestos;
    private String totalNeto;

    public DTOCabeceraImpresionPresupuesto() {}

    public String getNumeroPresupuesto() {
        return numeroPresupuesto;
    }

    public void setNumeroPresupuesto(String numeroPresupuesto) {
        this.numeroPresupuesto = numeroPresupuesto;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getMotor() {
        return motor;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    public String getFormaDePago() {
        return formaDePago;
    }

    public void setFormaDePago(String formaDePago) {
        this.formaDePago = formaDePago;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getTotalManoObra() {
        return totalManoObra;
    }

    public void setTotalManoObra(String totalManoObra) {
        this.totalManoObra = totalManoObra;
    }

    public String getTotalRepuestos() {
        return totalRepuestos;
    }

    public void setTotalRepuestos(String totalRepuestos) {
        this.totalRepuestos = totalRepuestos;
    }

    public String getTotalNeto() {
        return totalNeto;
    }

    public void setTotalNeto(String totalNeto) {
        this.totalNeto = totalNeto;
    }
}
