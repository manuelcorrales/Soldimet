package soldimet.service.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOCajaCUConsultarMovimientos {

    List<DTOCaja> cajas = new ArrayList<DTOCaja>();
    private Float totalMensual;

    public DTOCajaCUConsultarMovimientos() {}

    /**
     * @return the totalDia
     */
    public Float getTotalMensual() {
        return totalMensual;
    }

    /**
     * @param totalMensual the totalDia to set
     */
    public void setTotalMensual(Float totalMensual) {
        this.totalMensual = totalMensual;
    }

    public void addCaja(DTOCaja dtoCaja) {
        this.cajas.add(dtoCaja);
    }

    public void addTotal(Float mensual) {
        this.totalMensual += mensual;
    }

    /**
     * @return the cajas
     */
    public List<DTOCaja> getCajas() {
        return cajas;
    }

    /**
     * @param cajas the cajas to set
     */
    public void setCajas(List<DTOCaja> cajas) {
        this.cajas = cajas;
    }
}
