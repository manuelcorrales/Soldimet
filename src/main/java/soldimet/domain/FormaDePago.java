package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A FormaDePago.
 */
@Entity
@Table(name = "forma_de_pago")
public class FormaDePago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_forma_de_pago", nullable = false)
    private String nombreFormaDePago;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreFormaDePago() {
        return nombreFormaDePago;
    }

    public FormaDePago nombreFormaDePago(String nombreFormaDePago) {
        this.nombreFormaDePago = nombreFormaDePago;
        return this;
    }

    public void setNombreFormaDePago(String nombreFormaDePago) {
        this.nombreFormaDePago = nombreFormaDePago;
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
        FormaDePago formaDePago = (FormaDePago) o;
        if (formaDePago.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formaDePago.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FormaDePago{" +
            "id=" + getId() +
            ", nombreFormaDePago='" + getNombreFormaDePago() + "'" +
            "}";
    }
}
