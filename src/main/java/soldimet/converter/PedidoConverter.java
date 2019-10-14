package soldimet.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import soldimet.domain.DetallePedido;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Presupuesto;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.dto.DTOPresupuesto;

@Component
public class PedidoConverter {

    public DTOPedidoCabecera convertirPedidoAPedidoCabecera(PedidoRepuesto pedido){
        DTOPedidoCabecera dtoPedidoCabecera = new DTOPedidoCabecera();
        dtoPedidoCabecera.setCliente(pedido.getPresupuesto().getCliente().getPersona().getUser().getLastName()+", "+pedido.getPresupuesto().getCliente().getPersona().getUser().getFirstName());
        dtoPedidoCabecera.setEstado(pedido.getEstadoPedidoRepuesto().getNombreEstado());
        dtoPedidoCabecera.setFecha(pedido.getFechaCreacion());
        dtoPedidoCabecera.setId(pedido.getId());
        String tipo = "";
        for (DetallePedido detallePedido: pedido.getDetallePedidos()) {
            tipo += "-"+detallePedido.getDetallePresupuesto().getTipoParteMotor().getNombreTipoParteMotor();
        }
        dtoPedidoCabecera.setTipo(tipo.replaceFirst("-", " "));
        dtoPedidoCabecera.setMotor(pedido.getPresupuesto().getDetallePresupuestos().iterator().next().getMotor().getMarcaMotor());
        dtoPedidoCabecera.setPresupuestoId(pedido.getPresupuesto().getId());
        dtoPedidoCabecera.setSucursal(pedido.getPresupuesto().getSucursal().getNombreSucursal());
        return dtoPedidoCabecera;
    }


    public List<DTOPedidoCabecera> convertirPedidosAPedidosCabeceras(List<PedidoRepuesto> pedidosList){
        List<DTOPedidoCabecera> dtoPedido = new ArrayList<DTOPedidoCabecera>();
        for(PedidoRepuesto pedido:pedidosList){
            dtoPedido.add(this.convertirPedidoAPedidoCabecera(pedido));
        }
        return dtoPedido;
    }
}
