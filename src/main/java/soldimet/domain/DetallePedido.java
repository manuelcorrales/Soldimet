package soldimet.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonInclude;

import soldimet.constant.Globales;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DetallePedido.
 */
@Entity
@Table(name = "detalle_pedido")
public class DetallePedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private DetallePresupuesto detallePresupuesto;

    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    @JoinColumn(name="detallePedido")
    @JsonInclude
    private Set<CostoRepuesto> costoRepuestos = new HashSet<CostoRepuesto>();

    @ManyToOne (cascade ={CascadeType.DETACH, CascadeType.MERGE}, optional = false)
    @NotNull
    private EstadoDetallePedido estadoDetallePedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DetallePresupuesto getDetallePresupuesto() {
        return detallePresupuesto;
    }

    public DetallePedido detallePresupuesto(DetallePresupuesto detallePresupuesto) {
        this.detallePresupuesto = detallePresupuesto;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DetallePedido detallePedido = (DetallePedido) o;
        if (detallePedido.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), detallePedido.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DetallePedido{" +
            "id=" + getId() +
            "}";
    }

    public CostoRepuesto filterCostoRepuesto(CostoRepuesto costoRepuesto) {
        System.out.println("id: "+costoRepuesto.getId());

        for(CostoRepuesto costoInList: this.getCostoRepuestos()) {
            if (
                (costoInList.getArticulo().getId() == costoRepuesto.getArticulo().getId() )&&
                (costoInList.getProveedor().getId() == costoRepuesto.getProveedor().getId()) &&
                (costoInList.getTipoRepuesto().getId() == costoRepuesto.getTipoRepuesto().getId()) &&
                (costoInList.getValor() == costoRepuesto.getValor())
            ){
                System.out.println("id: "+costoInList.getId());
                return costoInList;
            }
        }
        System.out.println("no encuentro otro");
        return null;
    }
}
