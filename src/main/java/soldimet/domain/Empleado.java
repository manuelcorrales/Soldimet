package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Empleado.
 */
@Entity
@Table(name = "empleado")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties(value = { "direccion", "estadoPersona", "user" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Persona persona;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE }, fetch= FetchType.EAGER)
    @JsonIgnoreProperties("empleados")
    private Sucursal sucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Empleado id(Long id) {
        this.id = id;
        return this;
    }

    public Persona getPersona() {
        return this.persona;
    }

    public Empleado persona(Persona persona) {
        this.setPersona(persona);
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Sucursal getSucursal() {
        return this.sucursal;
    }

    public Empleado sucursal(Sucursal sucursal) {
        this.setSucursal(sucursal);
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleado)) {
            return false;
        }
        return id != null && id.equals(((Empleado) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            "}";
    }
}
