package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CobranzaRepuesto.
 */
@Entity
@Table(name = "cobranza_repuesto")
public class CobranzaRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "valor", nullable = false)
    private Float valor;

    @ManyToOne(optional = false)
    @NotNull
    private TipoRepuesto tipoRepuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValor() {
        return valor;
    }

    public CobranzaRepuesto valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public TipoRepuesto getTipoRepuesto() {
        return tipoRepuesto;
    }

    public CobranzaRepuesto tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
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
        CobranzaRepuesto cobranzaRepuesto = (CobranzaRepuesto) o;
        if (cobranzaRepuesto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cobranzaRepuesto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CobranzaRepuesto{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            "}";
    }
}
