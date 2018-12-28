package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Movimiento.
 */
@Entity
@Table(name = "movimiento")
public class Movimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @NotNull
    @Column(name = "hora", nullable = false)
    private Instant hora;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "importe", nullable = false)
    private Float importe;

    @Column(name = "descuento")
    private Float descuento;

    @Column(name = "observaciones")
    private String observaciones;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private EstadoMovimiento estado;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private FormaDePago formaDePago;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private TipoMovimiento tipoMovimiento;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Empleado empleado;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Persona persona;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SubCategoria subCategoria;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Caja caja;

    @OneToOne
    @JoinColumn(unique = true)
    private DetalleMovimiento detalleMovimiento;

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

    public Movimiento fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Instant getHora() {
        return hora;
    }

    public Movimiento hora(Instant hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(Instant hora) {
        this.hora = hora;
    }

    public Float getImporte() {
        return importe;
    }

    public Movimiento importe(Float importe) {
        this.importe = importe;
        return this;
    }

    public void setImporte(Float importe) {
        this.importe = importe;
    }

    public Float getDescuento() {
        return descuento;
    }

    public Movimiento descuento(Float descuento) {
        this.descuento = descuento;
        return this;
    }

    public void setDescuento(Float descuento) {
        this.descuento = descuento;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Movimiento observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public EstadoMovimiento getEstado() {
        return estado;
    }

    public Movimiento estado(EstadoMovimiento estadoMovimiento) {
        this.estado = estadoMovimiento;
        return this;
    }

    public void setEstado(EstadoMovimiento estadoMovimiento) {
        this.estado = estadoMovimiento;
    }

    public FormaDePago getFormaDePago() {
        return formaDePago;
    }

    public Movimiento formaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
        return this;
    }

    public void setFormaDePago(FormaDePago formaDePago) {
        this.formaDePago = formaDePago;
    }

    public TipoMovimiento getTipoMovimiento() {
        return tipoMovimiento;
    }

    public Movimiento tipoMovimiento(TipoMovimiento tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
        return this;
    }

    public void setTipoMovimiento(TipoMovimiento tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public Movimiento empleado(Empleado empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Persona getPersona() {
        return persona;
    }

    public Movimiento persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public SubCategoria getSubCategoria() {
        return subCategoria;
    }

    public Movimiento subCategoria(SubCategoria subCategoria) {
        this.subCategoria = subCategoria;
        return this;
    }

    public void setSubCategoria(SubCategoria subCategoria) {
        this.subCategoria = subCategoria;
    }

    public Caja getCaja() {
        return caja;
    }

    public Movimiento caja(Caja caja) {
        this.caja = caja;
        return this;
    }

    public void setCaja(Caja caja) {
        this.caja = caja;
    }

    public DetalleMovimiento getDetalleMovimiento() {
        return detalleMovimiento;
    }

    public Movimiento detalleMovimiento(DetalleMovimiento detalleMovimiento) {
        this.detalleMovimiento = detalleMovimiento;
        return this;
    }

    public void setDetalleMovimiento(DetalleMovimiento detalleMovimiento) {
        this.detalleMovimiento = detalleMovimiento;
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
        Movimiento movimiento = (Movimiento) o;
        if (movimiento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movimiento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Movimiento{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", hora='" + getHora() + "'" +
            ", importe=" + getImporte() +
            ", descuento=" + getDescuento() +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
