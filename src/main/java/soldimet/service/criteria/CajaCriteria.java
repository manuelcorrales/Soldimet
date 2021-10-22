package soldimet.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link soldimet.domain.Caja} entity. This class is used
 * in {@link soldimet.web.rest.CajaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /cajas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class CajaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LocalDateFilter fecha;

    private InstantFilter horaApertura;

    private InstantFilter horaCierre;

    private FloatFilter saldo;

    private StringFilter observaciones;

    private FloatFilter saldoFisico;

    private LongFilter sucursalId;

    public CajaCriteria() {}

    public CajaCriteria(CajaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fecha = other.fecha == null ? null : other.fecha.copy();
        this.horaApertura = other.horaApertura == null ? null : other.horaApertura.copy();
        this.horaCierre = other.horaCierre == null ? null : other.horaCierre.copy();
        this.saldo = other.saldo == null ? null : other.saldo.copy();
        this.observaciones = other.observaciones == null ? null : other.observaciones.copy();
        this.saldoFisico = other.saldoFisico == null ? null : other.saldoFisico.copy();
        this.sucursalId = other.sucursalId == null ? null : other.sucursalId.copy();
    }

    @Override
    public CajaCriteria copy() {
        return new CajaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LocalDateFilter getFecha() {
        return fecha;
    }

    public LocalDateFilter fecha() {
        if (fecha == null) {
            fecha = new LocalDateFilter();
        }
        return fecha;
    }

    public void setFecha(LocalDateFilter fecha) {
        this.fecha = fecha;
    }

    public InstantFilter getHoraApertura() {
        return horaApertura;
    }

    public InstantFilter horaApertura() {
        if (horaApertura == null) {
            horaApertura = new InstantFilter();
        }
        return horaApertura;
    }

    public void setHoraApertura(InstantFilter horaApertura) {
        this.horaApertura = horaApertura;
    }

    public InstantFilter getHoraCierre() {
        return horaCierre;
    }

    public InstantFilter horaCierre() {
        if (horaCierre == null) {
            horaCierre = new InstantFilter();
        }
        return horaCierre;
    }

    public void setHoraCierre(InstantFilter horaCierre) {
        this.horaCierre = horaCierre;
    }

    public FloatFilter getSaldo() {
        return saldo;
    }

    public FloatFilter saldo() {
        if (saldo == null) {
            saldo = new FloatFilter();
        }
        return saldo;
    }

    public void setSaldo(FloatFilter saldo) {
        this.saldo = saldo;
    }

    public StringFilter getObservaciones() {
        return observaciones;
    }

    public StringFilter observaciones() {
        if (observaciones == null) {
            observaciones = new StringFilter();
        }
        return observaciones;
    }

    public void setObservaciones(StringFilter observaciones) {
        this.observaciones = observaciones;
    }

    public FloatFilter getSaldoFisico() {
        return saldoFisico;
    }

    public FloatFilter saldoFisico() {
        if (saldoFisico == null) {
            saldoFisico = new FloatFilter();
        }
        return saldoFisico;
    }

    public void setSaldoFisico(FloatFilter saldoFisico) {
        this.saldoFisico = saldoFisico;
    }

    public LongFilter getSucursalId() {
        return sucursalId;
    }

    public LongFilter sucursalId() {
        if (sucursalId == null) {
            sucursalId = new LongFilter();
        }
        return sucursalId;
    }

    public void setSucursalId(LongFilter sucursalId) {
        this.sucursalId = sucursalId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final CajaCriteria that = (CajaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(fecha, that.fecha) &&
            Objects.equals(horaApertura, that.horaApertura) &&
            Objects.equals(horaCierre, that.horaCierre) &&
            Objects.equals(saldo, that.saldo) &&
            Objects.equals(observaciones, that.observaciones) &&
            Objects.equals(saldoFisico, that.saldoFisico) &&
            Objects.equals(sucursalId, that.sucursalId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fecha, horaApertura, horaCierre, saldo, observaciones, saldoFisico, sucursalId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CajaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (fecha != null ? "fecha=" + fecha + ", " : "") +
            (horaApertura != null ? "horaApertura=" + horaApertura + ", " : "") +
            (horaCierre != null ? "horaCierre=" + horaCierre + ", " : "") +
            (saldo != null ? "saldo=" + saldo + ", " : "") +
            (observaciones != null ? "observaciones=" + observaciones + ", " : "") +
            (saldoFisico != null ? "saldoFisico=" + saldoFisico + ", " : "") +
            (sucursalId != null ? "sucursalId=" + sucursalId + ", " : "") +
            "}";
    }
}
