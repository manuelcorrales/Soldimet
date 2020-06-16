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

    private LongFilter estadoId;

    private LongFilter marcaId;

    private LongFilter tipoRepuestoId;

    public ArticuloCriteria(){
    }

    public ArticuloCriteria(ArticuloCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.codigoArticuloProveedor = other.codigoArticuloProveedor == null ? null : other.codigoArticuloProveedor.copy();
        this.valor = other.valor == null ? null : other.valor.copy();
        this.fechaCosto = other.fechaCosto == null ? null : other.fechaCosto.copy();
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

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getCodigoArticuloProveedor() {
        return codigoArticuloProveedor;
    }

    public void setCodigoArticuloProveedor(StringFilter codigoArticuloProveedor) {
        this.codigoArticuloProveedor = codigoArticuloProveedor;
    }

    public FloatFilter getValor() {
        return valor;
    }

    public void setValor(FloatFilter valor) {
        this.valor = valor;
    }

    public LocalDateFilter getFechaCosto() {
        return fechaCosto;
    }

    public void setFechaCosto(LocalDateFilter fechaCosto) {
        this.fechaCosto = fechaCosto;
    }

    public LongFilter getEstadoId() {
        return estadoId;
    }

    public void setEstadoId(LongFilter estadoId) {
        this.estadoId = estadoId;
    }

    public LongFilter getMarcaId() {
        return marcaId;
    }

    public void setMarcaId(LongFilter marcaId) {
        this.marcaId = marcaId;
    }

    public LongFilter getTipoRepuestoId() {
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
        return
            Objects.equals(id, that.id) &&
            Objects.equals(codigoArticuloProveedor, that.codigoArticuloProveedor) &&
            Objects.equals(valor, that.valor) &&
            Objects.equals(fechaCosto, that.fechaCosto) &&
            Objects.equals(estadoId, that.estadoId) &&
            Objects.equals(marcaId, that.marcaId) &&
            Objects.equals(tipoRepuestoId, that.tipoRepuestoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        codigoArticuloProveedor,
        valor,
        fechaCosto,
        estadoId,
        marcaId,
        tipoRepuestoId
        );
    }

    @Override
    public String toString() {
        return "ArticuloCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (codigoArticuloProveedor != null ? "codigoArticuloProveedor=" + codigoArticuloProveedor + ", " : "") +
                (valor != null ? "valor=" + valor + ", " : "") +
                (fechaCosto != null ? "fechaCosto=" + fechaCosto + ", " : "") +
                (estadoId != null ? "estadoId=" + estadoId + ", " : "") +
                (marcaId != null ? "marcaId=" + marcaId + ", " : "") +
                (tipoRepuestoId != null ? "tipoRepuestoId=" + tipoRepuestoId + ", " : "") +
            "}";
    }

}
