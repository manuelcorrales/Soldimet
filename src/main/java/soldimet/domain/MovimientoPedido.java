package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MovimientoPedido.
 */
@Entity
@Table(name = "movimiento_pedido")
public class MovimientoPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    private PedidoRepuesto pedidoRepuesto;

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

    public PedidoRepuesto getPedidoRepuesto() {
        return pedidoRepuesto;
    }

    public MovimientoPedido pedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.pedidoRepuesto = pedidoRepuesto;
        return this;
    }

    public void setPedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.pedidoRepuesto = pedidoRepuesto;
    }

    public Movimiento getMovimiento() {
        return movimiento;
    }

    public MovimientoPedido movimiento(Movimiento movimiento) {
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
        MovimientoPedido movimientoPedido = (MovimientoPedido) o;
        if (movimientoPedido.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movimientoPedido.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovimientoPedido{" +
            "id=" + getId() +
            "}";
    }
}
