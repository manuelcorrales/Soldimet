/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

/**
 *
 * @author Manu
 */
public interface EstrategiaCargarRepuestosProveedor {

    public void cargarRepuestos(String fuente, String Proveedor, String rubro, String descripcion,
            String marca, String tiporepuesto, float precio,String codigoArticuloProveedor, String ubicacion);
}
