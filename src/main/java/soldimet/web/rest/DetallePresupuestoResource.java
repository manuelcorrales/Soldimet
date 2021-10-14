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
import soldimet.domain.DetallePresupuesto;
import soldimet.repository.DetallePresupuestoRepository;
import soldimet.service.DetallePresupuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.DetallePresupuesto}.
 */
@RestController
@RequestMapping("/api")
public class DetallePresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(DetallePresupuestoResource.class);

    private static final String ENTITY_NAME = "detallePresupuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetallePresupuestoService detallePresupuestoService;

    private final DetallePresupuestoRepository detallePresupuestoRepository;

    public DetallePresupuestoResource(
        DetallePresupuestoService detallePresupuestoService,
        DetallePresupuestoRepository detallePresupuestoRepository
    ) {
        this.detallePresupuestoService = detallePresupuestoService;
        this.detallePresupuestoRepository = detallePresupuestoRepository;
    }

    /**
     * {@code POST  /detalle-presupuestos} : Create a new detallePresupuesto.
     *
     * @param detallePresupuesto the detallePresupuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detallePresupuesto, or with status {@code 400 (Bad Request)} if the detallePresupuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-presupuestos")
    public ResponseEntity<DetallePresupuesto> createDetallePresupuesto(@Valid @RequestBody DetallePresupuesto detallePresupuesto)
        throws URISyntaxException {
        log.debug("REST request to save DetallePresupuesto : {}", detallePresupuesto);
        if (detallePresupuesto.getId() != null) {
            throw new BadRequestAlertException("A new detallePresupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetallePresupuesto result = detallePresupuestoService.save(detallePresupuesto);
        return ResponseEntity
            .created(new URI("/api/detalle-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-presupuestos/:id} : Updates an existing detallePresupuesto.
     *
     * @param id the id of the detallePresupuesto to save.
     * @param detallePresupuesto the detallePresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detallePresupuesto,
     * or with status {@code 400 (Bad Request)} if the detallePresupuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detallePresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-presupuestos/{id}")
    public ResponseEntity<DetallePresupuesto> updateDetallePresupuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DetallePresupuesto detallePresupuesto
    ) throws URISyntaxException {
        log.debug("REST request to update DetallePresupuesto : {}, {}", id, detallePresupuesto);
        if (detallePresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detallePresupuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detallePresupuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DetallePresupuesto result = detallePresupuestoService.save(detallePresupuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detallePresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /detalle-presupuestos/:id} : Partial updates given fields of an existing detallePresupuesto, field will ignore if it is null
     *
     * @param id the id of the detallePresupuesto to save.
     * @param detallePresupuesto the detallePresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detallePresupuesto,
     * or with status {@code 400 (Bad Request)} if the detallePresupuesto is not valid,
     * or with status {@code 404 (Not Found)} if the detallePresupuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the detallePresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/detalle-presupuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<DetallePresupuesto> partialUpdateDetallePresupuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DetallePresupuesto detallePresupuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update DetallePresupuesto partially : {}, {}", id, detallePresupuesto);
        if (detallePresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detallePresupuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detallePresupuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DetallePresupuesto> result = detallePresupuestoService.partialUpdate(detallePresupuesto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detallePresupuesto.getId().toString())
        );
    }

    /**
     * {@code GET  /detalle-presupuestos} : get all the detallePresupuestos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detallePresupuestos in body.
     */
    @GetMapping("/detalle-presupuestos")
    public List<DetallePresupuesto> getAllDetallePresupuestos() {
        log.debug("REST request to get all DetallePresupuestos");
        return detallePresupuestoService.findAll();
    }

    /**
     * {@code GET  /detalle-presupuestos/:id} : get the "id" detallePresupuesto.
     *
     * @param id the id of the detallePresupuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detallePresupuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-presupuestos/{id}")
    public ResponseEntity<DetallePresupuesto> getDetallePresupuesto(@PathVariable Long id) {
        log.debug("REST request to get DetallePresupuesto : {}", id);
        Optional<DetallePresupuesto> detallePresupuesto = detallePresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(detallePresupuesto);
    }

    /**
     * {@code DELETE  /detalle-presupuestos/:id} : delete the "id" detallePresupuesto.
     *
     * @param id the id of the detallePresupuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-presupuestos/{id}")
    public ResponseEntity<Void> deleteDetallePresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete DetallePresupuesto : {}", id);
        detallePresupuestoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
