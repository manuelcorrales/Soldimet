package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Banco.
 */
@Entity
@Table(name = "banco")
public class Banco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_banco", nullable = false)
    private String nombreBanco;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreBanco() {
        return nombreBanco;
    }

    public Banco nombreBanco(String nombreBanco) {
        this.nombreBanco = nombreBanco;
        return this;
    }

    public void setNombreBanco(String nombreBanco) {
        this.nombreBanco = nombreBanco;
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
        Banco banco = (Banco) o;
        if (banco.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), banco.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Banco{" +
            "id=" + getId() +
            ", nombreBanco='" + getNombreBanco() + "'" +
            "}";
    }
}
