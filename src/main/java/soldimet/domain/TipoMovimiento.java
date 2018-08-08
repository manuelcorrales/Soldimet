package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TipoMovimiento.
 */
@Entity
@Table(name = "tipo_movimiento")
public class TipoMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_movimiento", nullable = false)
    private String nombreTipoMovimiento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreTipoMovimiento() {
        return nombreTipoMovimiento;
    }

    public TipoMovimiento nombreTipoMovimiento(String nombreTipoMovimiento) {
        this.nombreTipoMovimiento = nombreTipoMovimiento;
        return this;
    }

    public void setNombreTipoMovimiento(String nombreTipoMovimiento) {
        this.nombreTipoMovimiento = nombreTipoMovimiento;
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
        TipoMovimiento tipoMovimiento = (TipoMovimiento) o;
        if (tipoMovimiento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoMovimiento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoMovimiento{" +
            "id=" + getId() +
            ", nombreTipoMovimiento='" + getNombreTipoMovimiento() + "'" +
            "}";
    }
}
