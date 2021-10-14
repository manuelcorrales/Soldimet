package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MovimientoPedido.
 */
@Entity
@Table(name = "movimiento_pedido")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MovimientoPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("movimientoPedidos")
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

    public MovimientoPedido id(Long id) {
        this.id = id;
        return this;
    }

    public Movimiento getMovimiento() {
        return this.movimiento;
    }

    public MovimientoPedido movimiento(Movimiento movimiento) {
        this.setMovimiento(movimiento);
        return this;
    }

    public void setMovimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
    }

    public PedidoRepuesto getPedidoRepuesto() {
        return this.pedidoRepuesto;
    }

    public MovimientoPedido pedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.setPedidoRepuesto(pedidoRepuesto);
        return this;
    }

    public void setPedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.pedidoRepuesto = pedidoRepuesto;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MovimientoPedido)) {
            return false;
        }
        return id != null && id.equals(((MovimientoPedido) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MovimientoPedido{" +
            "id=" + getId() +
            "}";
    }
}
