package soldimet.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A ListaPrecioRectificacionCRAM.
 */
@Entity
@Table(name = "lista_precio_rectificacioncram")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ListaPrecioRectificacionCRAM implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 1)
    @Max(value = 25)
    @Column(name = "numero_grupo", nullable = false)
    private Integer numeroGrupo;

    @OneToMany(cascade = { CascadeType.ALL })
    @JoinColumn(name = "lista")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ListaPrecioDesdeHasta> fechas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not
    // remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListaPrecioRectificacionCRAM)) {
            return false;
        }
        return id != null && id.equals(((ListaPrecioRectificacionCRAM) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ListaPrecioRectificacionCRAM{" + "id=" + getId() + ", numeroGrupo=" + getNumeroGrupo() + "}";
    }

    public ListaPrecioDesdeHasta getUltimaListaActiva() {
        ListaPrecioDesdeHasta ultimaLista = null;
        for (ListaPrecioDesdeHasta lista : this.getFechas()) {
            if (lista.getFechaHasta() == null) {
                ultimaLista = lista;
            }
        }
        return ultimaLista;

    }
}
