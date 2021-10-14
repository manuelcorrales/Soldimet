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
import soldimet.domain.CobranzaOperacion;
import soldimet.repository.CobranzaOperacionRepository;
import soldimet.service.CobranzaOperacionService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.CobranzaOperacion}.
 */
@RestController
@RequestMapping("/api")
public class CobranzaOperacionResource {

    private final Logger log = LoggerFactory.getLogger(CobranzaOperacionResource.class);

    private static final String ENTITY_NAME = "cobranzaOperacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CobranzaOperacionService cobranzaOperacionService;

    private final CobranzaOperacionRepository cobranzaOperacionRepository;

    public CobranzaOperacionResource(
        CobranzaOperacionService cobranzaOperacionService,
        CobranzaOperacionRepository cobranzaOperacionRepository
    ) {
        this.cobranzaOperacionService = cobranzaOperacionService;
        this.cobranzaOperacionRepository = cobranzaOperacionRepository;
    }

    /**
     * {@code POST  /cobranza-operacions} : Create a new cobranzaOperacion.
     *
     * @param cobranzaOperacion the cobranzaOperacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cobranzaOperacion, or with status {@code 400 (Bad Request)} if the cobranzaOperacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cobranza-operacions")
    public ResponseEntity<CobranzaOperacion> createCobranzaOperacion(@Valid @RequestBody CobranzaOperacion cobranzaOperacion)
        throws URISyntaxException {
        log.debug("REST request to save CobranzaOperacion : {}", cobranzaOperacion);
        if (cobranzaOperacion.getId() != null) {
            throw new BadRequestAlertException("A new cobranzaOperacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CobranzaOperacion result = cobranzaOperacionService.save(cobranzaOperacion);
        return ResponseEntity
            .created(new URI("/api/cobranza-operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cobranza-operacions/:id} : Updates an existing cobranzaOperacion.
     *
     * @param id the id of the cobranzaOperacion to save.
     * @param cobranzaOperacion the cobranzaOperacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cobranzaOperacion,
     * or with status {@code 400 (Bad Request)} if the cobranzaOperacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cobranzaOperacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cobranza-operacions/{id}")
    public ResponseEntity<CobranzaOperacion> updateCobranzaOperacion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CobranzaOperacion cobranzaOperacion
    ) throws URISyntaxException {
        log.debug("REST request to update CobranzaOperacion : {}, {}", id, cobranzaOperacion);
        if (cobranzaOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cobranzaOperacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cobranzaOperacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CobranzaOperacion result = cobranzaOperacionService.save(cobranzaOperacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cobranzaOperacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cobranza-operacions/:id} : Partial updates given fields of an existing cobranzaOperacion, field will ignore if it is null
     *
     * @param id the id of the cobranzaOperacion to save.
     * @param cobranzaOperacion the cobranzaOperacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cobranzaOperacion,
     * or with status {@code 400 (Bad Request)} if the cobranzaOperacion is not valid,
     * or with status {@code 404 (Not Found)} if the cobranzaOperacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the cobranzaOperacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cobranza-operacions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CobranzaOperacion> partialUpdateCobranzaOperacion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CobranzaOperacion cobranzaOperacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update CobranzaOperacion partially : {}, {}", id, cobranzaOperacion);
        if (cobranzaOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cobranzaOperacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cobranzaOperacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CobranzaOperacion> result = cobranzaOperacionService.partialUpdate(cobranzaOperacion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cobranzaOperacion.getId().toString())
        );
    }

    /**
     * {@code GET  /cobranza-operacions} : get all the cobranzaOperacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cobranzaOperacions in body.
     */
    @GetMapping("/cobranza-operacions")
    public List<CobranzaOperacion> getAllCobranzaOperacions() {
        log.debug("REST request to get all CobranzaOperacions");
        return cobranzaOperacionService.findAll();
    }

    /**
     * {@code GET  /cobranza-operacions/:id} : get the "id" cobranzaOperacion.
     *
     * @param id the id of the cobranzaOperacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cobranzaOperacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cobranza-operacions/{id}")
    public ResponseEntity<CobranzaOperacion> getCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to get CobranzaOperacion : {}", id);
        Optional<CobranzaOperacion> cobranzaOperacion = cobranzaOperacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cobranzaOperacion);
    }

    /**
     * {@code DELETE  /cobranza-operacions/:id} : delete the "id" cobranzaOperacion.
     *
     * @param id the id of the cobranzaOperacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cobranza-operacions/{id}")
    public ResponseEntity<Void> deleteCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to delete CobranzaOperacion : {}", id);
        cobranzaOperacionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
