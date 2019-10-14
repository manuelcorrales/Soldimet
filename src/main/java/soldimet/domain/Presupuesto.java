package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Presupuesto.
 */
@Entity
@Table(name = "presupuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    @ManyToOne(optional = false, cascade={CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @NotNull
    @JsonIgnoreProperties("presupuestos")
    private Cliente cliente;

    @ManyToOne(optional = false, cascade={CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @NotNull
    @JsonIgnoreProperties("presupuestos")
    private EstadoPresupuesto estadoPresupuesto;

    @OneToMany(cascade = { CascadeType.ALL }, fetch= FetchType.EAGER)
    @JoinColumn(name= "presupuesto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DetallePresupuesto> detallePresupuestos = new HashSet<>();

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch= FetchType.EAGER)
    @JsonIgnoreProperties("presupuestos")
    private DocumentationType documentType;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH }, fetch= FetchType.EAGER)
    @JsonIgnoreProperties("presupuestos")
    private Sucursal sucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcionDescuento() {
        return descripcionDescuento;
    }

    public Presupuesto descripcionDescuento(String descripcionDescuento) {
        this.descripcionDescuento = descripcionDescuento;
        return this;
    }

    public void setDescripcionDescuento(String descripcionDescuento) {
        this.descripcionDescuento = descripcionDescuento;
    }

    public Float getDescuento() {
        return descuento;
    }

    public Presupuesto descuento(Float descuento) {
        this.descuento = descuento;
        return this;
    }

    public void setDescuento(Float descuento) {
        this.descuento = descuento;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public Presupuesto fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaAceptado() {
        return fechaAceptado;
    }

    public Presupuesto fechaAceptado(LocalDate fechaAceptado) {
        this.fechaAceptado = fechaAceptado;
        return this;
    }

    public void setFechaAceptado(LocalDate fechaAceptado) {
        this.fechaAceptado = fechaAceptado;
    }

    public LocalDate getFechaEntregado() {
        return fechaEntregado;
    }

    public Presupuesto fechaEntregado(LocalDate fechaEntregado) {
        this.fechaEntregado = fechaEntregado;
        return this;
    }

    public void setFechaEntregado(LocalDate fechaEntregado) {
        this.fechaEntregado = fechaEntregado;
    }

    public Float getImporteTotal() {
        return importeTotal;
    }

    public Presupuesto importeTotal(Float importeTotal) {
        this.importeTotal = importeTotal;
        return this;
    }

    public void setImporteTotal(Float importeTotal) {
        this.importeTotal = importeTotal;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Presupuesto observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Presupuesto cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public EstadoPresupuesto getEstadoPresupuesto() {
        return estadoPresupuesto;
    }

    public Presupuesto estadoPresupuesto(EstadoPresupuesto estadoPresupuesto) {
        this.estadoPresupuesto = estadoPresupuesto;
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
        return documentType;
    }

    public Presupuesto documentType(DocumentationType documentationType) {
        this.documentType = documentationType;
        return this;
    }

    public void setDocumentType(DocumentationType documentationType) {
        this.documentType = documentationType;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public Presupuesto sucursal(Sucursal sucursal) {
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
        if (!(o instanceof Presupuesto)) {
            return false;
        }
        return id != null && id.equals(((Presupuesto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

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
            "}";
    }
}
