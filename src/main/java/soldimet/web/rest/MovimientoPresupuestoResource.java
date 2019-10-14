package soldimet.web.rest;

import soldimet.domain.MovimientoPresupuesto;
import soldimet.service.MovimientoPresupuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link soldimet.domain.MovimientoPresupuesto}.
 */
@RestController
@RequestMapping("/api")
public class MovimientoPresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoPresupuestoResource.class);

    private static final String ENTITY_NAME = "movimientoPresupuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoPresupuestoService movimientoPresupuestoService;

    public MovimientoPresupuestoResource(MovimientoPresupuestoService movimientoPresupuestoService) {
        this.movimientoPresupuestoService = movimientoPresupuestoService;
    }

    /**
     * {@code POST  /movimiento-presupuestos} : Create a new movimientoPresupuesto.
     *
     * @param movimientoPresupuesto the movimientoPresupuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientoPresupuesto, or with status {@code 400 (Bad Request)} if the movimientoPresupuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimiento-presupuestos")
    public ResponseEntity<MovimientoPresupuesto> createMovimientoPresupuesto(@Valid @RequestBody MovimientoPresupuesto movimientoPresupuesto) throws URISyntaxException {
        log.debug("REST request to save MovimientoPresupuesto : {}", movimientoPresupuesto);
        if (movimientoPresupuesto.getId() != null) {
            throw new BadRequestAlertException("A new movimientoPresupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovimientoPresupuesto result = movimientoPresupuestoService.save(movimientoPresupuesto);
        return ResponseEntity.created(new URI("/api/movimiento-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimiento-presupuestos} : Updates an existing movimientoPresupuesto.
     *
     * @param movimientoPresupuesto the movimientoPresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoPresupuesto,
     * or with status {@code 400 (Bad Request)} if the movimientoPresupuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientoPresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimiento-presupuestos")
    public ResponseEntity<MovimientoPresupuesto> updateMovimientoPresupuesto(@Valid @RequestBody MovimientoPresupuesto movimientoPresupuesto) throws URISyntaxException {
        log.debug("REST request to update MovimientoPresupuesto : {}", movimientoPresupuesto);
        if (movimientoPresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MovimientoPresupuesto result = movimientoPresupuestoService.save(movimientoPresupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoPresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /movimiento-presupuestos} : get all the movimientoPresupuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientoPresupuestos in body.
     */
    @GetMapping("/movimiento-presupuestos")
    public List<MovimientoPresupuesto> getAllMovimientoPresupuestos() {
        log.debug("REST request to get all MovimientoPresupuestos");
        return movimientoPresupuestoService.findAll();
    }

    /**
     * {@code GET  /movimiento-presupuestos/:id} : get the "id" movimientoPresupuesto.
     *
     * @param id the id of the movimientoPresupuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientoPresupuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimiento-presupuestos/{id}")
    public ResponseEntity<MovimientoPresupuesto> getMovimientoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get MovimientoPresupuesto : {}", id);
        Optional<MovimientoPresupuesto> movimientoPresupuesto = movimientoPresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movimientoPresupuesto);
    }

    /**
     * {@code DELETE  /movimiento-presupuestos/:id} : delete the "id" movimientoPresupuesto.
     *
     * @param id the id of the movimientoPresupuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimiento-presupuestos/{id}")
    public ResponseEntity<Void> deleteMovimientoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoPresupuesto : {}", id);
        movimientoPresupuestoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
