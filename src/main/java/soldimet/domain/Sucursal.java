package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Sucursal.
 */
@Entity
@Table(name = "sucursal")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sucursal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_sucursal", nullable = false)
    private String nombreSucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sucursal id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreSucursal() {
        return this.nombreSucursal;
    }

    public Sucursal nombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
        return this;
    }

    public void setNombreSucursal(String nombreSucursal) {
        this.nombreSucursal = nombreSucursal;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sucursal)) {
            return false;
        }
        return id != null && id.equals(((Sucursal) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sucursal{" +
            "id=" + getId() +
            ", nombreSucursal='" + getNombreSucursal() + "'" +
            "}";
    }
}
