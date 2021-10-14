/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

import java.util.List;

/**
 *
 * @author Manu
 */
public class DTOMovimientos {

    private Long movimientoId;
    private String fecha;
    private String estado;
    private double importe;
    private String tipoMovimiento;
    private String categoria;
    private String formaDePago;
    private String formaDePagoTip;
    private List<String> articulos;
    private String descripcion;
    private String persona;
    private Long personaId;
    private Long presupuestoId;
    private String observaciones;
    private String empleado;

    public DTOMovimientos() {}

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public String getEmpleado() {
        return empleado;
    }

    public void setEmpleado(String empleado) {
        this.empleado = empleado;
    }

    public double getImporte() {
        return importe;
    }

    public void setImporte(double importe) {
        this.importe = importe;
    }

    public String getEstado() {
        return estado;
    }

    public Long getPersonaId() {
        return personaId;
    }

    public Long getMovimientoId() {
        return movimientoId;
    }

    public void setMovimientoId(Long movimientoId) {
        this.movimientoId = movimientoId;
    }

    public void setPersonaId(Long personaId) {
        this.personaId = personaId;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getFormaDePago() {
        return formaDePago;
    }

    public void setFormaDePago(String formaDePago) {
        this.formaDePago = formaDePago;
    }

    public String getFormaDePagoTip() {
        return formaDePagoTip;
    }

    public void setFormaDePagoTip(String formaDePagoTip) {
        this.formaDePagoTip = formaDePagoTip;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPersona() {
        return persona;
    }

    public void setPersona(String persona) {
        this.persona = persona;
    }

    public Long getPresupuestoId() {
        return presupuestoId;
    }

    public void setPresupuestoId(Long presupuestoId) {
        this.presupuestoId = presupuestoId;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public List<String> getArticulos() {
        return articulos;
    }

    public void setArticulos(List<String> articulos) {
        this.articulos = articulos;
    }
}
