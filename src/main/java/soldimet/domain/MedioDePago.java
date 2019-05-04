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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonInclude;

/**
 * A MedioDePago.
 */
@Entity
@Table(name = "medio_de_pago")
public class MedioDePago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @NotNull
    private FormaDePago formaDePago;

    @OneToOne(cascade = {CascadeType.ALL}, optional = true, fetch = FetchType.LAZY)
    @JoinColumn(unique = true, nullable = true, updatable=false)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private MedioDePagoCheque medioDePagoCheque;

    @OneToOne(cascade = {CascadeType.ALL}, optional = true, fetch = FetchType.LAZY)
    @JoinColumn(unique = true, nullable = true, updatable=false)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private MedioDePagoTarjeta medioDePagoTarjeta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FormaDePago getFormaDePago() {
        return formaDePago;
    }

    public MedioDePago formaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
        return this;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
    }

    public MedioDePagoCheque getMedioDePagoCheque() {
        return medioDePagoCheque;
    }

    public MedioDePago medioDePagoCheque(MedioDePagoCheque medioDePagoCheque) {
        this.medioDePagoCheque = medioDePagoCheque;
        return this;
    }

    public void setMedioDePagoCheque(MedioDePagoCheque medioDePagoCheque) {
        this.medioDePagoCheque = medioDePagoCheque;
    }

    public MedioDePagoTarjeta getMedioDePagoTarjeta() {
        return medioDePagoTarjeta;
    }

    public MedioDePago medioDePagoTarjeta(MedioDePagoTarjeta medioDePagoTarjeta) {
        this.medioDePagoTarjeta = medioDePagoTarjeta;
        return this;
    }

    public void setMedioDePagoTarjeta(MedioDePagoTarjeta medioDePagoTarjeta) {
        this.medioDePagoTarjeta = medioDePagoTarjeta;
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
        MedioDePago medioDePago = (MedioDePago) o;
        if (medioDePago.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medioDePago.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedioDePago{" +
            "id=" + getId() +
            "}";
    }
}
