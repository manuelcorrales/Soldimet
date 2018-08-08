package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Articulo.
 */
@Entity
@Table(name = "articulo")
public class Articulo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Size(min = 2, max = 20)
    @Column(name = "codigo_articulo_proveedor", length = 20)
    private String codigoArticuloProveedor;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private EstadoArticulo estado;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Marca marca;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private TipoRepuesto tipoRepuesto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Articulo descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Articulo articulo = (Articulo) o;
        if (articulo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articulo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Articulo{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", codigoArticuloProveedor='" + getCodigoArticuloProveedor() + "'" +
            "}";
    }
}
