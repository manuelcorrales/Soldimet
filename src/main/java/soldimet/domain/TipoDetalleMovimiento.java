package soldimet.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A TipoDetalleMovimiento.
 */
@Entity
@Table(name = "tipo_detalle_movimiento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoDetalleMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_detalle", nullable = false)
    private String nombreTipoDetalle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreTipoDetalle() {
        return nombreTipoDetalle;
    }

    public TipoDetalleMovimiento nombreTipoDetalle(String nombreTipoDetalle) {
        this.nombreTipoDetalle = nombreTipoDetalle;
        return this;
    }

    public void setNombreTipoDetalle(String nombreTipoDetalle) {
        this.nombreTipoDetalle = nombreTipoDetalle;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return 31;
    }

    @Override
    public String toString() {
        return "TipoDetalleMovimiento{" +
            "id=" + getId() +
            ", nombreTipoDetalle='" + getNombreTipoDetalle() + "'" +
            "}";
    }
}
