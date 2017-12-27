                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                package soldimet.service.expertos;

import ControladoresCU.ControladorErroresConBarraDeProgreso;
import factoria.FactoriaEstrategiaCargarRepuestos;


/**
 *
 * @author Manu
 */
public class ExpertoCUCargarRepuestosDeProveedor extends ExpertoCUManejoRepuestoYArticulo{

    EstrategiaCargarRepuestosProveedor estrategia;

    public ExpertoCUCargarRepuestosDeProveedor(ControladorErroresConBarraDeProgreso observador) {
        super(observador);
    }






    public void cargarRepuestosDeProveedor(String fuente, String Proveedor, String rubro, String descripcion,
            String marca, String tiporepuesto, float precio,String codigoArticuloProveedor, String ubicacion){

        estrategia = FactoriaEstrategiaCargarRepuestos.getInstance()
                .getEstrategia(Proveedor, fuente, this.getPrimerObservador());

        estrategia.cargarRepuestos(fuente, Proveedor, rubro, descripcion, marca, tiporepuesto, precio, codigoArticuloProveedor, ubicacion);

    }




}
