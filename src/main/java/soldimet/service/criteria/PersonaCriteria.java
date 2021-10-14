package soldimet.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link soldimet.domain.Persona} entity. This class is used
 * in {@link soldimet.web.rest.PersonaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /personas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class PersonaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter numeroTelefono;

    private StringFilter nombre;

    private StringFilter apellido;

    private LongFilter direccionId;

    private LongFilter estadoPersonaId;

    private LongFilter userId;

    public PersonaCriteria() {}

    public PersonaCriteria(PersonaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.numeroTelefono = other.numeroTelefono == null ? null : other.numeroTelefono.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.apellido = other.apellido == null ? null : other.apellido.copy();
        this.direccionId = other.direccionId == null ? null : other.direccionId.copy();
        this.estadoPersonaId = other.estadoPersonaId == null ? null : other.estadoPersonaId.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
    }

    @Override
    public PersonaCriteria copy() {
        return new PersonaCriteria(this);
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

    public StringFilter getNumeroTelefono() {
        return numeroTelefono;
    }

    public StringFilter numeroTelefono() {
        if (numeroTelefono == null) {
            numeroTelefono = new StringFilter();
        }
        return numeroTelefono;
    }

    public void setNumeroTelefono(StringFilter numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    public StringFilter getNombre() {
        return nombre;
    }

    public StringFilter nombre() {
        if (nombre == null) {
            nombre = new StringFilter();
        }
        return nombre;
    }

    public void setNombre(StringFilter nombre) {
        this.nombre = nombre;
    }

    public StringFilter getApellido() {
        return apellido;
    }

    public StringFilter apellido() {
        if (apellido == null) {
            apellido = new StringFilter();
        }
        return apellido;
    }

    public void setApellido(StringFilter apellido) {
        this.apellido = apellido;
    }

    public LongFilter getDireccionId() {
        return direccionId;
    }

    public LongFilter direccionId() {
        if (direccionId == null) {
            direccionId = new LongFilter();
        }
        return direccionId;
    }

    public void setDireccionId(LongFilter direccionId) {
        this.direccionId = direccionId;
    }

    public LongFilter getEstadoPersonaId() {
        return estadoPersonaId;
    }

    public LongFilter estadoPersonaId() {
        if (estadoPersonaId == null) {
            estadoPersonaId = new LongFilter();
        }
        return estadoPersonaId;
    }

    public void setEstadoPersonaId(LongFilter estadoPersonaId) {
        this.estadoPersonaId = estadoPersonaId;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public LongFilter userId() {
        if (userId == null) {
            userId = new LongFilter();
        }
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PersonaCriteria that = (PersonaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(numeroTelefono, that.numeroTelefono) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(apellido, that.apellido) &&
            Objects.equals(direccionId, that.direccionId) &&
            Objects.equals(estadoPersonaId, that.estadoPersonaId) &&
            Objects.equals(userId, that.userId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numeroTelefono, nombre, apellido, direccionId, estadoPersonaId, userId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (numeroTelefono != null ? "numeroTelefono=" + numeroTelefono + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (apellido != null ? "apellido=" + apellido + ", " : "") +
            (direccionId != null ? "direccionId=" + direccionId + ", " : "") +
            (estadoPersonaId != null ? "estadoPersonaId=" + estadoPersonaId + ", " : "") +
            (userId != null ? "userId=" + userId + ", " : "") +
            "}";
    }
}
