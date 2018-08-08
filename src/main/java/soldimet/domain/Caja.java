package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Caja.
 */
@Entity
@Table(name = "caja")
public class Caja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @NotNull
    @Column(name = "hora_apertura", nullable = false)
    private Instant horaApertura;

    @Column(name = "hora_cierre")
    private Instant horaCierre;

    @OneToMany
    @JoinColumn(name= "caja")
    @JsonIgnore
    private Set<Movimiento> movimientos = new HashSet<>();

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

    public Caja fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Instant getHoraApertura() {
        return horaApertura;
    }

    public Caja horaApertura(Instant horaApertura) {
        this.horaApertura = horaApertura;
        return this;
    }

    public void setHoraApertura(Instant horaApertura) {
        this.horaApertura = horaApertura;
    }

    public Instant getHoraCierre() {
        return horaCierre;
    }

    public Caja horaCierre(Instant horaCierre) {
        this.horaCierre = horaCierre;
        return this;
    }

    public void setHoraCierre(Instant horaCierre) {
        this.horaCierre = horaCierre;
    }

    public Set<Movimiento> getMovimientos() {
        return movimientos;
    }

    public Caja movimientos(Set<Movimiento> movimientos) {
        this.movimientos = movimientos;
        return this;
    }

    public Caja addMovimiento(Movimiento movimiento) {
        this.movimientos.add(movimiento);
        return this;
    }

    public Caja removeMovimiento(Movimiento movimiento) {
        this.movimientos.remove(movimiento);
        return this;
    }

    public void setMovimientos(Set<Movimiento> movimientos) {
        this.movimientos = movimientos;
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
        Caja caja = (Caja) o;
        if (caja.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), caja.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Caja{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", horaApertura='" + getHoraApertura() + "'" +
            ", horaCierre='" + getHoraCierre() + "'" +
            "}";
    }
}
