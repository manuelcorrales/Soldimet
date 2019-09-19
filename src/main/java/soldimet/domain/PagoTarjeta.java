package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A PagoTarjeta.
 */
@Entity
@Table(name = "pago_tarjeta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PagoTarjeta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "numero_tarjeta", nullable = false)
    private String numeroTarjeta;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private FormaDePago formaDePago;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pagoTarjetas")
    private Tarjeta tarjeta;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pagoTarjetas")
    private TipoTarjeta tipoTarjeta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public PagoTarjeta numeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
        return this;
    }

    public void setNumeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public FormaDePago getFormaDePago() {
        return formaDePago;
    }

    public PagoTarjeta formaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
        return this;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
    }

    public Tarjeta getTarjeta() {
        return tarjeta;
    }

    public PagoTarjeta tarjeta(Tarjeta tarjeta) {
        this.tarjeta = tarjeta;
        return this;
    }

    public void setTarjeta(Tarjeta tarjeta) {
        this.tarjeta = tarjeta;
    }

    public TipoTarjeta getTipoTarjeta() {
        return tipoTarjeta;
    }

    public PagoTarjeta tipoTarjeta(TipoTarjeta tipoTarjeta) {
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
        if (!(o instanceof PagoTarjeta)) {
            return false;
        }
        return id != null && id.equals(((PagoTarjeta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PagoTarjeta{" +
            "id=" + getId() +
            ", numeroTarjeta='" + getNumeroTarjeta() + "'" +
            "}";
    }
}
