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
 * Criteria class for the Persona entity. This class is used in PersonaResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /personas?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PersonaCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private StringFilter nombre;

    private StringFilter numeroTelefono;

    private LongFilter direccionId;

    private LongFilter estadoPersonaId;

    public PersonaCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNombre() {
        return nombre;
    }

    public void setNombre(StringFilter nombre) {
        this.nombre = nombre;
    }

    public StringFilter getNumeroTelefono() {
        return numeroTelefono;
    }

    public void setNumeroTelefono(StringFilter numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    public LongFilter getDireccionId() {
        return direccionId;
    }

    public void setDireccionId(LongFilter direccionId) {
        this.direccionId = direccionId;
    }

    public LongFilter getEstadoPersonaId() {
        return estadoPersonaId;
    }

    public void setEstadoPersonaId(LongFilter estadoPersonaId) {
        this.estadoPersonaId = estadoPersonaId;
    }

    @Override
    public String toString() {
        return "PersonaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nombre != null ? "nombre=" + nombre + ", " : "") +
                (numeroTelefono != null ? "numeroTelefono=" + numeroTelefono + ", " : "") +
                (direccionId != null ? "direccionId=" + direccionId + ", " : "") +
                (estadoPersonaId != null ? "estadoPersonaId=" + estadoPersonaId + ", " : "") +
            "}";
    }

}
