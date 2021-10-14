/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

/**
 *
 * @author Manu
 */
public class DTODetallePedidoRepuesto {

    private String articulo;
    private String marca;
    private String rubro;
    private String codigoArticuloProveedor;
    private String tipoRepuesto;
    private int cantidadArticulo;
    private float precioRepuesto;
    private String estadoDetallePedido;
    private String detallePedidoID;
    private String proveedor;
    private Long idProveedor;

    public DTODetallePedidoRepuesto() {}

    public Long getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Long idProveedor) {
        this.idProveedor = idProveedor;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public String getArticulo() {
        return articulo;
    }

    public void setArticulo(String articulo) {
        this.articulo = articulo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
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

    public String getTipoRepuesto() {
        return tipoRepuesto;
    }

    public void setTipoRepuesto(String tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public int getCantidadArticulo() {
        return cantidadArticulo;
    }

    public void setCantidadArticulo(int cantidadArticulo) {
        this.cantidadArticulo = cantidadArticulo;
    }

    public float getPrecioRepuesto() {
        return precioRepuesto;
    }

    public void setPrecioRepuesto(float precioRepuesto) {
        this.precioRepuesto = precioRepuesto;
    }

    public String getEstadoDetallePedido() {
        return estadoDetallePedido;
    }

    public void setEstadoDetallePedido(String estadoDetallePedido) {
        this.estadoDetallePedido = estadoDetallePedido;
    }

    public String getDetallePedidoID() {
        return detallePedidoID;
    }

    public void setDetallePedidoID(String detallePedidoID) {
        this.detallePedidoID = detallePedidoID;
    }
}
