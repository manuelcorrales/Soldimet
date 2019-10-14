package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A MedioDePagoCheque.
 */
@Entity
@Table(name = "medio_de_pago_cheque")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MedioDePagoCheque implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_recibo", columnDefinition = "DATE")
    private LocalDate fechaRecibo;

    @Column(name = "fecha_cobro", columnDefinition = "DATE")
    private LocalDate fechaCobro;

    @NotNull
    @Column(name = "numero_cheque", nullable = false)
    private String numeroCheque;

    @Column(name = "numero_cuenta")
    private String numeroCuenta;

    @ManyToOne(optional = false, cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @NotNull
    @JsonIgnoreProperties("medioDePagoCheques")
    private Banco banco;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaRecibo() {
        return fechaRecibo;
    }

    public MedioDePagoCheque fechaRecibo(LocalDate fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
        return this;
    }

    public void setFechaRecibo(LocalDate fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
    }

    public LocalDate getFechaCobro() {
        return fechaCobro;
    }

    public MedioDePagoCheque fechaCobro(LocalDate fechaCobro) {
        this.fechaCobro = fechaCobro;
        return this;
    }

    public void setFechaCobro(LocalDate fechaCobro) {
        this.fechaCobro = fechaCobro;
    }

    public String getNumeroCheque() {
        return numeroCheque;
    }

    public MedioDePagoCheque numeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
        return this;
    }

    public void setNumeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
    }

    public String getNumeroCuenta() {
        return numeroCuenta;
    }

    public MedioDePagoCheque numeroCuenta(String numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
        return this;
    }

    public void setNumeroCuenta(String numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
    }

    public Banco getBanco() {
        return banco;
    }

    public MedioDePagoCheque banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MedioDePagoCheque)) {
            return false;
        }
        return id != null && id.equals(((MedioDePagoCheque) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MedioDePagoCheque{" +
            "id=" + getId() +
            ", fechaRecibo='" + getFechaRecibo() + "'" +
            ", fechaCobro='" + getFechaCobro() + "'" +
            ", numeroCheque='" + getNumeroCheque() + "'" +
            ", numeroCuenta='" + getNumeroCuenta() + "'" +
            "}";
    }
}
