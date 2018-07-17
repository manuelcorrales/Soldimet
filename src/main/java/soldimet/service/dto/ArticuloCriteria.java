package soldimet.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the Articulo entity. This class is used in ArticuloResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /articulos?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ArticuloCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter descripcion;

    private StringFilter codigoArticuloProveedor;

    private LongFilter estadoId;

    private LongFilter marcaId;

    private LongFilter tipoRepuestoId;

    public ArticuloCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(StringFilter descripcion) {
        this.descripcion = descripcion;
    }

    public StringFilter getCodigoArticuloProveedor() {
        return codigoArticuloProveedor;
    }

    public void setCodigoArticuloProveedor(StringFilter codigoArticuloProveedor) {
        this.codigoArticuloProveedor = codigoArticuloProveedor;
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
    public String toString() {
        return "ArticuloCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
                (codigoArticuloProveedor != null ? "codigoArticuloProveedor=" + codigoArticuloProveedor + ", " : "") +
                (estadoId != null ? "estadoId=" + estadoId + ", " : "") +
                (marcaId != null ? "marcaId=" + marcaId + ", " : "") +
                (tipoRepuestoId != null ? "tipoRepuestoId=" + tipoRepuestoId + ", " : "") +
            "}";
    }

}
