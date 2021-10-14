package soldimet.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import soldimet.utils.MathUtils;

/**
 * A HistorialPrecio.
 */
@Entity
@Table(name = "historial_precio")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class HistorialPrecio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_historial", nullable = false, columnDefinition = "DATE")
    private LocalDate fechaHistorial;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private PrecioRepuesto precioRepuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HistorialPrecio id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getFechaHistorial() {
        return this.fechaHistorial;
    }

    public HistorialPrecio fechaHistorial(LocalDate fechaHistorial) {
        this.fechaHistorial = fechaHistorial;
        return this;
    }

    public void setFechaHistorial(LocalDate fechaHistorial) {
        this.fechaHistorial = fechaHistorial;
    }

    public PrecioRepuesto getPrecioRepuesto() {
        return MathUtils.roundFloat(this.precioRepuesto);
    }

    public HistorialPrecio precioRepuesto(PrecioRepuesto precioRepuesto) {
        this.setPrecioRepuesto(precioRepuesto);
        return this;
    }

    public void setPrecioRepuesto(PrecioRepuesto precioRepuesto) {
        this.precioRepuesto = precioRepuesto;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistorialPrecio)) {
            return false;
        }
        return id != null && id.equals(((HistorialPrecio) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HistorialPrecio{" +
            "id=" + getId() +
            ", fechaHistorial='" + getFechaHistorial() + "'" +
            "}";
    }
}
