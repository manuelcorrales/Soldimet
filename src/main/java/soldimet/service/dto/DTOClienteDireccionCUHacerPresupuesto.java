package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:38 p.m.
 */
public class DTOClienteDireccionCUHacerPresupuesto {

	private String clienteDireccion;

	public DTOClienteDireccionCUHacerPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

	public String getclienteDireccion(){
		return clienteDireccion;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setclienteDireccion(String newVal){
		clienteDireccion = newVal;
	}

}
