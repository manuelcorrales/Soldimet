package soldimet.service.expertos;


import com.netflix.discovery.converters.Auto;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import jdk.nashorn.internal.objects.Global;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.constant.Globales;
import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.CostoOperacion;
import soldimet.domain.EstadoOperacion;
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.domain.Motor;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.EstadoOperacionRepository;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
@Service
public class EstrategiaPresupuestoRectificacionCRAMExcel extends EstrategiaPresupuestoRectificacionCRAM {

	public EstrategiaPresupuestoRectificacionCRAMExcel(){

	}

	@Autowired
    private ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

	@Autowired
    private EstadoOperacionRepository estadoOperacionRepository;

	@Autowired
    private Globales globales;


        @Override
	public List<CostoOperacion> buscarOperaciones(Cilindrada cilindros, Motor motor, Aplicacion aplicacion, TipoParteMotor parte){
            //busco la lista
            ListaPrecioRectificacionCRAM lista = listaPrecioRectificacionCRAMRepository.findByNumeroGrupo(aplicacion.getNumeroGrupo());

           //busco el estado de la operacion
            EstadoOperacion estado = estadoOperacionRepository.findByNombreEstado(globales.NOMBRE_ESTADO_OPERACION_ALTA);

            //BUSCO LAS OPERACIONES

           Set<ListaPrecioDesdeHasta> listaDesde = lista.getFechas();//obtengo lista DESDE

           //Busco la instancia que no tiene asigando el valor  HASTA
            ListaPrecioDesdeHasta ultimaLista = new ListaPrecioDesdeHasta();
           for(ListaPrecioDesdeHasta LDesde : listaDesde){
               if(LDesde.getFechaHasta()==null){
                   ultimaLista= LDesde;
               }
           }

           //busco las operaciones de esta lista que tengan el estado Alta y lo agrego a la lista de DTO
            List<CostoOperacion> listaCosto = new ArrayList();   //lista de retorno

            Set<CostoOperacion> listaCostosEncontrados = ultimaLista.getCostoOperacions();
            //busco los costos que coincidan el estado,la cilindrada y tipo parte motor
            //y los agrego a la lista Costo

            for(CostoOperacion costo: listaCostosEncontrados){
                if(costo.getTipoParteMotor().equals(parte)){
                    if(costo.getCilindrada().equals(cilindros))
                        if(costo.getOperacion().getEstadoOperacion().equals(estado)){
                            listaCosto.add(costo);
                        }
                }

            }



           return listaCosto;


	}

}
