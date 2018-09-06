package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CostoOperacion.
 */
@Entity
@Table(name = "costo_operacion")
public class CostoOperacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "costo_operacion", nullable = false)
    private Float costoOperacion;

    @ManyToOne(optional = false, cascade = { CascadeType.PERSIST, CascadeType.DETACH })
    @NotNull
    @JsonIgnoreProperties("")
    private Cilindrada cilindrada;

    @ManyToOne(optional = false, cascade = { CascadeType.PERSIST, CascadeType.DETACH })
    @NotNull
    @JsonIgnoreProperties("")
    private Operacion operacion;

    @ManyToOne(optional = false, cascade = { CascadeType.PERSIST, CascadeType.DETACH })
    @NotNull
    @JsonIgnoreProperties("")
    private TipoParteMotor tipoParteMotor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCostoOperacion() {
        return costoOperacion;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CostoOperacion costoOperacion = (CostoOperacion) o;
        if (costoOperacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costoOperacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostoOperacion{" +
            "id=" + getId() +
            ", costoOperacion=" + getCostoOperacion() +
            "}";
    }
}
