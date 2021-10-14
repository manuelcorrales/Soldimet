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
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.repository.EstadoCobranzaOperacionRepository;
import soldimet.service.EstadoCobranzaOperacionService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.EstadoCobranzaOperacion}.
 */
@RestController
@RequestMapping("/api")
public class EstadoCobranzaOperacionResource {

    private final Logger log = LoggerFactory.getLogger(EstadoCobranzaOperacionResource.class);

    private static final String ENTITY_NAME = "estadoCobranzaOperacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoCobranzaOperacionService estadoCobranzaOperacionService;

    private final EstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository;

    public EstadoCobranzaOperacionResource(
        EstadoCobranzaOperacionService estadoCobranzaOperacionService,
        EstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository
    ) {
        this.estadoCobranzaOperacionService = estadoCobranzaOperacionService;
        this.estadoCobranzaOperacionRepository = estadoCobranzaOperacionRepository;
    }

    /**
     * {@code POST  /estado-cobranza-operacions} : Create a new estadoCobranzaOperacion.
     *
     * @param estadoCobranzaOperacion the estadoCobranzaOperacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoCobranzaOperacion, or with status {@code 400 (Bad Request)} if the estadoCobranzaOperacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-cobranza-operacions")
    public ResponseEntity<EstadoCobranzaOperacion> createEstadoCobranzaOperacion(
        @Valid @RequestBody EstadoCobranzaOperacion estadoCobranzaOperacion
    ) throws URISyntaxException {
        log.debug("REST request to save EstadoCobranzaOperacion : {}", estadoCobranzaOperacion);
        if (estadoCobranzaOperacion.getId() != null) {
            throw new BadRequestAlertException("A new estadoCobranzaOperacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoCobranzaOperacion result = estadoCobranzaOperacionService.save(estadoCobranzaOperacion);
        return ResponseEntity
            .created(new URI("/api/estado-cobranza-operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-cobranza-operacions/:id} : Updates an existing estadoCobranzaOperacion.
     *
     * @param id the id of the estadoCobranzaOperacion to save.
     * @param estadoCobranzaOperacion the estadoCobranzaOperacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoCobranzaOperacion,
     * or with status {@code 400 (Bad Request)} if the estadoCobranzaOperacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoCobranzaOperacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-cobranza-operacions/{id}")
    public ResponseEntity<EstadoCobranzaOperacion> updateEstadoCobranzaOperacion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoCobranzaOperacion estadoCobranzaOperacion
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoCobranzaOperacion : {}, {}", id, estadoCobranzaOperacion);
        if (estadoCobranzaOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoCobranzaOperacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoCobranzaOperacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoCobranzaOperacion result = estadoCobranzaOperacionService.save(estadoCobranzaOperacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoCobranzaOperacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-cobranza-operacions/:id} : Partial updates given fields of an existing estadoCobranzaOperacion, field will ignore if it is null
     *
     * @param id the id of the estadoCobranzaOperacion to save.
     * @param estadoCobranzaOperacion the estadoCobranzaOperacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoCobranzaOperacion,
     * or with status {@code 400 (Bad Request)} if the estadoCobranzaOperacion is not valid,
     * or with status {@code 404 (Not Found)} if the estadoCobranzaOperacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoCobranzaOperacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-cobranza-operacions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoCobranzaOperacion> partialUpdateEstadoCobranzaOperacion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoCobranzaOperacion estadoCobranzaOperacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoCobranzaOperacion partially : {}, {}", id, estadoCobranzaOperacion);
        if (estadoCobranzaOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoCobranzaOperacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoCobranzaOperacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoCobranzaOperacion> result = estadoCobranzaOperacionService.partialUpdate(estadoCobranzaOperacion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoCobranzaOperacion.getId().toString())
        );
    }

    /**
     * {@code GET  /estado-cobranza-operacions} : get all the estadoCobranzaOperacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoCobranzaOperacions in body.
     */
    @GetMapping("/estado-cobranza-operacions")
    public List<EstadoCobranzaOperacion> getAllEstadoCobranzaOperacions() {
        log.debug("REST request to get all EstadoCobranzaOperacions");
        return estadoCobranzaOperacionService.findAll();
    }

    /**
     * {@code GET  /estado-cobranza-operacions/:id} : get the "id" estadoCobranzaOperacion.
     *
     * @param id the id of the estadoCobranzaOperacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoCobranzaOperacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-cobranza-operacions/{id}")
    public ResponseEntity<EstadoCobranzaOperacion> getEstadoCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to get EstadoCobranzaOperacion : {}", id);
        Optional<EstadoCobranzaOperacion> estadoCobranzaOperacion = estadoCobranzaOperacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoCobranzaOperacion);
    }

    /**
     * {@code DELETE  /estado-cobranza-operacions/:id} : delete the "id" estadoCobranzaOperacion.
     *
     * @param id the id of the estadoCobranzaOperacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-cobranza-operacions/{id}")
    public ResponseEntity<Void> deleteEstadoCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to delete EstadoCobranzaOperacion : {}", id);
        estadoCobranzaOperacionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
