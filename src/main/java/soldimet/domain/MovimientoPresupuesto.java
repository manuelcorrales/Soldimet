package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MovimientoPresupuesto.
 */
@Entity
@Table(name = "movimiento_presupuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MovimientoPresupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("movimientoPresupuestos")
    private Presupuesto presupuesto;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Movimiento movimiento;

    @OneToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    @JoinColumn(name = "movimientoPresupuesto", nullable = true)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CostoRepuesto> costoRepuestos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MovimientoPresupuesto id(Long id) {
        this.id = id;
        return this;
    }

    public Movimiento getMovimiento() {
        return this.movimiento;
    }

    public MovimientoPresupuesto movimiento(Movimiento movimiento) {
        this.setMovimiento(movimiento);
        return this;
    }

    public void setMovimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
    }

    public Presupuesto getPresupuesto() {
        return this.presupuesto;
    }

    public MovimientoPresupuesto presupuesto(Presupuesto presupuesto) {
        this.setPresupuesto(presupuesto);
        return this;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MovimientoPresupuesto)) {
            return false;
        }
        return id != null && id.equals(((MovimientoPresupuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MovimientoPresupuesto{" +
            "id=" + getId() +
            "}";
    }
}
