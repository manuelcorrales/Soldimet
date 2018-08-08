/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.abstractFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import soldimet.service.expertos.EstrategiaMovimiento;
import soldimet.service.expertos.EstrategiaMovimiento30dia;
import soldimet.service.expertos.EstrategiaMovimientoUltimosCliente;

/**
 *
 * @author Manu
 */
@Component
public class FactoriaEstrategiaMovimiento {

    private final String consultarTodosLosMovimientos = "Consultar todos los movimientos";
    private final String consultarUltimos30DiasDeMovimientos = "Consultas movimiendos de los últimos 30 días";

   @Autowired
   private EstrategiaMovimiento30dia estrategiaMovimiento30dia;

   @Autowired
   private EstrategiaMovimientoUltimosCliente estrategiaMovimientoUltimosCliente;

    public EstrategiaMovimiento obtenerEstrategia (){

        EstrategiaMovimiento estrategia;


            estrategia = estrategiaMovimiento30dia;

            return estrategia;



    }


}
