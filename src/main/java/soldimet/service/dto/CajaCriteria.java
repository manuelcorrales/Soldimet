package soldimet.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

import io.github.jhipster.service.filter.InstantFilter;
import io.github.jhipster.service.filter.LocalDateFilter;



/**
 * Criteria class for the Caja entity. This class is used in CajaResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /cajas?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CajaCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private LocalDateFilter fecha;

    private InstantFilter horaApertura;

    private InstantFilter horaCierre;

    public CajaCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateFilter fecha) {
        this.fecha = fecha;
    }

    public InstantFilter getHoraApertura() {
        return horaApertura;
    }

    public void setHoraApertura(InstantFilter horaApertura) {
        this.horaApertura = horaApertura;
    }

    public InstantFilter getHoraCierre() {
        return horaCierre;
    }

    public void setHoraCierre(InstantFilter horaCierre) {
        this.horaCierre = horaCierre;
    }

    @Override
    public String toString() {
        return "CajaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (fecha != null ? "fecha=" + fecha + ", " : "") +
                (horaApertura != null ? "horaApertura=" + horaApertura + ", " : "") +
                (horaCierre != null ? "horaCierre=" + horaCierre + ", " : "") +
            "}";
    }

}
