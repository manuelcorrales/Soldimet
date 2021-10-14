package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:40 p.m.
 */
public class DTOPresupuestoDetalleParteCUBuscarPresupuesto {

    private String aplicacion;
    private int cilindrada;
    private String motor;

    public DTOPresupuestoDetalleParteCUBuscarPresupuesto() {}

    public void finalize() throws Throwable {}

    public String getaplicacion() {
        return aplicacion;
    }

    public int getcilindrada() {
        return cilindrada;
    }

    public String getmotor() {
        return motor;
    }

    /**
     *
     * @param newVal
     */
    public void setaplicacion(String newVal) {
        aplicacion = newVal;
    }

    /**
     *
     * @param newVal
     */
    public void setcilindrada(int newVal) {
        cilindrada = newVal;
    }

    /**
     *
     * @param newVal
     */
    public void setmotor(String newVal) {
        motor = newVal;
    }
}
