package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Size(min = 5)
    @Column(name = "numero_telefono", nullable = false)
    private String numeroTelefono;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Direccion direccion;

    @ManyToOne(optional = false)
    @NotNull
    private EstadoPersona estadoPersona;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Persona nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNumeroTelefono() {
        return numeroTelefono;
    }

    public Persona numeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
        return this;
    }

    public void setNumeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    public Direccion getDireccion() {
        return direccion;
    }

    public Persona direccion(Direccion direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(Direccion direccion) {
        this.direccion = direccion;
    }

    public EstadoPersona getEstadoPersona() {
        return estadoPersona;
    }

    public Persona estadoPersona(EstadoPersona estadoPersona) {
        this.estadoPersona = estadoPersona;
        return this;
    }

    public void setEstadoPersona(EstadoPersona estadoPersona) {
        this.estadoPersona = estadoPersona;
    }

    public User getUser() {
        return user;
    }

    public Persona user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Persona persona = (Persona) o;
        if (persona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), persona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", numeroTelefono='" + getNumeroTelefono() + "'" +
            "}";
    }
}
