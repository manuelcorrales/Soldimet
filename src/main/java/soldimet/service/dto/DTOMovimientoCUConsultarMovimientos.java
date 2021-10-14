package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:38 p.m.
 */
public class DTOMovimientoCUConsultarMovimientos {

    private Long movimientoId;
    private String descripcion;
    private String categoria;
    private Float monto;
    private String tipoMovimiento;
    private String formaDePago;
    private String estado;
    private String formaDePagoTip;
    private String presupuestoID;

    public DTOMovimientoCUConsultarMovimientos() {}

    /**
     * @return the formaDePagoTip
     */
    public String getFormaDePagoTip() {
        return formaDePagoTip;
    }

    /**
     * @param formaDePagoTip the formaDePagoTip to set
     */
    public void setFormaDePagoTip(String formaDePagoTip) {
        this.formaDePagoTip = formaDePagoTip;
    }

    /**
     * @return the estado
     */
    public String getEstado() {
        return estado;
    }

    /**
     * @param estado the estado to set
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * @return the categoria
     */
    public String getCategoria() {
        return categoria;
    }

    /**
     * @return the descripcion
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * @return the formaDePago
     */
    public String getFormaDePago() {
        return formaDePago;
    }

    /**
     * @return the monto
     */
    public Float getMonto() {
        return monto;
    }

    /**
     * @return the movimientoId
     */
    public Long getMovimientoId() {
        return movimientoId;
    }

    /**
     * @return the tipoMovimiento
     */
    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    /**
     * @param categoria the categoria to set
     */
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    /**
     * @param descripcion the descripcion to set
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * @param formaDePago the formaDePago to set
     */
    public void setFormaDePago(String formaDePago) {
        this.formaDePago = formaDePago;
    }

    /**
     * @param monto the monto to set
     */
    public void setMonto(Float monto) {
        this.monto = monto;
    }

    /**
     * @param movimientoId the movimientoId to set
     */
    public void setMovimientoId(Long movimientoId) {
        this.movimientoId = movimientoId;
    }

    /**
     * @param tipoMovimiento the tipoMovimiento to set
     */
    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public void setPresupuestoID(String presupuestoID) {
        this.presupuestoID = presupuestoID;
    }

    public String getPresupuestoID() {
        return presupuestoID;
    }
}
