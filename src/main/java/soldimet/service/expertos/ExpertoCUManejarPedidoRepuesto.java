/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.DetallePedido;
import ModeloDeClases.EstadoDetallePedido;
import ModeloDeClases.EstadoPedidoRepuesto;
import ModeloDeClases.PedidoRepuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Manu
 */
public abstract class ExpertoCUManejarPedidoRepuesto  extends ObservableSimple{

    protected EstadoPedidoRepuesto estado1;
    protected EstadoPedidoRepuesto estado2;
    protected  String nombreEstado;

    private final String error = "No se encuentra el pedido indicado en el sistema.";

    public ExpertoCUManejarPedidoRepuesto(ControladorErroresSimple observador) {
        super(observador);
    }

    //busco cuales son los pedidos de repuestos en el estado asignado
    //y muestro los datos en pantalla
    //el estado lo asigno en el constructor
     public ArrayList<DTOPedidoRepuesto> iniciarCU() {
         IndireccionPersistencia.getInstance().iniciarTransaccion();

         try{


        instanciarEstados();

        ExpertoCUBuscarPedidoDeRepuestos experto = new ExpertoCUBuscarPedidoDeRepuestos();

        return experto.buscoPedido(nombreEstado);

         }catch(NullPointerException e){
             IndireccionPersistencia.getInstance().rollback();
         }
         return null;
    }


     public void cambiarEstadoDetallePEdido(int idDetallePedido, int idPedido) {
        try {

            //instancio los estados indicados en las clases hijas
            instanciarEstados();


            //busco los pedidos
            PedidoRepuesto pedido = (PedidoRepuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "PedidoRepuesto",
                            "(estado= " + estado1.getOidEstadoPedidorepuesto() + " or"
                            + " estado = " + estado2.getOidEstadoPedidorepuesto());

            //si no existe aviso por pantalla
            if (pedido == null) {
                //EL PEDIDO NO EXISTE
                throw new ExceptionStringSimple(error,this.getClass().getName());

            } else {

                //este el estado que le voy a aisgnar al detalle
                EstadoDetallePedido estadoDetallePedido = instanciarEstadoDetallePedido();

                //obtengo los detalles del pedido y busco el detalle que se cambia de estado
                List<DetallePedido> detalles = pedido.getDetallePedido();

                for (DetallePedido detalle : detalles) {

                    if (detalle.getIdDetallePedido() == idDetallePedido) {

                        //cuando encuentro el detalle le cambio el estado
                        detalle.setEstado(estadoDetallePedido);
                        IndireccionPersistencia.getInstance()
                                .update(detalle);

                    }
                }

                //si todos estan en estado pendientes de pedido, cambio el estado del presupuesto a pendiente
                if (verificarEstadoListaDetalles(detalles)) {

                    EstadoPedidoRepuesto estadoPendientePedido = buscarEstadoPedido();

                    pedido.setEstadoPedidoRepuesto(estadoPendientePedido);

                    IndireccionPersistencia.getInstance().update(pedido);
                }

            }
        } catch (NullPointerException | ExceptionStringSimple e) {

            IndireccionPersistencia.getInstance().rollback();
            avisarExceptionAObservadores(e);
        }
    }

    //verifico que todos los detalles tengan el mismo estado
    protected Boolean verificarEstadoListaDetalles(List<DetallePedido> detalles){

        //El estado que quiero comparar
        EstadoDetallePedido estadoDetallePedido = instanciarEstadoDetallePedido();

        if(estadoDetallePedido==null){
            //NO EXISTE EL ESTADO
        }else{

                //Si algun detalle NO tiene el estado, es falso
            for(DetallePedido detalle: detalles){
                if(!detalle.getEstado().equals(estadoDetallePedido)){
                    return false;
                }
              }
            //todos tienen el mismo estado
            return true;
            }



        return true;
        }



    protected  EstadoPedidoRepuesto buscarEstadoPedidoRepuestoPedido(){

        return (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoPedidoRepuesto as est", "est.nombreEstadoPedidorepuesto= 'Pedido'");
    }

    protected EstadoPedidoRepuesto buscarEstadoPedidoRepuestoRecibido(){

        return (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoPedidoRepuesto as est", "est.nombreEstadoPedidorepuesto= 'Recibido'");

    }
    protected EstadoPedidoRepuesto buscarEstadoPedidoRepuestoPendiente(){
        return (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoPedidoRepuesto as est", "est.nombreEstadoPedidorepuesto= 'Pendiente de Pedido'");

    }

    protected abstract void instanciarEstados();

    protected abstract EstadoDetallePedido instanciarEstadoDetallePedido();
    protected abstract EstadoPedidoRepuesto buscarEstadoPedido();

}
