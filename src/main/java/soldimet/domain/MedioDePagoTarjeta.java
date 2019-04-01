package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MedioDePagoTarjeta.
 */
@Entity
@Table(name = "medio_de_pago_tarjeta")
public class MedioDePagoTarjeta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4)
    @Column(name = "ultimos_4", nullable = false)
    private String ultimos4;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Tarjeta tarjeta;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private TipoTarjeta tipoTarjeta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUltimos4() {
        return ultimos4;
    }

    public MedioDePagoTarjeta ultimos4(String ultimos4) {
        this.ultimos4 = ultimos4;
        return this;
    }

    public void setUltimos4(String ultimos4) {
        this.ultimos4 = ultimos4;
    }

    public Tarjeta getTarjeta() {
        return tarjeta;
    }

    public MedioDePagoTarjeta tarjeta(Tarjeta tarjeta) {
        this.tarjeta = tarjeta;
        return this;
    }

    public void setTarjeta(Tarjeta tarjeta) {
        this.tarjeta = tarjeta;
    }

    public TipoTarjeta getTipoTarjeta() {
        return tipoTarjeta;
    }

    public MedioDePagoTarjeta tipoTarjeta(TipoTarjeta tipoTarjeta) {
        this.tipoTarjeta = tipoTarjeta;
        return this;
    }

    public void setTipoTarjeta(TipoTarjeta tipoTarjeta) {
        this.tipoTarjeta = tipoTarjeta;
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
        MedioDePagoTarjeta medioDePagoTarjeta = (MedioDePagoTarjeta) o;
        if (medioDePagoTarjeta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medioDePagoTarjeta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedioDePagoTarjeta{" +
            "id=" + getId() +
            ", ultimos4='" + getUltimos4() + "'" +
            "}";
    }
}
