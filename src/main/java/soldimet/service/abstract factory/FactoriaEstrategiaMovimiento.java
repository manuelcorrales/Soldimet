/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package factoria;
import ModeloDeClases.PermisosRol;
import ModeloDeClases.RolEmpleado;
import ModeloDeComportamiento.EstrategiaMovimiento;
import ModeloDeComportamiento.EstrategiaMovimiento30dia;
import ModeloDeComportamiento.EstrategiaMovimientoUltimosCliente;
import java.util.List;

/**
 *
 * @author Manu
 */
public class FactoriaEstrategiaMovimiento {
    
    private final String consultarTodosLosMovimientos = "Consultar todos los movimientos";
    private final String consultarUltimos30DiasDeMovimientos = "Consultas movimiendos de los últimos 30 días";
    
    private static class Loader {
         static FactoriaEstrategiaMovimiento INSTANCE = new FactoriaEstrategiaMovimiento();
     }
    
    private FactoriaEstrategiaMovimiento() {}
    
    public static FactoriaEstrategiaMovimiento getInstance() {
         return Loader.INSTANCE;
     }
    
    
    public EstrategiaMovimiento obtenerEstrategia (RolEmpleado rol){
        
        EstrategiaMovimiento estrategia;
        
        List<PermisosRol> permisos = rol.getPermisos();
        

        for(PermisosRol permiso: permisos){
        
        if(permiso.getPermiso().equalsIgnoreCase(consultarUltimos30DiasDeMovimientos)){
        
            estrategia = new EstrategiaMovimiento30dia();
        
            return estrategia;
            
        }
        if(permiso.getPermiso().equalsIgnoreCase(consultarTodosLosMovimientos)){
        
            estrategia = new EstrategiaMovimientoUltimosCliente();
        
            return estrategia;
        }
        
        }
        return null;
    }
    
    
}
