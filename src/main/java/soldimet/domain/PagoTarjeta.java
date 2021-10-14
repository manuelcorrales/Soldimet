package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PagoTarjeta.
 */
@Entity
@Table(name = "pago_tarjeta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PagoTarjeta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private FormaDePago formaDePago;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PagoTarjeta id(Long id) {
        this.id = id;
        return this;
    }

    public FormaDePago getFormaDePago() {
        return this.formaDePago;
    }

    public PagoTarjeta formaDePago(FormaDePago formaDePago) {
        this.setFormaDePago(formaDePago);
        return this;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PagoTarjeta{" +
            "id=" + getId() +
            "}";
    }
}
