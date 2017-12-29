package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:38 p.m.
 */
public class DTODatosMotorCUHacerPresupuesto {

	private int cilindrada;
	private String nombreAplicacion;
	private String nombreMotor;
	private String tipoParteMotor;

	public DTODatosMotorCUHacerPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

	public int getcilindrada(){
		return cilindrada;
	}

	public String getnombreAplicacion(){
		return nombreAplicacion;
	}

	public String getnombreMotor(){
		return nombreMotor;
	}

	public String gettipoParteMotor(){
		return tipoParteMotor;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setcilindrada(int newVal){
		cilindrada = newVal;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setnombreAplicacion(String newVal){
		nombreAplicacion = newVal;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setnombreMotor(String newVal){
		nombreMotor = newVal;
	}

	/**
	 *
	 * @param newVal
	 */
	public void settipoParteMotor(String newVal){
		tipoParteMotor = newVal;
	}

}
