package soldimet.domain;

import soldimet.utils.MathUtils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CostoOperacion.
 */
@Entity
@Table(name = "costo_operacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CostoOperacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "costo_operacion", nullable = false)
    private Float costoOperacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoOperacions")
    private Cilindrada cilindrada;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "tipoParteMotor", "estadoOperacion" }, allowSetters = true)
    private Operacion operacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoOperacions")
    private TipoParteMotor tipoParteMotor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CostoOperacion id(Long id) {
        this.id = id;
        return this;
    }

    public Float getCostoOperacion() {
        return MathUtils.roundFloat(this.costoOperacion);
    }

    public CostoOperacion costoOperacion(Float costoOperacion) {
        this.costoOperacion = costoOperacion;
        return this;
    }

    public void setCostoOperacion(Float costoOperacion) {
        this.costoOperacion = costoOperacion;
    }

    public Cilindrada getCilindrada() {
        return this.cilindrada;
    }

    public CostoOperacion cilindrada(Cilindrada cilindrada) {
        this.setCilindrada(cilindrada);
        return this;
    }

    public void setCilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
    }

    public Operacion getOperacion() {
        return this.operacion;
    }

    public CostoOperacion operacion(Operacion operacion) {
        this.setOperacion(operacion);
        return this;
    }

    public void setOperacion(Operacion operacion) {
        this.operacion = operacion;
    }

    public TipoParteMotor getTipoParteMotor() {
        return this.tipoParteMotor;
    }

    public CostoOperacion tipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.setTipoParteMotor(tipoParteMotor);
        return this;
    }

    public void setTipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CostoOperacion)) {
            return false;
        }
        return id != null && id.equals(((CostoOperacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CostoOperacion{" +
            "id=" + getId() +
            ", costoOperacion=" + getCostoOperacion() +
            "}";
    }
}
