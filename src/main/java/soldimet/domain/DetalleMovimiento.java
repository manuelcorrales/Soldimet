package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DetalleMovimiento.
 */
@Entity
@Table(name = "detalle_movimiento")
public class DetalleMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    private TipoDetalleMovimiento tipoDetalleMovimiento;

    @ManyToOne
    private Presupuesto presupuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoDetalleMovimiento getTipoDetalleMovimiento() {
        return tipoDetalleMovimiento;
    }

    public DetalleMovimiento tipoDetalleMovimiento(TipoDetalleMovimiento tipoDetalleMovimiento) {
        this.tipoDetalleMovimiento = tipoDetalleMovimiento;
        return this;
    }

    public void setTipoDetalleMovimiento(TipoDetalleMovimiento tipoDetalleMovimiento) {
        this.tipoDetalleMovimiento = tipoDetalleMovimiento;
    }

    public Presupuesto getPresupuesto() {
        return presupuesto;
    }

    public DetalleMovimiento presupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
        return this;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
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
        DetalleMovimiento detalleMovimiento = (DetalleMovimiento) o;
        if (detalleMovimiento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), detalleMovimiento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DetalleMovimiento{" +
            "id=" + getId() +
            "}";
    }
}
