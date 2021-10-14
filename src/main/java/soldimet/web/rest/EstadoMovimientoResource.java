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
import soldimet.domain.EstadoMovimiento;
import soldimet.repository.EstadoMovimientoRepository;
import soldimet.service.EstadoMovimientoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.EstadoMovimiento}.
 */
@RestController
@RequestMapping("/api")
public class EstadoMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoMovimientoResource.class);

    private static final String ENTITY_NAME = "estadoMovimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoMovimientoService estadoMovimientoService;

    private final EstadoMovimientoRepository estadoMovimientoRepository;

    public EstadoMovimientoResource(
        EstadoMovimientoService estadoMovimientoService,
        EstadoMovimientoRepository estadoMovimientoRepository
    ) {
        this.estadoMovimientoService = estadoMovimientoService;
        this.estadoMovimientoRepository = estadoMovimientoRepository;
    }

    /**
     * {@code POST  /estado-movimientos} : Create a new estadoMovimiento.
     *
     * @param estadoMovimiento the estadoMovimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoMovimiento, or with status {@code 400 (Bad Request)} if the estadoMovimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-movimientos")
    public ResponseEntity<EstadoMovimiento> createEstadoMovimiento(@Valid @RequestBody EstadoMovimiento estadoMovimiento)
        throws URISyntaxException {
        log.debug("REST request to save EstadoMovimiento : {}", estadoMovimiento);
        if (estadoMovimiento.getId() != null) {
            throw new BadRequestAlertException("A new estadoMovimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoMovimiento result = estadoMovimientoService.save(estadoMovimiento);
        return ResponseEntity
            .created(new URI("/api/estado-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-movimientos/:id} : Updates an existing estadoMovimiento.
     *
     * @param id the id of the estadoMovimiento to save.
     * @param estadoMovimiento the estadoMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoMovimiento,
     * or with status {@code 400 (Bad Request)} if the estadoMovimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-movimientos/{id}")
    public ResponseEntity<EstadoMovimiento> updateEstadoMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoMovimiento estadoMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoMovimiento : {}, {}", id, estadoMovimiento);
        if (estadoMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoMovimiento result = estadoMovimientoService.save(estadoMovimiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-movimientos/:id} : Partial updates given fields of an existing estadoMovimiento, field will ignore if it is null
     *
     * @param id the id of the estadoMovimiento to save.
     * @param estadoMovimiento the estadoMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoMovimiento,
     * or with status {@code 400 (Bad Request)} if the estadoMovimiento is not valid,
     * or with status {@code 404 (Not Found)} if the estadoMovimiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-movimientos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoMovimiento> partialUpdateEstadoMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoMovimiento estadoMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoMovimiento partially : {}, {}", id, estadoMovimiento);
        if (estadoMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoMovimiento> result = estadoMovimientoService.partialUpdate(estadoMovimiento);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoMovimiento.getId().toString())
        );
    }

    /**
     * {@code GET  /estado-movimientos} : get all the estadoMovimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoMovimientos in body.
     */
    @GetMapping("/estado-movimientos")
    public List<EstadoMovimiento> getAllEstadoMovimientos() {
        log.debug("REST request to get all EstadoMovimientos");
        return estadoMovimientoService.findAll();
    }

    /**
     * {@code GET  /estado-movimientos/:id} : get the "id" estadoMovimiento.
     *
     * @param id the id of the estadoMovimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoMovimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-movimientos/{id}")
    public ResponseEntity<EstadoMovimiento> getEstadoMovimiento(@PathVariable Long id) {
        log.debug("REST request to get EstadoMovimiento : {}", id);
        Optional<EstadoMovimiento> estadoMovimiento = estadoMovimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoMovimiento);
    }

    /**
     * {@code DELETE  /estado-movimientos/:id} : delete the "id" estadoMovimiento.
     *
     * @param id the id of the estadoMovimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-movimientos/{id}")
    public ResponseEntity<Void> deleteEstadoMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete EstadoMovimiento : {}", id);
        estadoMovimientoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
