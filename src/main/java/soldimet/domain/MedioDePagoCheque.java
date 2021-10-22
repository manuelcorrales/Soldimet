package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MedioDePagoCheque.
 */
@Entity
@Table(name = "medio_de_pago_cheque")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MedioDePagoCheque implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "numero_cheque", nullable = false)
    private String numeroCheque;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties("medioDePagoCheques")
    private Banco banco;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MedioDePagoCheque id(Long id) {
        this.id = id;
        return this;
    }

    public String getNumeroCheque() {
        return this.numeroCheque;
    }

    public MedioDePagoCheque numeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
        return this;
    }

    public void setNumeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
    }

    public Banco getBanco() {
        return this.banco;
    }

    public MedioDePagoCheque banco(Banco banco) {
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
        if (!(o instanceof MedioDePagoCheque)) {
            return false;
        }
        return id != null && id.equals(((MedioDePagoCheque) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MedioDePagoCheque{" +
            "id=" + getId() +
            ", numeroCheque='" + getNumeroCheque() + "'" +
            "}";
    }
}
