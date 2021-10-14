package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Presupuesto.
 */
@Entity
@Table(name = "presupuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Presupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 5)
    @Column(name = "descripcion_descuento")
    private String descripcionDescuento;

    @DecimalMin(value = "0")
    @Column(name = "descuento")
    private Float descuento;

    @NotNull
    @Column(name = "fecha_creacion", columnDefinition = "DATE")
    private LocalDate fechaCreacion;

    @Column(name = "fecha_aceptado", columnDefinition = "DATE")
    private LocalDate fechaAceptado;

    @Column(name = "fecha_entregado", columnDefinition = "DATE")
    private LocalDate fechaEntregado;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "importe_total", nullable = false)
    private Float importeTotal;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "soldadura")
    private Boolean soldadura;

    @Column(name = "modelo")
    private Boolean modelo;

    @ManyToOne(optional = false, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties(value = { "persona" }, allowSetters = true)
    private Cliente cliente;

    @ManyToOne(optional = false, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
    @NotNull
    @JsonIgnoreProperties("presupuestos")
    private EstadoPresupuesto estadoPresupuesto;

    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinColumn(name = "presupuesto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DetallePresupuesto> detallePresupuestos = new HashSet<>();

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
    @JsonIgnoreProperties("presupuestos")
    private DocumentationType documentType;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("presupuestos")
    private Sucursal sucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Presupuesto id(Long id) {
        this.id = id;
        return this;
    }

    public String getDescripcionDescuento() {
        return this.descripcionDescuento;
    }

    public Presupuesto descripcionDescuento(String descripcionDescuento) {
        this.descripcionDescuento = descripcionDescuento;
        return this;
    }

    public void setDescripcionDescuento(String descripcionDescuento) {
        this.descripcionDescuento = descripcionDescuento;
    }

    public Float getDescuento() {
        return MathUtils.roundFloat(this.descuento);
    }

    public Presupuesto descuento(Float descuento) {
        this.descuento = descuento;
        return this;
    }

    public void setDescuento(Float descuento) {
        this.descuento = descuento;
    }

    public LocalDate getFechaCreacion() {
        return this.fechaCreacion;
    }

    public Presupuesto fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaAceptado() {
        return this.fechaAceptado;
    }

    public Presupuesto fechaAceptado(LocalDate fechaAceptado) {
        this.fechaAceptado = fechaAceptado;
        return this;
    }

    public void setFechaAceptado(LocalDate fechaAceptado) {
        this.fechaAceptado = fechaAceptado;
    }

    public LocalDate getFechaEntregado() {
        return this.fechaEntregado;
    }

    public Presupuesto fechaEntregado(LocalDate fechaEntregado) {
        this.fechaEntregado = fechaEntregado;
        return this;
    }

    public void setFechaEntregado(LocalDate fechaEntregado) {
        this.fechaEntregado = fechaEntregado;
    }

    public Float getImporteTotal() {
        return MathUtils.roundFloat(this.importeTotal);
    }

    public Presupuesto importeTotal(Float importeTotal) {
        this.importeTotal = importeTotal;
        return this;
    }

    public void setImporteTotal(Float importeTotal) {
        this.importeTotal = importeTotal;
    }

    public String getObservaciones() {
        return this.observaciones;
    }

    public Presupuesto observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Boolean getSoldadura() {
        return this.soldadura;
    }

    public Presupuesto soldadura(Boolean soldadura) {
        this.soldadura = soldadura;
        return this;
    }

    public void setSoldadura(Boolean soldadura) {
        this.soldadura = soldadura;
    }

    public Boolean getModelo() {
        return this.modelo;
    }

    public Presupuesto modelo(Boolean modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(Boolean modelo) {
        this.modelo = modelo;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public Presupuesto cliente(Cliente cliente) {
        this.setCliente(cliente);
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public EstadoPresupuesto getEstadoPresupuesto() {
        return this.estadoPresupuesto;
    }

    public Presupuesto estadoPresupuesto(EstadoPresupuesto estadoPresupuesto) {
        this.setEstadoPresupuesto(estadoPresupuesto);
        return this;
    }

    public void setEstadoPresupuesto(EstadoPresupuesto estadoPresupuesto) {
        this.estadoPresupuesto = estadoPresupuesto;
    }

    public Set<DetallePresupuesto> getDetallePresupuestos() {
        return detallePresupuestos;
    }

    public Presupuesto detallePresupuestos(Set<DetallePresupuesto> detallePresupuestos) {
        this.detallePresupuestos = detallePresupuestos;
        return this;
    }

    public Presupuesto addDetallePresupuesto(DetallePresupuesto detallePresupuesto) {
        this.detallePresupuestos.add(detallePresupuesto);
        return this;
    }

    public Presupuesto removeDetallePresupuesto(DetallePresupuesto detallePresupuesto) {
        this.detallePresupuestos.remove(detallePresupuesto);
        return this;
    }

    public void setDetallePresupuestos(Set<DetallePresupuesto> detallePresupuestos) {
        this.detallePresupuestos = detallePresupuestos;
    }

    public DocumentationType getDocumentType() {
        return this.documentType;
    }

    public Presupuesto documentType(DocumentationType documentationType) {
        this.setDocumentType(documentationType);
        return this;
    }

    public void setDocumentType(DocumentationType documentationType) {
        this.documentType = documentationType;
    }

    public Sucursal getSucursal() {
        return this.sucursal;
    }

    public Presupuesto sucursal(Sucursal sucursal) {
        this.setSucursal(sucursal);
        return this;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    @JsonIgnore
    public String getClienteName() {
        return this.cliente.getPersona().getNombre() + ' ' + this.cliente.getPersona().getApellido();
    }

    @JsonIgnore
    public String getMotorName() {
        return this.detallePresupuestos.iterator().next().getMotor().getMarcaMotor();
    }

    @JsonIgnore
    public String getAplicacionName() {
        return this.detallePresupuestos.iterator().next().getAplicacion().getNombreAplicacion();
    }

    @JsonIgnore
    public Integer getCantCilindros() {
        return this.detallePresupuestos.iterator().next().getCilindrada().getCantidadDeCilindros();
    }

    @JsonIgnore
    public Float getTotalOperaciones() {
        Float total = new Float(0);
        for (DetallePresupuesto detallePresupuesto : this.detallePresupuestos) {
            total += detallePresupuesto.getTotalOperaciones();
        }
        return MathUtils.roundFloat(total);
    }

    @JsonIgnore
    public Float getTotalRepuestos() {
        Float total = new Float(0);
        for (DetallePresupuesto detallePresupuesto : this.detallePresupuestos) {
            total += detallePresupuesto.getTotalRepuestos();
        }
        return MathUtils.roundFloat(total);
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Presupuesto)) {
            return false;
        }
        return id != null && id.equals(((Presupuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Presupuesto{" +
            "id=" + getId() +
            ", descripcionDescuento='" + getDescripcionDescuento() + "'" +
            ", descuento=" + getDescuento() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", fechaAceptado='" + getFechaAceptado() + "'" +
            ", fechaEntregado='" + getFechaEntregado() + "'" +
            ", importeTotal=" + getImporteTotal() +
            ", observaciones='" + getObservaciones() + "'" +
            ", soldadura='" + getSoldadura() + "'" +
            ", modelo='" + getModelo() + "'" +
            "}";
    }
}
