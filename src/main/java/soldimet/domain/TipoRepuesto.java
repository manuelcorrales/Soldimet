package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A TipoRepuesto.
 */
@Entity
@Table(name = "tipo_repuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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
    @JsonIgnoreProperties("tipoRepuestos")
    private TipoParteMotor tipoParteMotor;

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

    public TipoParteMotor getTipoParteMotor() {
        return tipoParteMotor;
    }

    public TipoRepuesto tipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
        return this;
    }

    public void setTipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return 31;
    }

    @Override
    public String toString() {
        return "TipoRepuesto{" +
            "id=" + getId() +
            ", nombreTipoRepuesto='" + getNombreTipoRepuesto() + "'" +
            "}";
    }
}
