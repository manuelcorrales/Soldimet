package soldimet.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import soldimet.domain.Presupuesto;
import soldimet.service.dto.DTOPresupuesto;

@Component
public class PresupuestoConverter {

    public DTOPresupuesto convertirEntidadAModelo(Presupuesto presupuesto){
        DTOPresupuesto dtoPresupuesto = new DTOPresupuesto();
        String nombreCliente = presupuesto.getCliente().getPersona().getApellido()+' '+presupuesto.getCliente().getPersona().getNombre();
        dtoPresupuesto.setCliente(nombreCliente);
        dtoPresupuesto.setCodigo(presupuesto.getId());
        dtoPresupuesto.setEstado(presupuesto.getEstadoPresupuesto().getNombreEstado());
        dtoPresupuesto.setFecha(presupuesto.getFechaCreacion());
        dtoPresupuesto.setImporte(presupuesto.getImporteTotal());
        dtoPresupuesto.setMotor(presupuesto.getDetallePresupuestos().iterator().next().getMotor().getMarcaMotor());
        dtoPresupuesto.setSucursal(presupuesto.getSucursal().getNombreSucursal());
        return dtoPresupuesto;
    }


    public List<DTOPresupuesto> convertirEntidadesAModelos(List<Presupuesto> presupuestoList){
        List<DTOPresupuesto> dtoPresupuestos = new ArrayList<DTOPresupuesto>();
        for(Presupuesto presupuesto:presupuestoList){
            dtoPresupuestos.add(this.convertirEntidadAModelo(presupuesto));
        }
        return dtoPresupuestos;
    }
}
