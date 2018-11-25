package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Sucursal.
 */
@Entity
@Table(name = "sucursal")
public class Sucursal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_sucursal", nullable = false)
    private String nombreSucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreSucursal() {
        return nombreSucursal;
    }

    public Sucursal nombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
        return this;
    }

    public void setNombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
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
        Sucursal sucursal = (Sucursal) o;
        if (sucursal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sucursal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sucursal{" +
            "id=" + getId() +
            ", nombreSucursal='" + getNombreSucursal() + "'" +
            "}";
    }
}
