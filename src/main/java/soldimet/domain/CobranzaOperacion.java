package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CobranzaOperacion.
 */
@Entity
@Table(name = "cobranza_operacion")
public class CobranzaOperacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "cobranza_operacion", nullable = false)
    private Float cobranzaOperacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private EstadoCobranzaOperacion estadoCobranzaOperacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Operacion operacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCobranzaOperacion() {
        return cobranzaOperacion;
    }

    public CobranzaOperacion cobranzaOperacion(Float cobranzaOperacion) {
        this.cobranzaOperacion = cobranzaOperacion;
        return this;
    }

    public void setCobranzaOperacion(Float cobranzaOperacion) {
        this.cobranzaOperacion = cobranzaOperacion;
    }

    public EstadoCobranzaOperacion getEstadoCobranzaOperacion() {
        return estadoCobranzaOperacion;
    }

    public CobranzaOperacion estadoCobranzaOperacion(EstadoCobranzaOperacion estadoCobranzaOperacion) {
        this.estadoCobranzaOperacion = estadoCobranzaOperacion;
        return this;
    }

    public void setEstadoCobranzaOperacion(EstadoCobranzaOperacion estadoCobranzaOperacion) {
        this.estadoCobranzaOperacion = estadoCobranzaOperacion;
    }

    public Operacion getOperacion() {
        return operacion;
    }

    public CobranzaOperacion operacion(Operacion operacion) {
        this.operacion = operacion;
        return this;
    }

    public void setOperacion(Operacion operacion) {
        this.operacion = operacion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CobranzaOperacion cobranzaOperacion = (CobranzaOperacion) o;
        if (cobranzaOperacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cobranzaOperacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CobranzaOperacion{" +
            "id=" + getId() +
            ", cobranzaOperacion=" + getCobranzaOperacion() +
            "}";
    }
}
