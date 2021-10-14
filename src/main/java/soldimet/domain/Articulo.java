package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import soldimet.utils.MathUtils;

/**
 * A Articulo.
 */
@Entity
@Table(name = "articulo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Articulo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_articulo_proveedor")
    private String codigoArticuloProveedor;

    @NotNull
    @Column(name = "valor", nullable = false)
    private Float valor;

    @Column(name = "fecha_costo", columnDefinition = "DATE")
    private LocalDate fechaCosto;

    @Column(name = "costo_proveedor")
    private Float costoProveedor;

    @Column(name = "fecha_costo_proveedor", columnDefinition = "DATE")
    private LocalDate fechaCostoProveedor;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties("articulos")
    private EstadoArticulo estado;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JsonIgnoreProperties("articulos")
    private Marca marca;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties(value = { "tipoParteMotor" }, allowSetters = true)
    private TipoRepuesto tipoRepuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Articulo id(Long id) {
        this.id = id;
        return this;
    }

    public String getCodigoArticuloProveedor() {
        return this.codigoArticuloProveedor;
    }

    public Articulo codigoArticuloProveedor(String codigoArticuloProveedor) {
        this.codigoArticuloProveedor = codigoArticuloProveedor;
        return this;
    }

    public void setCodigoArticuloProveedor(String codigoArticuloProveedor) {
        this.codigoArticuloProveedor = codigoArticuloProveedor;
    }

    public Float getValor() {
        return MathUtils.roundFloat(this.valor);
    }

    public Articulo valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public LocalDate getFechaCosto() {
        return this.fechaCosto;
    }

    public Articulo fechaCosto(LocalDate fechaCosto) {
        this.fechaCosto = fechaCosto;
        return this;
    }

    public void setFechaCosto(LocalDate fechaCosto) {
        this.fechaCosto = fechaCosto;
    }

    public Float getCostoProveedor() {
        return this.costoProveedor;
    }

    public Articulo costoProveedor(Float costoProveedor) {
        this.costoProveedor = costoProveedor;
        return this;
    }

    public void setCostoProveedor(Float costoProveedor) {
        this.costoProveedor = costoProveedor;
    }

    public LocalDate getFechaCostoProveedor() {
        return this.fechaCostoProveedor;
    }

    public Articulo fechaCostoProveedor(LocalDate fechaCostoProveedor) {
        this.fechaCostoProveedor = fechaCostoProveedor;
        return this;
    }

    public void setFechaCostoProveedor(LocalDate fechaCostoProveedor) {
        this.fechaCostoProveedor = fechaCostoProveedor;
    }

    public EstadoArticulo getEstado() {
        return this.estado;
    }

    public Articulo estado(EstadoArticulo estadoArticulo) {
        this.setEstado(estadoArticulo);
        return this;
    }

    public void setEstado(EstadoArticulo estadoArticulo) {
        this.estado = estadoArticulo;
    }

    public Marca getMarca() {
        return this.marca;
    }

    public Articulo marca(Marca marca) {
        this.setMarca(marca);
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public TipoRepuesto getTipoRepuesto() {
        return this.tipoRepuesto;
    }

    public Articulo tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.setTipoRepuesto(tipoRepuesto);
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Articulo)) {
            return false;
        }
        return id != null && id.equals(((Articulo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Articulo{" +
            "id=" + getId() +
            ", codigoArticuloProveedor='" + getCodigoArticuloProveedor() + "'" +
            ", valor=" + getValor() +
            ", fechaCosto='" + getFechaCosto() + "'" +
            ", costoProveedor=" + getCostoProveedor() +
            ", fechaCostoProveedor='" + getFechaCostoProveedor() + "'" +
            "}";
    }
}
