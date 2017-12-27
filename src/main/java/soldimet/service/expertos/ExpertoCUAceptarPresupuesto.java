package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.EstadoPedidoRepuesto;
import ModeloDeClases.EstadoPresupuesto;
import ModeloDeClases.PedidoRepuesto;
import ModeloDeClases.Presupuesto;
import indireccion.IndireccionPersistencia;
import java.util.Date;
import javax.swing.JOptionPane;


/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
public class ExpertoCUAceptarPresupuesto extends ObservableSimple {

    public ExpertoCUAceptarPresupuesto(ControladorErroresSimple observador) {
        super(observador);
    }






    public void finalize() throws Throwable {

    }

    //Cambio el estado del presupuesto y del pedido de repuestos
    public void aceptarPresupuesto(int idPresupuesto) {

        Presupuesto presupuesto = buscarPresupuesto(idPresupuesto);

        EstadoPresupuesto estadoAceptado = (EstadoPresupuesto) IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPresupuesto as est", "est.nombreEstadoPresupuesto= Aceptado");
        if (presupuesto.getEstado().equals(estadoAceptado)) {

                //este presupuesto ya fue aceptado
            //avisar por pantalla la fecha de aceptacion
            Date fechaAceptado = presupuesto.getFechaAceptado();

        } else {
            //cambio el estado del presupuesto a aceptado y tambien del pedido de repuesto
            EstadoPresupuesto estadoCreado = (EstadoPresupuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPresupuesto as est", "est.nombreEstadoPresupuesto= Creado");
            if (presupuesto.getEstado().equals(estadoCreado)) {

                presupuesto.setEstado(estadoAceptado);
                presupuesto.setFechaAceptado(new Date());

                EstadoPedidoRepuesto estadoPendienteDePedido = (EstadoPedidoRepuesto) IndireccionPersistencia.getInstance()
                        .Buscar("*", "EstadoPedidoRepuesto as est", "est.nombreEstadoPedidoRepuesto= Pendiente de Pedido");

                PedidoRepuesto pedido = (PedidoRepuesto) IndireccionPersistencia.getInstance()
                        .Buscar("*", "PedidoRepuesto as ped, Presupuesto as pre", "pre.presupuesto= " + presupuesto.getOid());
                pedido.setEstadoPedidoRepuesto(estadoPendienteDePedido);

                //GUARDAR
                IndireccionPersistencia.getInstance().guardar(presupuesto);
                IndireccionPersistencia.getInstance().guardar(pedido);
            }
        }
    }

    //Cancelo el Presupuesto y tambien los movimientos realizados por este presupuesto
    public void cancelarPresupuesto(int idPresupuesto) {
        //DAR AVISO POR PANTALLA QUE SI SE CANCELA, SE BORRAN LOS MOVIMIENTOS
        Presupuesto presupuesto = buscarPresupuesto(idPresupuesto);
            //primero me fijo si el presupuesto esta aceptado
        //si no lo esta, devuelvo el estado en el que se encuentra
        EstadoPresupuesto estadoAceptado = (EstadoPresupuesto) IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPresupuesto as est", "est.nombreEstadoPresupuesto= Aceptado");

        if (presupuesto.getEstado().equals(estadoAceptado)) {
                //presupuesto aceptado, comienzo el CU

        } else {

                //aviso que el presupuesto no se encuentra aceptado
            //no se puede cancelar y paso el nombre del estado
        }

    }

    private Presupuesto buscarPresupuesto(int id) {
        try {
            return (Presupuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Presupuesto as pre", "pre.presupuestoID=" + id);
        } catch (NullPointerException e) {

            return null;
        }
    }

    @Override
    public void agregarObservador( ControladorErroresSimple observador) {
        observadores.add(observador);
    }


    @Override
    public void eliminarObservador( ControladorErroresSimple observador) {
        observadores.remove(observador);
    }

    @Override
    public void avisarExceptionAObservadores(Exception e) {

        JOptionPane.showMessageDialog(null, e, "Error", JOptionPane.ERROR_MESSAGE);

    }





}
