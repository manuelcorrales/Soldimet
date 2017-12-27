/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;
import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.EstadoPresupuesto;
import ModeloDeClases.Presupuesto;
import indireccion.IndireccionPersistencia;
import Exceptions.ExceptionStringSimple;

/**
 *
 * @author Manu
 */
public class ExpertoCUEntregarTrabajo extends ObservableSimple{

    private final String noExistePresupuesto = "No existe un presupuesto con ese número, no se puede realizar la operación";

    public ExpertoCUEntregarTrabajo(ControladorErroresSimple observador) {
        super(observador);
    }



    public void entregarTrabajo(String idPresupuesto) {
        IndireccionPersistencia.getInstance().iniciarTransaccion();

        try {
            //verifico ademas que no este en estado baja
            EstadoPresupuesto estadoEntregado = (EstadoPresupuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPresupuesto", "nombreEstadoPresupuesto= Entregado");
            EstadoPresupuesto estadoBaja = (EstadoPresupuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPresupuesto", "nombreEstadoPresupuesto= Baja");

            Presupuesto presupuesto = (Presupuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Presupuesto", "presupuestoId= " + idPresupuesto + " "
                            + "and estadoPresupuesto != " + estadoBaja.getOid());

            if (presupuesto == null) {
            //NO EXISTE ESTE PRESUPUESTO
              throw new ExceptionStringSimple(noExistePresupuesto,this.getClass().getName());
            } else {

                //modifico y guardo el presupuesto
                presupuesto.setEstado(estadoEntregado);
                IndireccionPersistencia.getInstance().guardar(presupuesto);
                IndireccionPersistencia.getInstance().commit();
            }
        } catch (NullPointerException | ExceptionStringSimple e) {
            IndireccionPersistencia.getInstance().rollback();
            avisarExceptionAObservadores(e);
        }

    }
}
