package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Marca.
 */
@Entity
@Table(name = "marca")
public class Marca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2)
    @Column(name = "nombre_marca", nullable = false)
    private String nombreMarca;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreMarca() {
        return nombreMarca;
    }

    public Marca nombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
        return this;
    }

    public void setNombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
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
        Marca marca = (Marca) o;
        if (marca.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), marca.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Marca{" +
            "id=" + getId() +
            ", nombreMarca='" + getNombreMarca() + "'" +
            "}";
    }
}
