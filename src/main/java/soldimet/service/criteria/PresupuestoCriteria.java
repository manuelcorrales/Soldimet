package soldimet.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

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

    private BooleanFilter soldadura;

    private BooleanFilter modelo;

    private LongFilter clienteId;

    private LongFilter estadoPresupuestoId;

    private LongFilter documentTypeId;

    private LongFilter sucursalId;

    public PresupuestoCriteria() {}

    public PresupuestoCriteria(PresupuestoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descripcionDescuento = other.descripcionDescuento == null ? null : other.descripcionDescuento.copy();
        this.descuento = other.descuento == null ? null : other.descuento.copy();
        this.fechaCreacion = other.fechaCreacion == null ? null : other.fechaCreacion.copy();
        this.fechaAceptado = other.fechaAceptado == null ? null : other.fechaAceptado.copy();
        this.fechaEntregado = other.fechaEntregado == null ? null : other.fechaEntregado.copy();
        this.importeTotal = other.importeTotal == null ? null : other.importeTotal.copy();
        this.observaciones = other.observaciones == null ? null : other.observaciones.copy();
        this.soldadura = other.soldadura == null ? null : other.soldadura.copy();
        this.modelo = other.modelo == null ? null : other.modelo.copy();
        this.clienteId = other.clienteId == null ? null : other.clienteId.copy();
        this.estadoPresupuestoId = other.estadoPresupuestoId == null ? null : other.estadoPresupuestoId.copy();
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

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getDescripcionDescuento() {
        return descripcionDescuento;
    }

    public StringFilter descripcionDescuento() {
        if (descripcionDescuento == null) {
            descripcionDescuento = new StringFilter();
        }
        return descripcionDescuento;
    }

    public void setDescripcionDescuento(StringFilter descripcionDescuento) {
        this.descripcionDescuento = descripcionDescuento;
    }

    public FloatFilter getDescuento() {
        return descuento;
    }

    public FloatFilter descuento() {
        if (descuento == null) {
            descuento = new FloatFilter();
        }
        return descuento;
    }

    public void setDescuento(FloatFilter descuento) {
        this.descuento = descuento;
    }

    public LocalDateFilter getFechaCreacion() {
        return fechaCreacion;
    }

    public LocalDateFilter fechaCreacion() {
        if (fechaCreacion == null) {
            fechaCreacion = new LocalDateFilter();
        }
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateFilter fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateFilter getFechaAceptado() {
        return fechaAceptado;
    }

    public LocalDateFilter fechaAceptado() {
        if (fechaAceptado == null) {
            fechaAceptado = new LocalDateFilter();
        }
        return fechaAceptado;
    }

    public void setFechaAceptado(LocalDateFilter fechaAceptado) {
        this.fechaAceptado = fechaAceptado;
    }

    public LocalDateFilter getFechaEntregado() {
        return fechaEntregado;
    }

    public LocalDateFilter fechaEntregado() {
        if (fechaEntregado == null) {
            fechaEntregado = new LocalDateFilter();
        }
        return fechaEntregado;
    }

    public void setFechaEntregado(LocalDateFilter fechaEntregado) {
        this.fechaEntregado = fechaEntregado;
    }

    public FloatFilter getImporteTotal() {
        return importeTotal;
    }

    public FloatFilter importeTotal() {
        if (importeTotal == null) {
            importeTotal = new FloatFilter();
        }
        return importeTotal;
    }

    public void setImporteTotal(FloatFilter importeTotal) {
        this.importeTotal = importeTotal;
    }

    public StringFilter getObservaciones() {
        return observaciones;
    }

    public StringFilter observaciones() {
        if (observaciones == null) {
            observaciones = new StringFilter();
        }
        return observaciones;
    }

    public void setObservaciones(StringFilter observaciones) {
        this.observaciones = observaciones;
    }

    public BooleanFilter getSoldadura() {
        return soldadura;
    }

    public BooleanFilter soldadura() {
        if (soldadura == null) {
            soldadura = new BooleanFilter();
        }
        return soldadura;
    }

    public void setSoldadura(BooleanFilter soldadura) {
        this.soldadura = soldadura;
    }

    public BooleanFilter getModelo() {
        return modelo;
    }

    public BooleanFilter modelo() {
        if (modelo == null) {
            modelo = new BooleanFilter();
        }
        return modelo;
    }

    public void setModelo(BooleanFilter modelo) {
        this.modelo = modelo;
    }

    public LongFilter getClienteId() {
        return clienteId;
    }

    public LongFilter clienteId() {
        if (clienteId == null) {
            clienteId = new LongFilter();
        }
        return clienteId;
    }

    public void setClienteId(LongFilter clienteId) {
        this.clienteId = clienteId;
    }

    public LongFilter getEstadoPresupuestoId() {
        return estadoPresupuestoId;
    }

    public LongFilter estadoPresupuestoId() {
        if (estadoPresupuestoId == null) {
            estadoPresupuestoId = new LongFilter();
        }
        return estadoPresupuestoId;
    }

    public void setEstadoPresupuestoId(LongFilter estadoPresupuestoId) {
        this.estadoPresupuestoId = estadoPresupuestoId;
    }

    public LongFilter getDocumentTypeId() {
        return documentTypeId;
    }

    public LongFilter documentTypeId() {
        if (documentTypeId == null) {
            documentTypeId = new LongFilter();
        }
        return documentTypeId;
    }

    public void setDocumentTypeId(LongFilter documentTypeId) {
        this.documentTypeId = documentTypeId;
    }

    public LongFilter getSucursalId() {
        return sucursalId;
    }

    public LongFilter sucursalId() {
        if (sucursalId == null) {
            sucursalId = new LongFilter();
        }
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
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descripcionDescuento, that.descripcionDescuento) &&
            Objects.equals(descuento, that.descuento) &&
            Objects.equals(fechaCreacion, that.fechaCreacion) &&
            Objects.equals(fechaAceptado, that.fechaAceptado) &&
            Objects.equals(fechaEntregado, that.fechaEntregado) &&
            Objects.equals(importeTotal, that.importeTotal) &&
            Objects.equals(observaciones, that.observaciones) &&
            Objects.equals(soldadura, that.soldadura) &&
            Objects.equals(modelo, that.modelo) &&
            Objects.equals(clienteId, that.clienteId) &&
            Objects.equals(estadoPresupuestoId, that.estadoPresupuestoId) &&
            Objects.equals(documentTypeId, that.documentTypeId) &&
            Objects.equals(sucursalId, that.sucursalId)
        );
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
            soldadura,
            modelo,
            clienteId,
            estadoPresupuestoId,
            documentTypeId,
            sucursalId
        );
    }

    // prettier-ignore
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
            (soldadura != null ? "soldadura=" + soldadura + ", " : "") +
            (modelo != null ? "modelo=" + modelo + ", " : "") +
            (clienteId != null ? "clienteId=" + clienteId + ", " : "") +
            (estadoPresupuestoId != null ? "estadoPresupuestoId=" + estadoPresupuestoId + ", " : "") +
            (documentTypeId != null ? "documentTypeId=" + documentTypeId + ", " : "") +
            (sucursalId != null ? "sucursalId=" + sucursalId + ", " : "") +
            "}";
    }
}
