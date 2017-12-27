package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DetallePedido.
 */
@Entity
@Table(name = "detalle_pedido")
public class DetallePedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 1)
    @Column(name = "cantidad_articulo", nullable = false)
    private Integer cantidadArticulo;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "precio_respuesto", nullable = false)
    private Float precioRespuesto;

    @ManyToOne(optional = false)
    @NotNull
    private Articulo articulo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidadArticulo() {
        return cantidadArticulo;
    }

    public DetallePedido cantidadArticulo(Integer cantidadArticulo) {
        this.cantidadArticulo = cantidadArticulo;
        return this;
    }

    public void setCantidadArticulo(Integer cantidadArticulo) {
        this.cantidadArticulo = cantidadArticulo;
    }

    public Float getPrecioRespuesto() {
        return precioRespuesto;
    }

    public DetallePedido precioRespuesto(Float precioRespuesto) {
        this.precioRespuesto = precioRespuesto;
        return this;
    }

    public void setPrecioRespuesto(Float precioRespuesto) {
        this.precioRespuesto = precioRespuesto;
    }

    public Articulo getArticulo() {
        return articulo;
    }

    public DetallePedido articulo(Articulo articulo) {
        this.articulo = articulo;
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
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
        DetallePedido detallePedido = (DetallePedido) o;
        if (detallePedido.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), detallePedido.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DetallePedido{" +
            "id=" + getId() +
            ", cantidadArticulo='" + getCantidadArticulo() + "'" +
            ", precioRespuesto='" + getPrecioRespuesto() + "'" +
            "}";
    }
}
