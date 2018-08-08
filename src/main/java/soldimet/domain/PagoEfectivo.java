package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PagoEfectivo.
 */
@Entity
@Table(name = "pago_efectivo")
public class PagoEfectivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private FormaDePago formaDePago;

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

    public PagoEfectivo formaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
        return this;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
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
        PagoEfectivo pagoEfectivo = (PagoEfectivo) o;
        if (pagoEfectivo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pagoEfectivo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PagoEfectivo{" +
            "id=" + getId() +
            "}";
    }
}
