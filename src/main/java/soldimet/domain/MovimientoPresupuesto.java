package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MovimientoPresupuesto.
 */
@Entity
@Table(name = "movimiento_presupuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MovimientoPresupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("movimientoPresupuestos")
    private Presupuesto presupuesto;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private Movimiento movimiento;

    @OneToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch= FetchType.EAGER)
    @JoinColumn(name= "movimientoPresupuesto", nullable=true)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CostoRepuesto> costoRepuestos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Presupuesto getPresupuesto() {
        return presupuesto;
    }

    public MovimientoPresupuesto presupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
        return this;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public Movimiento getMovimiento() {
        return movimiento;
    }

    public MovimientoPresupuesto movimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
        return this;
    }

    public void setMovimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
    }

    public Set<CostoRepuesto> getCostoRepuestos() {
        return costoRepuestos;
    }

    public MovimientoPresupuesto costoRepuestos(Set<CostoRepuesto> costoRepuestos) {
        this.costoRepuestos = costoRepuestos;
        return this;
    }

    public MovimientoPresupuesto addCostoRepuesto(CostoRepuesto costoRepuesto) {
        this.costoRepuestos.add(costoRepuesto);
        return this;
    }

    public MovimientoPresupuesto removeCostoRepuesto(CostoRepuesto costoRepuesto) {
        this.costoRepuestos.remove(costoRepuesto);
        return this;
    }

    public void setCostoRepuestos(Set<CostoRepuesto> costoRepuestos) {
        this.costoRepuestos = costoRepuestos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return 31;
    }

    @Override
    public String toString() {
        return "MovimientoPresupuesto{" +
            "id=" + getId() +
            "}";
    }
}
