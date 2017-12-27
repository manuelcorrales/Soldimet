package factoria;

import ModeloDeComportamiento.EstrategiaPresupuestoRectificacionCRAM;
import indireccion.IndireccionPersistencia;
import ModeloDeClases.ParametroGeneral;
import ModeloDeComportamiento.EstrategiaPresupuestoRectificacionCRAMExcel;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
public class FactoriaPresupuestorectificacion {
        
    
    private static class Loader {
         static FactoriaPresupuestorectificacion INSTANCE = new FactoriaPresupuestorectificacion();
     }
    
    private FactoriaPresupuestorectificacion() {}
    
    public static FactoriaPresupuestorectificacion getInstance() {
         return Loader.INSTANCE;
     }
    
    
    
	public EstrategiaPresupuestoRectificacionCRAM obtenerEstrategia(){
            
            ParametroGeneral parametro = (ParametroGeneral)IndireccionPersistencia.getInstance()
                    .Buscar("","ParametroGeneral", "");
            if(parametro.getNombreArchivoPresupuestoRectificacion().contains(".xlm")){
                EstrategiaPresupuestoRectificacionCRAMExcel estrategia = new EstrategiaPresupuestoRectificacionCRAMExcel();
                return estrategia;
            }
            
            
            
            
            return null;
            
		
	}

}