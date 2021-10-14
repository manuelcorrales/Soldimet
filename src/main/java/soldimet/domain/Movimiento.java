package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Movimiento.
 */
@Entity
@Table(name = "movimiento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Movimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @NotNull
    @Column(name = "importe", nullable = false)
    private Float importe;

    @Column(name = "descuento")
    private Float descuento;

    @Column(name = "observaciones")
    private String observaciones;

    @JsonIgnoreProperties(value = { "medioDePagoCheque", "formaDePago" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private MedioDePago medioDePago;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("movimientos")
    private EstadoMovimiento estado;

    @ManyToOne(optional = false, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    @NotNull
    @JsonIgnoreProperties("movimientos")
    private TipoMovimiento tipoMovimiento;

    @ManyToOne(optional = false, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    @NotNull
    @JsonIgnoreProperties(value = { "persona", "sucursal" }, allowSetters = true)
    private Empleado empleado;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("movimientos")
    private Caja caja;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("movimientos")
    private SubCategoria subCategoria;

    @OneToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    @JoinColumn(unique = true)
    private MedioDePago medioDePago;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Movimiento id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public Movimiento fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Float getImporte() {
        return MathUtils.roundFloat(this.importe);
    }

    public Movimiento importe(Float importe) {
        this.importe = importe;
        return this;
    }

    public void setImporte(Float importe) {
        this.importe = importe;
    }

    public Float getDescuento() {
        return MathUtils.roundFloat(this.descuento);
    }

    public Movimiento descuento(Float descuento) {
        this.descuento = descuento;
        return this;
    }

    public void setDescuento(Float descuento) {
        this.descuento = descuento;
    }

    public String getObservaciones() {
        return this.observaciones;
    }

    public Movimiento observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public MedioDePago getMedioDePago() {
        return this.medioDePago;
    }

    public Movimiento medioDePago(MedioDePago medioDePago) {
        this.setMedioDePago(medioDePago);
        return this;
    }

    public void setMedioDePago(MedioDePago medioDePago) {
        this.medioDePago = medioDePago;
    }

    public EstadoMovimiento getEstado() {
        return this.estado;
    }

    public Movimiento estado(EstadoMovimiento estadoMovimiento) {
        this.setEstado(estadoMovimiento);
        return this;
    }

    public void setEstado(EstadoMovimiento estadoMovimiento) {
        this.estado = estadoMovimiento;
    }

    public TipoMovimiento getTipoMovimiento() {
        return this.tipoMovimiento;
    }

    public Movimiento tipoMovimiento(TipoMovimiento tipoMovimiento) {
        this.setTipoMovimiento(tipoMovimiento);
        return this;
    }

    public void setTipoMovimiento(TipoMovimiento tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public Empleado getEmpleado() {
        return this.empleado;
    }

    public Movimiento empleado(Empleado empleado) {
        this.setEmpleado(empleado);
        return this;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Caja getCaja() {
        return this.caja;
    }

    public Movimiento caja(Caja caja) {
        this.setCaja(caja);
        return this;
    }

    public void setCaja(Caja caja) {
        this.caja = caja;
    }

    public SubCategoria getSubCategoria() {
        return this.subCategoria;
    }

    public Movimiento subCategoria(SubCategoria subCategoria) {
        this.setSubCategoria(subCategoria);
        return this;
    }

    public void setSubCategoria(SubCategoria subCategoria) {
        this.subCategoria = subCategoria;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movimiento)) {
            return false;
        }
        return id != null && id.equals(((Movimiento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Movimiento{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", importe=" + getImporte() +
            ", descuento=" + getDescuento() +
            ", observaciones='" + getObservaciones() + "'" +
            "}";
    }
}
