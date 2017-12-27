/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package factoria;

import ControladoresCU.ControladorErroresSimple;
import ModeloDeComportamiento.EstrategiaCargarRepuestosProveedor;
import ModeloDeComportamiento.EstrategiaCargarRepuestosProveedorExcelPazzagliaSAPorLineaRubro;
import ModeloDeComportamiento.EstrategiaCargarRepuestosProveedorManual;


/**
 *
 * @author Manu
 */
public class FactoriaEstrategiaCargarRepuestos {
     private static class Loader {
         static FactoriaEstrategiaCargarRepuestos INSTANCE = new FactoriaEstrategiaCargarRepuestos();
     }
    
    private FactoriaEstrategiaCargarRepuestos() {}
    
    public static FactoriaEstrategiaCargarRepuestos getInstance() {
         return Loader.INSTANCE;
     }
    
    public EstrategiaCargarRepuestosProveedor getEstrategia(String nombreProveedor, String fuente, ControladorErroresSimple observador){
        
    
    if(fuente.equals("Manual")){
        return new EstrategiaCargarRepuestosProveedorManual(observador);
    }else{
        if(nombreProveedor.equals("Pazzaglia S.A"))
        return new EstrategiaCargarRepuestosProveedorExcelPazzagliaSAPorLineaRubro(observador);
    }
         return new EstrategiaCargarRepuestosProveedorManual(observador);
    }
}
