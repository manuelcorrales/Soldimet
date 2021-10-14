package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:40 p.m.
 */
public class DTOCobroOperacionCUHacerPresupuesto {

    private String cobroOperacion;
    private String nombreOperacion;
    private int cantidad;

    public DTOCobroOperacionCUHacerPresupuesto() {}

    public void finalize() throws Throwable {}

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getcobroOperacion() {
        return cobroOperacion;
    }

    public String getNombreOperacion() {
        return nombreOperacion;
    }

    /**
     *
     * @param newVal
     */
    public void setcobroOperacion(String newVal) {
        cobroOperacion = newVal;
    }

    /**
     *
     * @param newVal
     */
    public void setnombreOperacion(String newVal) {
        nombreOperacion = newVal;
    }
}
