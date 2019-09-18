package soldimet.converter;

import org.springframework.stereotype.Component;

import soldimet.domain.Empleado;
import soldimet.service.dto.DTOEmpleado;

@Component
public class UserConverter {

    public DTOEmpleado convertirEntidadAModelo(Empleado empleado){
        DTOEmpleado dtoEmpleado = new DTOEmpleado(
            empleado.getId(),
            empleado.getPersona().getNombre(),
            empleado.getSucursal().getNombreSucursal(),
            empleado.getSucursal().getId()
        );

        return dtoEmpleado;
    }

}
