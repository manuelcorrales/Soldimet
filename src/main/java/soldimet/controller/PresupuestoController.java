package soldimet.controller;

import com.codahale.metrics.annotation.Timed;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import soldimet.domain.Aplicacion;
import soldimet.domain.Articulo;
import soldimet.domain.Cliente;
import soldimet.service.dto.DTODatosMotorCUHacerPresupuesto;
import soldimet.service.dto.DTOParOperacionPresupuestoCUHacerPresupuesto;
import soldimet.service.dto.DTOPresupuesto;
import soldimet.service.expertos.ExpertoPresupuesto;

@RestController
@RequestMapping("/api")
@Transactional
@Timed
public class PresupuestoController {

    private final Logger log = LoggerFactory.getLogger(PresupuestoController.class);

    private static final String ENTITY_NAME = "Presupuesto";

    @Autowired
    private ExpertoPresupuesto expertoPresupuesto;

    @GetMapping("/presupuestos/getPresupuestos")
    public List<DTOPresupuesto> buscarPresupuestos() {

        return expertoPresupuesto.buscarPresupuestos();
    }

    @GetMapping("/presupuestos/getAplicacionByMotor/{motorId}")
    public List<Aplicacion> buscarPresupuestos(@PathVariable("motorId") Long motorId) {

        System.out
            .println("------------------------------ID: " + motorId + "-----------------------");
        return expertoPresupuesto.buscarAplicacionPorMotor(motorId);
    }

    @GetMapping("/presupuestos/getOperacionesPresupuesto")
    public List<DTOParOperacionPresupuestoCUHacerPresupuesto> buscarOperacionesPresupuesto(
        DTODatosMotorCUHacerPresupuesto dtoDatosMotor) {

        return expertoPresupuesto.buscarOperacionesPresupuesto(dtoDatosMotor);
    }

    @GetMapping("/presupuestos/getClientesByNombre/{nombreCliente}")
    public List<Cliente> buscarClientesPorNombre(
        @PathVariable("nombreCliente") String nombreCliente) {

        return expertoPresupuesto.buscarClientesPornombre(nombreCliente);
    }

    @GetMapping("/presupuestos/getAllClientes")
    public List<Cliente> buscarTodosLosclientes() {

        return expertoPresupuesto.buscarTodosLosClientes();
    }

    @GetMapping("/presupuestos/getRepuestos")
    public List<Articulo> buscarRepuestosPresupuesto() {

        return expertoPresupuesto.buscarRepuestos();
    }

}
