package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DetallePresupuesto.
 */
@Entity
@Table(name = "detalle_presupuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DetallePresupuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "importe", nullable = false)
    private Float importe;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @NotNull
    @JsonIgnoreProperties(value = { "motor" }, allowSetters = true)
    private Aplicacion aplicacion;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @NotNull
    @JsonIgnoreProperties("detallePresupuestos")
    private Cilindrada cilindrada;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @NotNull
    @JsonIgnoreProperties(value = { "aplicacions" }, allowSetters = true)
    private Motor motor;

    @OneToMany(cascade = { CascadeType.ALL })
    @JoinColumn(name = "detallePresupuesto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CobranzaOperacion> cobranzaOperacions = new HashSet<>();

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @NotNull
    @JsonIgnoreProperties("detallePresupuestos")
    private TipoParteMotor tipoParteMotor;

    @OneToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE })
    @JoinColumn(name = "detallePresupuesto")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CobranzaRepuesto> cobranzaRepuestos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DetallePresupuesto id(Long id) {
        this.id = id;
        return this;
    }

    public Float getImporte() {
        return MathUtils.roundFloat(this.importe);
    }

    public DetallePresupuesto importe(Float importe) {
        this.importe = importe;
        return this;
    }

    public void setImporte(Float importe) {
        this.importe = importe;
    }

    public Aplicacion getAplicacion() {
        return this.aplicacion;
    }

    public DetallePresupuesto aplicacion(Aplicacion aplicacion) {
        this.setAplicacion(aplicacion);
        return this;
    }

    public void setAplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
    }

    public Cilindrada getCilindrada() {
        return this.cilindrada;
    }

    public DetallePresupuesto cilindrada(Cilindrada cilindrada) {
        this.setCilindrada(cilindrada);
        return this;
    }

    public void setCilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
    }

    public Motor getMotor() {
        return this.motor;
    }

    public DetallePresupuesto motor(Motor motor) {
        this.setMotor(motor);
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
        return this.tipoParteMotor;
    }

    public DetallePresupuesto tipoParteMotor(TipoParteMotor tipoParteMotor) {
        this.setTipoParteMotor(tipoParteMotor);
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

    @JsonIgnore
    public Float getTotalOperaciones() {
        Float total = new Float(0);
        for (CobranzaOperacion cobranzaOperacion : this.cobranzaOperacions) {
            total += cobranzaOperacion.getCobranzaOperacion();
        }
        return MathUtils.roundFloat(total);
    }

    @JsonIgnore
    public Float getTotalRepuestos() {
        Float total = new Float(0);
        for (CobranzaRepuesto cobranzaRepuesto : this.cobranzaRepuestos) {
            total += cobranzaRepuesto.getValor();
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
        if (!(o instanceof DetallePresupuesto)) {
            return false;
        }
        return id != null && id.equals(((DetallePresupuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetallePresupuesto{" +
            "id=" + getId() +
            ", importe=" + getImporte() +
            "}";
    }
}
