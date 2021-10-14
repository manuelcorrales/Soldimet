package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TipoDetalleMovimiento.
 */
@Entity
@Table(name = "tipo_detalle_movimiento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoDetalleMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_detalle", nullable = false)
    private String nombreTipoDetalle;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoDetalleMovimiento id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreTipoDetalle() {
        return this.nombreTipoDetalle;
    }

    public TipoDetalleMovimiento nombreTipoDetalle(String nombreTipoDetalle) {
        this.nombreTipoDetalle = nombreTipoDetalle;
        return this;
    }

    public void setNombreTipoDetalle(String nombreTipoDetalle) {
        this.nombreTipoDetalle = nombreTipoDetalle;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoDetalleMovimiento)) {
            return false;
        }
        return id != null && id.equals(((TipoDetalleMovimiento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoDetalleMovimiento{" +
            "id=" + getId() +
            ", nombreTipoDetalle='" + getNombreTipoDetalle() + "'" +
            "}";
    }
}
