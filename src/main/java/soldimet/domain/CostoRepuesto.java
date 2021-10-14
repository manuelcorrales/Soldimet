package soldimet.domain;

import soldimet.utils.MathUtils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CostoRepuesto.
 */
@Entity
@Table(name = "costo_repuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CostoRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "valor", nullable = false)
    private Float valor;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties("costoRepuestos")
    private EstadoCostoRepuesto estado;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JsonIgnoreProperties(value = { "estado", "marca", "tipoRepuesto" }, allowSetters = true)
    private Articulo articulo;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JsonIgnoreProperties(value = { "tipoParteMotor" }, allowSetters = true)
    private TipoRepuesto tipoRepuesto;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JsonIgnoreProperties("costoRepuestos")
    private MedidaArticulo medidaArticulo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CostoRepuesto id(Long id) {
        this.id = id;
        return this;
    }

    public Float getValor() {
        return MathUtils.roundFloat(this.valor);
    }

    public CostoRepuesto valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public EstadoCostoRepuesto getEstado() {
        return this.estado;
    }

    public CostoRepuesto estado(EstadoCostoRepuesto estadoCostoRepuesto) {
        this.setEstado(estadoCostoRepuesto);
        return this;
    }

    public void setEstado(EstadoCostoRepuesto estadoCostoRepuesto) {
        this.estado = estadoCostoRepuesto;
    }

    public Articulo getArticulo() {
        return this.articulo;
    }

    public CostoRepuesto articulo(Articulo articulo) {
        this.setArticulo(articulo);
        return this;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo;
    }

    public TipoRepuesto getTipoRepuesto() {
        return this.tipoRepuesto;
    }

    public CostoRepuesto tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.setTipoRepuesto(tipoRepuesto);
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public MedidaArticulo getMedidaArticulo() {
        return this.medidaArticulo;
    }

    public CostoRepuesto medidaArticulo(MedidaArticulo medidaArticulo) {
        this.setMedidaArticulo(medidaArticulo);
        return this;
    }

    public void setMedidaArticulo(MedidaArticulo medidaArticulo) {
        this.medidaArticulo = medidaArticulo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CostoRepuesto)) {
            return false;
        }
        return id != null && id.equals(((CostoRepuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CostoRepuesto{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            "}";
    }
}
