package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoParteMotor.
 */
@Entity
@Table(name = "tipo_parte_motor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoParteMotor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_parte_motor", nullable = false)
    private String nombreTipoParteMotor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoParteMotor id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreTipoParteMotor() {
        return this.nombreTipoParteMotor;
    }

    public TipoParteMotor nombreTipoParteMotor(String nombreTipoParteMotor) {
        this.nombreTipoParteMotor = nombreTipoParteMotor;
        return this;
    }

    public void setNombreTipoParteMotor(String nombreTipoParteMotor) {
        this.nombreTipoParteMotor = nombreTipoParteMotor;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoParteMotor)) {
            return false;
        }
        return id != null && id.equals(((TipoParteMotor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoParteMotor{" +
            "id=" + getId() +
            ", nombreTipoParteMotor='" + getNombreTipoParteMotor() + "'" +
            "}";
    }
}
