package soldimet.service.expertos;


import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.constant.Globales;
import soldimet.domain.Aplicacion;
import soldimet.domain.Articulo;
import soldimet.domain.Cilindrada;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.Motor;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.EstadoArticuloRepository;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:42 p.m.
 */
@Service
public abstract class EstrategiaBuscarRepuesto {

    @Autowired
    private EstadoArticuloRepository estadoArticuloRepository;

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private Globales globales;

	public EstrategiaBuscarRepuesto(){

	}

	public void finalize() throws Throwable {

	}

        public List<Articulo> buscarRepuesto(TipoParteMotor tipoParte, Cilindrada cilindrada,
                Motor motor, Aplicacion aplicacion){

            List<Articulo> listaArticulo = new ArrayList();
            /*En una futura opcion otra estrategia va a buscar presupuestos anteriores e indicar
            posibles repuestos o tipos de repuestos marcados.
            en la busqueda busco SIEMPRE la MARCA
            y la mesclo con cada palabra de la APLICACION y los CILINDROS
            El tipo repuesto lo tengo en una clase aparte*/

            //busco el estado del articulo proveedor en Alta
            EstadoArticulo estado =estadoArticuloRepository.findByNombreEstado(globales.NOMBRE_ESTADO_ARTICULO_ALTA);

            List<Articulo> listaArticulos = articuloRepository.findByEstado(estado);

            listaArticulo = filtrarRepuestos(listaArticulos,cilindrada,motor, aplicacion);

            return listaArticulo;
	}
        protected abstract List<Articulo> filtrarRepuestos(List<Articulo> articulos,Cilindrada cilindrada,
                Motor motor, Aplicacion aplicacion);
}
