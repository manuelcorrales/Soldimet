package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EstadoArticulo.
 */
@Entity
@Table(name = "estado_articulo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EstadoArticulo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_estado", nullable = false)
    private String nombreEstado;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EstadoArticulo id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreEstado() {
        return this.nombreEstado;
    }

    public EstadoArticulo nombreEstado(String nombreEstado) {
        this.nombreEstado = nombreEstado;
        return this;
    }

    public void setNombreEstado(String nombreEstado) {
        this.nombreEstado = nombreEstado;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EstadoArticulo)) {
            return false;
        }
        return id != null && id.equals(((EstadoArticulo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EstadoArticulo{" +
            "id=" + getId() +
            ", nombreEstado='" + getNombreEstado() + "'" +
            "}";
    }
}
