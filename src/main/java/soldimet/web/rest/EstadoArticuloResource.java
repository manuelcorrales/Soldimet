package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoArticulo;
import soldimet.service.EstadoArticuloService;
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
 * REST controller for managing EstadoArticulo.
 */
@RestController
@RequestMapping("/api")
public class EstadoArticuloResource {

    private final Logger log = LoggerFactory.getLogger(EstadoArticuloResource.class);

    private static final String ENTITY_NAME = "estadoArticulo";

    private final EstadoArticuloService estadoArticuloService;

    public EstadoArticuloResource(EstadoArticuloService estadoArticuloService) {
        this.estadoArticuloService = estadoArticuloService;
    }

    /**
     * POST  /estado-articulos : Create a new estadoArticulo.
     *
     * @param estadoArticulo the estadoArticulo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoArticulo, or with status 400 (Bad Request) if the estadoArticulo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-articulos")
    @Timed
    public ResponseEntity<EstadoArticulo> createEstadoArticulo(@Valid @RequestBody EstadoArticulo estadoArticulo) throws URISyntaxException {
        log.debug("REST request to save EstadoArticulo : {}", estadoArticulo);
        if (estadoArticulo.getId() != null) {
            throw new BadRequestAlertException("A new estadoArticulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoArticulo result = estadoArticuloService.save(estadoArticulo);
        return ResponseEntity.created(new URI("/api/estado-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-articulos : Updates an existing estadoArticulo.
     *
     * @param estadoArticulo the estadoArticulo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoArticulo,
     * or with status 400 (Bad Request) if the estadoArticulo is not valid,
     * or with status 500 (Internal Server Error) if the estadoArticulo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-articulos")
    @Timed
    public ResponseEntity<EstadoArticulo> updateEstadoArticulo(@Valid @RequestBody EstadoArticulo estadoArticulo) throws URISyntaxException {
        log.debug("REST request to update EstadoArticulo : {}", estadoArticulo);
        if (estadoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoArticulo result = estadoArticuloService.save(estadoArticulo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoArticulo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-articulos : get all the estadoArticulos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoArticulos in body
     */
    @GetMapping("/estado-articulos")
    @Timed
    public List<EstadoArticulo> getAllEstadoArticulos() {
        log.debug("REST request to get all EstadoArticulos");
        return estadoArticuloService.findAll();
    }

    /**
     * GET  /estado-articulos/:id : get the "id" estadoArticulo.
     *
     * @param id the id of the estadoArticulo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoArticulo, or with status 404 (Not Found)
     */
    @GetMapping("/estado-articulos/{id}")
    @Timed
    public ResponseEntity<EstadoArticulo> getEstadoArticulo(@PathVariable Long id) {
        log.debug("REST request to get EstadoArticulo : {}", id);
        Optional<EstadoArticulo> estadoArticulo = estadoArticuloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoArticulo);
    }

    /**
     * DELETE  /estado-articulos/:id : delete the "id" estadoArticulo.
     *
     * @param id the id of the estadoArticulo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-articulos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoArticulo(@PathVariable Long id) {
        log.debug("REST request to delete EstadoArticulo : {}", id);
        estadoArticuloService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
