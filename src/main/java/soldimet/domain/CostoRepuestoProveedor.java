package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CostoRepuestoProveedor.
 */
@Entity
@Table(name = "costo_repuesto_proveedor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CostoRepuestoProveedor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "tipoParteMotor" }, allowSetters = true)
    private TipoRepuesto tipoRepuesto;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "motor" }, allowSetters = true)
    private Aplicacion aplicacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoRepuestoProveedors")
    private Cilindrada cilindrada;

    @ManyToOne
    @JsonIgnoreProperties(value = { "estado", "marca", "tipoRepuesto" }, allowSetters = true)
    private Articulo articulo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CostoRepuestoProveedor id(Long id) {
        this.id = id;
        return this;
    }

    public TipoRepuesto getTipoRepuesto() {
        return this.tipoRepuesto;
    }

    public CostoRepuestoProveedor tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.setTipoRepuesto(tipoRepuesto);
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public Aplicacion getAplicacion() {
        return this.aplicacion;
    }

    public CostoRepuestoProveedor aplicacion(Aplicacion aplicacion) {
        this.setAplicacion(aplicacion);
        return this;
    }

    public void setAplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
    }

    public Cilindrada getCilindrada() {
        return this.cilindrada;
    }

    public CostoRepuestoProveedor cilindrada(Cilindrada cilindrada) {
        this.setCilindrada(cilindrada);
        return this;
    }

    public void setCilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
    }

    public Articulo getArticulo() {
        return this.articulo;
    }

    public CostoRepuestoProveedor articulo(Articulo articulo) {
        this.setArticulo(articulo);
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CostoRepuestoProveedor{" +
            "id=" + getId() +
            "}";
    }
}
