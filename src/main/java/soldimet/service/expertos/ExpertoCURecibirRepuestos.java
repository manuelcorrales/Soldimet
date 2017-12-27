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
public class ExpertoCURecibirRepuestos extends ExpertoCUManejarPedidoRepuesto{

    public ExpertoCURecibirRepuestos(ControladorErroresSimple observador) {
        super(observador);
                nombreEstado="Recibido";

    }




    @Override
    protected void instanciarEstados() {
        estado1 = buscarEstadoPedidoRepuestoPedido();
        estado2= buscarEstadoPedidoRepuestoPendiente();

    }

    @Override
    protected EstadoDetallePedido instanciarEstadoDetallePedido() {

        return (EstadoDetallePedido)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoDetallePedido", "nombreEstadoDetallePedido= Recbido");
    }

    @Override
    protected EstadoPedidoRepuesto buscarEstadoPedido() {

        return (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoPedidoRepuesto", "nombreEstadoPedidorepuesto= Recbido");

    }







}
