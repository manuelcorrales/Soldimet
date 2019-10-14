package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Operacion.
 */
@Entity
@Table(name = "operacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreOperacion() {
        return nombreOperacion;
    }

    public Operacion nombreOperacion(String nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
        return this;
    }

    public void setNombreOperacion(String nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
    }

    public TipoParteMotor getTipoParteMotor() {
        return tipoParteMotor;
    }

    public Operacion tipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
        return this;
    }

    public void setTipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }

    public EstadoOperacion getEstadoOperacion() {
        return estadoOperacion;
    }

    public Operacion estadoOperacion(EstadoOperacion estadoOperacion) {
        this.estadoOperacion = estadoOperacion;
        return this;
    }

    public void setEstadoOperacion(EstadoOperacion estadoOperacion) {
        this.estadoOperacion = estadoOperacion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return 31;
    }

    @Override
    public String toString() {
        return "Operacion{" +
            "id=" + getId() +
            ", nombreOperacion='" + getNombreOperacion() + "'" +
            "}";
    }
}
