package soldimet.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

/**
 * A CostoRepuesto.
 */
@Entity
@Table(name = "costo_repuesto")
public class CostoRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "valor", nullable = false)
    private Float valor;

    @ManyToOne(optional = false, cascade={CascadeType.DETACH, CascadeType.MERGE}, fetch=FetchType.EAGER)
    @NotNull
    private TipoRepuesto tipoRepuesto;

    @ManyToOne(optional = false, cascade={CascadeType.DETACH, CascadeType.MERGE}, fetch=FetchType.EAGER)
    private Articulo articulo;

    @ManyToOne(cascade={CascadeType.DETACH, CascadeType.MERGE}, fetch=FetchType.EAGER)
    @NotNull
    private Proveedor proveedor;

    @ManyToOne(optional = false, cascade={CascadeType.DETACH, CascadeType.MERGE}, fetch=FetchType.EAGER)
    @NotNull
    private EstadoCostoRepuesto estado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValor() {
        return valor;
    }

    public CostoRepuesto valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public TipoRepuesto getTipoRepuesto() {
        return tipoRepuesto;
    }

    public CostoRepuesto tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public Articulo getArticulo() {
        return articulo;
    }

    public CostoRepuesto articulo(Articulo articulo) {
        this.articulo = articulo;
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public CostoRepuesto proveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
        return this;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }

    public EstadoCostoRepuesto getEstado() {
        return estado;
    }

    public CostoRepuesto estado(EstadoCostoRepuesto estadoCostoRepuesto) {
        this.estado = estadoCostoRepuesto;
        return this;
    }

    public void setEstado(EstadoCostoRepuesto estadoCostoRepuesto) {
        this.estado = estadoCostoRepuesto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        CostoRepuesto costoRepuesto = (CostoRepuesto) o;
        if (costoRepuesto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costoRepuesto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostoRepuesto{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", articulo=" + getArticulo() +
            ", proveedor=" + getProveedor() +
            "}";
    }
}
