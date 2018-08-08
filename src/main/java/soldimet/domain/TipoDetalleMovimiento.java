package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TipoDetalleMovimiento.
 */
@Entity
@Table(name = "tipo_detalle_movimiento")
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TipoDetalleMovimiento tipoDetalleMovimiento = (TipoDetalleMovimiento) o;
        if (tipoDetalleMovimiento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoDetalleMovimiento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoDetalleMovimiento{" +
            "id=" + getId() +
            ", nombreTipoDetalle='" + getNombreTipoDetalle() + "'" +
            "}";
    }
}
