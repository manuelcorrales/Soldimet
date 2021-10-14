package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Banco.
 */
@Entity
@Table(name = "banco")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Banco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_banco", nullable = false)
    private String nombreBanco;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Banco id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreBanco() {
        return this.nombreBanco;
    }

    public Banco nombreBanco(String nombreBanco) {
        this.nombreBanco = nombreBanco;
        return this;
    }

    public void setNombreBanco(String nombreBanco) {
        this.nombreBanco = nombreBanco;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Banco)) {
            return false;
        }
        return id != null && id.equals(((Banco) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Banco{" +
            "id=" + getId() +
            ", nombreBanco='" + getNombreBanco() + "'" +
            "}";
    }
}
