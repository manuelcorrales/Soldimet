package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Rubro.
 */
@Entity
@Table(name = "rubro")
public class Rubro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_rubro", nullable = false)
    private String nombreRubro;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreRubro() {
        return nombreRubro;
    }

    public Rubro nombreRubro(String nombreRubro) {
        this.nombreRubro = nombreRubro;
        return this;
    }

    public void setNombreRubro(String nombreRubro) {
        this.nombreRubro = nombreRubro;
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
        Rubro rubro = (Rubro) o;
        if (rubro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rubro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rubro{" +
            "id=" + getId() +
            ", nombreRubro='" + getNombreRubro() + "'" +
            "}";
    }
}
