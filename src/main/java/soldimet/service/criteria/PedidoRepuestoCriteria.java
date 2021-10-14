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
 * Criteria class for the {@link soldimet.domain.PedidoRepuesto} entity. This class is used
 * in {@link soldimet.web.rest.PedidoRepuestoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /pedido-repuestos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PedidoRepuestoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LocalDateFilter fechaCreacion;

    private LocalDateFilter fechaPedido;

    private LocalDateFilter fechaRecibo;

    private LongFilter estadoPedidoRepuestoId;

    private LongFilter presupuestoId;

    private LongFilter documentTypeId;

    public PedidoRepuestoCriteria() {}

    public PedidoRepuestoCriteria(PedidoRepuestoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fechaCreacion = other.fechaCreacion == null ? null : other.fechaCreacion.copy();
        this.fechaPedido = other.fechaPedido == null ? null : other.fechaPedido.copy();
        this.fechaRecibo = other.fechaRecibo == null ? null : other.fechaRecibo.copy();
        this.estadoPedidoRepuestoId = other.estadoPedidoRepuestoId == null ? null : other.estadoPedidoRepuestoId.copy();
        this.presupuestoId = other.presupuestoId == null ? null : other.presupuestoId.copy();
        this.documentTypeId = other.documentTypeId == null ? null : other.documentTypeId.copy();
    }

    @Override
    public PedidoRepuestoCriteria copy() {
        return new PedidoRepuestoCriteria(this);
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

    public LocalDateFilter getFechaPedido() {
        return fechaPedido;
    }

    public LocalDateFilter fechaPedido() {
        if (fechaPedido == null) {
            fechaPedido = new LocalDateFilter();
        }
        return fechaPedido;
    }

    public void setFechaPedido(LocalDateFilter fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public LocalDateFilter getFechaRecibo() {
        return fechaRecibo;
    }

    public LocalDateFilter fechaRecibo() {
        if (fechaRecibo == null) {
            fechaRecibo = new LocalDateFilter();
        }
        return fechaRecibo;
    }

    public void setFechaRecibo(LocalDateFilter fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
    }

    public LongFilter getEstadoPedidoRepuestoId() {
        return estadoPedidoRepuestoId;
    }

    public LongFilter estadoPedidoRepuestoId() {
        if (estadoPedidoRepuestoId == null) {
            estadoPedidoRepuestoId = new LongFilter();
        }
        return estadoPedidoRepuestoId;
    }

    public void setEstadoPedidoRepuestoId(LongFilter estadoPedidoRepuestoId) {
        this.estadoPedidoRepuestoId = estadoPedidoRepuestoId;
    }

    public LongFilter getPresupuestoId() {
        return presupuestoId;
    }

    public LongFilter presupuestoId() {
        if (presupuestoId == null) {
            presupuestoId = new LongFilter();
        }
        return presupuestoId;
    }

    public void setPresupuestoId(LongFilter presupuestoId) {
        this.presupuestoId = presupuestoId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PedidoRepuestoCriteria that = (PedidoRepuestoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(fechaCreacion, that.fechaCreacion) &&
            Objects.equals(fechaPedido, that.fechaPedido) &&
            Objects.equals(fechaRecibo, that.fechaRecibo) &&
            Objects.equals(estadoPedidoRepuestoId, that.estadoPedidoRepuestoId) &&
            Objects.equals(presupuestoId, that.presupuestoId) &&
            Objects.equals(documentTypeId, that.documentTypeId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fechaCreacion, fechaPedido, fechaRecibo, estadoPedidoRepuestoId, presupuestoId, documentTypeId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PedidoRepuestoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (fechaCreacion != null ? "fechaCreacion=" + fechaCreacion + ", " : "") +
            (fechaPedido != null ? "fechaPedido=" + fechaPedido + ", " : "") +
            (fechaRecibo != null ? "fechaRecibo=" + fechaRecibo + ", " : "") +
            (estadoPedidoRepuestoId != null ? "estadoPedidoRepuestoId=" + estadoPedidoRepuestoId + ", " : "") +
            (presupuestoId != null ? "presupuestoId=" + presupuestoId + ", " : "") +
            (documentTypeId != null ? "documentTypeId=" + documentTypeId + ", " : "") +
            "}";
    }
}
