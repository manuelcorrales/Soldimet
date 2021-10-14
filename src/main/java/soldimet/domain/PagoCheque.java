package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PagoCheque.
 */
@Entity
@Table(name = "pago_cheque")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PagoCheque implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "numero_cheque", nullable = false)
    private String numeroCheque;

    @ManyToOne(optional = false)
    @NotNull
    private Banco banco;

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

    public PagoCheque id(Long id) {
        this.id = id;
        return this;
    }

    public String getNumeroCheque() {
        return this.numeroCheque;
    }

    public PagoCheque numeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
        return this;
    }

    public void setNumeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
    }

    public FormaDePago getFormaDePago() {
        return this.formaDePago;
    }

    public PagoCheque formaDePago(FormaDePago formaDePago) {
        this.setFormaDePago(formaDePago);
        return this;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
    }

    public Banco getBanco() {
        return this.banco;
    }

    public PagoCheque banco(Banco banco) {
        this.setBanco(banco);
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PagoCheque)) {
            return false;
        }
        return id != null && id.equals(((PagoCheque) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PagoCheque{" +
            "id=" + getId() +
            ", numeroCheque='" + getNumeroCheque() + "'" +
            "}";
    }
}
