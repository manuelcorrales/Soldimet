package soldimet.converter;

import org.springframework.data.domain.Page;
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
        dtoPresupuesto.setTotalOperaciones(presupuesto.getTotalOperaciones());
        dtoPresupuesto.setTotalRepuestos(presupuesto.getTotalRepuestos());
        if (presupuesto.isSoldadura()) {
            dtoPresupuesto.setIsSoldadura(presupuesto.isSoldadura());
            dtoPresupuesto.setMotor("");
            dtoPresupuesto.setAplicacion("");
        } else {
            dtoPresupuesto.setMotor(presupuesto.getMotorName());
            dtoPresupuesto.setAplicacion(presupuesto.getAplicacionName());
        }
        dtoPresupuesto.setIsModelo(presupuesto.isModelo());
        dtoPresupuesto.setSucursal(presupuesto.getSucursal().getNombreSucursal());
        return dtoPresupuesto;
    }


    public Page<DTOPresupuesto> convertirEntidadesAModelos(Page<Presupuesto> presupuestoList){
        return presupuestoList.map(presupuesto -> convertirEntidadAModelo(presupuesto));
    }
}
