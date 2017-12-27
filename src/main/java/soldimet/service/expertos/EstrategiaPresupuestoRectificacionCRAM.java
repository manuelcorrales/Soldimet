package soldimet.service.expertos;
import ModeloDeClases.Aplicacion;
import ModeloDeClases.Cilindrada;
import ModeloDeClases.CostoOperacion;
import ModeloDeClases.Motor;
import ModeloDeClases.TipoParteMotor;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:42 p.m.
 */
public abstract class EstrategiaPresupuestoRectificacionCRAM {

	public EstrategiaPresupuestoRectificacionCRAM(){

	}

	public void finalize() throws Throwable {

	}

	/**
	 *
	 * @param cilindros
	 * @param motor
	 * @param aplicacion
	 * @param parte
	 */
	public abstract List<CostoOperacion> buscarOperaciones(Cilindrada cilindros, Motor motor, Aplicacion aplicacion, TipoParteMotor parte);

}
