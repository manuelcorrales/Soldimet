/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Articulo;
import ModeloDeClases.DetallePedido;
import ModeloDeClases.EstadoDetallePedido;
import ModeloDeClases.EstadoPersona;
import ModeloDeClases.HistorialPrecio;
import ModeloDeClases.Marca;
import ModeloDeClases.PrecioRepuesto;
import ModeloDeClases.Proveedor;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUIndicarCotizacionDeRepuestoPorProveedorEnPedidoDeRepuesto extends ObservableSimple {

    private final Boolean finalizadoBien = true;
    private final Boolean finalizadoMal = false;

    private final String NOSEENCUENTRAPROVEEDOR = "El proveedor indicado no existe o no esta habilitado";

    public ExpertoCUIndicarCotizacionDeRepuestoPorProveedorEnPedidoDeRepuesto(ControladorErroresSimple observador) {
        super(observador);
    }

    //busco los proveedores posibles
    public ArrayList<String> buscarProveedores() {

        IndireccionPersistencia.getInstance().iniciarTransaccion();

        ArrayList<String> listaNombresProveedores = new ArrayList();
        try {
            EstadoPersona estadoProvAlta = (EstadoPersona) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPersona as est", "est.nombreEstadoPersona= 'Alta'");

            ArrayList<Proveedor> listaProveedores = (ArrayList<Proveedor>) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Proveedor as prov, Persona as per",
                            "prov.oid=per.oid and per.estado= " + estadoProvAlta.getOidEstadoPersona());

            for (Proveedor prov : listaProveedores) {

                listaNombresProveedores.add(prov.getNombre());
            }
            return listaNombresProveedores;
        } catch (NullPointerException e) {

            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        }

    }

    /*
     Me fijo si el proveedor tiene el articulo que indica el detalle
     si no lo tiene , le creo uno y lo asigno
     si lo tiene, veo si debo actualizar el precio

     me fijo si le proveedor que entra es el mismo que ya tiene asignado
     si es el mismo proveedor, me fijo si actualizo el precio o creo un articulo nuevo
     si no es el mismo proveedor voy al condicional que puse arriba
     si no existe el proveedor, tira exception y mensaje por ventana
     */
    //asigno el proveedor a un pedido de repuesto y el precio
    public Boolean asignarProveedorYPrecio(String proveedor, Float precioPublico, Float precioPrivado, String detallePedidoID, String marcaa) {

        try {
            Proveedor prov = (Proveedor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Proveedor as prov, Persona as per", "prov.oid=per.oid and per.nombre= '" + proveedor+"'");
            EstadoDetallePedido estadoDet = (EstadoDetallePedido) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoDetallePedido as est", "est.nombreEstadoDetallePedido= 'Pendiente de Pedido'");

            DetallePedido detalle = (DetallePedido) IndireccionPersistencia.getInstance()
                    .Buscar("*", "DetallePedido as det",
                            "det.detallePedidoID= " + detallePedidoID + " and det.estado= " + estadoDet.getOidEstadoDetallePedido());

            Marca marca = (Marca) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Marca as marc",
                            "habilitado = 'true' and marc.nombreMarca= " + marcaa);

            if (prov == null) {
                throw new ExceptionStringSimple(NOSEENCUENTRAPROVEEDOR,this.getClass().getName());
            }
            //SI NO ES EL PROVEEDOR PRE ASIGNADO, ME FIJO SI YA EXISTE UN ARTICULO IGUAL PARA EL PROVEEDOR ELEGIDO
            //SI NO EXISTE ESE ARTICULO PARA PROVEEDOR, LE CREO AL PROVEEDOR ESTE MISMO ARTICULO Y SE LO ASIGNO
            //si es el proveedor verifico que el articulo tenga el precio que me dice, sino le creo uno nuevo

            //si el proveedor que tiene es el mismo que el que entra
            if (detalle.getArticulo().getProveedor().equals(prov)) {
                //solo reviso el precio
                verificarPrecio(detalle, precioPublico,precioPrivado, marca, prov);

            } else {
                //verifico la existencia del articulo
                verificarArticuloDelProveedor(prov, precioPublico,precioPrivado, detalle, marca);

            }
            return finalizadoBien;
        } catch (NullPointerException | ExceptionStringSimple e) {

            IndireccionPersistencia.getInstance().rollback();
            avisarExceptionAObservadores(e);
            return finalizadoMal;
        }

    }

    //verifico si el precio que tiene el articulo es el correcto, y si es de la marca, sino creo uno nuevo
    private void verificarPrecio(DetallePedido detalle, Float precioPublico, Float precioPrivado, Marca marca, Proveedor prov)throws NullPointerException{

        List<HistorialPrecio> historialDePrecios = detalle.getArticulo().getHistorial();
        //busco el ultimo precio cotizado
        HistorialPrecio historial = historialDePrecios.get(0);
        for (HistorialPrecio historia : historialDePrecios) {
            if (historia.getFechadesde().after(historial.getFechadesde())) {
                historial = historia;
            }

        }

        PrecioRepuesto precioviejo = historial.getPrecio();

        if (precioviejo.getPrecioRepuestoPublico() == precioPublico &&precioviejo.getPrecioRespuestoPrivado()==precioPrivado) {

            //me fijo que el articulo sea el correcto
            if (detalle.getArticulo().getMarca().equals(marca)) {

                //genial no toco nada
            } else {

                //creo un nuevo articulo de este proveedor y se lo asigno
                Articulo articuloViejo = detalle.getArticulo();
                Articulo artNuevo = new Articulo();
                artNuevo.setCodigoArticuloProveedor("");
                artNuevo.setDescripcionArticulo(articuloViejo.getDescripcionArticulo());
                artNuevo.setEstado(articuloViejo.getEstado());
                artNuevo.setMarca(marca);
                artNuevo.setProveedor(prov);
                artNuevo.setRubro(articuloViejo.getRubro());
                artNuevo.setTipoRepuesto(articuloViejo.getTipoRepuesto());

                int artID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("articuloID", "Articulo") + 1;

                artNuevo.setIdArticulo(artID);

                PrecioRepuesto precioNuevo = new PrecioRepuesto();

                precioNuevo.setprecioRepuestoPublico(precioPublico);
                precioNuevo.setPrecioRespuestoPrivado(precioPrivado);

                Integer precioID = IndireccionPersistencia.getInstance()
                        .buscarUltimoID("pre.precioRepuestoID", "PrecioRepuesto as pre");

                if(precioID==null){
                    precioID=1;
                }else{
                    precioID=+1;
                }

                HistorialPrecio nuevoHistorial = new HistorialPrecio();

                nuevoHistorial.setFechadesde(new Date());
                Integer nuevoHistorialID = IndireccionPersistencia.getInstance()
                        .buscarUltimoID("hist.historialPrecioID", "HistorialPrecio as hist");

                if(nuevoHistorialID==null){
                    nuevoHistorialID=1;
                }else{
                    nuevoHistorialID=+1;
                }

                nuevoHistorial.setHistorialPrecioId(nuevoHistorialID);

                precioNuevo.setPrecioRepuestoId(precioID);
                nuevoHistorial.setPrecio(precioNuevo);
                artNuevo.agregarHistorial(historial);

                detalle.setArticulo(artNuevo);
                //guardo todo
                IndireccionPersistencia.getInstance().guardar(artNuevo);
                IndireccionPersistencia.getInstance().guardar(nuevoHistorial);
                IndireccionPersistencia.getInstance().guardar(precioNuevo);
                IndireccionPersistencia.getInstance().guardar(detalle);

            }


        } else {
            //me fijo que el articulo sea el correcto
            if (detalle.getArticulo().getMarca().equals(marca)) {
                //si es el articulo, pero no el precio

                //debo actualizar el precio del producto(historial y precio)
                precioviejo.setFechaHasta(new Date());
                IndireccionPersistencia.getInstance().guardar(precioviejo);

                //nuevoprecio
                PrecioRepuesto precionuevo = new PrecioRepuesto();
                precionuevo.setprecioRepuestoPublico(precioPublico);
                precionuevo.setPrecioRespuestoPrivado(precioPrivado);
                int precioNuevoID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("pre.precioRepuestoID", "PrecioRepuesto as pre");
                precionuevo.setPrecioRepuestoId(precioNuevoID + 1);

                //nuevo historial
                HistorialPrecio historialNuevo = new HistorialPrecio();

                int nuevoHistorialID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("hist.historialPrecioID", "HistorialPrecio as hist");

                historialNuevo.setFechadesde(new Date());
                historialNuevo.setHistorialPrecioId(nuevoHistorialID);
                historialNuevo.setPrecio(precionuevo);

                //asigno el historial al articulo
                detalle.getArticulo().agregarHistorial(historialNuevo);

                //guardo el precio, el historial, y el articulo
                IndireccionPersistencia.getInstance().guardar(precionuevo);
                IndireccionPersistencia.getInstance().guardar(historialNuevo);

            } else {
                //no es el articulo ni el precio, creo todo
                //creo un nuevo articulo de este proveedor y se lo asigno
                Articulo articuloViejo = detalle.getArticulo();
                Articulo artNuevo = new Articulo();
                artNuevo.setCodigoArticuloProveedor("");
                artNuevo.setDescripcionArticulo(articuloViejo.getDescripcionArticulo());
                artNuevo.setEstado(articuloViejo.getEstado());
                artNuevo.setMarca(marca);
                artNuevo.setProveedor(prov);
                artNuevo.setRubro(articuloViejo.getRubro());
                artNuevo.setTipoRepuesto(articuloViejo.getTipoRepuesto());

                Integer artID =  IndireccionPersistencia.getInstance()
                        .buscarUltimoID("articuloID", "Articulo") + 1;

                if(artID==null){
                    artID=1;
                }else{
                    artID=+1;
                }

                artNuevo.setIdArticulo(artID);

                PrecioRepuesto precioNuevo = new PrecioRepuesto();

                precioNuevo.setprecioRepuestoPublico(precioPublico);
                precioNuevo.setPrecioRespuestoPrivado(precioPrivado);

                int precioID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("pre.precioRepuestoID", "PrecioRepuesto as pre");

                HistorialPrecio nuevoHistorial = new HistorialPrecio();

                nuevoHistorial.setFechadesde(new Date());
                Integer nuevoHistorialID =  IndireccionPersistencia.getInstance()
                        .buscarUltimoID("hist.historialPrecioID", "HistorialPrecio as hist");
                if(nuevoHistorialID==null){
                    nuevoHistorialID=1;
                }else{
                    nuevoHistorialID=+1;
                }

                nuevoHistorial.setHistorialPrecioId(precioID);

                precioNuevo.setPrecioRepuestoId(precioID);
                nuevoHistorial.setPrecio(precioNuevo);
                artNuevo.agregarHistorial(nuevoHistorial);

                detalle.setArticulo(artNuevo);
                //guardo todo
                IndireccionPersistencia.getInstance().guardar(artNuevo);
                IndireccionPersistencia.getInstance().guardar(nuevoHistorial);
                IndireccionPersistencia.getInstance().guardar(precioNuevo);
                IndireccionPersistencia.getInstance().guardar(detalle);


            }

            IndireccionPersistencia.getInstance().commit();
        }



    }




//ME FIJO SI YA EXISTE UN ARTICULO IGUAL PARA EL PROVEEDOR ELEGIDO,sino lo creo y asigno
    //me manejo con el proveedor que ingresa, no el que tenía
    private void verificarArticuloDelProveedor(Proveedor proveedor, Float precioPublico,Float precioPrivado,
            DetallePedido detalle, Marca marca)throws NullPointerException {

        //me fijo si el proveedor que ingresa tiene el articulo
        Articulo articulo = (Articulo) IndireccionPersistencia.getInstance()
                .Buscar("*", "Articulo as art, Rubro as rub, Marca as marc, EstadoArticuloProveedor as est,Proveedor ar prov",
                        "art.rubro= "+detalle.getArticulo().getRubro().getOid()+
                                " and art.marca= "+marca.getOid()+
                                " and art.estado = "+detalle.getArticulo().getEstado().getOid()+
                                " and art.proveedor = "+proveedor.getOid());


        //si lo tiene me fijo el precio, sino creo uno nuevo
        if (articulo != null) {
            List<HistorialPrecio> historialDePrecios = detalle.getArticulo().getHistorial();

            //busco el ultimo precio cotizado
            HistorialPrecio historial = historialDePrecios.get(0);
            for (HistorialPrecio historia : historialDePrecios) {
                if (historia.getFechadesde().after(historial.getFechadesde())) {
                    historial = historia;
                }

            }
            if(historial.getPrecio().getPrecioRepuestoPublico()==precioPublico &&historial.getPrecio().getPrecioRespuestoPrivado()==precioPrivado){
                //esta todo joya, por que tengo todo, no cambio nada
            }else{
                //tengo que crear un precio nuevo para este articulo y asignarlo
                PrecioRepuesto precioviejo = historial.getPrecio();
                //debo actualizar el precio del producto(historial y precio)
                precioviejo.setFechaHasta(new Date());
                IndireccionPersistencia.getInstance().guardar(precioviejo);

                //nuevoprecio
                PrecioRepuesto precionuevo = new PrecioRepuesto();
                precionuevo.setprecioRepuestoPublico(precioPublico);
                int precioNuevoID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("precioRepuestoID", "PrecioRepuesto");
                precionuevo.setPrecioRepuestoId(precioNuevoID + 1);

                //nuevo historial
                HistorialPrecio historialNuevo = new HistorialPrecio();

                int nuevoHistorialID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("historialPrecioID", "HistorialPrecio");

                historialNuevo.setFechadesde(new Date());
                historialNuevo.setHistorialPrecioId(nuevoHistorialID);
                historialNuevo.setPrecio(precionuevo);

                //asigno el historial al articulo
                detalle.getArticulo().agregarHistorial(historialNuevo);

                //guardo el precio, el historial, y el articulo
                IndireccionPersistencia.getInstance().guardar(precionuevo);
                IndireccionPersistencia.getInstance().guardar(historialNuevo);
                IndireccionPersistencia.getInstance().guardar(precionuevo);
            }

        }else{
            //el proveedor no tiene este articulo asi que creo uno nuevo con todo lo que me mandan
            //no es el articulo ni el precio, creo todo
                //creo un nuevo articulo de este proveedor y se lo asigno
                Articulo articuloViejo = detalle.getArticulo();
                Articulo artNuevo = new Articulo();
                artNuevo.setCodigoArticuloProveedor("");
                artNuevo.setDescripcionArticulo(articuloViejo.getDescripcionArticulo());
                artNuevo.setEstado(articuloViejo.getEstado());
                artNuevo.setMarca(marca);
                artNuevo.setProveedor(proveedor);
                artNuevo.setRubro(articuloViejo.getRubro());
                artNuevo.setTipoRepuesto(articuloViejo.getTipoRepuesto());

                int artID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("articuloID", "Articulo") + 1;

                artNuevo.setIdArticulo(artID);

                PrecioRepuesto precioNuevo = new PrecioRepuesto();

                precioNuevo.setprecioRepuestoPublico(precioPublico);

                int precioID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("precioRepuestoID", "PrecioRepuesto");

                HistorialPrecio nuevoHistorial = new HistorialPrecio();

                nuevoHistorial.setFechadesde(new Date());
                int nuevoHistorialID = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("historialPrecioID", "HistorialPrecio") + 1;

                nuevoHistorial.setHistorialPrecioId(precioID);

                precioNuevo.setPrecioRepuestoId(precioID);
                nuevoHistorial.setPrecio(precioNuevo);
                artNuevo.agregarHistorial(nuevoHistorial);

                detalle.setArticulo(artNuevo);
                //guardo todo
                IndireccionPersistencia.getInstance().guardar(artNuevo);
                IndireccionPersistencia.getInstance().guardar(nuevoHistorial);
                IndireccionPersistencia.getInstance().guardar(precioNuevo);
                IndireccionPersistencia.getInstance().guardar(detalle);


        }



    }

}
