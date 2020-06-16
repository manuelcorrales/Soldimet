package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CostoRepuestoProveedor.
 */
@Entity
@Table(name = "costo_repuesto_proveedor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CostoRepuestoProveedor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoRepuestoProveedors")
    private TipoRepuesto tipoRepuesto;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoRepuestoProveedors")
    private Aplicacion aplicacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoRepuestoProveedors")
    private Cilindrada cilindrada;

    @ManyToOne
    @JsonIgnoreProperties("costoRepuestoProveedors")
    private Articulo articulo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoRepuesto getTipoRepuesto() {
        return tipoRepuesto;
    }

    public CostoRepuestoProveedor tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public Aplicacion getAplicacion() {
        return aplicacion;
    }

    public CostoRepuestoProveedor aplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
        return this;
    }

    public void setAplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
    }

    public Cilindrada getCilindrada() {
        return cilindrada;
    }

    public CostoRepuestoProveedor cilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
        return this;
    }

    public void setCilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
    }

    public Articulo getArticulo() {
        return articulo;
    }

    public CostoRepuestoProveedor articulo(Articulo articulo) {
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
        if (!(o instanceof CostoRepuestoProveedor)) {
            return false;
        }
        return id != null && id.equals(((CostoRepuestoProveedor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CostoRepuestoProveedor{" +
            "id=" + getId() +
            "}";
    }
}
