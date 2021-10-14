package soldimet.domain;

import soldimet.utils.MathUtils;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


/**
 * A Caja.
 */
@Entity
@Table(name = "caja")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Caja implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false, columnDefinition = "DATE")
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
    private Float saldoFisico;

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

    public Caja id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public Caja fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Instant getHoraApertura() {
        return this.horaApertura;
    }

    public Caja horaApertura(Instant horaApertura) {
        this.horaApertura = horaApertura;
        return this;
    }

    public void setHoraApertura(Instant horaApertura) {
        this.horaApertura = horaApertura;
    }

    public Instant getHoraCierre() {
        return this.horaCierre;
    }

    public Caja horaCierre(Instant horaCierre) {
        this.horaCierre = horaCierre;
        return this;
    }

    public void setHoraCierre(Instant horaCierre) {
        this.horaCierre = horaCierre;
    }

    public Float getSaldo() {
        return MathUtils.roundFloat(this.saldo);
    }

    public Caja saldo(Float saldo) {
        this.saldo = saldo;
        return this;
    }

    public void setSaldo(Float saldo) {
        this.saldo = saldo;
    }

    public String getObservaciones() {
        return this.observaciones;
    }

    public Caja observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Float getSaldoFisico() {
        return MathUtils.roundFloat(this.saldoFisico);
    }

    public Caja saldoFisico(Float saldoFisico) {
        this.saldoFisico = saldoFisico;
        return this;
    }

    public void setSaldoFisico(Float saldoFisico) {
        this.saldoFisico = saldoFisico;
    }

    public Sucursal getSucursal() {
        return this.sucursal;
    }

    public Caja sucursal(Sucursal sucursal) {
        this.setSucursal(sucursal);
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

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
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Caja{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", horaApertura='" + getHoraApertura() + "'" +
            ", horaCierre='" + getHoraCierre() + "'" +
            ", saldo=" + getSaldo() +
            ", observaciones='" + getObservaciones() + "'" +
            ", saldoFisico=" + getSaldoFisico() +
            "}";
    }
}
