/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.Articulo;
import ModeloDeClases.HistorialPrecio;
import ModeloDeClases.PrecioRepuesto;
import indireccion.IndireccionPersistencia;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUActualizarListaDePreciosDeProveedor extends ObservableSimple{

    public ExpertoCUActualizarListaDePreciosDeProveedor(ControladorErroresSimple observador) {
        super(observador);
    }

    public void actualizarPrecioArticulo(String articuloID,Float precioPublico, Float precioPrivado) {
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try{
            Articulo articulo = (Articulo)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Articulo as art","art.articuloID= '"+articuloID+"'");

            //Busco el ultimo precio, si es distinto creo uno nuevo
            List<HistorialPrecio> historial = articulo.getHistorial();
            HistorialPrecio ultimoHistorial = historial.get(0);
            for(HistorialPrecio historia : historial){
                if(historia.getFechadesde().after(ultimoHistorial.getFechadesde())){
                    ultimoHistorial = historia;
                }
            }

            if(ultimoHistorial.getPrecio().getPrecioRepuestoPublico()== precioPublico &&
                    ultimoHistorial.getPrecio().getPrecioRespuestoPrivado()== precioPrivado){
                //son iguales por lo que no actualizo nada

            } else {

                //cierro el precio anterior
                ultimoHistorial.getPrecio().setFechaHasta(new Date());
                IndireccionPersistencia.getInstance().guardar(ultimoHistorial);
                //creo un nuevo precio e historial y lo asigno

                HistorialPrecio nuevoHistorial = new HistorialPrecio();
                PrecioRepuesto nuevoPrecio = new PrecioRepuesto();

                nuevoPrecio.setprecioRepuestoPublico(precioPublico);
                nuevoPrecio.setPrecioRespuestoPrivado(precioPrivado);

                int nuevoIDPrecio = IndireccionPersistencia.getInstance()
                        .buscarUltimoID("pre.precioID", "PrecioRepuesto as pre");

                nuevoPrecio.setPrecioRepuestoId(nuevoIDPrecio+1);

                nuevoHistorial.setPrecio(nuevoPrecio);
                nuevoHistorial.setFechadesde(new Date());
                int nuevoIDHistorial = IndireccionPersistencia.getInstance()
                        .buscarUltimoID("his.historialPrecioID", "HistorialPrecio as his");


                nuevoHistorial.setHistorialPrecioId(nuevoIDHistorial);

                IndireccionPersistencia.getInstance().guardar(nuevoHistorial);
                IndireccionPersistencia.getInstance().guardar(nuevoPrecio);
                IndireccionPersistencia.getInstance().commit();

            }

        }catch(NullPointerException e){
            IndireccionPersistencia.getInstance().rollback();
        }

    }



}
