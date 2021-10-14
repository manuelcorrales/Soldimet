package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DetallePedido.
 */
@Entity
@Table(name = "detalle_pedido")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DetallePedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(unique = true)
    private DetallePresupuesto detallePresupuesto;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "detallePedido")
    @JsonInclude(JsonInclude.Include.ALWAYS)
    @NotNull
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CostoRepuesto> costoRepuestos = new HashSet<>();

    @ManyToOne(cascade = { CascadeType.DETACH, CascadeType.MERGE }, optional = false, fetch = FetchType.EAGER)
    @NotNull
    private EstadoDetallePedido estadoDetallePedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DetallePedido id(Long id) {
        this.id = id;
        return this;
    }

    public DetallePresupuesto getDetallePresupuesto() {
        return this.detallePresupuesto;
    }

    public DetallePedido detallePresupuesto(DetallePresupuesto detallePresupuesto) {
        this.setDetallePresupuesto(detallePresupuesto);
        return this;
    }

    public void setDetallePresupuesto(DetallePresupuesto detallePresupuesto) {
        this.detallePresupuesto = detallePresupuesto;
    }

    public Set<CostoRepuesto> getCostoRepuestos() {
        return costoRepuestos;
    }

    public DetallePedido costoRepuestos(Set<CostoRepuesto> costoRepuestos) {
        this.costoRepuestos = costoRepuestos;
        return this;
    }

    public DetallePedido addCostoRepuesto(CostoRepuesto costoRepuesto) {
        this.costoRepuestos.add(costoRepuesto);
        return this;
    }

    public DetallePedido removeCostoRepuesto(CostoRepuesto costoRepuesto) {
        this.costoRepuestos.remove(costoRepuesto);
        return this;
    }

    public void setCostoRepuestos(Set<CostoRepuesto> costoRepuestos) {
        this.costoRepuestos = costoRepuestos;
    }

    /**
     * @return the estadoDetallePedido
     */
    public EstadoDetallePedido getEstadoDetallePedido() {
        return estadoDetallePedido;
    }

    /**
     * @param estadoDetallePedido the estadoDetallePedido to set
     */
    public void setEstadoDetallePedido(EstadoDetallePedido estadoDetallePedido) {
        this.estadoDetallePedido = estadoDetallePedido;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetallePedido)) {
            return false;
        }
        return id != null && id.equals(((DetallePedido) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetallePedido{" +
            "id=" + getId() +
            "}";
    }

    public CostoRepuesto filterCostoRepuesto(CostoRepuesto costoRepuesto) {
        for (CostoRepuesto costoInList : this.getCostoRepuestos()) {
            if (costoInList.getId().equals(costoRepuesto.getId())) {
                return costoInList;
            }
        }
        return null;
    }
}
