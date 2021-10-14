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
import soldimet.domain.TipoMovimiento;
import soldimet.repository.TipoMovimientoRepository;
import soldimet.service.TipoMovimientoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.TipoMovimiento}.
 */
@RestController
@RequestMapping("/api")
public class TipoMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(TipoMovimientoResource.class);

    private static final String ENTITY_NAME = "tipoMovimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoMovimientoService tipoMovimientoService;

    private final TipoMovimientoRepository tipoMovimientoRepository;

    public TipoMovimientoResource(TipoMovimientoService tipoMovimientoService, TipoMovimientoRepository tipoMovimientoRepository) {
        this.tipoMovimientoService = tipoMovimientoService;
        this.tipoMovimientoRepository = tipoMovimientoRepository;
    }

    /**
     * {@code POST  /tipo-movimientos} : Create a new tipoMovimiento.
     *
     * @param tipoMovimiento the tipoMovimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoMovimiento, or with status {@code 400 (Bad Request)} if the tipoMovimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-movimientos")
    public ResponseEntity<TipoMovimiento> createTipoMovimiento(@Valid @RequestBody TipoMovimiento tipoMovimiento)
        throws URISyntaxException {
        log.debug("REST request to save TipoMovimiento : {}", tipoMovimiento);
        if (tipoMovimiento.getId() != null) {
            throw new BadRequestAlertException("A new tipoMovimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoMovimiento result = tipoMovimientoService.save(tipoMovimiento);
        return ResponseEntity
            .created(new URI("/api/tipo-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-movimientos/:id} : Updates an existing tipoMovimiento.
     *
     * @param id the id of the tipoMovimiento to save.
     * @param tipoMovimiento the tipoMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoMovimiento,
     * or with status {@code 400 (Bad Request)} if the tipoMovimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-movimientos/{id}")
    public ResponseEntity<TipoMovimiento> updateTipoMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoMovimiento tipoMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to update TipoMovimiento : {}, {}", id, tipoMovimiento);
        if (tipoMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoMovimiento result = tipoMovimientoService.save(tipoMovimiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-movimientos/:id} : Partial updates given fields of an existing tipoMovimiento, field will ignore if it is null
     *
     * @param id the id of the tipoMovimiento to save.
     * @param tipoMovimiento the tipoMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoMovimiento,
     * or with status {@code 400 (Bad Request)} if the tipoMovimiento is not valid,
     * or with status {@code 404 (Not Found)} if the tipoMovimiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-movimientos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TipoMovimiento> partialUpdateTipoMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoMovimiento tipoMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoMovimiento partially : {}, {}", id, tipoMovimiento);
        if (tipoMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoMovimiento> result = tipoMovimientoService.partialUpdate(tipoMovimiento);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoMovimiento.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-movimientos} : get all the tipoMovimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoMovimientos in body.
     */
    @GetMapping("/tipo-movimientos")
    public List<TipoMovimiento> getAllTipoMovimientos() {
        log.debug("REST request to get all TipoMovimientos");
        return tipoMovimientoService.findAll();
    }

    /**
     * {@code GET  /tipo-movimientos/:id} : get the "id" tipoMovimiento.
     *
     * @param id the id of the tipoMovimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoMovimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-movimientos/{id}")
    public ResponseEntity<TipoMovimiento> getTipoMovimiento(@PathVariable Long id) {
        log.debug("REST request to get TipoMovimiento : {}", id);
        Optional<TipoMovimiento> tipoMovimiento = tipoMovimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoMovimiento);
    }

    /**
     * {@code DELETE  /tipo-movimientos/:id} : delete the "id" tipoMovimiento.
     *
     * @param id the id of the tipoMovimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-movimientos/{id}")
    public ResponseEntity<Void> deleteTipoMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete TipoMovimiento : {}", id);
        tipoMovimientoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
