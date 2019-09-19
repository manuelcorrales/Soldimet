package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A MedioDePago.
 */
@Entity
@Table(name = "medio_de_pago")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MedioDePago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @NotNull
    @JsonIgnoreProperties("medioDePagos")
    private FormaDePago formaDePago;

    @OneToOne(cascade = {CascadeType.ALL}, optional = true, fetch = FetchType.LAZY)
    @JoinColumn(unique = true, nullable = true)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private MedioDePagoCheque medioDePagoCheque;

    @OneToOne(cascade = {CascadeType.ALL}, optional = true, fetch = FetchType.LAZY)
    @JoinColumn(unique = true, nullable = true)
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
        if (!(o instanceof MedioDePago)) {
            return false;
        }
        return id != null && id.equals(((MedioDePago) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MedioDePago{" +
            "id=" + getId() +
            "}";
    }
}
