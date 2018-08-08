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
 * Criteria class for the PedidoRepuesto entity. This class is used in PedidoRepuestoResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /pedido-repuestos?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PedidoRepuestoCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private LocalDateFilter fechaCreacion;

    private LocalDateFilter fechaPedido;

    private LocalDateFilter fechaRecibo;

    private LongFilter estadoPedidoRepuestoId;

    private LongFilter detallePedidoId;

    private LongFilter presupuestoId;

    public PedidoRepuestoCriteria() {
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

    @Override
    public String toString() {
        return "PedidoRepuestoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (fechaCreacion != null ? "fechaCreacion=" + fechaCreacion + ", " : "") +
                (fechaPedido != null ? "fechaPedido=" + fechaPedido + ", " : "") +
                (fechaRecibo != null ? "fechaRecibo=" + fechaRecibo + ", " : "") +
                (estadoPedidoRepuestoId != null ? "estadoPedidoRepuestoId=" + estadoPedidoRepuestoId + ", " : "") +
                (detallePedidoId != null ? "detallePedidoId=" + detallePedidoId + ", " : "") +
                (presupuestoId != null ? "presupuestoId=" + presupuestoId + ", " : "") +
            "}";
    }

}
