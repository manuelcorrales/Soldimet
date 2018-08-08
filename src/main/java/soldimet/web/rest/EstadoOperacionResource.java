package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoOperacion;
import soldimet.service.EstadoOperacionService;
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
 * REST controller for managing EstadoOperacion.
 */
@RestController
@RequestMapping("/api")
public class EstadoOperacionResource {

    private final Logger log = LoggerFactory.getLogger(EstadoOperacionResource.class);

    private static final String ENTITY_NAME = "estadoOperacion";

    private final EstadoOperacionService estadoOperacionService;

    public EstadoOperacionResource(EstadoOperacionService estadoOperacionService) {
        this.estadoOperacionService = estadoOperacionService;
    }

    /**
     * POST  /estado-operacions : Create a new estadoOperacion.
     *
     * @param estadoOperacion the estadoOperacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoOperacion, or with status 400 (Bad Request) if the estadoOperacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-operacions")
    @Timed
    public ResponseEntity<EstadoOperacion> createEstadoOperacion(@Valid @RequestBody EstadoOperacion estadoOperacion) throws URISyntaxException {
        log.debug("REST request to save EstadoOperacion : {}", estadoOperacion);
        if (estadoOperacion.getId() != null) {
            throw new BadRequestAlertException("A new estadoOperacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoOperacion result = estadoOperacionService.save(estadoOperacion);
        return ResponseEntity.created(new URI("/api/estado-operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-operacions : Updates an existing estadoOperacion.
     *
     * @param estadoOperacion the estadoOperacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoOperacion,
     * or with status 400 (Bad Request) if the estadoOperacion is not valid,
     * or with status 500 (Internal Server Error) if the estadoOperacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-operacions")
    @Timed
    public ResponseEntity<EstadoOperacion> updateEstadoOperacion(@Valid @RequestBody EstadoOperacion estadoOperacion) throws URISyntaxException {
        log.debug("REST request to update EstadoOperacion : {}", estadoOperacion);
        if (estadoOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoOperacion result = estadoOperacionService.save(estadoOperacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoOperacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-operacions : get all the estadoOperacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoOperacions in body
     */
    @GetMapping("/estado-operacions")
    @Timed
    public List<EstadoOperacion> getAllEstadoOperacions() {
        log.debug("REST request to get all EstadoOperacions");
        return estadoOperacionService.findAll();
    }

    /**
     * GET  /estado-operacions/:id : get the "id" estadoOperacion.
     *
     * @param id the id of the estadoOperacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoOperacion, or with status 404 (Not Found)
     */
    @GetMapping("/estado-operacions/{id}")
    @Timed
    public ResponseEntity<EstadoOperacion> getEstadoOperacion(@PathVariable Long id) {
        log.debug("REST request to get EstadoOperacion : {}", id);
        Optional<EstadoOperacion> estadoOperacion = estadoOperacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoOperacion);
    }

    /**
     * DELETE  /estado-operacions/:id : delete the "id" estadoOperacion.
     *
     * @param id the id of the estadoOperacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-operacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoOperacion(@PathVariable Long id) {
        log.debug("REST request to delete EstadoOperacion : {}", id);
        estadoOperacionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
