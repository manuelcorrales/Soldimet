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

/**
 *
 * @author Manu
 */
@Component
public class FactoriaEstrategiaMovimiento {

    @Autowired
    private EstrategiaMovimiento30dia estrategiaMovimiento30dia;

    public EstrategiaMovimiento obtenerEstrategia() {
        EstrategiaMovimiento estrategia;

        estrategia = estrategiaMovimiento30dia;

        return estrategia;
    }
}
