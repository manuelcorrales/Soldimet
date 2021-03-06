package soldimet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ListaPrecioRectificacionCRAM.
 */
@Entity
@Table(name = "lista_precio_rectificacioncram")
public class ListaPrecioRectificacionCRAM implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "fecha_vigencia_desde", nullable = false)
    private LocalDate fechaVigenciaDesde;

    @Column(name = "fecha_vigencia_hasta")
    private LocalDate fechaVigenciaHasta;

    @NotNull
    @Min(value = 1)
    @Max(value = 25)
    @Column(name = "numero_grupo", nullable = false)
    private Integer numeroGrupo;

    @ManyToOne(optional = false)
    @NotNull
    private CostoOperacion costoOperacion;

    @OneToMany
        @JoinColumn(name= "lista")
    @JsonIgnore
    private Set<ListaPrecioDesdeHasta> fechas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaVigenciaDesde() {
        return fechaVigenciaDesde;
    }

    public ListaPrecioRectificacionCRAM fechaVigenciaDesde(LocalDate fechaVigenciaDesde) {
        this.fechaVigenciaDesde = fechaVigenciaDesde;
        return this;
    }

    public void setFechaVigenciaDesde(LocalDate fechaVigenciaDesde) {
        this.fechaVigenciaDesde = fechaVigenciaDesde;
    }

    public LocalDate getFechaVigenciaHasta() {
        return fechaVigenciaHasta;
    }

    public ListaPrecioRectificacionCRAM fechaVigenciaHasta(LocalDate fechaVigenciaHasta) {
        this.fechaVigenciaHasta = fechaVigenciaHasta;
        return this;
    }

    public void setFechaVigenciaHasta(LocalDate fechaVigenciaHasta) {
        this.fechaVigenciaHasta = fechaVigenciaHasta;
    }

    public Integer getNumeroGrupo() {
        return numeroGrupo;
    }

    public ListaPrecioRectificacionCRAM numeroGrupo(Integer numeroGrupo) {
        this.numeroGrupo = numeroGrupo;
        return this;
    }

    public void setNumeroGrupo(Integer numeroGrupo) {
        this.numeroGrupo = numeroGrupo;
    }

    public CostoOperacion getCostoOperacion() {
        return costoOperacion;
    }

    public ListaPrecioRectificacionCRAM costoOperacion(CostoOperacion costoOperacion) {
        this.costoOperacion = costoOperacion;
        return this;
    }

    public void setCostoOperacion(CostoOperacion costoOperacion) {
        this.costoOperacion = costoOperacion;
    }

    public Set<ListaPrecioDesdeHasta> getFechas() {
        return fechas;
    }

    public ListaPrecioRectificacionCRAM fechas(Set<ListaPrecioDesdeHasta> listaPrecioDesdeHastas) {
        this.fechas = listaPrecioDesdeHastas;
        return this;
    }

    public ListaPrecioRectificacionCRAM addFechas(ListaPrecioDesdeHasta listaPrecioDesdeHasta) {
        this.fechas.add(listaPrecioDesdeHasta);
        return this;
    }

    public ListaPrecioRectificacionCRAM removeFechas(ListaPrecioDesdeHasta listaPrecioDesdeHasta) {
        this.fechas.remove(listaPrecioDesdeHasta);
        return this;
    }

    public void setFechas(Set<ListaPrecioDesdeHasta> listaPrecioDesdeHastas) {
        this.fechas = listaPrecioDesdeHastas;
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
        ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM = (ListaPrecioRectificacionCRAM) o;
        if (listaPrecioRectificacionCRAM.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), listaPrecioRectificacionCRAM.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ListaPrecioRectificacionCRAM{" +
            "id=" + getId() +
            ", fechaVigenciaDesde='" + getFechaVigenciaDesde() + "'" +
            ", fechaVigenciaHasta='" + getFechaVigenciaHasta() + "'" +
            ", numeroGrupo=" + getNumeroGrupo() +
            "}";
    }
}
