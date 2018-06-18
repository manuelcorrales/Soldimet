package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.MovimientoPresupuesto;
import soldimet.service.MovimientoPresupuestoService;
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
 * REST controller for managing MovimientoPresupuesto.
 */
@RestController
@RequestMapping("/api")
public class MovimientoPresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoPresupuestoResource.class);

    private static final String ENTITY_NAME = "movimientoPresupuesto";

    private final MovimientoPresupuestoService movimientoPresupuestoService;

    public MovimientoPresupuestoResource(MovimientoPresupuestoService movimientoPresupuestoService) {
        this.movimientoPresupuestoService = movimientoPresupuestoService;
    }

    /**
     * POST  /movimiento-presupuestos : Create a new movimientoPresupuesto.
     *
     * @param movimientoPresupuesto the movimientoPresupuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movimientoPresupuesto, or with status 400 (Bad Request) if the movimientoPresupuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movimiento-presupuestos")
    @Timed
    public ResponseEntity<MovimientoPresupuesto> createMovimientoPresupuesto(@Valid @RequestBody MovimientoPresupuesto movimientoPresupuesto) throws URISyntaxException {
        log.debug("REST request to save MovimientoPresupuesto : {}", movimientoPresupuesto);
        if (movimientoPresupuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new movimientoPresupuesto cannot already have an ID")).body(null);
        }
        MovimientoPresupuesto result = movimientoPresupuestoService.save(movimientoPresupuesto);
        return ResponseEntity.created(new URI("/api/movimiento-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movimiento-presupuestos : Updates an existing movimientoPresupuesto.
     *
     * @param movimientoPresupuesto the movimientoPresupuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movimientoPresupuesto,
     * or with status 400 (Bad Request) if the movimientoPresupuesto is not valid,
     * or with status 500 (Internal Server Error) if the movimientoPresupuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movimiento-presupuestos")
    @Timed
    public ResponseEntity<MovimientoPresupuesto> updateMovimientoPresupuesto(@Valid @RequestBody MovimientoPresupuesto movimientoPresupuesto) throws URISyntaxException {
        log.debug("REST request to update MovimientoPresupuesto : {}", movimientoPresupuesto);
        if (movimientoPresupuesto.getId() == null) {
            return createMovimientoPresupuesto(movimientoPresupuesto);
        }
        MovimientoPresupuesto result = movimientoPresupuestoService.save(movimientoPresupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movimientoPresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movimiento-presupuestos : get all the movimientoPresupuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of movimientoPresupuestos in body
     */
    @GetMapping("/movimiento-presupuestos")
    @Timed
    public List<MovimientoPresupuesto> getAllMovimientoPresupuestos() {
        log.debug("REST request to get all MovimientoPresupuestos");
        return movimientoPresupuestoService.findAll();
        }

    /**
     * GET  /movimiento-presupuestos/:id : get the "id" movimientoPresupuesto.
     *
     * @param id the id of the movimientoPresupuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movimientoPresupuesto, or with status 404 (Not Found)
     */
    @GetMapping("/movimiento-presupuestos/{id}")
    @Timed
    public ResponseEntity<MovimientoPresupuesto> getMovimientoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get MovimientoPresupuesto : {}", id);
        MovimientoPresupuesto movimientoPresupuesto = movimientoPresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movimientoPresupuesto));
    }

    /**
     * DELETE  /movimiento-presupuestos/:id : delete the "id" movimientoPresupuesto.
     *
     * @param id the id of the movimientoPresupuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movimiento-presupuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovimientoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoPresupuesto : {}", id);
        movimientoPresupuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
