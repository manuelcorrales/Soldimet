package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Rubro.
 */
@Entity
@Table(name = "rubro")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Rubro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_rubro", nullable = false)
    private String nombreRubro;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rubro id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreRubro() {
        return this.nombreRubro;
    }

    public Rubro nombreRubro(String nombreRubro) {
        this.nombreRubro = nombreRubro;
        return this;
    }

    public void setNombreRubro(String nombreRubro) {
        this.nombreRubro = nombreRubro;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rubro)) {
            return false;
        }
        return id != null && id.equals(((Rubro) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rubro{" +
            "id=" + getId() +
            ", nombreRubro='" + getNombreRubro() + "'" +
            "}";
    }
}
