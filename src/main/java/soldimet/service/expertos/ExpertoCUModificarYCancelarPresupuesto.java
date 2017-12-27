/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.CobranzaOperacion;
import ModeloDeClases.DetallePedido;
import ModeloDeClases.DetallePresupuesto;
import ModeloDeClases.EstadoPedidoRepuesto;
import ModeloDeClases.EstadoPresupuesto;
import ModeloDeClases.PedidoRepuesto;
import ModeloDeClases.Presupuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author Manu
 */
public class ExpertoCUModificarYCancelarPresupuesto extends ExpertoCUPresupuestos {

    public ExpertoCUModificarYCancelarPresupuesto(ControladorErroresSimple observador) {
        super(observador);
    }



    public DTOPresupuesto IniciarCU(int idPresupuesto){


        //VOY A CREAR ESTE DTO PARA PASAR LOS DATOS DE LA PANTALLA DE LA BUSQUEDA AL DE CREARLO
        //TAMBIEN LE PASO EL ID DEL PRESUPUESTO (borro ese y creo uno nuevo con los datos nuevos)
        //AL EXPERTO LE ASIGNO EL ID DEL PRESUPUESTO MODIFICADO, SI TIENE UN ID QUE CREE 1 NUEVO Y BORRE ESTE


        Presupuesto presupuesto = (Presupuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","Presupuesto", "presupuestoId="+idPresupuesto);
        this.setIdPresupuesto(idPresupuesto);
        this.setClienteID(idPresupuesto);
        DTOPresupuesto dtoPresupuesto = new DTOPresupuesto();

        //datos de la cabecera
        dtoPresupuesto.setFechaAceptado(presupuesto.getFechaAceptado());
        dtoPresupuesto.setFechaCreado(presupuesto.getFechaCreacion());
        dtoPresupuesto.setFechaEntregado(presupuesto.getFechaEntregado());
        dtoPresupuesto.setIdCliente(presupuesto.getCliente().getIdClienteNegocio());
        dtoPresupuesto.setIdPresupuesto(presupuesto.getPresupuestoId());
        dtoPresupuesto.setImporteTotal(presupuesto.getImporteTotal());
        dtoPresupuesto.setNombreCliente(presupuesto.getCliente().getNombre());


        //sigo con los datos del detalle del presupuesto
        List<DetallePresupuesto> detallesPresu = presupuesto.getM_DetallePresupuesto();

        for(int indice = 0; indice<detallesPresu.size();indice++){

            DTODetallePresupuesto dtoDetalle = new DTODetallePresupuesto();

            //lleno del dtoDetalle
            dtoDetalle.setAplicacion(detallesPresu.get(indice).getAplicacion().getnombreAplicacion());
            dtoDetalle.setCilindrada(detallesPresu.get(indice).getCilindrada().getCantidadDeCilindros());
            dtoDetalle.setImporte(detallesPresu.get(indice).getimporte());
            dtoDetalle.setMotor(detallesPresu.get(indice).getMotor().getMarcaMotor());
            dtoDetalle.setTipoParteMotor(detallesPresu.get(indice).getTipoParte().getnombreTipoParteMotor());


            //este se maneja de a parejas asi que tiene que ir otro for
            //EL PRIMERO ES EL NOMBRE DE LA OPERACION Y EL SEGUNDO ES EL VALOR DE COBRO
            //obtengo la lista de opreaciones para armar los pares
            List<CobranzaOperacion> listaOperaciones = detallesPresu.get(indice).getOperacion();
            for(int index = 0; index<listaOperaciones.size();index+=2){
                //creo una pareja, primero el nombre de la operacion y despues cuanto se cobro
                Par pareja = new Par();
                pareja.setA(listaOperaciones.get(index).getOperacion().getNombreOperacion());
                pareja.setB(listaOperaciones.get(index).getCobranzaOperacion());

                dtoDetalle.agregarParejaOpYCob(pareja);
                //agrego el detalle a la cabecera
                dtoPresupuesto.agregarDetalle(dtoDetalle);
            }





        }

        PedidoRepuesto  pedidoRepuesto = (PedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","PedidoRepuesto", "Presupuesto= "+idPresupuesto);

        //creo el dto del pedido de repuestos y lo lleno con la cabecera
        DTOPedidoRepuesto dtoPedido = new DTOPedidoRepuesto();
        dtoPedido.setFechaCreacion(pedidoRepuesto.getfechaCreacion());
        dtoPedido.setFechaPedido(pedidoRepuesto.getfechaPedido());
        dtoPedido.setFechaRecibo(pedidoRepuesto.getfechaRecibo());
        dtoPedido.setIdPedidoRepuesto(pedidoRepuesto.getIdPedidoRepuesto());
        dtoPedido.setIdPresupuesto(pedidoRepuesto.getPresupuesto().getPresupuestoId());

        //ahora creo un dto detalle por cada detalle de pedido
        List<DetallePedido> detallesPedido = pedidoRepuesto.getDetallePedido();

        for (int i = 0; i<detallesPedido.size(); i++){

           DTODetallePedidoRepuesto dtoDetallePedido = new DTODetallePedidoRepuesto();

           dtoDetallePedido.setArticulo(detallesPedido.get(i).getArticulo().getDescripcionArticulo());
           dtoDetallePedido.setCantidadArticulo(detallesPedido.get(i).getCantidadArticulo());
           dtoDetallePedido.setCodigoArticuloProveedor(detallesPedido.get(i).getArticulo().getCodigoArticuloProveedor());
           dtoDetallePedido.setMarca(detallesPedido.get(i).getArticulo().getMarca().getnombreMarca());
           dtoDetallePedido.setPrecioRepuesto(detallesPedido.get(i).getPrecioRepuesto());
           dtoDetallePedido.setRubro(detallesPedido.get(i).getArticulo().getRubro().getNombreRubro());
           dtoDetallePedido.setTipoRepuesto(detallesPedido.get(i).getArticulo().getTipoRepuesto().getNombreTipoRepuesto());
           dtoDetallePedido.setProveedor(detallesPedido.get(i).getArticulo().getProveedor().getNombre());
           dtoDetallePedido.setIdProveedor(detallesPedido.get(i).getArticulo().getProveedor().getPersonaId());

           dtoPedido.agregarDetallePedidoRepuesto(dtoDetallePedido);

        }

        dtoPresupuesto.setPedido(dtoPedido);

            return dtoPresupuesto;
    }


    //La unica diferencia de este metodo es que no creo el presupuesto ni el pedido
    //estos ya existen asi que borro todo lo que tienen y los mando vacios
    //para que los llene el metodo de la clase padre
    @Override
    public void buscarPresupuestoYPedido(){
        Presupuesto pres =(Presupuesto)IndireccionPersistencia.getInstance()
                .Buscar("*", "Presupuesto", "presupuestoID= "+getIdPresupuesto());
        presupuestoNuevo =pres;

        PedidoRepuesto ped =(PedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*", "PedidoRepuesto", "presupuesto= "+pres.getOid());


         }
    @Override
    public void asignarIDaPedidoyPresupuesto(){
            //estos objetos ya tiene un ID, asi que no modifico nada
        }
    //cambio de estado a cancelado y chau nos vimo en disney
    public void cancelarPresupuesto(int presupuestoID){

        try{
            IndireccionPersistencia.getInstance().iniciarTransaccion();

        Presupuesto presu =(Presupuesto)IndireccionPersistencia.getInstance()
                .Buscar("*", "Presupuesto", "presupuestoID= "+presupuestoID);
        if(presu==null){
            //no se encontro ningun presupuesto
            //dar aviso por pantalla
        }else{//cancelo el presupuesto y el pedido de repuestos
            EstadoPresupuesto estadoBajaPresu=(EstadoPresupuesto)IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPresupuesto", "nombreEstadoPresupuesto= Cancelado");
            presu.setEstado(estadoBajaPresu);
            EstadoPedidoRepuesto estadoBajaPedido = (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPedido", "nombreEstadoPedidoRepuesto= cancelado");
            PedidoRepuesto pedido =(PedidoRepuesto)IndireccionPersistencia.getInstance()
                    .Buscar("*", "PedidoRepuesto", "presupuesto= "+presu.getOid());
            pedido.setEstadoPedidoRepuesto(estadoBajaPedido);
            IndireccionPersistencia.getInstance().guardar(presu);
            IndireccionPersistencia.getInstance().guardar(pedido);
        }

    }catch(NullPointerException e){

            IndireccionPersistencia.getInstance().rollback();
    }


    }
}

