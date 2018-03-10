/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import soldimet.constant.Globales;
import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.service.dto.DTODetallePedidoCUConsultarPedidoRepuestos;
import soldimet.service.dto.DTOPedidoCUConsultarPedidoRepuestos;

/**
 *
 * @author Manu
 */
public class ExpertoCUConsultarPedidoRepuestos {
    @Autowired
    private Globales globales;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;


    public List<DTOPedidoCUConsultarPedidoRepuestos> consultarPedidosPendientesDePedido(){

        //busco los pedidos de estado pendiente de pedido
        EstadoPedidoRepuesto estadoPendientePedido = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);

        List<PedidoRepuesto> pedidos =pedidoRepuestoRepository.findByEstadoPedidoRepuesto(estadoPendientePedido);

        //retorno el resultado del metodo que se encarga de crear la lista de DTO
        return this.armarDTO(pedidos, estadoPendientePedido.getNombreEstado());
    }

    public List<DTOPedidoCUConsultarPedidoRepuestos> consultarPedidosPendientesDeRecibo(){
        //busco los pedidos de estado pendiente de recibo
        EstadoPedidoRepuesto estadoPendientesDeRecibo = estadoPedidoRepuestoRepository.
            findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PENDIENTE_RECIBO);

        List<PedidoRepuesto> pedidos =pedidoRepuestoRepository.findByEstadoPedidoRepuesto(estadoPendientesDeRecibo);

        //retorno el resultado del metodo que se encarga de crear la lista de DTO
        return this.armarDTO(pedidos, globales.NOMBRE_ESTADO_PEDIDO_PENDIENTE_RECIBO);
    }

    public List<DTOPedidoCUConsultarPedidoRepuestos> consultarPedidosRecibidos(){
        //busco los pedidos de estado Recibidos
        EstadoPedidoRepuesto estadoRecibidos = estadoPedidoRepuestoRepository.
            findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO);

        List<PedidoRepuesto> pedidos =pedidoRepuestoRepository.findByEstadoPedidoRepuesto(estadoRecibidos);


        //retorno el resultado del metodo que se encarga de crear la lista de DTO
        return this.armarDTO(pedidos, estadoRecibidos.getNombreEstado());
    }

    private List<DTOPedidoCUConsultarPedidoRepuestos> armarDTO( List<PedidoRepuesto> pedidos, String tipoDTO){

        ArrayList<DTOPedidoCUConsultarPedidoRepuestos> listaDTO = new ArrayList();


        //por cada pedido encontrado creo un DTOPedidoCUConsultarPedidoRepuestos  y lo lleno
        for (PedidoRepuesto pedido : pedidos) {

            DTOPedidoCUConsultarPedidoRepuestos dtoPedido = new DTOPedidoCUConsultarPedidoRepuestos();

            // si no tiene fecha pedido ni recibo, sigo con el detalle
            //agrego el atributo tipo de DTO para saber bien en que momento esta
            dtoPedido.setTipoDTO(tipoDTO);
            dtoPedido.setFechaCreacion(pedido.getFechaCreacion());
            dtoPedido.setFechaPedido(pedido.getFechaPedido());//si esta pendiente este sera null
            dtoPedido.setFechaRecibo(pedido.getFechaRecibo());// si esta a la espera de recibo sera null
            dtoPedido.setIdPedidoRepuesto(pedido.getId());
            dtoPedido.setNombreCliente(pedido.getPresupuesto().getCliente().getPersona().getNombre());

            //cargo el detalle del pedido

            Set<DetallePedido> detalles =  pedido.getDetallePedidos();

            for (DetallePedido detalle : detalles) {

                DTODetallePedidoCUConsultarPedidoRepuestos dtoDetalle = new DTODetallePedidoCUConsultarPedidoRepuestos();

                dtoDetalle.setProveedor(detalle.getArticulo().getProveedor().getPersona().getNombre());
                dtoDetalle.setArticulo(detalle.getArticulo().getDescripcion());
                dtoDetalle.setCantidadArticulo(detalle.getCantidadArticulo());
                dtoDetalle.setCodigoArticuloProveedor(detalle.getArticulo().getCodigoArticuloProveedor());
                dtoDetalle.setMarca(detalle.getArticulo().getMarca().getNombreMarca());
                dtoDetalle.setPrecioRepuesto(detalle.getPrecioRespuesto());
                dtoDetalle.setRubro(detalle.getArticulo().getRubro().getNombreRubro());
                dtoDetalle.setTipoRepuesto(detalle.getArticulo().getTipoRepuesto().getNombreTipoRepuesto());
                //dtoDetalle.setEstadoDetalle(detalle.getEstado().getnombreEstadoDetallePedidoRepuesto());
                dtoPedido.agregarDetalle(dtoDetalle);


            }

        listaDTO.add(dtoPedido);

        }

        return listaDTO;

    }
}
