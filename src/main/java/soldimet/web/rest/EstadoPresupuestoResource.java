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
import soldimet.domain.EstadoPresupuesto;
import soldimet.repository.EstadoPresupuestoRepository;
import soldimet.service.EstadoPresupuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.EstadoPresupuesto}.
 */
@RestController
@RequestMapping("/api")
public class EstadoPresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoPresupuestoResource.class);

    private static final String ENTITY_NAME = "estadoPresupuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoPresupuestoService estadoPresupuestoService;

    private final EstadoPresupuestoRepository estadoPresupuestoRepository;

    public EstadoPresupuestoResource(
        EstadoPresupuestoService estadoPresupuestoService,
        EstadoPresupuestoRepository estadoPresupuestoRepository
    ) {
        this.estadoPresupuestoService = estadoPresupuestoService;
        this.estadoPresupuestoRepository = estadoPresupuestoRepository;
    }

    /**
     * {@code POST  /estado-presupuestos} : Create a new estadoPresupuesto.
     *
     * @param estadoPresupuesto the estadoPresupuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoPresupuesto, or with status {@code 400 (Bad Request)} if the estadoPresupuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-presupuestos")
    public ResponseEntity<EstadoPresupuesto> createEstadoPresupuesto(@Valid @RequestBody EstadoPresupuesto estadoPresupuesto)
        throws URISyntaxException {
        log.debug("REST request to save EstadoPresupuesto : {}", estadoPresupuesto);
        if (estadoPresupuesto.getId() != null) {
            throw new BadRequestAlertException("A new estadoPresupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoPresupuesto result = estadoPresupuestoService.save(estadoPresupuesto);
        return ResponseEntity
            .created(new URI("/api/estado-presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-presupuestos/:id} : Updates an existing estadoPresupuesto.
     *
     * @param id the id of the estadoPresupuesto to save.
     * @param estadoPresupuesto the estadoPresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPresupuesto,
     * or with status {@code 400 (Bad Request)} if the estadoPresupuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoPresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-presupuestos/{id}")
    public ResponseEntity<EstadoPresupuesto> updateEstadoPresupuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EstadoPresupuesto estadoPresupuesto
    ) throws URISyntaxException {
        log.debug("REST request to update EstadoPresupuesto : {}, {}", id, estadoPresupuesto);
        if (estadoPresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoPresupuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoPresupuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EstadoPresupuesto result = estadoPresupuestoService.save(estadoPresupuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPresupuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /estado-presupuestos/:id} : Partial updates given fields of an existing estadoPresupuesto, field will ignore if it is null
     *
     * @param id the id of the estadoPresupuesto to save.
     * @param estadoPresupuesto the estadoPresupuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoPresupuesto,
     * or with status {@code 400 (Bad Request)} if the estadoPresupuesto is not valid,
     * or with status {@code 404 (Not Found)} if the estadoPresupuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the estadoPresupuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/estado-presupuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<EstadoPresupuesto> partialUpdateEstadoPresupuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EstadoPresupuesto estadoPresupuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update EstadoPresupuesto partially : {}, {}", id, estadoPresupuesto);
        if (estadoPresupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, estadoPresupuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!estadoPresupuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EstadoPresupuesto> result = estadoPresupuestoService.partialUpdate(estadoPresupuesto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoPresupuesto.getId().toString())
        );
    }

    /**
     * {@code GET  /estado-presupuestos} : get all the estadoPresupuestos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoPresupuestos in body.
     */
    @GetMapping("/estado-presupuestos")
    public List<EstadoPresupuesto> getAllEstadoPresupuestos() {
        log.debug("REST request to get all EstadoPresupuestos");
        return estadoPresupuestoService.findAll();
    }

    /**
     * {@code GET  /estado-presupuestos/:id} : get the "id" estadoPresupuesto.
     *
     * @param id the id of the estadoPresupuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoPresupuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-presupuestos/{id}")
    public ResponseEntity<EstadoPresupuesto> getEstadoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get EstadoPresupuesto : {}", id);
        Optional<EstadoPresupuesto> estadoPresupuesto = estadoPresupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoPresupuesto);
    }

    /**
     * {@code DELETE  /estado-presupuestos/:id} : delete the "id" estadoPresupuesto.
     *
     * @param id the id of the estadoPresupuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-presupuestos/{id}")
    public ResponseEntity<Void> deleteEstadoPresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete EstadoPresupuesto : {}", id);
        estadoPresupuestoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
