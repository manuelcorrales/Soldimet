package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoRepuesto.
 */
@Entity
@Table(name = "tipo_repuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_repuesto", nullable = false)
    private String nombreTipoRepuesto;

    @ManyToOne(optional = false)
    @NotNull
    private TipoParteMotor tipoParteMotor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoRepuesto id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreTipoRepuesto() {
        return this.nombreTipoRepuesto;
    }

    public TipoRepuesto nombreTipoRepuesto(String nombreTipoRepuesto) {
        this.nombreTipoRepuesto = nombreTipoRepuesto;
        return this;
    }

    public void setNombreTipoRepuesto(String nombreTipoRepuesto) {
        this.nombreTipoRepuesto = nombreTipoRepuesto;
    }

    public TipoParteMotor getTipoParteMotor() {
        return this.tipoParteMotor;
    }

    public TipoRepuesto tipoParteMotor(TipoParteMotor tipoParteMotor) {
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
        if (!(o instanceof TipoRepuesto)) {
            return false;
        }
        return id != null && id.equals(((TipoRepuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoRepuesto{" +
            "id=" + getId() +
            ", nombreTipoRepuesto='" + getNombreTipoRepuesto() + "'" +
            "}";
    }
}
