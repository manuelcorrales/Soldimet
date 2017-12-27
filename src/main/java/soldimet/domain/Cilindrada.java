package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Cilindrada.
 */
@Entity
@Table(name = "cilindrada")
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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidadDeCilindros() {
        return cantidadDeCilindros;
    }

    public Cilindrada cantidadDeCilindros(Integer cantidadDeCilindros) {
        this.cantidadDeCilindros = cantidadDeCilindros;
        return this;
    }

    public void setCantidadDeCilindros(Integer cantidadDeCilindros) {
        this.cantidadDeCilindros = cantidadDeCilindros;
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
        Cilindrada cilindrada = (Cilindrada) o;
        if (cilindrada.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cilindrada.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cilindrada{" +
            "id=" + getId() +
            ", cantidadDeCilindros='" + getCantidadDeCilindros() + "'" +
            "}";
    }
}
