package soldimet.service.expertos;

import ModeloDeClases.Aplicacion;
import ModeloDeClases.Articulo;
import ModeloDeClases.Cilindrada;
import ModeloDeClases.EstadoArticuloProveedor;
import ModeloDeClases.Motor;
import ModeloDeClases.Operacion;
import ModeloDeClases.TipoParteMotor;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:42 p.m.
 */
public abstract class EstrategiaBuscarRepuesto {

	public EstrategiaBuscarRepuesto(){

	}

	public void finalize() throws Throwable {

	}

        public ArrayList<Articulo> buscarRepuesto(TipoParteMotor tipoParte, Cilindrada cilindrada,
                Motor motor, Aplicacion aplicacion){

            ArrayList<Articulo> listaArticulo = new ArrayList();
            /*En una futura opcion otra estrategia va a buscar presupuestos anteriores e indicar
            posibles repuestos o tipos de repuestos marcados.
            en la busqueda busco SIEMPRE la MARCA
            y la mesclo con cada palabra de la APLICACION y los CILINDROS
            El tipo repuesto lo tengo en una clase aparte*/

            //busco el estado del articulo proveedor en Alta
            EstadoArticuloProveedor estado =(EstadoArticuloProveedor)IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoArtculoProveedor","nombreEstadoArticuloProveedor= Alta");

            ArrayList<Articulo> listaArticulos = (ArrayList<Articulo>)IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "Articulo as art, TipoParteMotor as tipo, EstadoArticuloProveedor as est",
                            "estado= "+estado.getOid()+" and tipoRepuesto= "+tipoParte.getOid());

            listaArticulo = filtrarRepuestos(listaArticulos,cilindrada,motor, aplicacion);

            return listaArticulo;
	}
        protected abstract ArrayList<Articulo> filtrarRepuestos(ArrayList<Articulo> articulos,Cilindrada cilindrada,
                Motor motor, Aplicacion aplicacion);
}
