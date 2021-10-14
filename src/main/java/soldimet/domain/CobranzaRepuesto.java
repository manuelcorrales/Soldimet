package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CobranzaRepuesto.
 */
@Entity
@Table(name = "cobranza_repuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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
    @JsonIgnoreProperties(value = { "tipoParteMotor" }, allowSetters = true)
    private TipoRepuesto tipoRepuesto;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, optional = true)
    @JsonIgnoreProperties(value = { "estado", "marca", "tipoRepuesto" }, allowSetters = true)
    private Articulo articulo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CobranzaRepuesto id(Long id) {
        this.id = id;
        return this;
    }

    public Float getValor() {
        return this.valor;
    }

    public CobranzaRepuesto valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public TipoRepuesto getTipoRepuesto() {
        return this.tipoRepuesto;
    }

    public CobranzaRepuesto tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.setTipoRepuesto(tipoRepuesto);
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public Articulo getArticulo() {
        return this.articulo;
    }

    public CobranzaRepuesto articulo(Articulo articulo) {
        this.setArticulo(articulo);
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CobranzaRepuesto)) {
            return false;
        }
        return id != null && id.equals(((CobranzaRepuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CobranzaRepuesto{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            "}";
    }
}
