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
import soldimet.domain.TipoRepuesto;
import soldimet.repository.TipoRepuestoRepository;
import soldimet.service.TipoRepuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.TipoRepuesto}.
 */
@RestController
@RequestMapping("/api")
public class TipoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(TipoRepuestoResource.class);

    private static final String ENTITY_NAME = "tipoRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoRepuestoService tipoRepuestoService;

    private final TipoRepuestoRepository tipoRepuestoRepository;

    public TipoRepuestoResource(TipoRepuestoService tipoRepuestoService, TipoRepuestoRepository tipoRepuestoRepository) {
        this.tipoRepuestoService = tipoRepuestoService;
        this.tipoRepuestoRepository = tipoRepuestoRepository;
    }

    /**
     * {@code POST  /tipo-repuestos} : Create a new tipoRepuesto.
     *
     * @param tipoRepuesto the tipoRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoRepuesto, or with status {@code 400 (Bad Request)} if the tipoRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-repuestos")
    public ResponseEntity<TipoRepuesto> createTipoRepuesto(@Valid @RequestBody TipoRepuesto tipoRepuesto) throws URISyntaxException {
        log.debug("REST request to save TipoRepuesto : {}", tipoRepuesto);
        if (tipoRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new tipoRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoRepuesto result = tipoRepuestoService.save(tipoRepuesto);
        return ResponseEntity
            .created(new URI("/api/tipo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-repuestos/:id} : Updates an existing tipoRepuesto.
     *
     * @param id the id of the tipoRepuesto to save.
     * @param tipoRepuesto the tipoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoRepuesto,
     * or with status {@code 400 (Bad Request)} if the tipoRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-repuestos/{id}")
    public ResponseEntity<TipoRepuesto> updateTipoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoRepuesto tipoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to update TipoRepuesto : {}, {}", id, tipoRepuesto);
        if (tipoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoRepuesto result = tipoRepuestoService.save(tipoRepuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-repuestos/:id} : Partial updates given fields of an existing tipoRepuesto, field will ignore if it is null
     *
     * @param id the id of the tipoRepuesto to save.
     * @param tipoRepuesto the tipoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoRepuesto,
     * or with status {@code 400 (Bad Request)} if the tipoRepuesto is not valid,
     * or with status {@code 404 (Not Found)} if the tipoRepuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-repuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TipoRepuesto> partialUpdateTipoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoRepuesto tipoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoRepuesto partially : {}, {}", id, tipoRepuesto);
        if (tipoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoRepuesto> result = tipoRepuestoService.partialUpdate(tipoRepuesto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoRepuesto.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-repuestos} : get all the tipoRepuestos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoRepuestos in body.
     */
    @GetMapping("/tipo-repuestos")
    public List<TipoRepuesto> getAllTipoRepuestos() {
        log.debug("REST request to get all TipoRepuestos");
        return tipoRepuestoService.findAll();
    }

    /**
     * {@code GET  /tipo-repuestos/:id} : get the "id" tipoRepuesto.
     *
     * @param id the id of the tipoRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-repuestos/{id}")
    public ResponseEntity<TipoRepuesto> getTipoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get TipoRepuesto : {}", id);
        Optional<TipoRepuesto> tipoRepuesto = tipoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoRepuesto);
    }

    /**
     * {@code DELETE  /tipo-repuestos/:id} : delete the "id" tipoRepuesto.
     *
     * @param id the id of the tipoRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-repuestos/{id}")
    public ResponseEntity<Void> deleteTipoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete TipoRepuesto : {}", id);
        tipoRepuestoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
