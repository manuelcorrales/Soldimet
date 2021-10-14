package soldimet.service.abstractFactory;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import soldimet.service.expertos.EstrategiaPresupuestoRectificacionCRAM;
import soldimet.service.expertos.EstrategiaPresupuestoRectificacionCRAMExcel;

@Component
public class FactoriaPresupuestorectificacion {

    @Autowired
    private EstrategiaPresupuestoRectificacionCRAMExcel estrategiaPresupuestoRectificacionCRAMExcel;

    public EstrategiaPresupuestoRectificacionCRAM obtenerEstrategia() {
        EstrategiaPresupuestoRectificacionCRAMExcel estrategia = estrategiaPresupuestoRectificacionCRAMExcel;
        return estrategia;
    }
}
