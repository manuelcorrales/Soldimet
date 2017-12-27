package soldimet.service.expertos;

import ModeloDeClases.Aplicacion;
import ModeloDeClases.Articulo;
import ModeloDeClases.Cilindrada;
import ModeloDeClases.Motor;
import java.util.ArrayList;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:42 p.m.
 */
public class EstrategiaBuscarRepuestoMostrarListaEnTabla extends EstrategiaBuscarRepuesto {

	public EstrategiaBuscarRepuestoMostrarListaEnTabla(){

	}

	public void finalize() throws Throwable {

	}



        protected  ArrayList<Articulo> filtrarRepuestos(ArrayList<Articulo> articulos, Cilindrada cilindrada,
                Motor motor, Aplicacion aplicacion){
            ArrayList<Articulo> listaArticulos = new ArrayList();//lista de retorno

            //Si el articulo no contiene la marca del motor lo elimino de la lista
            for(Articulo articulo: listaArticulos){
                if(!articulo.getDescripcionArticulo().contains(motor.getMarcaMotor())){
                    listaArticulos.remove(articulo);//elimino el articulo
                }

            }
            //Divido el string de aplicacion en cadenas, separadas por un espacio
            //luego busco en la lista de articulos Si cumple al menos uno
            //de las cadenas de la aplicacion, la dejo, sino la elimino
            String[] parteAplicacion= aplicacion.getnombreAplicacion().split(" ");
            for(Articulo articulo: listaArticulos){
                Boolean bandera = false;
                for(String cadenaAplicacion : parteAplicacion){
                    if(articulo.getDescripcionArticulo().contains(cadenaAplicacion)){
                        bandera = true;
                    }

                }
                if(!bandera){//si no se cambio la bandera, no hubo coincidencias, lo borro
                     listaArticulos.remove(articulo);
                }
            }

            return listaArticulos;
        }
}
