package soldimet.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PrecioRepuesto.
 */
@Entity
@Table(name = "precio_repuesto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PrecioRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false, columnDefinition = "DATE")
    private LocalDate fecha;

    @DecimalMin(value = "0")
    @Column(name = "precio_privado")
    private Float precioPrivado;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "precio_publico", nullable = false)
    private Float precioPublico;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PrecioRepuesto id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public PrecioRepuesto fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Float getPrecioPrivado() {
        return MathUtils.roundFloat(this.precioPrivado);
    }

    public PrecioRepuesto precioPrivado(Float precioPrivado) {
        this.precioPrivado = precioPrivado;
        return this;
    }

    public void setPrecioPrivado(Float precioPrivado) {
        this.precioPrivado = precioPrivado;
    }

    public Float getPrecioPublico() {
        return MathUtils.roundFloat(this.precioPublico);
    }

    public PrecioRepuesto precioPublico(Float precioPublico) {
        this.precioPublico = precioPublico;
        return this;
    }

    public void setPrecioPublico(Float precioPublico) {
        this.precioPublico = precioPublico;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PrecioRepuesto)) {
            return false;
        }
        return id != null && id.equals(((PrecioRepuesto) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PrecioRepuesto{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", precioPrivado=" + getPrecioPrivado() +
            ", precioPublico=" + getPrecioPublico() +
            "}";
    }
}
