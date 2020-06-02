package soldimet.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A CobranzaRepuesto.
 */
@Entity
@Table(name = "cobranza_repuesto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CobranzaRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "valor", nullable = false)
    private Float valor;

    @NotNull
    @Column(name = "detalle", nullable = false)
    private String detalle;

    @Column(name = "fecha", nullable = false, columnDefinition = "DATE")
    private LocalDate fecha = LocalDate.now();

    @ManyToOne(cascade ={CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH}, optional = false)
    @NotNull
    @JsonIgnoreProperties("cobranzaRepuestos")
    private TipoRepuesto tipoRepuesto;

    @ManyToOne(cascade ={CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, optional = false)
    @NotNull
    @JsonIgnoreProperties("cobranzaRepuestos")
    private Marca marca;

    @ManyToOne(cascade ={CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH}, optional = false)
    @NotNull
    @JsonIgnoreProperties("cobranzaRepuestos")
    private Cilindrada cilindrada;

    @ManyToOne(cascade ={CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH}, optional = false)
    @NotNull
    @JsonIgnoreProperties("cobranzaRepuestos")
    private Aplicacion aplicacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValor() {
        return valor;
    }

    public CobranzaRepuesto valor(Float valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }

    public String getDetalle() {
        return detalle;
    }

    public CobranzaRepuesto detalle(String detalle) {
        this.detalle = detalle;
        return this;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public CobranzaRepuesto fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public TipoRepuesto getTipoRepuesto() {
        return tipoRepuesto;
    }

    public CobranzaRepuesto tipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
        return this;
    }

    public void setTipoRepuesto(TipoRepuesto tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public Marca getMarca() {
        return marca;
    }

    public CobranzaRepuesto marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Cilindrada getCilindrada() {
        return cilindrada;
    }

    public CobranzaRepuesto cilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
        return this;
    }

    public void setCilindrada(Cilindrada cilindrada) {
        this.cilindrada = cilindrada;
    }

    public Aplicacion getAplicacion() {
        return aplicacion;
    }

    public CobranzaRepuesto aplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
        return this;
    }

    public void setAplicacion(Aplicacion aplicacion) {
        this.aplicacion = aplicacion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CobranzaRepuesto)) {
            return false;
        }
        return id != null && id.equals(((CobranzaRepuesto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CobranzaRepuesto{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", detalle='" + getDetalle() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
