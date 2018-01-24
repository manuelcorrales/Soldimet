package soldimet.controller;

import com.netflix.discovery.converters.Auto;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import soldimet.service.dto.DTOPresupuesto;
import soldimet.service.dto.DTOPresupuestoDetalleCUBuscarPresupuesto;
import soldimet.service.expertos.ExpertoPresupuesto;

@RestController
@RequestMapping("/api")
public class PresupuestoController {

    private final Logger log = LoggerFactory.getLogger(PresupuestoController.class);

    private static final String ENTITY_NAME = "Presupuesto";

    @Autowired
    private ExpertoPresupuesto expertoPresupuesto;

    @GetMapping("/presupuestos/getPresupuestos")
    public List<DTOPresupuesto> buscarPresupuestos(){

        return expertoPresupuesto.buscarPresupuestos();
    }
}
