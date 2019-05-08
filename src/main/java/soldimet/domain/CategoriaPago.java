package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CategoriaPago.
 */
@Entity
@Table(name = "categoria_pago")
public class CategoriaPago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_categoria_pago", nullable = false)
    private String nombreCategoriaPago;

    @OneToMany(cascade = { CascadeType.ALL }, fetch= FetchType.EAGER)
    @JoinColumn(name= "categoria_pago")
    @JsonInclude
    private Set<SubCategoria> subCategorias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCategoriaPago() {
        return nombreCategoriaPago;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CategoriaPago categoriaPago = (CategoriaPago) o;
        if (categoriaPago.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categoriaPago.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoriaPago{" +
            "id=" + getId() +
            ", nombreCategoriaPago='" + getNombreCategoriaPago() + "'" +
            "}";
    }
}
