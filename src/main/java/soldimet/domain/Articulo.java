package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import soldimet.utils.MathUtils;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Articulo.
 */
@Entity
@Table(name = "articulo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    @ManyToOne(optional = false, cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @NotNull
    @JsonIgnoreProperties("articulos")
    private EstadoArticulo estado;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JsonIgnoreProperties("articulos")
    private Marca marca;

    @ManyToOne(optional = false, cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @NotNull
    @JsonIgnoreProperties("articulos")
    private TipoRepuesto tipoRepuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoArticuloProveedor() {
        return codigoArticuloProveedor;
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
        return fechaCosto;
    }

    public Articulo fechaCosto(LocalDate fechaCosto) {
        this.fechaCosto = fechaCosto;
        return this;
    }

    public void setFechaCosto(LocalDate fechaCosto) {
        this.fechaCosto = fechaCosto;
    }

    public EstadoArticulo getEstado() {
        return estado;
    }

    public Articulo estado(EstadoArticulo estadoArticulo) {
        this.estado = estadoArticulo;
        return this;
    }

    public void setEstado(EstadoArticulo estadoArticulo) {
        this.estado = estadoArticulo;
    }

    public Marca getMarca() {
        return marca;
    }

    public Articulo marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public TipoRepuesto getTipoRepuesto() {
        return tipoRepuesto;
    }

    public Articulo tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return 31;
    }

    @Override
    public String toString() {
        return "Articulo{" +
            "id=" + getId() +
            ", codigoArticuloProveedor='" + getCodigoArticuloProveedor() + "'" +
            ", valor=" + getValor() +
            ", fechaCosto='" + getFechaCosto() + "'" +
            "}";
    }
}
