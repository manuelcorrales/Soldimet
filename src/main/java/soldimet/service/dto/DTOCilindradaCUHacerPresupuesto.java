package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOCilindradaCUHacerPresupuesto {

	private int cantidadDeCilindros;

	public DTOCilindradaCUHacerPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

	public int getcantidadDeCilindros(){
		return cantidadDeCilindros;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setcantidadDeCilindros(int newVal){
		cantidadDeCilindros = newVal;
	}

}
