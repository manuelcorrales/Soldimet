package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TipoRepuesto.
 */
@Entity
@Table(name = "tipo_repuesto")
public class TipoRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_repuesto", nullable = false)
    private String nombreTipoRepuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreTipoRepuesto() {
        return nombreTipoRepuesto;
    }

    public TipoRepuesto nombreTipoRepuesto(String nombreTipoRepuesto) {
        this.nombreTipoRepuesto = nombreTipoRepuesto;
        return this;
    }

    public void setNombreTipoRepuesto(String nombreTipoRepuesto) {
        this.nombreTipoRepuesto = nombreTipoRepuesto;
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
        TipoRepuesto tipoRepuesto = (TipoRepuesto) o;
        if (tipoRepuesto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoRepuesto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoRepuesto{" +
            "id=" + getId() +
            ", nombreTipoRepuesto='" + getNombreTipoRepuesto() + "'" +
            "}";
    }
}
