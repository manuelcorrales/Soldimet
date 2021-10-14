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
import soldimet.domain.Operacion;
import soldimet.repository.OperacionRepository;
import soldimet.service.OperacionService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Operacion}.
 */
@RestController
@RequestMapping("/api")
public class OperacionResource {

    private final Logger log = LoggerFactory.getLogger(OperacionResource.class);

    private static final String ENTITY_NAME = "operacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OperacionService operacionService;

    private final OperacionRepository operacionRepository;

    public OperacionResource(OperacionService operacionService, OperacionRepository operacionRepository) {
        this.operacionService = operacionService;
        this.operacionRepository = operacionRepository;
    }

    /**
     * {@code POST  /operacions} : Create a new operacion.
     *
     * @param operacion the operacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new operacion, or with status {@code 400 (Bad Request)} if the operacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/operacions")
    public ResponseEntity<Operacion> createOperacion(@Valid @RequestBody Operacion operacion) throws URISyntaxException {
        log.debug("REST request to save Operacion : {}", operacion);
        if (operacion.getId() != null) {
            throw new BadRequestAlertException("A new operacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Operacion result = operacionService.save(operacion);
        return ResponseEntity
            .created(new URI("/api/operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /operacions/:id} : Updates an existing operacion.
     *
     * @param id the id of the operacion to save.
     * @param operacion the operacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated operacion,
     * or with status {@code 400 (Bad Request)} if the operacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the operacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/operacions/{id}")
    public ResponseEntity<Operacion> updateOperacion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Operacion operacion
    ) throws URISyntaxException {
        log.debug("REST request to update Operacion : {}, {}", id, operacion);
        if (operacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, operacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!operacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Operacion result = operacionService.save(operacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, operacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /operacions/:id} : Partial updates given fields of an existing operacion, field will ignore if it is null
     *
     * @param id the id of the operacion to save.
     * @param operacion the operacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated operacion,
     * or with status {@code 400 (Bad Request)} if the operacion is not valid,
     * or with status {@code 404 (Not Found)} if the operacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the operacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/operacions/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Operacion> partialUpdateOperacion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Operacion operacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Operacion partially : {}, {}", id, operacion);
        if (operacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, operacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!operacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Operacion> result = operacionService.partialUpdate(operacion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, operacion.getId().toString())
        );
    }

    /**
     * {@code GET  /operacions} : get all the operacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of operacions in body.
     */
    @GetMapping("/operacions")
    public List<Operacion> getAllOperacions() {
        log.debug("REST request to get all Operacions");
        return operacionService.findAll();
    }

    /**
     * {@code GET  /operacions/:id} : get the "id" operacion.
     *
     * @param id the id of the operacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the operacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/operacions/{id}")
    public ResponseEntity<Operacion> getOperacion(@PathVariable Long id) {
        log.debug("REST request to get Operacion : {}", id);
        Optional<Operacion> operacion = operacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(operacion);
    }

    /**
     * {@code DELETE  /operacions/:id} : delete the "id" operacion.
     *
     * @param id the id of the operacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/operacions/{id}")
    public ResponseEntity<Void> deleteOperacion(@PathVariable Long id) {
        log.debug("REST request to delete Operacion : {}", id);
        operacionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
