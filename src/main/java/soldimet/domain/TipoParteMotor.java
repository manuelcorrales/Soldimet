package soldimet.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A TipoParteMotor.
 */
@Entity
@Table(name = "tipo_parte_motor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoParteMotor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_parte_motor", nullable = false)
    private String nombreTipoParteMotor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreTipoParteMotor() {
        return nombreTipoParteMotor;
    }

    public TipoParteMotor nombreTipoParteMotor(String nombreTipoParteMotor) {
        this.nombreTipoParteMotor = nombreTipoParteMotor;
        return this;
    }

    public void setNombreTipoParteMotor(String nombreTipoParteMotor) {
        this.nombreTipoParteMotor = nombreTipoParteMotor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return 31;
    }

    @Override
    public String toString() {
        return "TipoParteMotor{" +
            "id=" + getId() +
            ", nombreTipoParteMotor='" + getNombreTipoParteMotor() + "'" +
            "}";
    }
}
