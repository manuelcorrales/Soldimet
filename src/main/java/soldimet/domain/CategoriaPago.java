package soldimet.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CategoriaPago.
 */
@Entity
@Table(name = "categoria_pago")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CategoriaPago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_categoria_pago", nullable = false)
    private String nombreCategoriaPago;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_pago")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubCategoria> subCategorias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CategoriaPago id(Long id) {
        this.id = id;
        return this;
    }

    public String getNombreCategoriaPago() {
        return this.nombreCategoriaPago;
    }

    public CategoriaPago nombreCategoriaPago(String nombreCategoriaPago) {
        this.nombreCategoriaPago = nombreCategoriaPago;
        return this;
    }

    public void setNombreCategoriaPago(String nombreCategoriaPago) {
        this.nombreCategoriaPago = nombreCategoriaPago;
    }

    public Set<SubCategoria> getSubCategorias() {
        return subCategorias;
    }

    public CategoriaPago subCategorias(Set<SubCategoria> subCategorias) {
        this.subCategorias = subCategorias;
        return this;
    }

    public CategoriaPago addSubCategoria(SubCategoria subCategoria) {
        this.subCategorias.add(subCategoria);
        return this;
    }

    public CategoriaPago removeSubCategoria(SubCategoria subCategoria) {
        this.subCategorias.remove(subCategoria);
        return this;
    }

    public void setSubCategorias(Set<SubCategoria> subCategorias) {
        this.subCategorias = subCategorias;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CategoriaPago)) {
            return false;
        }
        return id != null && id.equals(((CategoriaPago) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CategoriaPago{" +
            "id=" + getId() +
            ", nombreCategoriaPago='" + getNombreCategoriaPago() + "'" +
            "}";
    }
}
