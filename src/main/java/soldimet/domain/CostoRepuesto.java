package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import soldimet.utils.MathUtils;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CostoRepuesto.
 */
@Entity
@Table(name = "costo_repuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CostoRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DecimalMin(value = "0")
    @Column(name = "valor")
    private Float valor;

    @Column(name = "medida")
    private String medida;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoRepuestos")
    private EstadoCostoRepuesto estado;

    @ManyToOne
    @JsonIgnoreProperties("costoRepuestos")
    private Articulo articulo;

    @ManyToOne
    @JsonIgnoreProperties("costoRepuestos")
    private TipoRepuesto tipoRepuesto;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getMedida() {
        return medida;
    }

    public CostoRepuesto medida(String medida) {
        this.medida = medida;
        return this;
    }

    public void setMedida(String medida) {
        this.medida = medida;
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

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return 31;
    }

    @Override
    public String toString() {
        return "CostoRepuesto{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", medida='" + getMedida() + "'" +
            "}";
    }
}
