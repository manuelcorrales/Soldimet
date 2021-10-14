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
import soldimet.domain.CobranzaRepuesto;
import soldimet.repository.CobranzaRepuestoRepository;
import soldimet.service.CobranzaRepuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.CobranzaRepuesto}.
 */
@RestController
@RequestMapping("/api")
public class CobranzaRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(CobranzaRepuestoResource.class);

    private static final String ENTITY_NAME = "cobranzaRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CobranzaRepuestoService cobranzaRepuestoService;

    private final CobranzaRepuestoRepository cobranzaRepuestoRepository;

    public CobranzaRepuestoResource(
        CobranzaRepuestoService cobranzaRepuestoService,
        CobranzaRepuestoRepository cobranzaRepuestoRepository
    ) {
        this.cobranzaRepuestoService = cobranzaRepuestoService;
        this.cobranzaRepuestoRepository = cobranzaRepuestoRepository;
    }

    /**
     * {@code POST  /cobranza-repuestos} : Create a new cobranzaRepuesto.
     *
     * @param cobranzaRepuesto the cobranzaRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cobranzaRepuesto, or with status {@code 400 (Bad Request)} if the cobranzaRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cobranza-repuestos")
    public ResponseEntity<CobranzaRepuesto> createCobranzaRepuesto(@Valid @RequestBody CobranzaRepuesto cobranzaRepuesto)
        throws URISyntaxException {
        log.debug("REST request to save CobranzaRepuesto : {}", cobranzaRepuesto);
        if (cobranzaRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new cobranzaRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CobranzaRepuesto result = cobranzaRepuestoService.save(cobranzaRepuesto);
        return ResponseEntity
            .created(new URI("/api/cobranza-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cobranza-repuestos/:id} : Updates an existing cobranzaRepuesto.
     *
     * @param id the id of the cobranzaRepuesto to save.
     * @param cobranzaRepuesto the cobranzaRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cobranzaRepuesto,
     * or with status {@code 400 (Bad Request)} if the cobranzaRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cobranzaRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cobranza-repuestos/{id}")
    public ResponseEntity<CobranzaRepuesto> updateCobranzaRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CobranzaRepuesto cobranzaRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to update CobranzaRepuesto : {}, {}", id, cobranzaRepuesto);
        if (cobranzaRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cobranzaRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cobranzaRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CobranzaRepuesto result = cobranzaRepuestoService.save(cobranzaRepuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cobranzaRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cobranza-repuestos/:id} : Partial updates given fields of an existing cobranzaRepuesto, field will ignore if it is null
     *
     * @param id the id of the cobranzaRepuesto to save.
     * @param cobranzaRepuesto the cobranzaRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cobranzaRepuesto,
     * or with status {@code 400 (Bad Request)} if the cobranzaRepuesto is not valid,
     * or with status {@code 404 (Not Found)} if the cobranzaRepuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the cobranzaRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cobranza-repuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CobranzaRepuesto> partialUpdateCobranzaRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CobranzaRepuesto cobranzaRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update CobranzaRepuesto partially : {}, {}", id, cobranzaRepuesto);
        if (cobranzaRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cobranzaRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cobranzaRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CobranzaRepuesto> result = cobranzaRepuestoService.partialUpdate(cobranzaRepuesto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cobranzaRepuesto.getId().toString())
        );
    }

    /**
     * {@code GET  /cobranza-repuestos} : get all the cobranzaRepuestos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cobranzaRepuestos in body.
     */
    @GetMapping("/cobranza-repuestos")
    public List<CobranzaRepuesto> getAllCobranzaRepuestos() {
        log.debug("REST request to get all CobranzaRepuestos");
        return cobranzaRepuestoService.findAll();
    }

    /**
     * {@code GET  /cobranza-repuestos/:id} : get the "id" cobranzaRepuesto.
     *
     * @param id the id of the cobranzaRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cobranzaRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cobranza-repuestos/{id}")
    public ResponseEntity<CobranzaRepuesto> getCobranzaRepuesto(@PathVariable Long id) {
        log.debug("REST request to get CobranzaRepuesto : {}", id);
        Optional<CobranzaRepuesto> cobranzaRepuesto = cobranzaRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cobranzaRepuesto);
    }

    /**
     * {@code DELETE  /cobranza-repuestos/:id} : delete the "id" cobranzaRepuesto.
     *
     * @param id the id of the cobranzaRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cobranza-repuestos/{id}")
    public ResponseEntity<Void> deleteCobranzaRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete CobranzaRepuesto : {}", id);
        cobranzaRepuestoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
