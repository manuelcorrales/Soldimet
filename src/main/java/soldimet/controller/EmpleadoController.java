package soldimet.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soldimet.service.dto.DTOEmpleado;
import soldimet.service.expertos.ExpertoUsuarios;

@RestController
@RequestMapping("/api/empleado")
public class EmpleadoController {

    private final Logger log = LoggerFactory.getLogger(ClienteController.class);

    private static final String ENTITY_NAME = "Empleado";

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    @GetMapping("/getEmpleadoActual")
    public DTOEmpleado getEmpleadoActual() {
        log.debug("request api/empleado/getEmpleadoActual");

        DTOEmpleado dtoEmpleado = expertoUsuarios.getEmpleadoActual();

        log.debug("response api/empleado/getEmpleadoActual: {}", dtoEmpleado);
        return dtoEmpleado;

    }

}
