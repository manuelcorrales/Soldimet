package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MedioDePago.
 */
@Entity
@Table(name = "medio_de_pago")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MedioDePago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, cascade = { CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties("medioDePagos")
    private FormaDePago formaDePago;

    @OneToOne(cascade = { CascadeType.ALL }, optional = true, fetch = FetchType.EAGER)
    @JoinColumn(unique = true, nullable = true)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private MedioDePagoCheque medioDePagoCheque;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MedioDePago id(Long id) {
        this.id = id;
        return this;
    }

    public MedioDePagoCheque getMedioDePagoCheque() {
        return this.medioDePagoCheque;
    }

    public MedioDePago medioDePagoCheque(MedioDePagoCheque medioDePagoCheque) {
        this.setMedioDePagoCheque(medioDePagoCheque);
        return this;
    }

    public void setMedioDePagoCheque(MedioDePagoCheque medioDePagoCheque) {
        this.medioDePagoCheque = medioDePagoCheque;
    }

    public FormaDePago getFormaDePago() {
        return this.formaDePago;
    }

    public MedioDePago formaDePago(FormaDePago formaDePago) {
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
        if (!(o instanceof MedioDePago)) {
            return false;
        }
        return id != null && id.equals(((MedioDePago) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MedioDePago{" +
            "id=" + getId() +
            "}";
    }
}
