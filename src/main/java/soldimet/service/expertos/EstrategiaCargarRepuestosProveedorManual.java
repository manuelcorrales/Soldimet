/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.Articulo;
import ModeloDeClases.EstadoArticuloProveedor;
import ModeloDeClases.HistorialPrecio;
import ModeloDeClases.Marca;
import ModeloDeClases.PrecioRepuesto;
import ModeloDeClases.Proveedor;
import ModeloDeClases.Rubro;
import ModeloDeClases.TipoRepuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.Date;


/**
 *
 * @author Manu
 */
public class EstrategiaCargarRepuestosProveedorManual  extends ObservableSimple implements EstrategiaCargarRepuestosProveedor {

    public EstrategiaCargarRepuestosProveedorManual(ControladorErroresSimple observador) {
        super(observador);
    }


    @Override
    public void cargarRepuestos(String fuente, String Proveedor, String rubro, String descripcion,
            String marca, String tiporepuesto, float precio,String codigoArticuloProveedor, String ubicacion){
        IndireccionPersistencia.getInstance().iniciarTransaccion();

        ArrayList<HistorialPrecio> historiales = new ArrayList();
        HistorialPrecio historial = new HistorialPrecio();
        PrecioRepuesto prec = new PrecioRepuesto();
        historial.setPrecio(prec);
        historial.setFechadesde(new Date());
        prec.setprecioRepuestoPublico(precio);

        try{
            Proveedor prov = (Proveedor)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Persona as per, Proveedor as prov", "prov.oid=per.oid and per.nombre= '"+Proveedor+"'");
            Rubro rub = (Rubro)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Rubro as rub", "rub.nombreRubro= '"+rubro+"'");
            Marca marc = (Marca)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Marca as marc", "marc.nombreMarca= '"+marca+"'");
            TipoRepuesto tipoRep = (TipoRepuesto)IndireccionPersistencia.getInstance()
                    .Buscar("*", "tipoRep as tip", "tip.nombreTipoRepuesto= '"+tiporepuesto+"'");
            Integer artID=(Integer)IndireccionPersistencia.getInstance()
                    .Buscar("art.articuloID", "Articulo as art", "art.oid=art.oid ORDER BY articuloID DESC limit 1");
            EstadoArticuloProveedor estadoAlta =(EstadoArticuloProveedor)IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoArticuloProveedor as est", "est.nombreEstadoArticuloProveedor = 'Alta'");

            Integer histID=(Integer)IndireccionPersistencia.getInstance()
                    .Buscar("his.historialPrecioID", "HistorialPrecio as his", "his.oid=his.oid ORDER BY historialPrecioID DESC limit 1");
            Integer precID=(Integer)IndireccionPersistencia.getInstance()
                    .Buscar("pre.precioRepuestoID", "PrecioRepuesto as pre", "pre.oid=pre.oid ORDER BY precioRepuestoID DESC limit 1");

            if (artID == null) {
                artID = 1;

            } else {

                artID = artID + 1;
            }
            if (histID == null) {

                histID = 1;

            } else {

                histID = histID + 1;
            }
            if (precID == null) {

                precID = 1;

            } else {
                precID = precID + 1;
            }
            prec.setPrecioRepuestoId(precID);
            historial.setHistorialPrecioId(histID);

            Articulo articulo = new Articulo(
                        artID,
                        codigoArticuloProveedor,
                        descripcion,
                        rub,
                        prov,
                        marc,
                        estadoAlta,
                        tipoRep,
                        historiales);

            IndireccionPersistencia.getInstance().guardar(articulo);
            IndireccionPersistencia.getInstance().commit();

        }catch(NullPointerException e){

            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();


        }






    }
}
