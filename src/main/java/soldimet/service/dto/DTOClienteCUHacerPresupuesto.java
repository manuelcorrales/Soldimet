package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOClienteCUHacerPresupuesto {

	private String apellido;
	private String direccion;
	private String nombreCliente;
	private String numeroTelefono;
	public DTOCLienteApellidoCUHacerPresupuesto m_DTOCLienteApellidoCUHacerPresupuesto;
	public DTOClienteDireccionCUHacerPresupuesto m_DTOClienteDireccionCUHacerPresupuesto;
	public DTOClienteTelefonoCUHacerPresupuesto m_DTOClienteTelefonoCUHacerPresupuesto;

	public DTOClienteCUHacerPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

	/**
	 *
	 * @param apellido
	 */
	public void AddApellidoCliente(DTOCLienteApellidoCUHacerPresupuesto apellido){

	}

	/**
	 *
	 * @param telefono
	 */
	public void AddClienteTelefono(DTOClienteTelefonoCUHacerPresupuesto telefono){

	}

	/**
	 *
	 * @param direccion
	 */
	public void AddDireccionCliente(DTOClienteDireccionCUHacerPresupuesto direccion){

	}

	public String getapellido(){
		return apellido;
	}

	public String getdireccion(){
		return direccion;
	}

	public String getnombreCliente(){
		return nombreCliente;
	}

	public String getnumeroTelefono(){
		return numeroTelefono;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setapellido(String newVal){
		apellido = newVal;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setdireccion(String newVal){
		direccion = newVal;
	}

	/**
	 *
	 * @param idCliente
	 */
	public void setIdCliente(String idCliente){

	}

	/**
	 *
	 * @param newVal
	 */
	public void setnombreCliente(String newVal){
		nombreCliente = newVal;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setnumeroTelefono(String newVal){
		numeroTelefono = newVal;
	}

}
