package soldimet.domain;

import soldimet.utils.MathUtils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DetalleMovimiento.
 */
@Entity
@Table(name = "detalle_movimiento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DetalleMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor_unitario")
    private Float valorUnitario;

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
    @JsonIgnoreProperties(value = { "estado", "marca", "tipoRepuesto" }, allowSetters = true)
    private Articulo articulo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "estadoPedidoRepuesto", "presupuesto", "documentType" }, allowSetters = true)
    private PedidoRepuesto pedidoRepuesto;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cliente", "estadoPresupuesto", "documentType", "sucursal" }, allowSetters = true)
    private Presupuesto presupuesto;

    @ManyToOne
    @JsonIgnoreProperties("detalleMovimientos")
    private MedidaArticulo medida;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DetalleMovimiento id(Long id) {
        this.id = id;
        return this;
    }

    public Float getValorUnitario() {
        return MathUtils.roundFloat(this.valorUnitario);
    }

    public DetalleMovimiento valorUnitario(Float valorUnitario) {
        this.valorUnitario = valorUnitario;
        return this;
    }

    public void setValorUnitario(Float valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public Integer getCantidad() {
        return this.cantidad;
    }

    public DetalleMovimiento cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public DetalleMovimiento descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public TipoDetalleMovimiento getTipoDetalleMovimiento() {
        return this.tipoDetalleMovimiento;
    }

    public DetalleMovimiento tipoDetalleMovimiento(TipoDetalleMovimiento tipoDetalleMovimiento) {
        this.setTipoDetalleMovimiento(tipoDetalleMovimiento);
        return this;
    }

    public void setTipoDetalleMovimiento(TipoDetalleMovimiento tipoDetalleMovimiento) {
        this.tipoDetalleMovimiento = tipoDetalleMovimiento;
    }

    public Articulo getArticulo() {
        return this.articulo;
    }

    public DetalleMovimiento articulo(Articulo articulo) {
        this.setArticulo(articulo);
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public PedidoRepuesto getPedidoRepuesto() {
        return this.pedidoRepuesto;
    }

    public DetalleMovimiento pedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.setPedidoRepuesto(pedidoRepuesto);
        return this;
    }

    public void setPedidoRepuesto(PedidoRepuesto pedidoRepuesto) {
        this.pedidoRepuesto = pedidoRepuesto;
    }

    public Presupuesto getPresupuesto() {
        return this.presupuesto;
    }

    public DetalleMovimiento presupuesto(Presupuesto presupuesto) {
        this.setPresupuesto(presupuesto);
        return this;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public MedidaArticulo getMedida() {
        return this.medida;
    }

    public DetalleMovimiento medida(MedidaArticulo medidaArticulo) {
        this.setMedida(medidaArticulo);
        return this;
    }

    public void setMedida(MedidaArticulo medidaArticulo) {
        this.medida = medidaArticulo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetalleMovimiento{" +
            "id=" + getId() +
            ", valorUnitario=" + getValorUnitario() +
            ", cantidad=" + getCantidad() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
