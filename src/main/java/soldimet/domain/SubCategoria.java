package soldimet.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SubCategoria.
 */
@Entity
@Table(name = "sub_categoria")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SubCategoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_sub_categoria", nullable = false)
    private String nombreSubCategoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SubCategoria id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreSubCategoria() {
        return this.nombreSubCategoria;
    }

    public SubCategoria nombreSubCategoria(String nombreSubCategoria) {
        this.nombreSubCategoria = nombreSubCategoria;
        return this;
    }

    public void setNombreSubCategoria(String nombreSubCategoria) {
        this.nombreSubCategoria = nombreSubCategoria;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubCategoria)) {
            return false;
        }
        return id != null && id.equals(((SubCategoria) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubCategoria{" +
            "id=" + getId() +
            ", nombreSubCategoria='" + getNombreSubCategoria() + "'" +
            "}";
    }
}
