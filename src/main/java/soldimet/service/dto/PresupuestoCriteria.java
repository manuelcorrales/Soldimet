package soldimet.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link soldimet.domain.Presupuesto} entity. This class is used
 * in {@link soldimet.web.rest.PresupuestoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /presupuestos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PresupuestoCriteria implements Serializable, Criteria {

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

    private LongFilter sucursalId;

    public PresupuestoCriteria(){
    }

    public PresupuestoCriteria(PresupuestoCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.descripcionDescuento = other.descripcionDescuento == null ? null : other.descripcionDescuento.copy();
        this.descuento = other.descuento == null ? null : other.descuento.copy();
        this.fechaCreacion = other.fechaCreacion == null ? null : other.fechaCreacion.copy();
        this.fechaAceptado = other.fechaAceptado == null ? null : other.fechaAceptado.copy();
        this.fechaEntregado = other.fechaEntregado == null ? null : other.fechaEntregado.copy();
        this.importeTotal = other.importeTotal == null ? null : other.importeTotal.copy();
        this.observaciones = other.observaciones == null ? null : other.observaciones.copy();
        this.clienteId = other.clienteId == null ? null : other.clienteId.copy();
        this.estadoPresupuestoId = other.estadoPresupuestoId == null ? null : other.estadoPresupuestoId.copy();
        this.detallePresupuestoId = other.detallePresupuestoId == null ? null : other.detallePresupuestoId.copy();
        this.documentTypeId = other.documentTypeId == null ? null : other.documentTypeId.copy();
        this.sucursalId = other.sucursalId == null ? null : other.sucursalId.copy();
    }

    @Override
    public PresupuestoCriteria copy() {
        return new PresupuestoCriteria(this);
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

    public LongFilter getSucursalId() {
        return sucursalId;
    }

    public void setSucursalId(LongFilter sucursalId) {
        this.sucursalId = sucursalId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PresupuestoCriteria that = (PresupuestoCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(descripcionDescuento, that.descripcionDescuento) &&
            Objects.equals(descuento, that.descuento) &&
            Objects.equals(fechaCreacion, that.fechaCreacion) &&
            Objects.equals(fechaAceptado, that.fechaAceptado) &&
            Objects.equals(fechaEntregado, that.fechaEntregado) &&
            Objects.equals(importeTotal, that.importeTotal) &&
            Objects.equals(observaciones, that.observaciones) &&
            Objects.equals(clienteId, that.clienteId) &&
            Objects.equals(estadoPresupuestoId, that.estadoPresupuestoId) &&
            Objects.equals(detallePresupuestoId, that.detallePresupuestoId) &&
            Objects.equals(documentTypeId, that.documentTypeId) &&
            Objects.equals(sucursalId, that.sucursalId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        descripcionDescuento,
        descuento,
        fechaCreacion,
        fechaAceptado,
        fechaEntregado,
        importeTotal,
        observaciones,
        clienteId,
        estadoPresupuestoId,
        detallePresupuestoId,
        documentTypeId,
        sucursalId
        );
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
                (sucursalId != null ? "sucursalId=" + sucursalId + ", " : "") +
            "}";
    }

}
