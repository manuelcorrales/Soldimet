package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.MovimientoArticulo;
import soldimet.service.MovimientoArticuloService;
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
 * REST controller for managing MovimientoArticulo.
 */
@RestController
@RequestMapping("/api")
public class MovimientoArticuloResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoArticuloResource.class);

    private static final String ENTITY_NAME = "movimientoArticulo";

    private final MovimientoArticuloService movimientoArticuloService;

    public MovimientoArticuloResource(MovimientoArticuloService movimientoArticuloService) {
        this.movimientoArticuloService = movimientoArticuloService;
    }

    /**
     * POST  /movimiento-articulos : Create a new movimientoArticulo.
     *
     * @param movimientoArticulo the movimientoArticulo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movimientoArticulo, or with status 400 (Bad Request) if the movimientoArticulo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movimiento-articulos")
    @Timed
    public ResponseEntity<MovimientoArticulo> createMovimientoArticulo(@Valid @RequestBody MovimientoArticulo movimientoArticulo) throws URISyntaxException {
        log.debug("REST request to save MovimientoArticulo : {}", movimientoArticulo);
        if (movimientoArticulo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new movimientoArticulo cannot already have an ID")).body(null);
        }
        MovimientoArticulo result = movimientoArticuloService.save(movimientoArticulo);
        return ResponseEntity.created(new URI("/api/movimiento-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movimiento-articulos : Updates an existing movimientoArticulo.
     *
     * @param movimientoArticulo the movimientoArticulo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movimientoArticulo,
     * or with status 400 (Bad Request) if the movimientoArticulo is not valid,
     * or with status 500 (Internal Server Error) if the movimientoArticulo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movimiento-articulos")
    @Timed
    public ResponseEntity<MovimientoArticulo> updateMovimientoArticulo(@Valid @RequestBody MovimientoArticulo movimientoArticulo) throws URISyntaxException {
        log.debug("REST request to update MovimientoArticulo : {}", movimientoArticulo);
        if (movimientoArticulo.getId() == null) {
            return createMovimientoArticulo(movimientoArticulo);
        }
        MovimientoArticulo result = movimientoArticuloService.save(movimientoArticulo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movimientoArticulo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movimiento-articulos : get all the movimientoArticulos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of movimientoArticulos in body
     */
    @GetMapping("/movimiento-articulos")
    @Timed
    public List<MovimientoArticulo> getAllMovimientoArticulos() {
        log.debug("REST request to get all MovimientoArticulos");
        return movimientoArticuloService.findAll();
        }

    /**
     * GET  /movimiento-articulos/:id : get the "id" movimientoArticulo.
     *
     * @param id the id of the movimientoArticulo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movimientoArticulo, or with status 404 (Not Found)
     */
    @GetMapping("/movimiento-articulos/{id}")
    @Timed
    public ResponseEntity<MovimientoArticulo> getMovimientoArticulo(@PathVariable Long id) {
        log.debug("REST request to get MovimientoArticulo : {}", id);
        MovimientoArticulo movimientoArticulo = movimientoArticuloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(movimientoArticulo));
    }

    /**
     * DELETE  /movimiento-articulos/:id : delete the "id" movimientoArticulo.
     *
     * @param id the id of the movimientoArticulo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movimiento-articulos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovimientoArticulo(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoArticulo : {}", id);
        movimientoArticuloService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
