package soldimet.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import com.codahale.metrics.annotation.Timed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.Aplicacion;
import soldimet.domain.Cliente;
import soldimet.domain.CostoOperacion;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.Presupuesto;
import soldimet.domain.TipoRepuesto;
import soldimet.security.AuthoritiesConstants;
import soldimet.service.dto.DTODatosMotorCUHacerPresupuesto;
import soldimet.service.dto.DTOPresupuesto;
import soldimet.service.expertos.ExpertoPresupuesto;
import soldimet.web.rest.util.HeaderUtil;

@RestController
@RequestMapping("/api/presupuestos")
@Transactional
@Timed
public class PresupuestoController {

    private final Logger log = LoggerFactory.getLogger(PresupuestoController.class);

    private static final String ENTITY_NAME = "Presupuesto";

    @Autowired
    private ExpertoPresupuesto expertoPresupuesto;

    @GetMapping("/getPresupuestos")
    public List<DTOPresupuesto> buscarPresupuestos() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getAuthorities().contains(AuthoritiesConstants.ADMIN)) {
            return expertoPresupuesto.buscarPresupuestos();
        } else {
            if (authentication.getAuthorities().contains(AuthoritiesConstants.EMPLOYEE)) {
                return expertoPresupuesto.buscarPresupuestos();
            } else {
                if (authentication.getAuthorities().contains(AuthoritiesConstants.ENCARGADO_TALLER)) {
                    return expertoPresupuesto.buscarPresupuestos();
                } else {
                    return expertoPresupuesto.buscarPresupuestos();
                }
            }
        }

    }

    @GetMapping("/getAplicacionByMotor/{motorId}")
    public List<Aplicacion> buscarPresupuestos(@PathVariable("motorId") Long motorId) {

        return expertoPresupuesto.buscarAplicacionPorMotor(motorId);
    }

    @GetMapping("/getOperacionesPresupuesto")
    public List<CostoOperacion> buscarOperacionesPresupuesto(DTODatosMotorCUHacerPresupuesto dtoDatosMotor) {

        return expertoPresupuesto.buscarOperacionesPresupuesto(dtoDatosMotor);
    }

    @GetMapping("/getClientesByNombre/{nombreCliente}")
    public List<Cliente> buscarClientesPorNombre(@PathVariable("nombreCliente") String nombreCliente) {

        return expertoPresupuesto.buscarClientesPornombre(nombreCliente);
    }

    @GetMapping("/getAllClientes")
    public List<Cliente> buscarTodosLosclientes() {

        return expertoPresupuesto.buscarTodosLosClientes();
    }

    @GetMapping("/getRepuestos/{idTipoParteMotor}")
    public List<TipoRepuesto> buscarRepuestosPresupuesto(@PathVariable("idTipoParteMotor") Long idTipoParteMotor) {

        return expertoPresupuesto.buscarRepuestos(idTipoParteMotor);
    }

    @GetMapping("/getEstadoPresupuestoCreado")
    public EstadoPresupuesto buscarEstadoPresupuestoCreado() {

        return expertoPresupuesto.buscarEstadoPresupuestoCreado();
    }

    @PostMapping("/save")
    public ResponseEntity<Presupuesto> savePresupuesto(@Valid @RequestBody Presupuesto presupuesto)
            throws URISyntaxException {
        log.debug("REST request to save Presupuesto : {}", presupuesto);
        Presupuesto result = expertoPresupuesto.savePresupuesto(presupuesto);
        return ResponseEntity.created(new URI("/api/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    @PostMapping("/aceptar")
    public ResponseEntity<DTOPresupuesto> aceptarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.debug("REST request to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.aceptarPresupuesto(dtoPresupuesto);
        if (result != null) {
            return ResponseEntity.accepted().headers(HeaderUtil
                    .createEntityUpdateAlert(Presupuesto.class.toGenericString(), String.valueOf(result.getCodigo())))
                    .body(result);
        } else {
            return ResponseEntity.status(500).body(dtoPresupuesto);
        }
    }

    @PostMapping("/cancelar")
    public ResponseEntity<DTOPresupuesto> cancelarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.debug("REST request to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.cancelarPresupuesto(dtoPresupuesto);
        if (result != null) {
            return ResponseEntity.accepted().headers(HeaderUtil
                    .createEntityUpdateAlert(Presupuesto.class.toGenericString(), String.valueOf(result.getCodigo())))
                    .body(result);
        } else {
            return ResponseEntity.status(500).body(dtoPresupuesto);
        }
    }

    @PostMapping("/entregar")
    public ResponseEntity<DTOPresupuesto> entregarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.debug("REST request to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.entregarPresupuesto(dtoPresupuesto);
        if (result != null) {
            return ResponseEntity.accepted().headers(HeaderUtil
                    .createEntityUpdateAlert(Presupuesto.class.toGenericString(), String.valueOf(result.getCodigo())))
                    .body(result);
        } else {
            return ResponseEntity.status(500).body(dtoPresupuesto);
        }
    }

    @PostMapping("/terminar")
    public ResponseEntity<DTOPresupuesto> terminarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.debug("REST request to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.terminarPresupuesto(dtoPresupuesto);
        if (result != null) {
            return ResponseEntity.accepted().headers(HeaderUtil
                    .createEntityUpdateAlert(Presupuesto.class.toGenericString(), String.valueOf(result.getCodigo())))
                    .body(result);
        } else {
            return ResponseEntity.status(500).body(dtoPresupuesto);
        }
    }
}
