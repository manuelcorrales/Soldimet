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
import soldimet.domain.EstadoPersona;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Proveedor;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.ProveedorRepository;
import soldimet.service.dto.DTODetallePedidoRepuesto;
import soldimet.service.dto.DTOPedidoRepuesto;
import soldimet.service.dto.DTOProveedor;

/**
 *
 * @author Manu
 */
public class ExpertoCUBuscarPedidoDeRepuestos {

    @Autowired
    private Globales globales;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    //busco los pedidos que no han sido cobrados y que fueron pedidos o recibidos
    //solo los que estan en estado PEDIDO o RECIBIDO
    public List<DTOPedidoRepuesto> buscarPedidosACobrar(){
        List<DTOPedidoRepuesto> listaPedidoRepuesto = new ArrayList();
        List<PedidoRepuesto> pedidos;

        //busco los pedidos en estado Pedido
        pedidos = buscarPedidos("Pedido");
        //agrego los pedidos en la lista de DTO
        agregarPedidosALista(listaPedidoRepuesto,pedidos);

        //busco los pedidos en estado Recibidos
        pedidos = buscarPedidos("Recibido");
        //agrego los pedidos en la lista de DTO
        agregarPedidosALista(listaPedidoRepuesto,pedidos);


        return listaPedidoRepuesto;
    }

    //busco todos los pedidos posibles
    public List<DTOPedidoRepuesto> buscarPedidos(){

        List<DTOPedidoRepuesto> listaPedidoRepuesto = new ArrayList();
        List<PedidoRepuesto> pedidos;

        //Busco los pedidos en estado pendiente
        pedidos = buscarPedidos("Pendiente de Pedido");
        //agrego los pedidos en la lista de DTO
        agregarPedidosALista(listaPedidoRepuesto,pedidos);

        //busco los pedidos en estado Pedido
        pedidos = buscarPedidos("Pedido");
        //agrego los pedidos en la lista de DTO
        agregarPedidosALista(listaPedidoRepuesto,pedidos);

        //busco los pedidos en estado Recibidos
        pedidos = buscarPedidos("Recibido");
        //agrego los pedidos en la lista de DTO
        agregarPedidosALista(listaPedidoRepuesto,pedidos);


        return listaPedidoRepuesto;
    }

    //busco los pedidos en estado que le indico
    public List<DTOPedidoRepuesto> buscoPedido(String estado){
        List<DTOPedidoRepuesto> listaPedidoRepuesto = new ArrayList();
        List<PedidoRepuesto> pedidos;

        //busco los pedidos en estado Recibidos
        pedidos = buscarPedidos(estado);
        //agrego los pedidos en la lista de DTO
        agregarPedidosALista(listaPedidoRepuesto,pedidos);


        return listaPedidoRepuesto;
    }

    //metodo que hace las busquedas
    private List<PedidoRepuesto> buscarPedidos(String estadoPedido){

        EstadoPedidoRepuesto estado =estadoPedidoRepuestoRepository.findByNombreEstado(estadoPedido);

        return pedidoRepuestoRepository.findByEstadoPedidoRepuesto(estado);
    }

    //armo el dto con los pedidos
    private void agregarPedidosALista(List<DTOPedidoRepuesto> listaDTO,List<PedidoRepuesto> pedidos){
        for(PedidoRepuesto pedido:pedidos){
            DTOPedidoRepuesto dtoPedido = new DTOPedidoRepuesto();
            dtoPedido.setEstadoPedidoRepuesto(pedido.getEstadoPedidoRepuesto().getNombreEstado());
            dtoPedido.setFechaCreacion(pedido.getFechaCreacion());
            dtoPedido.setFechaPedido(pedido.getFechaPedido());
            dtoPedido.setFechaRecibo(pedido.getFechaRecibo());
            dtoPedido.setIdPedidoRepuesto(pedido.getId());
            dtoPedido.setIdPresupuesto(pedido.getPresupuesto().getId());


            Set<DetallePedido> detalles = pedido.getDetallePedidos();

            for(DetallePedido detalle:detalles){

                DTODetallePedidoRepuesto dtoDetalle = new DTODetallePedidoRepuesto();
                dtoDetalle.setArticulo(detalle.getArticulo().getDescripcion());
                dtoDetalle.setCantidadArticulo(detalle.getCantidadArticulo());
                dtoDetalle.setCodigoArticuloProveedor(detalle.getArticulo().getCodigoArticuloProveedor());
                //dtoDetalle.setEstadoDetallePedido(detalle.getEstado().getnombreEstadoDetallePedidoRepuesto());
                dtoDetalle.setMarca(detalle.getArticulo().getMarca().getNombreMarca());
                dtoDetalle.setPrecioRepuesto(detalle.getPrecioRespuesto());
                dtoDetalle.setRubro(detalle.getArticulo().getRubro().getNombreRubro());
                dtoDetalle.setTipoRepuesto(detalle.getArticulo().getTipoRepuesto().getNombreTipoRepuesto());
                dtoDetalle.setDetallePedidoID(String.valueOf(detalle.getId()));
                dtoDetalle.setProveedor(detalle.getArticulo().getProveedor().getPersona().getNombre());
                dtoDetalle.setIdProveedor(detalle.getArticulo().getProveedor().getId());
                dtoPedido.agregarDetallePedidoRepuesto(dtoDetalle);

            }


        }

    }

    //busco los proveedores
    private List<DTOProveedor> buscarProveedores() throws Exception{

        List<DTOProveedor> listaProveedores = new ArrayList();

        EstadoPersona estadoAlta = estadoPersonaRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_ALTA);

        List<Proveedor> proveedoresEncontrados =proveedorRepository.findAll();
        List<Proveedor> proveedores = new ArrayList<>();

        for(Proveedor proveedor:proveedoresEncontrados){

            if(proveedor.getPersona().getEstadoPersona().equals(estadoAlta)){
                proveedores.add(proveedor);
            }

        }

        if(proveedores.isEmpty()){
            //DAR AVISO DE QUE NO HAY PROVEEDORES
            throw new Exception(globales.NO_HAY_PROVEEDORES_DADOS_DE_ALTA);
        }else{
            for(Proveedor proveedor:proveedores){
                DTOProveedor dto = new DTOProveedor();
                dto.setNombreProveedor(proveedor.getPersona().getNombre());
                listaProveedores.add(dto);
            }
        }



        return listaProveedores;


    }
}
