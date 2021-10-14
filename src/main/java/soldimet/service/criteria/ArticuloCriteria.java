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
 * Criteria class for the {@link soldimet.domain.Articulo} entity. This class is used
 * in {@link soldimet.web.rest.ArticuloResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /articulos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ArticuloCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter codigoArticuloProveedor;

    private FloatFilter valor;

    private LocalDateFilter fechaCosto;

    private FloatFilter costoProveedor;

    private LocalDateFilter fechaCostoProveedor;

    private LongFilter estadoId;

    private LongFilter marcaId;

    private LongFilter tipoRepuestoId;

    public ArticuloCriteria() {}

    public ArticuloCriteria(ArticuloCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.codigoArticuloProveedor = other.codigoArticuloProveedor == null ? null : other.codigoArticuloProveedor.copy();
        this.valor = other.valor == null ? null : other.valor.copy();
        this.fechaCosto = other.fechaCosto == null ? null : other.fechaCosto.copy();
        this.costoProveedor = other.costoProveedor == null ? null : other.costoProveedor.copy();
        this.fechaCostoProveedor = other.fechaCostoProveedor == null ? null : other.fechaCostoProveedor.copy();
        this.estadoId = other.estadoId == null ? null : other.estadoId.copy();
        this.marcaId = other.marcaId == null ? null : other.marcaId.copy();
        this.tipoRepuestoId = other.tipoRepuestoId == null ? null : other.tipoRepuestoId.copy();
    }

    @Override
    public ArticuloCriteria copy() {
        return new ArticuloCriteria(this);
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

    public StringFilter getCodigoArticuloProveedor() {
        return codigoArticuloProveedor;
    }

    public StringFilter codigoArticuloProveedor() {
        if (codigoArticuloProveedor == null) {
            codigoArticuloProveedor = new StringFilter();
        }
        return codigoArticuloProveedor;
    }

    public void setCodigoArticuloProveedor(StringFilter codigoArticuloProveedor) {
        this.codigoArticuloProveedor = codigoArticuloProveedor;
    }

    public FloatFilter getValor() {
        return valor;
    }

    public FloatFilter valor() {
        if (valor == null) {
            valor = new FloatFilter();
        }
        return valor;
    }

    public void setValor(FloatFilter valor) {
        this.valor = valor;
    }

    public LocalDateFilter getFechaCosto() {
        return fechaCosto;
    }

    public LocalDateFilter fechaCosto() {
        if (fechaCosto == null) {
            fechaCosto = new LocalDateFilter();
        }
        return fechaCosto;
    }

    public void setFechaCosto(LocalDateFilter fechaCosto) {
        this.fechaCosto = fechaCosto;
    }

    public FloatFilter getCostoProveedor() {
        return costoProveedor;
    }

    public FloatFilter costoProveedor() {
        if (costoProveedor == null) {
            costoProveedor = new FloatFilter();
        }
        return costoProveedor;
    }

    public void setCostoProveedor(FloatFilter costoProveedor) {
        this.costoProveedor = costoProveedor;
    }

    public LocalDateFilter getFechaCostoProveedor() {
        return fechaCostoProveedor;
    }

    public LocalDateFilter fechaCostoProveedor() {
        if (fechaCostoProveedor == null) {
            fechaCostoProveedor = new LocalDateFilter();
        }
        return fechaCostoProveedor;
    }

    public void setFechaCostoProveedor(LocalDateFilter fechaCostoProveedor) {
        this.fechaCostoProveedor = fechaCostoProveedor;
    }

    public LongFilter getEstadoId() {
        return estadoId;
    }

    public LongFilter estadoId() {
        if (estadoId == null) {
            estadoId = new LongFilter();
        }
        return estadoId;
    }

    public void setEstadoId(LongFilter estadoId) {
        this.estadoId = estadoId;
    }

    public LongFilter getMarcaId() {
        return marcaId;
    }

    public LongFilter marcaId() {
        if (marcaId == null) {
            marcaId = new LongFilter();
        }
        return marcaId;
    }

    public void setMarcaId(LongFilter marcaId) {
        this.marcaId = marcaId;
    }

    public LongFilter getTipoRepuestoId() {
        return tipoRepuestoId;
    }

    public LongFilter tipoRepuestoId() {
        if (tipoRepuestoId == null) {
            tipoRepuestoId = new LongFilter();
        }
        return tipoRepuestoId;
    }

    public void setTipoRepuestoId(LongFilter tipoRepuestoId) {
        this.tipoRepuestoId = tipoRepuestoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ArticuloCriteria that = (ArticuloCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigoArticuloProveedor, that.codigoArticuloProveedor) &&
            Objects.equals(valor, that.valor) &&
            Objects.equals(fechaCosto, that.fechaCosto) &&
            Objects.equals(costoProveedor, that.costoProveedor) &&
            Objects.equals(fechaCostoProveedor, that.fechaCostoProveedor) &&
            Objects.equals(estadoId, that.estadoId) &&
            Objects.equals(marcaId, that.marcaId) &&
            Objects.equals(tipoRepuestoId, that.tipoRepuestoId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            codigoArticuloProveedor,
            valor,
            fechaCosto,
            costoProveedor,
            fechaCostoProveedor,
            estadoId,
            marcaId,
            tipoRepuestoId
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArticuloCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (codigoArticuloProveedor != null ? "codigoArticuloProveedor=" + codigoArticuloProveedor + ", " : "") +
            (valor != null ? "valor=" + valor + ", " : "") +
            (fechaCosto != null ? "fechaCosto=" + fechaCosto + ", " : "") +
            (costoProveedor != null ? "costoProveedor=" + costoProveedor + ", " : "") +
            (fechaCostoProveedor != null ? "fechaCostoProveedor=" + fechaCostoProveedor + ", " : "") +
            (estadoId != null ? "estadoId=" + estadoId + ", " : "") +
            (marcaId != null ? "marcaId=" + marcaId + ", " : "") +
            (tipoRepuestoId != null ? "tipoRepuestoId=" + tipoRepuestoId + ", " : "") +
            "}";
    }
}
