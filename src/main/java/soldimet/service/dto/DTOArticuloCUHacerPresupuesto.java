package soldimet.service.dto;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOArticuloCUHacerPresupuesto {

	private String marca;
	private String nombreArticulo;
	private float precio;
	private String proveedor;
	private String rubro;
        private String codigoArticuloProveedor;
        private int articuloID;

	public DTOArticuloCUHacerPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getNombreArticulo() {
        return nombreArticulo;
    }

    public void setNombreArticulo(String nombreArticulo) {
        this.nombreArticulo = nombreArticulo;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public String getRubro() {
        return rubro;
    }

    public void setRubro(String rubro) {
        this.rubro = rubro;
    }

    public String getCodigoArticuloProveedor() {
        return codigoArticuloProveedor;
    }

    public void setCodigoArticuloProveedor(String codigoArticuloProveedor) {
        this.codigoArticuloProveedor = codigoArticuloProveedor;
    }

    public int getArticuloID() {
        return articuloID;
    }

    public void setArticuloID(int articuloID) {
        this.articuloID = articuloID;
    }



}
