package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DetallePresupuesto.
 */
@Entity
@Table(name = "detalle_presupuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DetallePresupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "importe", nullable = false)
    private Float importe;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("detallePresupuestos")
    private Aplicacion aplicacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("detallePresupuestos")
    private Cilindrada cilindrada;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("detallePresupuestos")
    private Motor motor;

    @OneToMany(cascade = { CascadeType.ALL }, fetch= FetchType.EAGER)
    @JoinColumn(name= "detallePresupuesto")
    @JsonInclude
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CobranzaOperacion> cobranzaOperacions = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("detallePresupuestos")
    private TipoParteMotor tipoParteMotor;

    @OneToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE}, fetch= FetchType.EAGER)
    @JoinColumn(name= "detallePresupuesto")
    @JsonInclude
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CobranzaRepuesto> cobranzaRepuestos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getImporte() {
        return importe;
    }

    public DetallePresupuesto importe(Float importe) {
        this.importe = importe;
        return this;
    }

    public void setImporte(Float importe) {
        this.importe = importe;
    }

    public Aplicacion getAplicacion() {
        return aplicacion;
    }

    public DetallePresupuesto aplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
        return this;
    }

    public void setAplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
    }

    public Cilindrada getCilindrada() {
        return cilindrada;
    }

    public DetallePresupuesto cilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
        return this;
    }

    public void setCilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
    }

    public Motor getMotor() {
        return motor;
    }

    public DetallePresupuesto motor(Motor motor) {
        this.motor = motor;
        return this;
    }

    public void setMotor(Motor motor) {
        this.motor = motor;
    }

    public Set<CobranzaOperacion> getCobranzaOperacions() {
        return cobranzaOperacions;
    }

    public DetallePresupuesto cobranzaOperacions(Set<CobranzaOperacion> cobranzaOperacions) {
        this.cobranzaOperacions = cobranzaOperacions;
        return this;
    }

    public DetallePresupuesto addCobranzaOperacion(CobranzaOperacion cobranzaOperacion) {
        this.cobranzaOperacions.add(cobranzaOperacion);
        return this;
    }

    public DetallePresupuesto removeCobranzaOperacion(CobranzaOperacion cobranzaOperacion) {
        this.cobranzaOperacions.remove(cobranzaOperacion);
        return this;
    }

    public void setCobranzaOperacions(Set<CobranzaOperacion> cobranzaOperacions) {
        this.cobranzaOperacions = cobranzaOperacions;
    }

    public TipoParteMotor getTipoParteMotor() {
        return tipoParteMotor;
    }

    public DetallePresupuesto tipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
        return this;
    }

    public void setTipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }

    public Set<CobranzaRepuesto> getCobranzaRepuestos() {
        return cobranzaRepuestos;
    }

    public DetallePresupuesto cobranzaRepuestos(Set<CobranzaRepuesto> cobranzaRepuestos) {
        this.cobranzaRepuestos = cobranzaRepuestos;
        return this;
    }

    public DetallePresupuesto addCobranzaRepuesto(CobranzaRepuesto cobranzaRepuesto) {
        this.cobranzaRepuestos.add(cobranzaRepuesto);
        return this;
    }

    public DetallePresupuesto removeCobranzaRepuesto(CobranzaRepuesto cobranzaRepuesto) {
        this.cobranzaRepuestos.remove(cobranzaRepuesto);
        return this;
    }

    public void setCobranzaRepuestos(Set<CobranzaRepuesto> cobranzaRepuestos) {
        this.cobranzaRepuestos = cobranzaRepuestos;
    }

    public Float getTotalOperaciones() {
        Float total = new Float(0);
        for (CobranzaOperacion cobranzaOperacion: this.cobranzaOperacions) {
            total += cobranzaOperacion.getCobranzaOperacion();
        }
        return total;
    }

    public Float getTotalRepuestos() {
        Float total = new Float(0);
        for (CobranzaRepuesto cobranzaRepuesto: this.cobranzaRepuestos) {
            total += cobranzaRepuesto.getValor();
        }
        return total;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetallePresupuesto)) {
            return false;
        }
        return id != null && id.equals(((DetallePresupuesto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetallePresupuesto{" +
            "id=" + getId() +
            ", importe=" + getImporte() +
            "}";
    }
}
