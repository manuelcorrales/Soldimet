package soldimet.service.dto;

import soldimet.domain.Operacion;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:39 p.m.
 */
public class DTOParOperacionPresupuestoCUHacerPresupuesto {

    private Float costoOperacion;
    private Operacion nombreOperacion;

    public DTOParOperacionPresupuestoCUHacerPresupuesto() {}

    public Float getCostoOperacion() {
        return costoOperacion;
    }

    public void setCostoOperacion(Float costoOperacion) {
        this.costoOperacion = costoOperacion;
    }

    /**
     * @return Operacion return the nombreOperacion
     */
    public Operacion getNombreOperacion() {
        return nombreOperacion;
    }

    /**
     * @param nombreOperacion the nombreOperacion to set
     */
    public void setNombreOperacion(Operacion nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
    }
}
