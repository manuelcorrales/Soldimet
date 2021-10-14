package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:39 p.m.
 */
public class DTOOperacionNuevoCostoCUHacerPresupuesto {

    private float costoOperacion;
    private String nombreOperacion;
    private String tipoParteMotor;

    public DTOOperacionNuevoCostoCUHacerPresupuesto() {}

    public void finalize() throws Throwable {}

    public float getcostoOperacion() {
        return costoOperacion;
    }

    public String getnombreOperacion() {
        return nombreOperacion;
    }

    public String gettipoParteMotor() {
        return tipoParteMotor;
    }

    /**
     *
     * @param newVal
     */
    public void setcostoOperacion(float newVal) {
        costoOperacion = newVal;
    }

    /**
     *
     * @param newVal
     */
    public void setnombreOperacion(String newVal) {
        nombreOperacion = newVal;
    }

    /**
     *
     * @param newVal
     */
    public void settipoParteMotor(String newVal) {
        tipoParteMotor = newVal;
    }
}
