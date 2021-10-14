package soldimet.service.expertos;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.CostoOperacion;
import soldimet.domain.Motor;
import soldimet.domain.TipoParteMotor;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:42 p.m.
 */
@Service
public abstract class EstrategiaPresupuestoRectificacionCRAM {

    public EstrategiaPresupuestoRectificacionCRAM() {}

    public void finalize() throws Throwable {}

    /**
     *
     * @param cilindros
     * @param motor
     * @param aplicacion
     * @param parte
     */
    public abstract List<CostoOperacion> buscarOperaciones(Cilindrada cilindros, Motor motor, Aplicacion aplicacion, TipoParteMotor parte);
}
