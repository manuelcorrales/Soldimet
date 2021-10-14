package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MovimientoArticulo.
 */
@Entity
@Table(name = "movimiento_articulo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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
    @JsonIgnoreProperties(value = { "estado", "marca", "tipoRepuesto" }, allowSetters = true)
    private Articulo articulo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("movimientoArticulos")
    private Movimiento movimiento;

    @ManyToOne
    @JsonIgnoreProperties("movimientoArticulos")
    private MedidaArticulo medida;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MovimientoArticulo id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidad() {
        return this.cantidad;
    }

    public MovimientoArticulo cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Articulo getArticulo() {
        return this.articulo;
    }

    public MovimientoArticulo articulo(Articulo articulo) {
        this.setArticulo(articulo);
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public Movimiento getMovimiento() {
        return this.movimiento;
    }

    public MovimientoArticulo movimiento(Movimiento movimiento) {
        this.setMovimiento(movimiento);
        return this;
    }

    public void setMovimiento(Movimiento movimiento) {
        this.movimiento = movimiento;
    }

    public MedidaArticulo getMedida() {
        return this.medida;
    }

    public MovimientoArticulo medida(MedidaArticulo medidaArticulo) {
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
        if (!(o instanceof MovimientoArticulo)) {
            return false;
        }
        return id != null && id.equals(((MovimientoArticulo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MovimientoArticulo{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
