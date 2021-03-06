package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MovimientoArticulo.
 */
@Entity
@Table(name = "movimiento_articulo")
public class MovimientoArticulo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 1)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @ManyToOne(optional = false)
    @NotNull
    private Articulo articulo;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Movimiento movimiento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public MovimientoArticulo cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Articulo getArticulo() {
        return articulo;
    }

    public MovimientoArticulo articulo(Articulo articulo) {
        this.articulo = articulo;
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public Movimiento getMovimiento() {
        return movimiento;
    }

    public MovimientoArticulo movimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
        return this;
    }

    public void setMovimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
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
        MovimientoArticulo movimientoArticulo = (MovimientoArticulo) o;
        if (movimientoArticulo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movimientoArticulo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovimientoArticulo{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
