package soldimet.service.dto;


import soldimet.domain.DetallePresupuesto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:41 p.m.
 */
public class DtoRepuestosElegidos {

	private int cantidadRepuesto;
	private String nombreRepuesto;
	private float precioRepuesto;

	public DtoRepuestosElegidos(){

	}

	public void finalize() throws Throwable {

	}

	/**
	 *
	 * @param detalle
	 */
	public void AddDetallePresupuesto(DetallePresupuesto detalle){

	}

	public int getcantidadRepuesto(){
		return cantidadRepuesto;
	}

	public String getnombreRepuesto(){
		return nombreRepuesto;
	}

	public float getprecioRepuesto(){
		return precioRepuesto;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setcantidadRepuesto(int newVal){
		cantidadRepuesto = newVal;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setnombreRepuesto(String newVal){
		nombreRepuesto = newVal;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setprecioRepuesto(float newVal){
		precioRepuesto = newVal;
	}

}
