package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Operacion.
 */
@Entity
@Table(name = "operacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Operacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_operacion", nullable = false)
    private String nombreOperacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("operacions")
    private TipoParteMotor tipoParteMotor;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("operacions")
    private EstadoOperacion estadoOperacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Operacion id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreOperacion() {
        return this.nombreOperacion;
    }

    public Operacion nombreOperacion(String nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
        return this;
    }

    public void setNombreOperacion(String nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
    }

    public TipoParteMotor getTipoParteMotor() {
        return this.tipoParteMotor;
    }

    public Operacion tipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.setTipoParteMotor(tipoParteMotor);
        return this;
    }

    public void setTipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }

    public EstadoOperacion getEstadoOperacion() {
        return this.estadoOperacion;
    }

    public Operacion estadoOperacion(EstadoOperacion estadoOperacion) {
        this.setEstadoOperacion(estadoOperacion);
        return this;
    }

    public void setEstadoOperacion(EstadoOperacion estadoOperacion) {
        this.estadoOperacion = estadoOperacion;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Operacion)) {
            return false;
        }
        return id != null && id.equals(((Operacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Operacion{" +
            "id=" + getId() +
            ", nombreOperacion='" + getNombreOperacion() + "'" +
            "}";
    }
}
