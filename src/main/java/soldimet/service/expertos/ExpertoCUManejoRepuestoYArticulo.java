/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.Articulo;
import ModeloDeClases.EstadoPersona;
import ModeloDeClases.HistorialPrecio;
import ModeloDeClases.Proveedor;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUManejoRepuestoYArticulo extends ObservableSimple {

    public ExpertoCUManejoRepuestoYArticulo(ControladorErroresSimple observador) {
        super(observador);
    }



    //muestro por pantalla todos los proveedores activos con su
    //fecha y hora de ultima actualización de precios
    public ArrayList<String[]> iniciarCu() {
        IndireccionPersistencia.getInstance().iniciarTransaccion();

        try {
            ArrayList<String[]> proveedorYFecha = new ArrayList();//lista de retorno

            //busco el estado de persons Alta
            EstadoPersona estadoActivo = (EstadoPersona) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPersona as est", "est.nombreEstadoPersona= 'Alta'");
            //busco los proveedores activos
            List<Proveedor> listaProveedores = (List<Proveedor>) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Proveedor as prov, Persona as per", "per.oid=prov.oid and per.estado= '" + String.valueOf(estadoActivo.getOidEstadoPersona() )+ "'");

            //busco por cada proveedor cuanto fue la ultima fecha de actualizacion de precios
            //busco la fecha mas reciente de entre todos los articulos
            for (Proveedor proveedor : listaProveedores) {
                String parProveedorFecha[] = new String[2];
                //busco la lista de articulos de un proveedor
                ArrayList<Articulo> listaArticulosProveedor = (ArrayList<Articulo>) IndireccionPersistencia.getInstance()
                        .Buscar("*", "Articulo as art", "art.proveedor= '" + String.valueOf(proveedor.getOid()) + "'");

                HistorialPrecio fechaMasRecienteArticulo = new HistorialPrecio();

                //busco el historial de precios de cada articulo y busco el de fecha mas reciente
                for (Articulo articulo : listaArticulosProveedor) {

                    //busco el historial de un articulo
                    List<HistorialPrecio> listaPrecioArticulo = articulo.getHistorial();

                    //comparo entre todos y obtengo el mas nuevo de este articulo
                    for (HistorialPrecio historialPrecio : listaPrecioArticulo) {
                        if (fechaMasRecienteArticulo.getFechadesde().before(historialPrecio.getFechadesde())) {
                            fechaMasRecienteArticulo = historialPrecio;//asigno el historial mas nuevo
                        }
                    }
                }

                parProveedorFecha[0] = proveedor.getNombre();
                parProveedorFecha[1] = fechaMasRecienteArticulo.getFechadesde().toString();

                proveedorYFecha.add(parProveedorFecha);
            }

            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return proveedorYFecha;
        } catch (NullPointerException e) {

            IndireccionPersistencia.getInstance().cerrarTransaccion();;
            return null;
        }

    }

    //busco articulos por descripcion
    public ArrayList<DTOBusquedaArticulo> buscarArticulo(String descripcion, String nombreProveedor){


        ArrayList<DTOBusquedaArticulo> listaDTO = new ArrayList();
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try{

            Proveedor prov = (Proveedor)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Proveedor as prov, Persona as per",
                            "prov.oid=per.oid  and per.nombre= '"+nombreProveedor+"'");

            ArrayList<Articulo> articulos =(ArrayList<Articulo>)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Articulo as art",
                            "art.proveedor = "+prov.getOid() +"and art.descripcion like '"+descripcion+"'");



        for(Articulo articulo: articulos){
            DTOBusquedaArticulo dto = new DTOBusquedaArticulo();
            dto.setArticuloID(articulo.getIdArticulo());
            dto.setDescripcion(articulo.getDescripcionArticulo());
            dto.setProveedor(articulo.getProveedor().getNombre());
            dto.setRubro(articulo.getRubro().getNombreRubro());
            dto.setMarca(articulo.getMarca().getnombreMarca());
            dto.setCodArtProv(articulo.getCodigoArticuloProveedor());
                //Busco el ultimo Precio
                List<HistorialPrecio> historial = articulo.getHistorial();
            HistorialPrecio historialUltimo =historial.get(0);
            for(HistorialPrecio historia : historial){
                if(historia.getFechadesde().after(historialUltimo.getFechadesde())){
                    historialUltimo= historia;
                }
            }
            dto.setPrecioPublico(historialUltimo.getPrecio().getPrecioRepuestoPublico());
            dto.setPrecioPrivado(historialUltimo.getPrecio().getPrecioRespuestoPrivado());

            listaDTO.add(dto);
        }


        IndireccionPersistencia.getInstance().cerrarTransaccion();
        return listaDTO;
        }catch(NullPointerException e){
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            avisarExceptionAObservadores(e);
            return null;
        }
    }





}
