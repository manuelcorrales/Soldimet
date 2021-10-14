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
public class DTOBusquedaArticulo {

    private String proveedor;
    private String descripcion;
    private int articuloID;
    private Float precioPublico;
    private Float precioPrivado;
    private String rubro;
    private String marca;
    private String codArtProv;
    private int proveedorID;

    public DTOBusquedaArticulo() {}

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getArticuloID() {
        return articuloID;
    }

    public void setArticuloID(int articuloID) {
        this.articuloID = articuloID;
    }

    public Float getPrecioPublico() {
        return precioPublico;
    }

    public void setPrecioPublico(Float precio) {
        this.precioPublico = precio;
    }

    public Float getPrecioPrivado() {
        return precioPrivado;
    }

    public void setPrecioPrivado(Float precioPrivado) {
        this.precioPrivado = precioPrivado;
    }

    public String getRubro() {
        return rubro;
    }

    public void setRubro(String rubro) {
        this.rubro = rubro;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCodArtProv() {
        return codArtProv;
    }

    public void setCodArtProv(String codArtProv) {
        this.codArtProv = codArtProv;
    }

    public int getProveedorID() {
        return proveedorID;
    }

    public void setProveedorID(int proveedorID) {
        this.proveedorID = proveedorID;
    }
}
