package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Motor.
 */
@Entity
@Table(name = "motor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Motor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 25)
    @Column(name = "marca_motor", length = 25, nullable = false)
    private String marcaMotor;

    @OneToMany(mappedBy = "motor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Aplicacion> aplicacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Motor id(Long id) {
        this.id = id;
        return this;
    }

    public String getMarcaMotor() {
        return this.marcaMotor;
    }

    public Motor marcaMotor(String marcaMotor) {
        this.marcaMotor = marcaMotor;
        return this;
    }

    public void setMarcaMotor(String marcaMotor) {
        this.marcaMotor = marcaMotor;
    }

    public Set<Aplicacion> getAplicacions() {
        return this.aplicacions;
    }

    public Motor aplicacions(Set<Aplicacion> aplicacions) {
        this.setAplicacions(aplicacions);
        return this;
    }

    public Motor addAplicacion(Aplicacion aplicacion) {
        this.aplicacions.add(aplicacion);
        aplicacion.setMotor(this);
        return this;
    }

    public Motor removeAplicacion(Aplicacion aplicacion) {
        this.aplicacions.remove(aplicacion);
        aplicacion.setMotor(null);
        return this;
    }

    public void setAplicacions(Set<Aplicacion> aplicacions) {
        if (this.aplicacions != null) {
            this.aplicacions.forEach(i -> i.setMotor(null));
        }
        if (aplicacions != null) {
            aplicacions.forEach(i -> i.setMotor(this));
        }
        this.aplicacions = aplicacions;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Motor)) {
            return false;
        }
        return id != null && id.equals(((Motor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Motor{" +
            "id=" + getId() +
            ", marcaMotor='" + getMarcaMotor() + "'" +
            "}";
    }
}
