package soldimet.controller;

import java.io.File;
import java.io.FileInputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.apache.poi.util.IOUtils;
import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;
import soldimet.domain.Aplicacion;
import soldimet.domain.Articulo;
import soldimet.domain.Cliente;
import soldimet.domain.CostoOperacion;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.Presupuesto;
import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.extendedRepository.ExtendedArticuloRepository;
import soldimet.service.dto.DTODatosMotorCUHacerPresupuesto;
import soldimet.service.dto.DTOPresupuesto;
import soldimet.service.expertos.ExpertoPresupuesto;

@RestController
@RequestMapping("/api/presupuestos")
@Transactional()
public class PresupuestoController {

    private final Logger log = LoggerFactory.getLogger(PresupuestoController.class);

    private static final String ENTITY_NAME = "Presupuesto";
    private static final String APP_NAME = "PresupuestoController";

    @Autowired
    private ExpertoPresupuesto expertoPresupuesto;

    @Autowired
    private ExtendedArticuloRepository repo;

    @GetMapping("/getPresupuestos")
    public Page<DTOPresupuesto> buscarPresupuestos(
        @RequestParam(defaultValue = "") String filtro,
        @RequestParam("estado") Optional<Long> estado,
        @RequestParam("modelo") Boolean modelo,
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "200") Integer size
    ) {
        Pageable paging = PageRequest.of(page, size, Sort.by("id").descending());
        log.debug(
            "request /api/presupuestos/getPresupuestos: filtro: {}, estado: {}, page: {}, size: {}",
            filtro,
            estado,
            page,
            size
        );

        Page<DTOPresupuesto> presupuestos = expertoPresupuesto.buscarPresupuestos(filtro, estado, modelo, paging);

        log.debug("response /api/presupuestos/getPresupuestos: {}", presupuestos);
        return presupuestos;
    }

    @GetMapping("/getAplicaciones")
    public Page<Aplicacion> buscarAplicaciones(
        @RequestParam(defaultValue = "") String filtro,
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "200") Integer size
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable paging = PageRequest.of(page, size);
        log.debug("request /api/presupuestos/getAplicaciones: {}", authentication);

        Page<Aplicacion> presupuestos = expertoPresupuesto.buscarAplicaciones(filtro, paging);

        log.debug("response /api/presupuestos/getAplicaciones: {}", presupuestos);
        return presupuestos;
    }

    @GetMapping("/view/{id}")
    public Presupuesto getPresupuesto(@PathVariable("id") Long presupuestoId) {
        log.info("request /api/presupuestos/view: presupuesto id {}", presupuestoId);
        Presupuesto presupuesto = expertoPresupuesto.getPresupuesto(presupuestoId);
        log.debug("response /api/presupuestos/view: {}", presupuesto);
        return presupuesto;
    }

    @GetMapping("/getAplicacionByMotor/{motorId}")
    public List<Aplicacion> buscarPresupuestos(@PathVariable("motorId") Long motorId) {
        log.info("request /api/presupuestos/getAplicacionByMotor: motorId{}", motorId);
        List<Aplicacion> aplicaciones =  expertoPresupuesto.buscarAplicacionPorMotor(motorId);
        log.debug("response /api/presupuestos/getAplicacionByMotor: {}", aplicaciones);
        return aplicaciones;
    }

    @GetMapping("/getOperacionesPresupuesto")
    public List<CostoOperacion> buscarOperacionesPresupuesto(DTODatosMotorCUHacerPresupuesto dtoDatosMotor) {
        log.info("request /api/presupuestos/getOperacionesPresupuesto: {}", dtoDatosMotor);
        List<CostoOperacion> operaciones = expertoPresupuesto.buscarOperacionesPresupuesto(dtoDatosMotor);
        log.debug("response /api/presupuestos/getOperacionesPresupuesto: {}", operaciones);
        return operaciones;
    }

    @GetMapping("/buscarModelo")
    public Presupuesto buscarPresupuestoModelo(
        @RequestParam("aplicacion") Long aplicacion,
        @RequestParam("cilindrada") Long cilindrada
    ) {
        log.info("request /api/presupuestos/buscarExistente: {}", aplicacion, cilindrada);
        Presupuesto presupuesto = expertoPresupuesto.buscarPresupuestoExistente(aplicacion, cilindrada);
        log.debug("response /api/presupuestos/buscarExistente: {}", presupuesto);
        return presupuesto;
    }

    @GetMapping("/buscarCostoRepuestoProveedores")
    public List<CostoRepuestoProveedor> buscarListaCostoRepuestoProveedors(
        @RequestParam("aplicacion") Long aplicacion,
        @RequestParam("cilindrada") Long cilindrada,
        @RequestParam("tipoParteMotor") Long tipoParteMotor
    ) {
        log.info("request /api/presupuestos/buscarCostoRepuestoProveedores: {}", aplicacion, cilindrada, tipoParteMotor);
        List<CostoRepuestoProveedor> costos = expertoPresupuesto.buscarCostoRepuestoProveedor(aplicacion, cilindrada, tipoParteMotor);
        log.debug("response /api/presupuestos/buscarCostoRepuestoProveedores: {}", costos);
        return costos;
    }

    @GetMapping("/getCostoRepuestoPresupuesto/{presupuestoId}")
    public List<CostoRepuesto> buscarCostoRepuestoPresupuesto(@PathVariable("presupuestoId") Long presupuestoId) {
        log.info("request /api/presupuestos/getCostoRepuestoPresupuesto: presupuestoId {}", presupuestoId);
        List<CostoRepuesto> costos = expertoPresupuesto.buscarCostoRepuestoPresupuesto(presupuestoId);
        log.debug("response /api/presupuestos/getCostoRepuestoPresupuesto: {}", costos);
        return costos;
    }

    @GetMapping("/getAllClientes")
    public List<Cliente> buscarTodosLosclientes() {
        log.info("request /api/presupuestos/getAllClientes");
        List<Cliente> clientes = expertoPresupuesto.buscarTodosLosClientes();
        log.debug("response /api/presupuestos/getAllClientes: {}", clientes);
        return clientes;
    }

    @GetMapping("/getRepuestos/{idTipoParteMotor}")
    public List<TipoRepuesto> buscarRepuestosPresupuesto(@PathVariable("idTipoParteMotor") Long idTipoParteMotor) {
        log.info("request /api/presupuestos/getRepuestos: idTipoParteMotor {}", idTipoParteMotor);
        List<TipoRepuesto> tipos = expertoPresupuesto.buscarRepuestos(idTipoParteMotor);
        log.debug("response /api/presupuestos/getRepuestos: {}", tipos);
        return tipos;
    }

    @GetMapping("/getEstadoPresupuestoCreado")
    public EstadoPresupuesto buscarEstadoPresupuestoCreado() {
        log.info("request /api/presupuestos/getPresupuestos");
        EstadoPresupuesto estado = expertoPresupuesto.buscarEstadoPresupuestoCreado();
        log.debug("response /api/presupuestos/getPresupuestos: {}", estado);
        return estado;
    }

    @PostMapping("/save")
    public ResponseEntity<Presupuesto> savePresupuesto(@Valid @RequestBody Presupuesto presupuesto)
            throws URISyntaxException {
        log.info("REST request to save Presupuesto : {}", presupuesto);
        Presupuesto result = expertoPresupuesto.savePresupuesto(presupuesto);
        log.debug("REST response to save Presupuesto : {}", result);
        return ResponseEntity.created(new URI("/api/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(APP_NAME, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    @PostMapping("/aceptar")
    public ResponseEntity<DTOPresupuesto> aceptarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.info("REST request to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.aceptarPresupuesto(dtoPresupuesto);
        log.debug("REST response to accept Presupuesto : {}", result);
        if (result != null) {
            return ResponseEntity.accepted().headers(HeaderUtil.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME,
                    String.valueOf(result.getCodigo()))).body(result);
        } else {
            log.debug("Error :) ", dtoPresupuesto);
            return ResponseEntity.status(500).body(dtoPresupuesto);
        }
    }

    @PostMapping("/cancelar")
    public ResponseEntity<DTOPresupuesto> cancelarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.info("REST request to cancel Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.cancelarPresupuesto(dtoPresupuesto);
        log.debug("REST response to cancel Presupuesto : {}", result);
        return ResponseEntity.accepted().headers(HeaderUtil.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME,
                String.valueOf(result.getCodigo()))).body(result);
    }

    @PostMapping("/entregar")
    public ResponseEntity<DTOPresupuesto> entregarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.info("REST request to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.entregarPresupuesto(dtoPresupuesto);
        log.debug("REST response to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        if (result != null) {
            return ResponseEntity.accepted().headers(HeaderUtil.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME,
                    String.valueOf(result.getCodigo()))).body(result);
        } else {
            return ResponseEntity.status(500).body(dtoPresupuesto);
        }
    }

    @PostMapping("/terminar")
    public ResponseEntity<DTOPresupuesto> terminarPresupuesto(@RequestBody DTOPresupuesto dtoPresupuesto) {
        log.info("REST request to accept Presupuesto : {}", dtoPresupuesto.getCodigo());
        DTOPresupuesto result = expertoPresupuesto.terminarPresupuesto(dtoPresupuesto);
        log.debug("REST response to accept Presupuesto : {}", result);
        if (result != null) {
            return ResponseEntity.accepted().headers(HeaderUtil.createEntityUpdateAlert(APP_NAME, false, ENTITY_NAME,
                    String.valueOf(result.getCodigo()))).body(result);
        } else {
            return ResponseEntity.status(500).body(dtoPresupuesto);
        }
    }

    @RequestMapping(
        value = "/imprimir/{idPresupuesto}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_PDF_VALUE
    )
    @ResponseBody
    public ResponseEntity<byte[]> imprimirPresupuesto(@PathVariable("idPresupuesto") Long idPresupuesto)
            throws Exception {
        log.info("request /api/presupuestos/getRepuestos: id {}", idPresupuesto);
        Pair<File, String> response =  expertoPresupuesto.imprimirPresupuesto(idPresupuesto);
        HttpHeaders headers = new HttpHeaders();
        headers.add("file-name", "presupuesto nº " + String.valueOf(response.getValue1()) + ".pdf");
        return new ResponseEntity<byte[]>(
            IOUtils.toByteArray(new FileInputStream(response.getValue0())),
            headers,
            HttpStatus.OK
        );
    }

    @GetMapping("/buscarTodosRepuestos")
    public List<Articulo> findAllRepuestos() {
        log.info("Request to get all Articulos");
        return repo.findAll();
    }

    @GetMapping("/buscarTiposPartesPresupuestos")
    public List<TipoParteMotor> findAllTipoParte() {
        log.info("Request to buscarTiposPartesPresupuestos");
        return expertoPresupuesto.buscarTiposPartesPresupuesto();
    }

}
