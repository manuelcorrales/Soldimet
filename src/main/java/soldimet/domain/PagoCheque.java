package soldimet.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PagoCheque.
 */
@Entity
@Table(name = "pago_cheque")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    public String getNumeroCheque() {
        return numeroCheque;
    }

    public PagoCheque numeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
        return this;
    }

    public void setNumeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
    }

    public Banco getBanco() {
        return banco;
    }

    public PagoCheque banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }

    public FormaDePago getFormaDePago() {
        return formaDePago;
    }

    public PagoCheque formaDePago(FormaDePago formaDePago) {
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
        if (!(o instanceof PagoCheque)) {
            return false;
        }
        return id != null && id.equals(((PagoCheque) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PagoCheque{" +
            "id=" + getId() +
            ", numeroCheque='" + getNumeroCheque() + "'" +
            "}";
    }
}
