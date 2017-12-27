/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import Exceptions.ExceptionStringSimple;
import ModeloDeClases.DetallePedido;
import ModeloDeClases.EstadoPedidoRepuesto;
import ModeloDeClases.EstadoPersona;
import ModeloDeClases.PedidoRepuesto;
import ModeloDeClases.Proveedor;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUBuscarPedidoDeRepuestos {

    private final String errorNoHayProveedoresAlta ="No se encontraron proveedores dados de Alta.";

    //busco los pedidos que no han sido cobrados y que fueron pedidos o recibidos
    //solo los que estan en estado PEDIDO o RECIBIDO
    public ArrayList<DTOPedidoRepuesto> buscarPedidosACobrar(){
        ArrayList<DTOPedidoRepuesto> listaPedidoRepuesto = new ArrayList();
        ArrayList<PedidoRepuesto> pedidos;

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
    public ArrayList<DTOPedidoRepuesto> buscarPedidos(){

        ArrayList<DTOPedidoRepuesto> listaPedidoRepuesto = new ArrayList();
        ArrayList<PedidoRepuesto> pedidos;

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
    public ArrayList<DTOPedidoRepuesto> buscoPedido(String estado){
        ArrayList<DTOPedidoRepuesto> listaPedidoRepuesto = new ArrayList();
        ArrayList<PedidoRepuesto> pedidos;

        //busco los pedidos en estado Recibidos
        pedidos = buscarPedidos(estado);
        //agrego los pedidos en la lista de DTO
        agregarPedidosALista(listaPedidoRepuesto,pedidos);


        return listaPedidoRepuesto;
    }

    //metodo que hace las busquedas
    private ArrayList<PedidoRepuesto> buscarPedidos(String estadoPedido){

        EstadoPedidoRepuesto estado =(EstadoPedidoRepuesto)indireccion.IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPedidoRepuesto as est", "est.nombreEstadoPedidoRepuesto= '"+estadoPedido+"'");

        return (ArrayList<PedidoRepuesto>)IndireccionPersistencia.getInstance()
                .Buscar("*", "PedidoRepuesto as ped", "ped.estado= '"+estado.getOidEstadoPedidorepuesto()+"'");
    }

    //armo el dto con los pedidos
    private void agregarPedidosALista(ArrayList<DTOPedidoRepuesto> listaDTO,ArrayList<PedidoRepuesto> pedidos){
        for(PedidoRepuesto pedido:pedidos){
            DTOPedidoRepuesto dtoPedido = new DTOPedidoRepuesto();
            dtoPedido.setEstadoPedidoRepuesto(pedido.getEstado().getnombreEstadoPedidoRepuesto());
            dtoPedido.setFechaCreacion(pedido.getfechaCreacion());
            dtoPedido.setFechaPedido(pedido.getfechaPedido());
            dtoPedido.setFechaRecibo(pedido.getfechaRecibo());
            dtoPedido.setIdPedidoRepuesto(pedido.getIdPedidoRepuesto());
            dtoPedido.setIdPresupuesto(pedido.getPresupuesto().getPresupuestoId());


            List<DetallePedido> detalles = pedido.getDetallePedido();

            for(DetallePedido detalle:detalles){

                DTODetallePedidoRepuesto dtoDetalle = new DTODetallePedidoRepuesto();
                dtoDetalle.setArticulo(detalle.getArticulo().getDescripcionArticulo());
                dtoDetalle.setCantidadArticulo(detalle.getCantidadArticulo());
                dtoDetalle.setCodigoArticuloProveedor(detalle.getArticulo().getCodigoArticuloProveedor());
                dtoDetalle.setEstadoDetallePedido(detalle.getEstado().getnombreEstadoDetallePedidoRepuesto());
                dtoDetalle.setMarca(detalle.getArticulo().getMarca().getnombreMarca());
                dtoDetalle.setPrecioRepuesto(detalle.getPrecioRepuesto());
                dtoDetalle.setRubro(detalle.getArticulo().getRubro().getNombreRubro());
                dtoDetalle.setTipoRepuesto(detalle.getArticulo().getTipoRepuesto().getNombreTipoRepuesto());
                dtoDetalle.setDetallePedidoID(String.valueOf(detalle.getIdDetallePedido()));
                dtoDetalle.setProveedor(detalle.getArticulo().getProveedor().getNombre());
                dtoDetalle.setIdProveedor(detalle.getArticulo().getProveedor().getPersonaId());
                dtoPedido.agregarDetallePedidoRepuesto(dtoDetalle);

            }


        }

    }

    //busco los proveedores
    private ArrayList<DTOProveedor> buscarProveedores() throws ExceptionStringSimple{

        ArrayList<DTOProveedor> listaProveedores = new ArrayList();

        EstadoPersona estadoAlta =(EstadoPersona)indireccion.IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPersona as est", "est.nombreEstadoPersona= Alta");

        ArrayList<Proveedor> proveedores =(ArrayList<Proveedor>)indireccion.IndireccionPersistencia.getInstance()
                .Buscar("*", "Proveedor as prov", "prov.estado= "+estadoAlta.getOidEstadoPersona());

        if(proveedores.isEmpty()){
            //DAR AVISO DE QUE NO HAY PROVEEDORES
            throw new ExceptionStringSimple(errorNoHayProveedoresAlta,this.getClass().getName());
        }else{
            for(Proveedor proveedor:proveedores){
                DTOProveedor dto = new DTOProveedor();
                dto.setNombreProveedor(proveedor.getNombre());
                listaProveedores.add(dto);
            }
        }



        return listaProveedores;


    }
}
