package soldimet.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;


import io.github.jhipster.service.filter.LocalDateFilter;



/**
 * Criteria class for the Presupuesto entity. This class is used in PresupuestoResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /presupuestos?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PresupuestoCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter descripcionDescuento;

    private FloatFilter descuento;

    private LocalDateFilter fechaCreacion;

    private LocalDateFilter fechaAceptado;

    private LocalDateFilter fechaEntregado;

    private FloatFilter importeTotal;

    private StringFilter observaciones;

    private LongFilter clienteId;

    private LongFilter estadoPresupuestoId;

    private LongFilter detallePresupuestoId;

    private LongFilter documentTypeId;

    public PresupuestoCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getDescripcionDescuento() {
        return descripcionDescuento;
    }

    public void setDescripcionDescuento(StringFilter descripcionDescuento) {
        this.descripcionDescuento = descripcionDescuento;
    }

    public FloatFilter getDescuento() {
        return descuento;
    }

    public void setDescuento(FloatFilter descuento) {
        this.descuento = descuento;
    }

    public LocalDateFilter getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateFilter fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateFilter getFechaAceptado() {
        return fechaAceptado;
    }

    public void setFechaAceptado(LocalDateFilter fechaAceptado) {
        this.fechaAceptado = fechaAceptado;
    }

    public LocalDateFilter getFechaEntregado() {
        return fechaEntregado;
    }

    public void setFechaEntregado(LocalDateFilter fechaEntregado) {
        this.fechaEntregado = fechaEntregado;
    }

    public FloatFilter getImporteTotal() {
        return importeTotal;
    }

    public void setImporteTotal(FloatFilter importeTotal) {
        this.importeTotal = importeTotal;
    }

    public StringFilter getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(StringFilter observaciones) {
        this.observaciones = observaciones;
    }

    public LongFilter getClienteId() {
        return clienteId;
    }

    public void setClienteId(LongFilter clienteId) {
        this.clienteId = clienteId;
    }

    public LongFilter getEstadoPresupuestoId() {
        return estadoPresupuestoId;
    }

    public void setEstadoPresupuestoId(LongFilter estadoPresupuestoId) {
        this.estadoPresupuestoId = estadoPresupuestoId;
    }

    public LongFilter getDetallePresupuestoId() {
        return detallePresupuestoId;
    }

    public void setDetallePresupuestoId(LongFilter detallePresupuestoId) {
        this.detallePresupuestoId = detallePresupuestoId;
    }

    public LongFilter getDocumentTypeId() {
        return documentTypeId;
    }

    public void setDocumentTypeId(LongFilter documentTypeId) {
        this.documentTypeId = documentTypeId;
    }

    @Override
    public String toString() {
        return "PresupuestoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (descripcionDescuento != null ? "descripcionDescuento=" + descripcionDescuento + ", " : "") +
                (descuento != null ? "descuento=" + descuento + ", " : "") +
                (fechaCreacion != null ? "fechaCreacion=" + fechaCreacion + ", " : "") +
                (fechaAceptado != null ? "fechaAceptado=" + fechaAceptado + ", " : "") +
                (fechaEntregado != null ? "fechaEntregado=" + fechaEntregado + ", " : "") +
                (importeTotal != null ? "importeTotal=" + importeTotal + ", " : "") +
                (observaciones != null ? "observaciones=" + observaciones + ", " : "") +
                (clienteId != null ? "clienteId=" + clienteId + ", " : "") +
                (estadoPresupuestoId != null ? "estadoPresupuestoId=" + estadoPresupuestoId + ", " : "") +
                (detallePresupuestoId != null ? "detallePresupuestoId=" + detallePresupuestoId + ", " : "") +
                (documentTypeId != null ? "documentTypeId=" + documentTypeId + ", " : "") +
            "}";
    }

}
