package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Proveedor.
 */
@Entity
@Table(name = "proveedor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Proveedor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_proveedor", nullable = false)
    private String nombreProveedor;

    @JsonIgnoreProperties(value = { "direccion", "estadoPersona", "user" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Persona persona;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Proveedor id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreProveedor() {
        return this.nombreProveedor;
    }

    public Proveedor nombreProveedor(String nombreProveedor) {
        this.nombreProveedor = nombreProveedor;
        return this;
    }

    public void setNombreProveedor(String nombreProveedor) {
        this.nombreProveedor = nombreProveedor;
    }

    public Persona getPersona() {
        return this.persona;
    }

    public Proveedor persona(Persona persona) {
        this.setPersona(persona);
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proveedor)) {
            return false;
        }
        return id != null && id.equals(((Proveedor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proveedor{" +
            "id=" + getId() +
            ", nombreProveedor='" + getNombreProveedor() + "'" +
            "}";
    }
}
