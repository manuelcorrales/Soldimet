package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Motor.
 */
@Entity
@Table(name = "motor")
public class Motor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 25)
    @Column(name = "marca_motor", length = 25, nullable = false)
    private String marcaMotor;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name= "motor")
    @JsonIgnore
    private Set<Aplicacion> aplicacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarcaMotor() {
        return marcaMotor;
    }

    public Motor marcaMotor(String marcaMotor) {
        this.marcaMotor = marcaMotor;
        return this;
    }

    public void setMarcaMotor(String marcaMotor) {
        this.marcaMotor = marcaMotor;
    }

    public Set<Aplicacion> getAplicacions() {
        return aplicacions;
    }

    public Motor aplicacions(Set<Aplicacion> aplicacions) {
        this.aplicacions = aplicacions;
        return this;
    }

    public Motor addAplicacion(Aplicacion aplicacion) {
        this.aplicacions.add(aplicacion);
        return this;
    }

    public Motor removeAplicacion(Aplicacion aplicacion) {
        this.aplicacions.remove(aplicacion);
        return this;
    }

    public void setAplicacions(Set<Aplicacion> aplicacions) {
        this.aplicacions = aplicacions;
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
        Motor motor = (Motor) o;
        if (motor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), motor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Motor{" +
            "id=" + getId() +
            ", marcaMotor='" + getMarcaMotor() + "'" +
            "}";
    }
}
