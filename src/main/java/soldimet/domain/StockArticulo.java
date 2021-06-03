package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A StockArticulo.
 */
@Entity
@Table(name = "stock_articulo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    public Integer getCantidad() {
        return cantidad;
    }

    public StockArticulo cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public MedidaArticulo getMedida() {
        return medida;
    }

    public StockArticulo medida(MedidaArticulo medidaArticulo) {
        this.medida = medidaArticulo;
        return this;
    }

    public void setMedida(MedidaArticulo medidaArticulo) {
        this.medida = medidaArticulo;
    }

    public Articulo getArticulo() {
        return articulo;
    }

    public StockArticulo articulo(Articulo articulo) {
        this.articulo = articulo;
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public StockArticulo sucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StockArticulo)) {
            return false;
        }
        return id != null && id.equals(((StockArticulo) o).id) &&
                medida != null && medida.equals(((StockArticulo) o).medida) &&
                articulo != null && articulo.equals(((StockArticulo) o).articulo);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StockArticulo{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
