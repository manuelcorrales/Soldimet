package soldimet.web.rest;

import soldimet.domain.EstadoPersona;
import soldimet.service.EstadoPersonaService;
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
 * REST controller for managing {@link soldimet.domain.EstadoPersona}.
 */
@RestController
@RequestMapping("/api")
public class EstadoPersonaResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPersonaResource.class);

    private static final String ENTITY_NAME = "estadoPersona";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoPersonaService estadoPersonaService;

    public EstadoPersonaResource(EstadoPersonaService estadoPersonaService) {
        this.estadoPersonaService = estadoPersonaService;
    }

    /**
     * {@code POST  /estado-personas} : Create a new estadoPersona.
     *
     * @param estadoPersona the estadoPersona to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoPersona, or with status {@code 400 (Bad Request)} if the estadoPersona has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-personas")
    public ResponseEntity<EstadoPersona> createEstadoPersona(@Valid @RequestBody EstadoPersona estadoPersona) throws URISyntaxException {
        log.debug("REST request to save EstadoPersona : {}", estadoPersona);
        if (estadoPersona.getId() != null) {
            throw new BadRequestAlertException("A new estadoPersona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoPersona result = estadoPersonaService.save(estadoPersona);
        return ResponseEntity.created(new URI("/api/estado-personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-personas} : Updates an existing estadoPersona.
     *
     * @param estadoPersona the estadoPersona to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPersona,
     * or with status {@code 400 (Bad Request)} if the estadoPersona is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoPersona couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-personas")
    public ResponseEntity<EstadoPersona> updateEstadoPersona(@Valid @RequestBody EstadoPersona estadoPersona) throws URISyntaxException {
        log.debug("REST request to update EstadoPersona : {}", estadoPersona);
        if (estadoPersona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoPersona result = estadoPersonaService.save(estadoPersona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPersona.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estado-personas} : get all the estadoPersonas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoPersonas in body.
     */
    @GetMapping("/estado-personas")
    public List<EstadoPersona> getAllEstadoPersonas() {
        log.debug("REST request to get all EstadoPersonas");
        return estadoPersonaService.findAll();
    }

    /**
     * {@code GET  /estado-personas/:id} : get the "id" estadoPersona.
     *
     * @param id the id of the estadoPersona to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoPersona, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-personas/{id}")
    public ResponseEntity<EstadoPersona> getEstadoPersona(@PathVariable Long id) {
        log.debug("REST request to get EstadoPersona : {}", id);
        Optional<EstadoPersona> estadoPersona = estadoPersonaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoPersona);
    }

    /**
     * {@code DELETE  /estado-personas/:id} : delete the "id" estadoPersona.
     *
     * @param id the id of the estadoPersona to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-personas/{id}")
    public ResponseEntity<Void> deleteEstadoPersona(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPersona : {}", id);
        estadoPersonaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
