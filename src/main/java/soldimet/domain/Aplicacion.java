package soldimet.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Aplicacion.
 */
@Entity
@Table(name = "aplicacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aplicacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre_aplicacion", nullable = false)
    private String nombreAplicacion;

    @NotNull
    @Min(value = 1)
    @Max(value = 100)
    @Column(name = "numero_grupo", nullable = false)
    private Integer numeroGrupo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreAplicacion() {
        return nombreAplicacion;
    }

    public Aplicacion nombreAplicacion(String nombreAplicacion) {
        this.nombreAplicacion = nombreAplicacion;
        return this;
    }

    public void setNombreAplicacion(String nombreAplicacion) {
        this.nombreAplicacion = nombreAplicacion;
    }

    public Integer getNumeroGrupo() {
        return numeroGrupo;
    }

    public Aplicacion numeroGrupo(Integer numeroGrupo) {
        this.numeroGrupo = numeroGrupo;
        return this;
    }

    public void setNumeroGrupo(Integer numeroGrupo) {
        this.numeroGrupo = numeroGrupo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aplicacion)) {
            return false;
        }
        return id != null && id.equals(((Aplicacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Aplicacion{" +
            "id=" + getId() +
            ", nombreAplicacion='" + getNombreAplicacion() + "'" +
            ", numeroGrupo=" + getNumeroGrupo() +
            "}";
    }
}
