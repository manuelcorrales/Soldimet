package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TipoTarjeta.
 */
@Entity
@Table(name = "tipo_tarjeta")
public class TipoTarjeta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nombre_tipo_tarjeta", nullable = false)
    private String nombreTipoTarjeta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreTipoTarjeta() {
        return nombreTipoTarjeta;
    }

    public TipoTarjeta nombreTipoTarjeta(String nombreTipoTarjeta) {
        this.nombreTipoTarjeta = nombreTipoTarjeta;
        return this;
    }

    public void setNombreTipoTarjeta(String nombreTipoTarjeta) {
        this.nombreTipoTarjeta = nombreTipoTarjeta;
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
        TipoTarjeta tipoTarjeta = (TipoTarjeta) o;
        if (tipoTarjeta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoTarjeta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoTarjeta{" +
            "id=" + getId() +
            ", nombreTipoTarjeta='" + getNombreTipoTarjeta() + "'" +
            "}";
    }
}
