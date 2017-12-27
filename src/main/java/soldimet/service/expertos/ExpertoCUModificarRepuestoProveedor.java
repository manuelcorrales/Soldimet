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
import java.util.Date;
import Exceptions.ExceptionStringSimple;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUModificarRepuestoProveedor extends ExpertoCUManejoRepuestoYArticulo {

    private final String error = "Este repuesto no se encuentra dado de Alta";

    public ExpertoCUModificarRepuestoProveedor(ControladorErroresSimple observador) {
        super(observador);
    }

    //SI EL CODIGOARTICULOPROVEEDOR ES 0, EL PROVEEDOR NO UTILIZA CODIGOS
    public void modificarRepuesto(String Proveedor, String rubro, String descripcion,
            String marca, String tipoRepuesto, Float precioPublico, Float precioPrivado, String codigoArticuloProveedor, int articuloID) {
        //inicio la transaccion
        IndireccionPersistencia.getInstance().iniciarTransaccion();

        try {
            Articulo articulo = (Articulo) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Articulo as art", "art.articuloID='" + articuloID + "'");

            Proveedor prov = (Proveedor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Proveedor as prov, Persona as per", "prov.oid=per.oid and per.nombreProveedor= '" + Proveedor + "'");
            Rubro rub = (Rubro) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Rubroas as rub", "rub.nombreRubro= " + rubro);
            Marca marc = (Marca) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Marca as mar", "mar.nombreMarca= " + marca);
            TipoRepuesto tipoRep = (TipoRepuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "tipoRep as tip", "tip.nombreTipoRepuesto= " + tipoRepuesto);
            Integer artID = IndireccionPersistencia.getInstance()
                    .buscarUltimoID("art.articuloID", "Articulo as art");
            if (artID == null) {
                artID = 1;
            } else {
                artID = +1;
            }
            EstadoArticuloProveedor estadoAlta = (EstadoArticuloProveedor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoArticuloProveedor", "nombreEstadoArticuloProveedor = 'Alta'");

            articulo.setDescripcionArticulo(descripcion);
            articulo.setEstado(estadoAlta);
            articulo.setMarca(marc);
            articulo.setProveedor(prov);
            articulo.setRubro(rub);
            articulo.setTipoRepuesto(tipoRep);
            articulo.setCodigoArticuloProveedor(codigoArticuloProveedor);
            articulo.setIdArticulo(artID);

            //Busco el ultimo Precio
            List<HistorialPrecio> historial = articulo.getHistorial();
            HistorialPrecio historialUltimo = historial.get(0);
            for (HistorialPrecio historia : historial) {
                if (historia.getFechadesde().after(historialUltimo.getFechadesde())) {
                    historialUltimo = historia;
                }
            }
            if (historialUltimo.getPrecio().getPrecioRepuestoPublico() == precioPublico && historialUltimo.getPrecio().getPrecioRespuestoPrivado() == precioPrivado) {
                //no cambio el precio
            } else {

                Integer histID = IndireccionPersistencia.getInstance()
                        .buscarUltimoID("his.historialPrecioID", "HistorialPrecio as his");
                if (histID == null) {
                    histID = 1;
                } else {
                    histID = +1;
                }
                Integer precID = IndireccionPersistencia.getInstance()
                        .buscarUltimoID("pre.precioRepuestoID", "PrecioRepuesto as pre");
                if (precID == null) {
                    precID = 1;
                } else {
                    precID = +1;
                }

                HistorialPrecio historialNuevo = new HistorialPrecio();
                PrecioRepuesto prec = new PrecioRepuesto();

                historialNuevo.setPrecio(prec);
                historialNuevo.setFechadesde(new Date());
                prec.setprecioRepuestoPublico(precioPublico);
                prec.setPrecioRespuestoPrivado(precioPrivado);

                prec.setPrecioRepuestoId(precID);
                historialNuevo.setHistorialPrecioId(histID);
                articulo.agregarHistorial(historialNuevo);

            }

            //fin CU
            IndireccionPersistencia.getInstance().guardar(articulo);
            IndireccionPersistencia.getInstance().commit();

        } catch (NullPointerException e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();

        }
    }

    public void eliminarRepuesto(String repuestoID) {

        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try {

            Articulo art = (Articulo) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Articulo as art", "art.articuloID= '" + repuestoID+"'");

            EstadoArticuloProveedor estadoAlta = (EstadoArticuloProveedor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoArticuloProveedor as est", "est.nombreEstadoArticuloProveedor= 'Alta'");

            EstadoArticuloProveedor estadoBaja = (EstadoArticuloProveedor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoArticuloProveedor as est", "est.nombreEstadoArticuloProveedor= 'Baja'");

            if (art.getEstado().equals(estadoAlta)) {

                art.setEstado(estadoBaja);
                IndireccionPersistencia.getInstance().guardar(art);


            } else {
                throw new ExceptionStringSimple(error, this.getClass().getName());

            }

            IndireccionPersistencia.getInstance().commit();

        } catch (NullPointerException e) {

            //dar aviso en el controlador
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();

        } catch (ExceptionStringSimple e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        }

    }

}
