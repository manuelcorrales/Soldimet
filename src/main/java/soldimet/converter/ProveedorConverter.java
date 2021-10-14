package soldimet.converter;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import soldimet.domain.Proveedor;
import soldimet.service.dto.DTOProveedor;

@Component
public class ProveedorConverter {

    public DTOProveedor convertirProveedorAProveedorBusquedaDTO(Proveedor proveedor) {
        DTOProveedor dtoProveedorBusqueda = new DTOProveedor();
        dtoProveedorBusqueda.setIdProveedor(proveedor.getId().toString());
        dtoProveedorBusqueda.setNombreProveedor(proveedor.getNombreProveedor());
        return dtoProveedorBusqueda;
    }

    public List<DTOProveedor> convertirListProveedorAListProveedorBusquedaDTO(List<Proveedor> proveedorList) {
        List<DTOProveedor> listaDtoProveedor = new ArrayList<DTOProveedor>();
        for (Proveedor pedido : proveedorList) {
            listaDtoProveedor.add(this.convertirProveedorAProveedorBusquedaDTO(pedido));
        }
        return listaDtoProveedor;
    }
}
