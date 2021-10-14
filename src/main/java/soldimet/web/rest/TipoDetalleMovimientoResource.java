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
import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.TipoDetalleMovimientoRepository;
import soldimet.service.TipoDetalleMovimientoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.TipoDetalleMovimiento}.
 */
@RestController
@RequestMapping("/api")
public class TipoDetalleMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(TipoDetalleMovimientoResource.class);

    private static final String ENTITY_NAME = "tipoDetalleMovimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDetalleMovimientoService tipoDetalleMovimientoService;

    private final TipoDetalleMovimientoRepository tipoDetalleMovimientoRepository;

    public TipoDetalleMovimientoResource(
        TipoDetalleMovimientoService tipoDetalleMovimientoService,
        TipoDetalleMovimientoRepository tipoDetalleMovimientoRepository
    ) {
        this.tipoDetalleMovimientoService = tipoDetalleMovimientoService;
        this.tipoDetalleMovimientoRepository = tipoDetalleMovimientoRepository;
    }

    /**
     * {@code POST  /tipo-detalle-movimientos} : Create a new tipoDetalleMovimiento.
     *
     * @param tipoDetalleMovimiento the tipoDetalleMovimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDetalleMovimiento, or with status {@code 400 (Bad Request)} if the tipoDetalleMovimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-detalle-movimientos")
    public ResponseEntity<TipoDetalleMovimiento> createTipoDetalleMovimiento(
        @Valid @RequestBody TipoDetalleMovimiento tipoDetalleMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to save TipoDetalleMovimiento : {}", tipoDetalleMovimiento);
        if (tipoDetalleMovimiento.getId() != null) {
            throw new BadRequestAlertException("A new tipoDetalleMovimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDetalleMovimiento result = tipoDetalleMovimientoService.save(tipoDetalleMovimiento);
        return ResponseEntity
            .created(new URI("/api/tipo-detalle-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-detalle-movimientos/:id} : Updates an existing tipoDetalleMovimiento.
     *
     * @param id the id of the tipoDetalleMovimiento to save.
     * @param tipoDetalleMovimiento the tipoDetalleMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDetalleMovimiento,
     * or with status {@code 400 (Bad Request)} if the tipoDetalleMovimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDetalleMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-detalle-movimientos/{id}")
    public ResponseEntity<TipoDetalleMovimiento> updateTipoDetalleMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoDetalleMovimiento tipoDetalleMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to update TipoDetalleMovimiento : {}, {}", id, tipoDetalleMovimiento);
        if (tipoDetalleMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDetalleMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDetalleMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoDetalleMovimiento result = tipoDetalleMovimientoService.save(tipoDetalleMovimiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDetalleMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-detalle-movimientos/:id} : Partial updates given fields of an existing tipoDetalleMovimiento, field will ignore if it is null
     *
     * @param id the id of the tipoDetalleMovimiento to save.
     * @param tipoDetalleMovimiento the tipoDetalleMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDetalleMovimiento,
     * or with status {@code 400 (Bad Request)} if the tipoDetalleMovimiento is not valid,
     * or with status {@code 404 (Not Found)} if the tipoDetalleMovimiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoDetalleMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-detalle-movimientos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<TipoDetalleMovimiento> partialUpdateTipoDetalleMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoDetalleMovimiento tipoDetalleMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoDetalleMovimiento partially : {}, {}", id, tipoDetalleMovimiento);
        if (tipoDetalleMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDetalleMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDetalleMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoDetalleMovimiento> result = tipoDetalleMovimientoService.partialUpdate(tipoDetalleMovimiento);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDetalleMovimiento.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-detalle-movimientos} : get all the tipoDetalleMovimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDetalleMovimientos in body.
     */
    @GetMapping("/tipo-detalle-movimientos")
    public List<TipoDetalleMovimiento> getAllTipoDetalleMovimientos() {
        log.debug("REST request to get all TipoDetalleMovimientos");
        return tipoDetalleMovimientoService.findAll();
    }

    /**
     * {@code GET  /tipo-detalle-movimientos/:id} : get the "id" tipoDetalleMovimiento.
     *
     * @param id the id of the tipoDetalleMovimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDetalleMovimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-detalle-movimientos/{id}")
    public ResponseEntity<TipoDetalleMovimiento> getTipoDetalleMovimiento(@PathVariable Long id) {
        log.debug("REST request to get TipoDetalleMovimiento : {}", id);
        Optional<TipoDetalleMovimiento> tipoDetalleMovimiento = tipoDetalleMovimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoDetalleMovimiento);
    }

    /**
     * {@code DELETE  /tipo-detalle-movimientos/:id} : delete the "id" tipoDetalleMovimiento.
     *
     * @param id the id of the tipoDetalleMovimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-detalle-movimientos/{id}")
    public ResponseEntity<Void> deleteTipoDetalleMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete TipoDetalleMovimiento : {}", id);
        tipoDetalleMovimientoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
