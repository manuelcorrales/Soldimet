package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CobranzaOperacion.
 */
@Entity
@Table(name = "cobranza_operacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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
    @JsonIgnoreProperties("cobranzaOperacions")
    private EstadoCobranzaOperacion estadoCobranzaOperacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "tipoParteMotor", "estadoOperacion" }, allowSetters = true)
    private Operacion operacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CobranzaOperacion id(Long id) {
        this.id = id;
        return this;
    }

    public Float getCobranzaOperacion() {
        return this.cobranzaOperacion;
    }

    public CobranzaOperacion cobranzaOperacion(Float cobranzaOperacion) {
        this.cobranzaOperacion = cobranzaOperacion;
        return this;
    }

    public void setCobranzaOperacion(Float cobranzaOperacion) {
        this.cobranzaOperacion = cobranzaOperacion;
    }

    public EstadoCobranzaOperacion getEstadoCobranzaOperacion() {
        return this.estadoCobranzaOperacion;
    }

    public CobranzaOperacion estadoCobranzaOperacion(EstadoCobranzaOperacion estadoCobranzaOperacion) {
        this.setEstadoCobranzaOperacion(estadoCobranzaOperacion);
        return this;
    }

    public void setEstadoCobranzaOperacion(EstadoCobranzaOperacion estadoCobranzaOperacion) {
        this.estadoCobranzaOperacion = estadoCobranzaOperacion;
    }

    public Operacion getOperacion() {
        return this.operacion;
    }

    public CobranzaOperacion operacion(Operacion operacion) {
        this.setOperacion(operacion);
        return this;
    }

    public void setOperacion(Operacion operacion) {
        this.operacion = operacion;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CobranzaOperacion)) {
            return false;
        }
        return id != null && id.equals(((CobranzaOperacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CobranzaOperacion{" +
            "id=" + getId() +
            ", cobranzaOperacion=" + getCobranzaOperacion() +
            "}";
    }
}
