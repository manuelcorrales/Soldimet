package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import soldimet.utils.MathUtils;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CostoOperacion.
 */
@Entity
@Table(name = "costo_operacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CostoOperacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "costo_operacion", nullable = false)
    private Float costoOperacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoOperacions")
    private Cilindrada cilindrada;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoOperacions")
    private Operacion operacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("costoOperacions")
    private TipoParteMotor tipoParteMotor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCostoOperacion() {
        return MathUtils.roundFloat(this.costoOperacion);
    }

    public CostoOperacion costoOperacion(Float costoOperacion) {
        this.costoOperacion = costoOperacion;
        return this;
    }

    public void setCostoOperacion(Float costoOperacion) {
        this.costoOperacion = costoOperacion;
    }

    public Cilindrada getCilindrada() {
        return cilindrada;
    }

    public CostoOperacion cilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
        return this;
    }

    public void setCilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
    }

    public Operacion getOperacion() {
        return operacion;
    }

    public CostoOperacion operacion(Operacion operacion) {
        this.operacion = operacion;
        return this;
    }

    public void setOperacion(Operacion operacion) {
        this.operacion = operacion;
    }

    public TipoParteMotor getTipoParteMotor() {
        return tipoParteMotor;
    }

    public CostoOperacion tipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
        return this;
    }

    public void setTipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CostoOperacion)) {
            return false;
        }
        return id != null && id.equals(((CostoOperacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CostoOperacion{" +
            "id=" + getId() +
            ", costoOperacion=" + getCostoOperacion() +
            "}";
    }
}
