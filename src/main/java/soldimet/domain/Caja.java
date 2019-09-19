package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

/**
 * A Caja.
 */
@Entity
@Table(name = "caja")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    @Column(name = "saldo")
    private Float saldo;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "saldo_fisico")
    private Float saldo_fisico;

    @ManyToOne
    @JsonIgnoreProperties("cajas")
    private Sucursal sucursal;

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

    public Float getSaldo() {
        return saldo;
    }

    public Caja saldo(Float saldo) {
        this.saldo = saldo;
        return this;
    }

    public void setSaldo(Float saldo) {
        this.saldo = saldo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Caja observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Float getSaldo_fisico() {
        return saldo_fisico;
    }

    public Caja saldo_fisico(Float saldo_fisico) {
        this.saldo_fisico = saldo_fisico;
        return this;
    }

    public void setSaldo_fisico(Float saldo_fisico) {
        this.saldo_fisico = saldo_fisico;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public Caja sucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Caja)) {
            return false;
        }
        return id != null && id.equals(((Caja) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Caja{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", horaApertura='" + getHoraApertura() + "'" +
            ", horaCierre='" + getHoraCierre() + "'" +
            ", saldo=" + getSaldo() +
            ", observaciones='" + getObservaciones() + "'" +
            ", saldo_fisico=" + getSaldo_fisico() +
            "}";
    }
}
