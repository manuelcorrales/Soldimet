package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A StockArticulo.
 */
@Entity
@Table(name = "stock_articulo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StockArticulo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties("stockArticulos")
    private MedidaArticulo medida;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JsonIgnoreProperties("stockArticulos")
    private Articulo articulo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("stockArticulos")
    private Sucursal sucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StockArticulo id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidad() {
        return this.cantidad;
    }

    public StockArticulo cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public MedidaArticulo getMedida() {
        return this.medida;
    }

    public StockArticulo medida(MedidaArticulo medidaArticulo) {
        this.setMedida(medidaArticulo);
        return this;
    }

    public void setMedida(MedidaArticulo medidaArticulo) {
        this.medida = medidaArticulo;
    }

    public Articulo getArticulo() {
        return this.articulo;
    }

    public StockArticulo articulo(Articulo articulo) {
        this.setArticulo(articulo);
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public Sucursal getSucursal() {
        return this.sucursal;
    }

    public StockArticulo sucursal(Sucursal sucursal) {
        this.setSucursal(sucursal);
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StockArticulo)) {
            return false;
        }
        return id != null && id.equals(((StockArticulo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StockArticulo{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
