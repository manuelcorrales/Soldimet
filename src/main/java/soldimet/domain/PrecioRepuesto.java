package soldimet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A PrecioRepuesto.
 */
@Entity
@Table(name = "precio_repuesto")
public class PrecioRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @DecimalMin(value = "0")
    @Column(name = "precio_privado")
    private Float precioPrivado;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "precio_publico", nullable = false)
    private Float precioPublico;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public PrecioRepuesto fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Float getPrecioPrivado() {
        return precioPrivado;
    }

    public PrecioRepuesto precioPrivado(Float precioPrivado) {
        this.precioPrivado = precioPrivado;
        return this;
    }

    public void setPrecioPrivado(Float precioPrivado) {
        this.precioPrivado = precioPrivado;
    }

    public Float getPrecioPublico() {
        return precioPublico;
    }

    public PrecioRepuesto precioPublico(Float precioPublico) {
        this.precioPublico = precioPublico;
        return this;
    }

    public void setPrecioPublico(Float precioPublico) {
        this.precioPublico = precioPublico;
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
        PrecioRepuesto precioRepuesto = (PrecioRepuesto) o;
        if (precioRepuesto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), precioRepuesto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PrecioRepuesto{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", precioPrivado=" + getPrecioPrivado() +
            ", precioPublico=" + getPrecioPublico() +
            "}";
    }
}
