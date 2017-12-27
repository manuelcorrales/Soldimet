package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Operacion;
import soldimet.service.OperacionService;
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
 * REST controller for managing Operacion.
 */
@RestController
@RequestMapping("/api")
public class OperacionResource {

    private final Logger log = LoggerFactory.getLogger(OperacionResource.class);

    private static final String ENTITY_NAME = "operacion";

    private final OperacionService operacionService;

    public OperacionResource(OperacionService operacionService) {
        this.operacionService = operacionService;
    }

    /**
     * POST  /operacions : Create a new operacion.
     *
     * @param operacion the operacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new operacion, or with status 400 (Bad Request) if the operacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/operacions")
    @Timed
    public ResponseEntity<Operacion> createOperacion(@Valid @RequestBody Operacion operacion) throws URISyntaxException {
        log.debug("REST request to save Operacion : {}", operacion);
        if (operacion.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new operacion cannot already have an ID")).body(null);
        }
        Operacion result = operacionService.save(operacion);
        return ResponseEntity.created(new URI("/api/operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /operacions : Updates an existing operacion.
     *
     * @param operacion the operacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated operacion,
     * or with status 400 (Bad Request) if the operacion is not valid,
     * or with status 500 (Internal Server Error) if the operacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/operacions")
    @Timed
    public ResponseEntity<Operacion> updateOperacion(@Valid @RequestBody Operacion operacion) throws URISyntaxException {
        log.debug("REST request to update Operacion : {}", operacion);
        if (operacion.getId() == null) {
            return createOperacion(operacion);
        }
        Operacion result = operacionService.save(operacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, operacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /operacions : get all the operacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of operacions in body
     */
    @GetMapping("/operacions")
    @Timed
    public List<Operacion> getAllOperacions() {
        log.debug("REST request to get all Operacions");
        return operacionService.findAll();
        }

    /**
     * GET  /operacions/:id : get the "id" operacion.
     *
     * @param id the id of the operacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the operacion, or with status 404 (Not Found)
     */
    @GetMapping("/operacions/{id}")
    @Timed
    public ResponseEntity<Operacion> getOperacion(@PathVariable Long id) {
        log.debug("REST request to get Operacion : {}", id);
        Operacion operacion = operacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(operacion));
    }

    /**
     * DELETE  /operacions/:id : delete the "id" operacion.
     *
     * @param id the id of the operacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/operacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteOperacion(@PathVariable Long id) {
        log.debug("REST request to delete Operacion : {}", id);
        operacionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
