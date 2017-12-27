/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;
import ModeloDeClases.DetallePedido;
import ModeloDeClases.EstadoPedidoRepuesto;
import ModeloDeClases.PedidoRepuesto;
import java.util.ArrayList;
import indireccion.IndireccionPersistencia;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUConsultarPedidoRepuestos {


    public ArrayList<DTOPedidoCUConsultarPedidoRepuestos> consultarPedidosPendientesDePedido(){

        //busco los pedidos de estado pendiente de pedido
        EstadoPedidoRepuesto estadoPendientePedido = (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPedidoRepuesto", "nombreEstadoPedidorepuesto= Pendiente de Pedido");

        ArrayList<PedidoRepuesto> pedidos =(ArrayList<PedidoRepuesto>)IndireccionPersistencia.getInstance()
                .Buscar("*","PedidoRepuesto","estado= "+estadoPendientePedido.getOidEstadoPedidorepuesto());


        //retorno el resultado del metodo que se encarga de crear la lista de DTO
        return this.armarDTO(pedidos, estadoPendientePedido.getnombreEstadoPedidoRepuesto());
    }

    public ArrayList<DTOPedidoCUConsultarPedidoRepuestos> consultarPedidosPendientesDeRecibo(){
        //busco los pedidos de estado pendiente de recibo
        EstadoPedidoRepuesto estadoPendientesDeRecibo = (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoPedidoRepuesto", "nombreEstadoPedidorepuesto= Pendiente de Pedido");

        ArrayList<PedidoRepuesto> pedidos =(ArrayList<PedidoRepuesto>)IndireccionPersistencia.getInstance()
                .Buscar("*","PedidoRepuesto","estado= "+estadoPendientesDeRecibo.getOidEstadoPedidorepuesto());


        //retorno el resultado del metodo que se encarga de crear la lista de DTO
        return this.armarDTO(pedidos, "Pedido");
    }

    public ArrayList<DTOPedidoCUConsultarPedidoRepuestos> consultarPedidosRecibidos(){
        //busco los pedidos de estado Recibidos
        EstadoPedidoRepuesto estadoRecibidos = (EstadoPedidoRepuesto)IndireccionPersistencia.getInstance()
                .Buscar("*","EstadoPedidoRepuesto", "nombreEstadoPedidorepuesto= Pendiente de Pedido");

        ArrayList<PedidoRepuesto> pedidos =(ArrayList<PedidoRepuesto>)IndireccionPersistencia.getInstance()
                .Buscar("*","PedidoRepuesto","estado="+estadoRecibidos.getOidEstadoPedidorepuesto());


        //retorno el resultado del metodo que se encarga de crear la lista de DTO
        return this.armarDTO(pedidos, estadoRecibidos.getnombreEstadoPedidoRepuesto());
    }

    private ArrayList<DTOPedidoCUConsultarPedidoRepuestos> armarDTO( ArrayList<PedidoRepuesto> pedidos, String tipoDTO){

        ArrayList<DTOPedidoCUConsultarPedidoRepuestos> listaDTO = new ArrayList();


        //por cada pedido encontrado creo un DTOPedidoCUConsultarPedidoRepuestos  y lo lleno
        for (PedidoRepuesto pedido : pedidos) {

            DTOPedidoCUConsultarPedidoRepuestos dtoPedido = new DTOPedidoCUConsultarPedidoRepuestos();

            // si no tiene fecha pedido ni recibo, sigo con el detalle
            //agrego el atributo tipo de DTO para saber bien en que momento esta
            dtoPedido.setTipoDTO(tipoDTO);
            dtoPedido.setFechaCreacion(pedido.getfechaCreacion());
            dtoPedido.setFechaPedido(pedido.getfechaPedido());//si esta pendiente este sera null
            dtoPedido.setFechaRecibo(pedido.getfechaRecibo());// si esta a la espera de recibo sera null
            dtoPedido.setIdPedidoRepuesto(pedido.getIdPedidoRepuesto());
            dtoPedido.setNombreCliente(pedido.getPresupuesto().getCliente().getNombre());

            //cargo el detalle del pedido

            List<DetallePedido> detalles =  pedido.getDetallePedido();

            for (DetallePedido detalle : detalles) {

                DTODetallePedidoCUConsultarPedidoRepuestos dtoDetalle = new DTODetallePedidoCUConsultarPedidoRepuestos();

                dtoDetalle.setProveedor(detalle.getArticulo().getProveedor().getNombre());
                dtoDetalle.setArticulo(detalle.getArticulo().getDescripcionArticulo());
                dtoDetalle.setCantidadArticulo(detalle.getCantidadArticulo());
                dtoDetalle.setCodigoArticuloProveedor(detalle.getArticulo().getCodigoArticuloProveedor());
                dtoDetalle.setMarca(detalle.getArticulo().getMarca().getnombreMarca());
                dtoDetalle.setPrecioRepuesto(detalle.getPrecioRepuesto());
                dtoDetalle.setRubro(detalle.getArticulo().getRubro().getNombreRubro());
                dtoDetalle.setTipoRepuesto(detalle.getArticulo().getTipoRepuesto().getNombreTipoRepuesto());
                dtoDetalle.setEstadoDetalle(detalle.getEstado().getnombreEstadoDetallePedidoRepuesto());
                dtoPedido.agregarDetalle(dtoDetalle);


            }

        listaDTO.add(dtoPedido);

        }

        return listaDTO;

    }
}
