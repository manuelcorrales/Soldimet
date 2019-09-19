package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A PagoCheque.
 */
@Entity
@Table(name = "pago_cheque")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PagoCheque implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_cobro", nullable = false)
    private LocalDate fechaCobro;

    @NotNull
    @Column(name = "fecha_recibo", nullable = false)
    private LocalDate fechaRecibo;

    @NotNull
    @Size(min = 3)
    @Column(name = "numero_cheque", nullable = false)
    private String numeroCheque;

    @Column(name = "numero_cuenta")
    private String numeroCuenta;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pagoCheques")
    private Banco banco;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private FormaDePago formaDePago;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCobro() {
        return fechaCobro;
    }

    public PagoCheque fechaCobro(LocalDate fechaCobro) {
        this.fechaCobro = fechaCobro;
        return this;
    }

    public void setFechaCobro(LocalDate fechaCobro) {
        this.fechaCobro = fechaCobro;
    }

    public LocalDate getFechaRecibo() {
        return fechaRecibo;
    }

    public PagoCheque fechaRecibo(LocalDate fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
        return this;
    }

    public void setFechaRecibo(LocalDate fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
    }

    public String getNumeroCheque() {
        return numeroCheque;
    }

    public PagoCheque numeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
        return this;
    }

    public void setNumeroCheque(String numeroCheque) {
        this.numeroCheque = numeroCheque;
    }

    public String getNumeroCuenta() {
        return numeroCuenta;
    }

    public PagoCheque numeroCuenta(String numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
        return this;
    }

    public void setNumeroCuenta(String numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
    }

    public Banco getBanco() {
        return banco;
    }

    public PagoCheque banco(Banco banco) {
        this.banco = banco;
        return this;
    }

    public void setBanco(Banco banco) {
        this.banco = banco;
    }

    public FormaDePago getFormaDePago() {
        return formaDePago;
    }

    public PagoCheque formaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
        return this;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PagoCheque)) {
            return false;
        }
        return id != null && id.equals(((PagoCheque) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PagoCheque{" +
            "id=" + getId() +
            ", fechaCobro='" + getFechaCobro() + "'" +
            ", fechaRecibo='" + getFechaRecibo() + "'" +
            ", numeroCheque='" + getNumeroCheque() + "'" +
            ", numeroCuenta='" + getNumeroCuenta() + "'" +
            "}";
    }
}
