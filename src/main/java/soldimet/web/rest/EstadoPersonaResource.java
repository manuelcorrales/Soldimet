package soldimet.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.EstadoPersona;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.service.EstadoPersonaService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

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

    private final EstadoPersonaRepository estadoPersonaRepository;

    public EstadoPersonaResource(EstadoPersonaService estadoPersonaService, EstadoPersonaRepository estadoPersonaRepository) {
        this.estadoPersonaService = estadoPersonaService;
        this.estadoPersonaRepository = estadoPersonaRepository;
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
        return ResponseEntity
            .created(new URI("/api/estado-personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-personas/:id} : Updates an existing estadoPersona.
     *
     * @param id the id of the estadoPersona to save.
     * @param estadoPersona the estadoPersona to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPersona,
     * or with status {@code 400 (Bad Request)} if the estadoPersona is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoPersona couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-personas/{id}")
    public ResponseEntity<EstadoPersona> updateEstadoPersona(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoPersona estadoPersona
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoPersona : {}, {}", id, estadoPersona);
        if (estadoPersona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoPersona.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoPersonaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoPersona result = estadoPersonaService.save(estadoPersona);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPersona.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-personas/:id} : Partial updates given fields of an existing estadoPersona, field will ignore if it is null
     *
     * @param id the id of the estadoPersona to save.
     * @param estadoPersona the estadoPersona to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPersona,
     * or with status {@code 400 (Bad Request)} if the estadoPersona is not valid,
     * or with status {@code 404 (Not Found)} if the estadoPersona is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoPersona couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-personas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoPersona> partialUpdateEstadoPersona(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoPersona estadoPersona
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoPersona partially : {}, {}", id, estadoPersona);
        if (estadoPersona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoPersona.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoPersonaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoPersona> result = estadoPersonaService.partialUpdate(estadoPersona);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPersona.getId().toString())
        );
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
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
