package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:39 p.m.
 */
public class DTOParOperacionPresupuestoCUHacerPresupuesto {

	private Float costoOperacion;
	private String nombreOperacion;
        private Long operacionID;

	public DTOParOperacionPresupuestoCUHacerPresupuesto(){

	}

    public Float getCostoOperacion() {
        return costoOperacion;
    }

    public void setCostoOperacion(Float costoOperacion) {
        this.costoOperacion = costoOperacion;
    }

    public String getNombreOperacion() {
        return nombreOperacion;
    }

    public void setNombreOperacion(String nombreOperacion) {
        this.nombreOperacion = nombreOperacion;
    }

    public Long getOperacionID() {
        return operacionID;
    }

    public void setOperacionID(Long operacionID) {
        this.operacionID = operacionID;
    }
}
