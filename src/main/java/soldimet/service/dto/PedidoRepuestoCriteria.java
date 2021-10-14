package soldimet.service.dto;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LocalDateFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import java.io.Serializable;
import java.util.Objects;

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

    private LongFilter detallePedidoId;

    private LongFilter presupuestoId;

    private LongFilter documentTypeId;

    public PedidoRepuestoCriteria() {}

    public PedidoRepuestoCriteria(PedidoRepuestoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fechaCreacion = other.fechaCreacion == null ? null : other.fechaCreacion.copy();
        this.fechaPedido = other.fechaPedido == null ? null : other.fechaPedido.copy();
        this.fechaRecibo = other.fechaRecibo == null ? null : other.fechaRecibo.copy();
        this.estadoPedidoRepuestoId = other.estadoPedidoRepuestoId == null ? null : other.estadoPedidoRepuestoId.copy();
        this.detallePedidoId = other.detallePedidoId == null ? null : other.detallePedidoId.copy();
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

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateFilter fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateFilter getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDateFilter fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public LocalDateFilter getFechaRecibo() {
        return fechaRecibo;
    }

    public void setFechaRecibo(LocalDateFilter fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
    }

    public LongFilter getEstadoPedidoRepuestoId() {
        return estadoPedidoRepuestoId;
    }

    public void setEstadoPedidoRepuestoId(LongFilter estadoPedidoRepuestoId) {
        this.estadoPedidoRepuestoId = estadoPedidoRepuestoId;
    }

    public LongFilter getDetallePedidoId() {
        return detallePedidoId;
    }

    public void setDetallePedidoId(LongFilter detallePedidoId) {
        this.detallePedidoId = detallePedidoId;
    }

    public LongFilter getPresupuestoId() {
        return presupuestoId;
    }

    public void setPresupuestoId(LongFilter presupuestoId) {
        this.presupuestoId = presupuestoId;
    }

    public LongFilter getDocumentTypeId() {
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
            Objects.equals(detallePedidoId, that.detallePedidoId) &&
            Objects.equals(presupuestoId, that.presupuestoId) &&
            Objects.equals(documentTypeId, that.documentTypeId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            fechaCreacion,
            fechaPedido,
            fechaRecibo,
            estadoPedidoRepuestoId,
            detallePedidoId,
            presupuestoId,
            documentTypeId
        );
    }

    @Override
    public String toString() {
        return (
            "PedidoRepuestoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (fechaCreacion != null ? "fechaCreacion=" + fechaCreacion + ", " : "") +
            (fechaPedido != null ? "fechaPedido=" + fechaPedido + ", " : "") +
            (fechaRecibo != null ? "fechaRecibo=" + fechaRecibo + ", " : "") +
            (estadoPedidoRepuestoId != null ? "estadoPedidoRepuestoId=" + estadoPedidoRepuestoId + ", " : "") +
            (detallePedidoId != null ? "detallePedidoId=" + detallePedidoId + ", " : "") +
            (presupuestoId != null ? "presupuestoId=" + presupuestoId + ", " : "") +
            (documentTypeId != null ? "documentTypeId=" + documentTypeId + ", " : "") +
            "}"
        );
    }
}
