package soldimet.service.dto;

import java.util.List;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:38 p.m.
 */
public class DTODatosMotorCUHacerPresupuesto {

	private Long idCilindrada;
	private Long idAplicacion;
	private Long idMotor;
	private List<Long> idTiposPartesMotores;

	public DTODatosMotorCUHacerPresupuesto(){

	}


    public Long getIdCilindrada() {
        return idCilindrada;
    }

    public void setIdCilindrada(Long idCilindrada) {
        this.idCilindrada = idCilindrada;
    }

    public Long getIdAplicacion() {
        return idAplicacion;
    }

    public void setIdAplicacion(Long idAplicacion) {
        this.idAplicacion = idAplicacion;
    }

    public Long getIdMotor() {
        return idMotor;
    }

    public void setIdMotor(Long idMotor) {
        this.idMotor = idMotor;
    }

    public List<Long> getIdTiposPartesMotores() {
        return idTiposPartesMotores;
    }

    public void setIdTiposPartesMotores(List<Long> idTiposPartesMotores) {
        this.idTiposPartesMotores = idTiposPartesMotores;
    }
}
