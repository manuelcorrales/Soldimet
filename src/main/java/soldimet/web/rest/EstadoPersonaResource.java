package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoPersona;
import soldimet.service.EstadoPersonaService;
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
 * REST controller for managing EstadoPersona.
 */
@RestController
@RequestMapping("/api")
public class EstadoPersonaResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPersonaResource.class);

    private static final String ENTITY_NAME = "estadoPersona";

    private final EstadoPersonaService estadoPersonaService;

    public EstadoPersonaResource(EstadoPersonaService estadoPersonaService) {
        this.estadoPersonaService = estadoPersonaService;
    }

    /**
     * POST  /estado-personas : Create a new estadoPersona.
     *
     * @param estadoPersona the estadoPersona to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoPersona, or with status 400 (Bad Request) if the estadoPersona has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-personas")
    @Timed
    public ResponseEntity<EstadoPersona> createEstadoPersona(@Valid @RequestBody EstadoPersona estadoPersona) throws URISyntaxException {
        log.debug("REST request to save EstadoPersona : {}", estadoPersona);
        if (estadoPersona.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new estadoPersona cannot already have an ID")).body(null);
        }
        EstadoPersona result = estadoPersonaService.save(estadoPersona);
        return ResponseEntity.created(new URI("/api/estado-personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-personas : Updates an existing estadoPersona.
     *
     * @param estadoPersona the estadoPersona to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoPersona,
     * or with status 400 (Bad Request) if the estadoPersona is not valid,
     * or with status 500 (Internal Server Error) if the estadoPersona couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-personas")
    @Timed
    public ResponseEntity<EstadoPersona> updateEstadoPersona(@Valid @RequestBody EstadoPersona estadoPersona) throws URISyntaxException {
        log.debug("REST request to update EstadoPersona : {}", estadoPersona);
        if (estadoPersona.getId() == null) {
            return createEstadoPersona(estadoPersona);
        }
        EstadoPersona result = estadoPersonaService.save(estadoPersona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoPersona.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-personas : get all the estadoPersonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoPersonas in body
     */
    @GetMapping("/estado-personas")
    @Timed
    public List<EstadoPersona> getAllEstadoPersonas() {
        log.debug("REST request to get all EstadoPersonas");
        return estadoPersonaService.findAll();
        }

    /**
     * GET  /estado-personas/:id : get the "id" estadoPersona.
     *
     * @param id the id of the estadoPersona to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoPersona, or with status 404 (Not Found)
     */
    @GetMapping("/estado-personas/{id}")
    @Timed
    public ResponseEntity<EstadoPersona> getEstadoPersona(@PathVariable Long id) {
        log.debug("REST request to get EstadoPersona : {}", id);
        EstadoPersona estadoPersona = estadoPersonaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(estadoPersona));
    }

    /**
     * DELETE  /estado-personas/:id : delete the "id" estadoPersona.
     *
     * @param id the id of the estadoPersona to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-personas/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoPersona(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPersona : {}", id);
        estadoPersonaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
