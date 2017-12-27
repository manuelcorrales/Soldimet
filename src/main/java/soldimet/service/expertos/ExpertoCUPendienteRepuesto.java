/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.EstadoDetallePedido;
import ModeloDeClases.EstadoPedidoRepuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;


/**
 *
 * @author Manu
 */
public class ExpertoCUPendienteRepuesto extends ExpertoCUManejarPedidoRepuesto {

    public ExpertoCUPendienteRepuesto(ControladorErroresSimple observador) {
        super(observador);
        nombreEstado="Pendiente de Pedido";
    }




    @Override
    protected void instanciarEstados() {
        estado1 = buscarEstadoPedidoRepuestoPedido();
        estado2= buscarEstadoPedidoRepuestoRecibido();

    }

    @Override
    protected EstadoDetallePedido instanciarEstadoDetallePedido() {

        return (EstadoDetallePedido)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoDetallePedido", "nombreEstadoDetallePedido= Pendiente de Pedido");
    }

    @Override
    protected EstadoPedidoRepuesto buscarEstadoPedido() {

        return (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoPedidoRepuesto", "nombreEstadoPedidorepuesto= Pendiente de Pedido");

    }



}
