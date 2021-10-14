package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cilindrada.
 */
@Entity
@Table(name = "cilindrada")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cilindrada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 1)
    @Max(value = 20)
    @Column(name = "cantidad_de_cilindros", nullable = false)
    private Integer cantidadDeCilindros;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cilindrada id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getCantidadDeCilindros() {
        return this.cantidadDeCilindros;
    }

    public Cilindrada cantidadDeCilindros(Integer cantidadDeCilindros) {
        this.cantidadDeCilindros = cantidadDeCilindros;
        return this;
    }

    public void setCantidadDeCilindros(Integer cantidadDeCilindros) {
        this.cantidadDeCilindros = cantidadDeCilindros;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cilindrada)) {
            return false;
        }
        return id != null && id.equals(((Cilindrada) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cilindrada{" +
            "id=" + getId() +
            ", cantidadDeCilindros=" + getCantidadDeCilindros() +
            "}";
    }
}
