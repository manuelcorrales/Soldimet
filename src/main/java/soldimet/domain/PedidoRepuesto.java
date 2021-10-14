package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PedidoRepuesto.
 */
@Entity
@Table(name = "pedido_repuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PedidoRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false, columnDefinition = "DATE")
    private LocalDate fechaCreacion;

    @Column(name = "fecha_pedido", columnDefinition = "DATE")
    private LocalDate fechaPedido;

    @Column(name = "fecha_recibo", columnDefinition = "DATE")
    private LocalDate fechaRecibo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("pedidoRepuestos")
    private EstadoPedidoRepuesto estadoPedidoRepuesto;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "pedidoRepuesto")
    @NotNull
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DetallePedido> detallePedidos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "cliente", "estadoPresupuesto", "documentType", "sucursal" }, allowSetters = true)
    private Presupuesto presupuesto;

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE }, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("pedidoRepuestos")
    private DocumentationType documentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PedidoRepuesto id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getFechaCreacion() {
        return this.fechaCreacion;
    }

    public PedidoRepuesto fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaPedido() {
        return this.fechaPedido;
    }

    public PedidoRepuesto fechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
        return this;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public LocalDate getFechaRecibo() {
        return this.fechaRecibo;
    }

    public PedidoRepuesto fechaRecibo(LocalDate fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
        return this;
    }

    public void setFechaRecibo(LocalDate fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
    }

    public EstadoPedidoRepuesto getEstadoPedidoRepuesto() {
        return this.estadoPedidoRepuesto;
    }

    public PedidoRepuesto estadoPedidoRepuesto(EstadoPedidoRepuesto estadoPedidoRepuesto) {
        this.setEstadoPedidoRepuesto(estadoPedidoRepuesto);
        return this;
    }

    public void setEstadoPedidoRepuesto(EstadoPedidoRepuesto estadoPedidoRepuesto) {
        this.estadoPedidoRepuesto = estadoPedidoRepuesto;
    }

    public Set<DetallePedido> getDetallePedidos() {
        return detallePedidos;
    }

    public PedidoRepuesto detallePedidos(Set<DetallePedido> detallePedidos) {
        this.detallePedidos = detallePedidos;
        return this;
    }

    public PedidoRepuesto addDetallePedido(DetallePedido detallePedido) {
        this.detallePedidos.add(detallePedido);
        return this;
    }

    public PedidoRepuesto removeDetallePedido(DetallePedido detallePedido) {
        this.detallePedidos.remove(detallePedido);
        return this;
    }

    public void setDetallePedidos(Set<DetallePedido> detallePedidos) {
        this.detallePedidos = detallePedidos;
    }

    public Presupuesto getPresupuesto() {
        return this.presupuesto;
    }

    public PedidoRepuesto presupuesto(Presupuesto presupuesto) {
        this.setPresupuesto(presupuesto);
        return this;
    }

    public void setPresupuesto(Presupuesto presupuesto) {
        this.presupuesto = presupuesto;
    }

    public DocumentationType getDocumentType() {
        return this.documentType;
    }

    public PedidoRepuesto documentType(DocumentationType documentationType) {
        this.setDocumentType(documentationType);
        return this;
    }

    public void setDocumentType(DocumentationType documentationType) {
        this.documentType = documentationType;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PedidoRepuesto)) {
            return false;
        }
        return id != null && id.equals(((PedidoRepuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PedidoRepuesto{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", fechaPedido='" + getFechaPedido() + "'" +
            ", fechaRecibo='" + getFechaRecibo() + "'" +
            "}";
    }

    public void cambiarEstadoADetalles(EstadoDetallePedido estadoDetallePedido) {
        for (DetallePedido detalle : this.detallePedidos) {
            detalle.setEstadoDetallePedido(estadoDetallePedido);
        }
    }

    public DetallePedido filterDetallePedido(DetallePedido detallePedido) {
        for (DetallePedido detalleInList : this.getDetallePedidos()) {
            if (detalleInList.getId().equals(detallePedido.getId())) {
                return detalleInList;
            }
        }
        return null;
    }
}
