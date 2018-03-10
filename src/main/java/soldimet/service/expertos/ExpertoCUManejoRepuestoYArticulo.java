/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import soldimet.constant.Globales;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoPersona;
import soldimet.domain.HistorialPrecio;
import soldimet.domain.Proveedor;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.ProveedorRepository;
import soldimet.service.dto.DTOBusquedaArticulo;

/**
 *
 * @author Manu
 */
public class ExpertoCUManejoRepuestoYArticulo  {

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private Globales globales;

    //muestro por pantalla todos los proveedores activos con su
    //fecha y hora de ultima actualización de precios
    public List<String[]> iniciarCu() {

        try {
            ArrayList<String[]> proveedorYFecha = new ArrayList();//lista de retorno

            List<Proveedor> proveedores = proveedorRepository.findAll();

            //busco el estado de persons Alta
            EstadoPersona estadoActivo = estadoPersonaRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_ALTA);

            //busco los proveedores activos
            List<Proveedor> listaProveedores = new ArrayList();
            for(Proveedor proveedor: proveedores){
                if(proveedor.getPersona().getEstadoPersona().equals(estadoActivo)){
                    listaProveedores.add(proveedor);
                }
            }

            //busco por cada proveedor cuanto fue la ultima fecha de actualizacion de precios
            //busco la fecha mas reciente de entre todos los articulos
            for (Proveedor proveedor : listaProveedores) {
                String parProveedorFecha[] = new String[2];
                //busco la lista de articulos de un proveedor
                List<Articulo> listaArticulosProveedor = articuloRepository.findByProveedor(proveedor);

                HistorialPrecio fechaMasRecienteArticulo = new HistorialPrecio();

                //busco el historial de precios de cada articulo y busco el de fecha mas reciente
                for (Articulo articulo : listaArticulosProveedor) {

                    //busco el historial de un articulo
                    Set<HistorialPrecio> listaPrecioArticulo = articulo.getHistorialPrecios();

                    //comparo entre todos y obtengo el mas nuevo de este articulo
                    for (HistorialPrecio historialPrecio : listaPrecioArticulo) {
                        if (fechaMasRecienteArticulo.getFechaHistorial().isBefore(historialPrecio.getFechaHistorial())) {
                            fechaMasRecienteArticulo = historialPrecio;//asigno el historial mas nuevo
                        }
                    }
                }

                parProveedorFecha[0] = proveedor.getPersona().getNombre();
                parProveedorFecha[1] = fechaMasRecienteArticulo.getFechaHistorial().toString();

                proveedorYFecha.add(parProveedorFecha);
            }

            return proveedorYFecha;
        } catch (NullPointerException e) {

            e.printStackTrace();
            return null;
        }

    }




}
