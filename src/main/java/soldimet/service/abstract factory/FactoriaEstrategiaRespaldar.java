/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package factoria;

import ModeloDeComportamiento.EstrategiaRespaldar;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;

/**
 *
 * @author Manu
 */
public class FactoriaEstrategiaRespaldar {
    
    private static class Loader {
         static FactoriaEstrategiaRespaldar INSTANCE = new FactoriaEstrategiaRespaldar();
     }
    
    public FactoriaEstrategiaRespaldar() {}
    
    public static FactoriaEstrategiaRespaldar getInstance() {
         return Loader.INSTANCE;
    }
    
    public EstrategiaRespaldar buscarEstrategia(String estrategia){
        //verifico que la estrategia este habilitada y la devuelvo
        EstrategiaRespaldar estrateg = (EstrategiaRespaldar)IndireccionPersistencia.getInstance()
                    .Buscar("*","EstrategiaRespaldar", "habilitado= true and nombreEstrategiaRespaldar= "+estrategia);
        if(estrateg==null){
            //doy un aviso por pantalla de que no existe esta estrategia
        }
        return estrateg;
          
    }
    
    
}
