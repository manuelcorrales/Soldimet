package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ListaPrecioDesdeHasta.
 */
@Entity
@Table(name = "lista_precio_desde_hasta")
public class ListaPrecioDesdeHasta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_desde", nullable = false)
    private LocalDate fechaDesde;

    @Column(name = "fecha_hasta")
    private LocalDate fechaHasta;

    @OneToMany(cascade = { CascadeType.ALL })
    @JoinColumn(name = "lista")
    @JsonIgnore
    private Set<CostoOperacion> costoOperacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaDesde() {
        return fechaDesde;
    }

    public ListaPrecioDesdeHasta fechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
        return this;
    }

    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public LocalDate getFechaHasta() {
        return fechaHasta;
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
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ListaPrecioDesdeHasta listaPrecioDesdeHasta = (ListaPrecioDesdeHasta) o;
        if (listaPrecioDesdeHasta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), listaPrecioDesdeHasta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ListaPrecioDesdeHasta{" +
            "id=" + getId() +
            ", fechaDesde='" + getFechaDesde() + "'" +
            ", fechaHasta='" + getFechaHasta() + "'" +
            "}";
    }
}
