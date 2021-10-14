package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A MedioDePagoTarjeta.
 */
@Entity
@Table(name = "medio_de_pago_tarjeta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MedioDePagoTarjeta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4)
    @Column(name = "ultimos_4", nullable = false)
    private String ultimos4;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MedioDePagoTarjeta id(Long id) {
        this.id = id;
        return this;
    }

    public String getUltimos4() {
        return this.ultimos4;
    }

    public MedioDePagoTarjeta ultimos4(String ultimos4) {
        this.ultimos4 = ultimos4;
        return this;
    }

    public void setUltimos4(String ultimos4) {
        this.ultimos4 = ultimos4;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MedioDePagoTarjeta)) {
            return false;
        }
        return id != null && id.equals(((MedioDePagoTarjeta) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MedioDePagoTarjeta{" +
            "id=" + getId() +
            ", ultimos4='" + getUltimos4() + "'" +
            "}";
    }
}
