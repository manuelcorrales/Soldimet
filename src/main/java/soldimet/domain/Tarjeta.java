package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Tarjeta.
 */
@Entity
@Table(name = "tarjeta")
public class Tarjeta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tarjeta", nullable = false)
    private String nombreTarjeta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreTarjeta() {
        return nombreTarjeta;
    }

    public Tarjeta nombreTarjeta(String nombreTarjeta) {
        this.nombreTarjeta = nombreTarjeta;
        return this;
    }

    public void setNombreTarjeta(String nombreTarjeta) {
        this.nombreTarjeta = nombreTarjeta;
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
        Tarjeta tarjeta = (Tarjeta) o;
        if (tarjeta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tarjeta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tarjeta{" +
            "id=" + getId() +
            ", nombreTarjeta='" + getNombreTarjeta() + "'" +
            "}";
    }
}
