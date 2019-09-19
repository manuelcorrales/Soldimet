package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A DetalleMovimiento.
 */
@Entity
@Table(name = "detalle_movimiento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DetalleMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor_unitario")
    private Float valor_unitario;

    @NotNull
    @Min(value = 0)
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("detalleMovimientos")
    private TipoDetalleMovimiento tipoDetalleMovimiento;

    @ManyToOne
    @JsonIgnoreProperties("detalleMovimientos")
    private Articulo articulo;

    @ManyToOne
    @JsonIgnoreProperties("detalleMovimientos")
    private PedidoRepuesto pedidoRepuesto;

    @ManyToOne
    @JsonIgnoreProperties("detalleMovimientos")
    private Presupuesto presupuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValor_unitario() {
        return valor_unitario;
    }

    public DetalleMovimiento valor_unitario(Float valor_unitario) {
        this.valor_unitario = valor_unitario;
        return this;
    }

    public void setValor_unitario(Float valor_unitario) {
        this.valor_unitario = valor_unitario;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public DetalleMovimiento cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public DetalleMovimiento descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public Articulo getArticulo() {
        return articulo;
    }

    public DetalleMovimiento articulo(Articulo articulo) {
        this.articulo = articulo;
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public PedidoRepuesto getPedidoRepuesto() {
        return pedidoRepuesto;
    }

    public DetalleMovimiento pedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.pedidoRepuesto = pedidoRepuesto;
        return this;
    }

    public void setPedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.pedidoRepuesto = pedidoRepuesto;
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
        if (!(o instanceof DetalleMovimiento)) {
            return false;
        }
        return id != null && id.equals(((DetalleMovimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetalleMovimiento{" +
            "id=" + getId() +
            ", valor_unitario=" + getValor_unitario() +
            ", cantidad=" + getCantidad() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
