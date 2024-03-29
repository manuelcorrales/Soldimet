package soldimet.web.rest;

import soldimet.domain.MovimientoArticulo;
import soldimet.service.MovimientoArticuloService;
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
 * REST controller for managing {@link soldimet.domain.MovimientoArticulo}.
 */
@RestController
@RequestMapping("/api")
public class MovimientoArticuloResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoArticuloResource.class);

    private static final String ENTITY_NAME = "movimientoArticulo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoArticuloService movimientoArticuloService;

    public MovimientoArticuloResource(MovimientoArticuloService movimientoArticuloService) {
        this.movimientoArticuloService = movimientoArticuloService;
    }

    /**
     * {@code POST  /movimiento-articulos} : Create a new movimientoArticulo.
     *
     * @param movimientoArticulo the movimientoArticulo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientoArticulo, or with status {@code 400 (Bad Request)} if the movimientoArticulo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimiento-articulos")
    public ResponseEntity<MovimientoArticulo> createMovimientoArticulo(@Valid @RequestBody MovimientoArticulo movimientoArticulo) throws URISyntaxException {
        log.debug("REST request to save MovimientoArticulo : {}", movimientoArticulo);
        if (movimientoArticulo.getId() != null) {
            throw new BadRequestAlertException("A new movimientoArticulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovimientoArticulo result = movimientoArticuloService.save(movimientoArticulo);
        return ResponseEntity.created(new URI("/api/movimiento-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimiento-articulos} : Updates an existing movimientoArticulo.
     *
     * @param movimientoArticulo the movimientoArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoArticulo,
     * or with status {@code 400 (Bad Request)} if the movimientoArticulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientoArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimiento-articulos")
    public ResponseEntity<MovimientoArticulo> updateMovimientoArticulo(@Valid @RequestBody MovimientoArticulo movimientoArticulo) throws URISyntaxException {
        log.debug("REST request to update MovimientoArticulo : {}", movimientoArticulo);
        if (movimientoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MovimientoArticulo result = movimientoArticuloService.save(movimientoArticulo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoArticulo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /movimiento-articulos} : get all the movimientoArticulos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientoArticulos in body.
     */
    @GetMapping("/movimiento-articulos")
    public List<MovimientoArticulo> getAllMovimientoArticulos() {
        log.debug("REST request to get all MovimientoArticulos");
        return movimientoArticuloService.findAll();
    }

    /**
     * {@code GET  /movimiento-articulos/:id} : get the "id" movimientoArticulo.
     *
     * @param id the id of the movimientoArticulo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientoArticulo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimiento-articulos/{id}")
    public ResponseEntity<MovimientoArticulo> getMovimientoArticulo(@PathVariable Long id) {
        log.debug("REST request to get MovimientoArticulo : {}", id);
        Optional<MovimientoArticulo> movimientoArticulo = movimientoArticuloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movimientoArticulo);
    }

    /**
     * {@code DELETE  /movimiento-articulos/:id} : delete the "id" movimientoArticulo.
     *
     * @param id the id of the movimientoArticulo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimiento-articulos/{id}")
    public ResponseEntity<Void> deleteMovimientoArticulo(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoArticulo : {}", id);
        movimientoArticuloService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
