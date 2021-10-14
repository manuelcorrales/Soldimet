package soldimet.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ListaPrecioDesdeHasta.
 */
@Entity
@Table(name = "lista_precio_desde_hasta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ListaPrecioDesdeHasta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_desde", nullable = false, columnDefinition = "DATE")
    private LocalDate fechaDesde;

    @Column(name = "fecha_hasta", columnDefinition = "DATE")
    private LocalDate fechaHasta;

    @OneToMany(cascade = { CascadeType.ALL })
    @JoinColumn(name = "lista")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CostoOperacion> costoOperacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ListaPrecioDesdeHasta id(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getFechaDesde() {
        return this.fechaDesde;
    }

    public ListaPrecioDesdeHasta fechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
        return this;
    }

    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public LocalDate getFechaHasta() {
        return this.fechaHasta;
    }

    public ListaPrecioDesdeHasta fechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
        return this;
    }

    public void setFechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    public Set<CostoOperacion> getCostoOperacions() {
        return costoOperacions;
    }

    public ListaPrecioDesdeHasta costoOperacions(Set<CostoOperacion> costoOperacions) {
        this.costoOperacions = costoOperacions;
        return this;
    }

    public ListaPrecioDesdeHasta addCostoOperacion(CostoOperacion costoOperacion) {
        this.costoOperacions.add(costoOperacion);
        return this;
    }

    public ListaPrecioDesdeHasta removeCostoOperacion(CostoOperacion costoOperacion) {
        this.costoOperacions.remove(costoOperacion);
        return this;
    }

    public void setCostoOperacions(Set<CostoOperacion> costoOperacions) {
        this.costoOperacions = costoOperacions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListaPrecioDesdeHasta)) {
            return false;
        }
        return id != null && id.equals(((ListaPrecioDesdeHasta) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ListaPrecioDesdeHasta{" +
            "id=" + getId() +
            ", fechaDesde='" + getFechaDesde() + "'" +
            ", fechaHasta='" + getFechaHasta() + "'" +
            "}";
    }
}
