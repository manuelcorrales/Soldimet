package soldimet.service.expertos;
import ModeloDeClases.Aplicacion;
import ModeloDeClases.Cilindrada;
import ModeloDeClases.CostoOperacion;
import ModeloDeClases.EstadoOperacion;
import ModeloDeClases.ListaPrecioDesdeHastaCRAM;
import ModeloDeClases.ListaPrecioRectificacionCRAM;
import ModeloDeClases.Motor;
import ModeloDeClases.TipoParteMotor;
import java.util.ArrayList;
import indireccion.IndireccionPersistencia;
import java.util.List;
/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
public class EstrategiaPresupuestoRectificacionCRAMExcel extends EstrategiaPresupuestoRectificacionCRAM {

	public EstrategiaPresupuestoRectificacionCRAMExcel(){

	}

	public void finalize() throws Throwable {

	}


        @Override
	public List<CostoOperacion> buscarOperaciones(Cilindrada cilindros, Motor motor, Aplicacion aplicacion, TipoParteMotor parte){
            //busco la lista
            ListaPrecioRectificacionCRAM lista = (ListaPrecioRectificacionCRAM)IndireccionPersistencia.getInstance()
                   .Buscar("*","ListaPrecioRectificacionCRAM as list", "list.numeroGrupoLista = '"+aplicacion.getLista().getNumeroGrupoLista()+"'");
           //busco el estado de la operacion
            EstadoOperacion estado = (EstadoOperacion) IndireccionPersistencia.getInstance()
                   .Buscar("*","EstadoOperacion as est", "est.estadoOp= Alta");

            //BUSCO LAS OPERACIONES

           List<ListaPrecioDesdeHastaCRAM>  listaDesde = lista.getFechas();//obtengo lista DESDE

           //Busco la instancia que no tiene asigando el valor  HASTA
           ListaPrecioDesdeHastaCRAM ultimaLista = new ListaPrecioDesdeHastaCRAM();
           for(ListaPrecioDesdeHastaCRAM LDesde : listaDesde){
               if(LDesde.getFechaHasta()==null){
                   ultimaLista= LDesde;
               }
           }

           //busco las operaciones de esta lista que tengan el estado Alta y lo agrego a la lista de DTO
            List<CostoOperacion> listaCosto = new ArrayList();   //lista de retorno

            List<CostoOperacion> listaCostosEncontrados = ultimaLista.getCostoOperacion();
            //busco los costos que coincidan el estado,la cilindrada y tipo parte motor
            //y los agrego a la lista Costo

            for(CostoOperacion costo: listaCostosEncontrados){
                if(costo.getTipoParte().equals(parte)){
                    if(costo.getCilindrada().equals(cilindros))
                        if(costo.getOperacion().getEstado().equals(estado)){
                            listaCosto.add(costo);
                        }
                }

            }



           return listaCosto;


	}

}
