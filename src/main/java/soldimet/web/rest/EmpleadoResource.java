package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Empleado;
import soldimet.service.EmpleadoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import soldimet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Empleado.
 */
@RestController
@RequestMapping("/api")
public class EmpleadoResource {

    private final Logger log = LoggerFactory.getLogger(EmpleadoResource.class);

    private static final String ENTITY_NAME = "empleado";

    private final EmpleadoService empleadoService;

    public EmpleadoResource(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    /**
     * POST  /empleados : Create a new empleado.
     *
     * @param empleado the empleado to create
     * @return the ResponseEntity with status 201 (Created) and with body the new empleado, or with status 400 (Bad Request) if the empleado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/empleados")
    @Timed
    public ResponseEntity<Empleado> createEmpleado(@Valid @RequestBody Empleado empleado) throws URISyntaxException {
        log.debug("REST request to save Empleado : {}", empleado);
        if (empleado.getId() != null) {
            throw new BadRequestAlertException("A new empleado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Empleado result = empleadoService.save(empleado);
        return ResponseEntity.created(new URI("/api/empleados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /empleados : Updates an existing empleado.
     *
     * @param empleado the empleado to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated empleado,
     * or with status 400 (Bad Request) if the empleado is not valid,
     * or with status 500 (Internal Server Error) if the empleado couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/empleados")
    @Timed
    public ResponseEntity<Empleado> updateEmpleado(@Valid @RequestBody Empleado empleado) throws URISyntaxException {
        log.debug("REST request to update Empleado : {}", empleado);
        if (empleado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Empleado result = empleadoService.save(empleado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, empleado.getId().toString()))
            .body(result);
    }

    /**
     * GET  /empleados : get all the empleados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of empleados in body
     */
    @GetMapping("/empleados")
    @Timed
    public List<Empleado> getAllEmpleados() {
        log.debug("REST request to get all Empleados");
        return empleadoService.findAll();
    }

    /**
     * GET  /empleados/:id : get the "id" empleado.
     *
     * @param id the id of the empleado to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the empleado, or with status 404 (Not Found)
     */
    @GetMapping("/empleados/{id}")
    @Timed
    public ResponseEntity<Empleado> getEmpleado(@PathVariable Long id) {
        log.debug("REST request to get Empleado : {}", id);
        Optional<Empleado> empleado = empleadoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(empleado);
    }

    /**
     * DELETE  /empleados/:id : delete the "id" empleado.
     *
     * @param id the id of the empleado to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/empleados/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        log.debug("REST request to delete Empleado : {}", id);
        empleadoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
