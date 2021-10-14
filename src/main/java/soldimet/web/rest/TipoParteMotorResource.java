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
import soldimet.domain.TipoParteMotor;
import soldimet.repository.TipoParteMotorRepository;
import soldimet.service.TipoParteMotorService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.TipoParteMotor}.
 */
@RestController
@RequestMapping("/api")
public class TipoParteMotorResource {

    private final Logger log = LoggerFactory.getLogger(TipoParteMotorResource.class);

    private static final String ENTITY_NAME = "tipoParteMotor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoParteMotorService tipoParteMotorService;

    private final TipoParteMotorRepository tipoParteMotorRepository;

    public TipoParteMotorResource(TipoParteMotorService tipoParteMotorService, TipoParteMotorRepository tipoParteMotorRepository) {
        this.tipoParteMotorService = tipoParteMotorService;
        this.tipoParteMotorRepository = tipoParteMotorRepository;
    }

    /**
     * {@code POST  /tipo-parte-motors} : Create a new tipoParteMotor.
     *
     * @param tipoParteMotor the tipoParteMotor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoParteMotor, or with status {@code 400 (Bad Request)} if the tipoParteMotor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-parte-motors")
    public ResponseEntity<TipoParteMotor> createTipoParteMotor(@Valid @RequestBody TipoParteMotor tipoParteMotor)
        throws URISyntaxException {
        log.debug("REST request to save TipoParteMotor : {}", tipoParteMotor);
        if (tipoParteMotor.getId() != null) {
            throw new BadRequestAlertException("A new tipoParteMotor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoParteMotor result = tipoParteMotorService.save(tipoParteMotor);
        return ResponseEntity
            .created(new URI("/api/tipo-parte-motors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-parte-motors/:id} : Updates an existing tipoParteMotor.
     *
     * @param id the id of the tipoParteMotor to save.
     * @param tipoParteMotor the tipoParteMotor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoParteMotor,
     * or with status {@code 400 (Bad Request)} if the tipoParteMotor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoParteMotor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-parte-motors/{id}")
    public ResponseEntity<TipoParteMotor> updateTipoParteMotor(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoParteMotor tipoParteMotor
    ) throws URISyntaxException {
        log.debug("REST request to update TipoParteMotor : {}, {}", id, tipoParteMotor);
        if (tipoParteMotor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoParteMotor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoParteMotorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoParteMotor result = tipoParteMotorService.save(tipoParteMotor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoParteMotor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-parte-motors/:id} : Partial updates given fields of an existing tipoParteMotor, field will ignore if it is null
     *
     * @param id the id of the tipoParteMotor to save.
     * @param tipoParteMotor the tipoParteMotor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoParteMotor,
     * or with status {@code 400 (Bad Request)} if the tipoParteMotor is not valid,
     * or with status {@code 404 (Not Found)} if the tipoParteMotor is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoParteMotor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-parte-motors/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TipoParteMotor> partialUpdateTipoParteMotor(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoParteMotor tipoParteMotor
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoParteMotor partially : {}, {}", id, tipoParteMotor);
        if (tipoParteMotor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoParteMotor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoParteMotorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoParteMotor> result = tipoParteMotorService.partialUpdate(tipoParteMotor);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoParteMotor.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-parte-motors} : get all the tipoParteMotors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoParteMotors in body.
     */
    @GetMapping("/tipo-parte-motors")
    public List<TipoParteMotor> getAllTipoParteMotors() {
        log.debug("REST request to get all TipoParteMotors");
        return tipoParteMotorService.findAll();
    }

    /**
     * {@code GET  /tipo-parte-motors/:id} : get the "id" tipoParteMotor.
     *
     * @param id the id of the tipoParteMotor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoParteMotor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-parte-motors/{id}")
    public ResponseEntity<TipoParteMotor> getTipoParteMotor(@PathVariable Long id) {
        log.debug("REST request to get TipoParteMotor : {}", id);
        Optional<TipoParteMotor> tipoParteMotor = tipoParteMotorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoParteMotor);
    }

    /**
     * {@code DELETE  /tipo-parte-motors/:id} : delete the "id" tipoParteMotor.
     *
     * @param id the id of the tipoParteMotor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-parte-motors/{id}")
    public ResponseEntity<Void> deleteTipoParteMotor(@PathVariable Long id) {
        log.debug("REST request to delete TipoParteMotor : {}", id);
        tipoParteMotorService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
