package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A HistorialPrecio.
 */
@Entity
@Table(name = "historial_precio")
public class HistorialPrecio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_historial", nullable = false)
    private LocalDate fechaHistorial;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private PrecioRepuesto precioRepuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaHistorial() {
        return fechaHistorial;
    }

    public HistorialPrecio fechaHistorial(LocalDate fechaHistorial) {
        this.fechaHistorial = fechaHistorial;
        return this;
    }

    public void setFechaHistorial(LocalDate fechaHistorial) {
        this.fechaHistorial = fechaHistorial;
    }

    public PrecioRepuesto getPrecioRepuesto() {
        return precioRepuesto;
    }

    public HistorialPrecio precioRepuesto(PrecioRepuesto precioRepuesto) {
        this.precioRepuesto = precioRepuesto;
        return this;
    }

    public void setPrecioRepuesto(PrecioRepuesto precioRepuesto) {
        this.precioRepuesto = precioRepuesto;
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
        HistorialPrecio historialPrecio = (HistorialPrecio) o;
        if (historialPrecio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), historialPrecio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HistorialPrecio{" +
            "id=" + getId() +
            ", fechaHistorial='" + getFechaHistorial() + "'" +
            "}";
    }
}
