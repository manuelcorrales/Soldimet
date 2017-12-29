package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOAplicacionCUHacerPresupuesto {

	private String nombreAplicacion;
	private int numeroGrupo;

	public DTOAplicacionCUHacerPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

	public String getnombreAplicacion(){
		return nombreAplicacion;
	}

	public int getnumeroGrupo(){
		return numeroGrupo;
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
	public void setnumeroGrupo(int newVal){
		numeroGrupo = newVal;
	}

}
