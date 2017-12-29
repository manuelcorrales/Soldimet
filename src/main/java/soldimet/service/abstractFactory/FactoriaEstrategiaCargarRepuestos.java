/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.abstractFactory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import soldimet.service.expertos.EstrategiaCargarRepuestosProveedor;
import soldimet.service.expertos.EstrategiaCargarRepuestosProveedorExcelPazzagliaSAPorLineaRubro;
import soldimet.service.expertos.EstrategiaCargarRepuestosProveedorManual;

/**
 *
 * @author Manu
 */
@Component
public class FactoriaEstrategiaCargarRepuestos {


    @Autowired
    private EstrategiaCargarRepuestosProveedorManual estrategiaCargarRepuestosProveedorManual;

    @Autowired
    private EstrategiaCargarRepuestosProveedorExcelPazzagliaSAPorLineaRubro estrategiaCargarRepuestosProveedorExcelPazzagliaSAPorLineaRubro;

    public EstrategiaCargarRepuestosProveedor getEstrategia(String nombreProveedor, String fuente){


    if(fuente.equals("Manual")){
        return estrategiaCargarRepuestosProveedorManual;
    }else{
        if(nombreProveedor.equals("Pazzaglia S.A"))
        return estrategiaCargarRepuestosProveedorExcelPazzagliaSAPorLineaRubro;
    }
         return estrategiaCargarRepuestosProveedorManual;
    }
}
