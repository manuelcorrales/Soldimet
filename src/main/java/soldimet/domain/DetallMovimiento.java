package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DetallMovimiento.
 */
@Entity
@Table(name = "detall_movimiento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DetallMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private MedidaArticulo medida;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DetallMovimiento id(Long id) {
        this.id = id;
        return this;
    }

    public MedidaArticulo getMedida() {
        return this.medida;
    }

    public DetallMovimiento medida(MedidaArticulo medidaArticulo) {
        this.setMedida(medidaArticulo);
        return this;
    }

    public void setMedida(MedidaArticulo medidaArticulo) {
        this.medida = medidaArticulo;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetallMovimiento)) {
            return false;
        }
        return id != null && id.equals(((DetallMovimiento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetallMovimiento{" +
            "id=" + getId() +
            "}";
    }
}
