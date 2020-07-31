package soldimet.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

/**
 * A SubCategoria.
 */
@Entity
@Table(name = "sub_categoria")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubCategoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_sub_categoria", nullable = false)
    private String nombreSubCategoria;

    @ManyToOne(optional = false, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(name="categoria_pago", nullable=false)
    @JsonIgnore
    private CategoriaPago categoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreSubCategoria() {
        return nombreSubCategoria;
    }

    public SubCategoria nombreSubCategoria(String nombreSubCategoria) {
        this.nombreSubCategoria = nombreSubCategoria;
        return this;
    }

    public void setNombreSubCategoria(String nombreSubCategoria) {
        this.nombreSubCategoria = nombreSubCategoria;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public CategoriaPago getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaPago categoria) {
        this.categoria = categoria;
    }

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
        return 31;
    }

    @Override
    public String toString() {
        return "SubCategoria{" +
            "id=" + getId() +
            ", nombreSubCategoria='" + getNombreSubCategoria() + "'" +
            "}";
    }
}
