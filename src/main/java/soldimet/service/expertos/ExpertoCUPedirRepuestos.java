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

/**
 *
 * @author Manu
 */
public class ExpertoCUPedirRepuestos extends ExpertoCUManejarPedidoRepuesto {

    public ExpertoCUPedirRepuestos(ControladorErroresSimple observador) {
        super(observador);

        nombreEstado = "Pedido";

    }



    @Override
    protected void instanciarEstados() {
        estado1 = buscarEstadoPedidoRepuestoRecibido();
        estado2 = buscarEstadoPedidoRepuestoPendiente();

    }

    @Override
    protected EstadoDetallePedido instanciarEstadoDetallePedido() {

        return (EstadoDetallePedido) IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoDetallePedido", "nombreEstadoDetallePedido= Pedido");
    }

    @Override
    protected EstadoPedidoRepuesto buscarEstadoPedido() {

        return (EstadoPedidoRepuesto) IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPedidoRepuesto", "nombreEstadoPedidorepuesto= Pedido");

    }

}
