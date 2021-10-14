package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Localidad.
 */
@Entity
@Table(name = "localidad")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Localidad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_localidad", nullable = false)
    private String nombreLocalidad;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Localidad id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreLocalidad() {
        return this.nombreLocalidad;
    }

    public Localidad nombreLocalidad(String nombreLocalidad) {
        this.nombreLocalidad = nombreLocalidad;
        return this;
    }

    public void setNombreLocalidad(String nombreLocalidad) {
        this.nombreLocalidad = nombreLocalidad;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Localidad)) {
            return false;
        }
        return id != null && id.equals(((Localidad) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Localidad{" +
            "id=" + getId() +
            ", nombreLocalidad='" + getNombreLocalidad() + "'" +
            "}";
    }
}
