package soldimet.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import soldimet.domain.DetallePedido;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Presupuesto;
import soldimet.domain.Proveedor;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.dto.DTOPresupuesto;
import soldimet.service.dto.DTOProveedor;

@Component
public class ProveedorConverter {

    public DTOProveedor convertirProveedorAProveedorBusquedaDTO(Proveedor proveedor){
        DTOProveedor dtoProveedorBusqueda = new DTOProveedor();
        dtoProveedorBusqueda.setIdProveedor(proveedor.getId().toString());
        dtoProveedorBusqueda.setNombreProveedor(proveedor.getPersona().getUser().getFirstName());
        return dtoProveedorBusqueda;
    }


    public List<DTOProveedor> convertirListProveedorAListProveedorBusquedaDTO(List<Proveedor> proveedorList){
        List<DTOProveedor> listaDtoProveedor = new ArrayList<DTOProveedor>();
        for(Proveedor pedido: proveedorList){
            listaDtoProveedor.add(this.convertirProveedorAProveedorBusquedaDTO(pedido));
        }
        return listaDtoProveedor;
    }
}
