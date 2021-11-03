package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Aplicacion.
 */
@Entity
@Table(name = "aplicacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Aplicacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_aplicacion", nullable = false)
    private String nombreAplicacion;

    @NotNull
    @Min(value = 1)
    @Max(value = 100)
    @Column(name = "numero_grupo", nullable = false)
    private Integer numeroGrupo;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @NotNull
    private Motor motor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Aplicacion id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreAplicacion() {
        return this.nombreAplicacion;
    }

    public Aplicacion nombreAplicacion(String nombreAplicacion) {
        this.nombreAplicacion = nombreAplicacion;
        return this;
    }

    public void setNombreAplicacion(String nombreAplicacion) {
        this.nombreAplicacion = nombreAplicacion;
    }

    public Integer getNumeroGrupo() {
        return this.numeroGrupo;
    }

    public Aplicacion numeroGrupo(Integer numeroGrupo) {
        this.numeroGrupo = numeroGrupo;
        return this;
    }

    public void setNumeroGrupo(Integer numeroGrupo) {
        this.numeroGrupo = numeroGrupo;
    }

    public Motor getMotor() {
        return this.motor;
    }

    public Aplicacion motor(Motor motor) {
        this.setMotor(motor);
        return this;
    }

    public void setMotor(Motor motor) {
        this.motor = motor;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aplicacion)) {
            return false;
        }
        return id != null && id.equals(((Aplicacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aplicacion{" +
            "id=" + getId() +
            ", nombreAplicacion='" + getNombreAplicacion() + "'" +
            ", numeroGrupo=" + getNumeroGrupo() +
            "}";
    }
}
