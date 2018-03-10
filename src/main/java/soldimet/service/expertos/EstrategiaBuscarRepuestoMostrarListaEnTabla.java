package soldimet.service.expertos;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import soldimet.domain.Aplicacion;
import soldimet.domain.Articulo;
import soldimet.domain.Cilindrada;
import soldimet.domain.Motor;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:42 p.m.
 */
@Service
public class EstrategiaBuscarRepuestoMostrarListaEnTabla extends EstrategiaBuscarRepuesto {

	public EstrategiaBuscarRepuestoMostrarListaEnTabla(){

	}

	public void finalize() throws Throwable {

	}



        protected List<Articulo> filtrarRepuestos(List<Articulo> articulos, Cilindrada cilindrada,
                Motor motor, Aplicacion aplicacion){
            List<Articulo> listaArticulos = new ArrayList();//lista de retorno

            //Si el articulo no contiene la marca del motor lo elimino de la lista
            for(Articulo articulo: listaArticulos){
                if(!articulo.getDescripcion().contains(motor.getMarcaMotor())){
                    listaArticulos.remove(articulo);//elimino el articulo
                }

            }
            //Divido el string de aplicacion en cadenas, separadas por un espacio
            //luego busco en la lista de articulos Si cumple al menos uno
            //de las cadenas de la aplicacion, la dejo, sino la elimino
            String[] parteAplicacion= aplicacion.getNombreAplicacion().split(" ");
            for(Articulo articulo: listaArticulos){
                Boolean bandera = false;
                for(String cadenaAplicacion : parteAplicacion){
                    if(articulo.getDescripcion().contains(cadenaAplicacion)){
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
