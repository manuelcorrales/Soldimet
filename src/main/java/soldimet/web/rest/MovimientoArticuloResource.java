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
import soldimet.domain.MovimientoArticulo;
import soldimet.repository.MovimientoArticuloRepository;
import soldimet.service.MovimientoArticuloService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.MovimientoArticulo}.
 */
@RestController
@RequestMapping("/api")
public class MovimientoArticuloResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoArticuloResource.class);

    private static final String ENTITY_NAME = "movimientoArticulo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoArticuloService movimientoArticuloService;

    private final MovimientoArticuloRepository movimientoArticuloRepository;

    public MovimientoArticuloResource(
        MovimientoArticuloService movimientoArticuloService,
        MovimientoArticuloRepository movimientoArticuloRepository
    ) {
        this.movimientoArticuloService = movimientoArticuloService;
        this.movimientoArticuloRepository = movimientoArticuloRepository;
    }

    /**
     * {@code POST  /movimiento-articulos} : Create a new movimientoArticulo.
     *
     * @param movimientoArticulo the movimientoArticulo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimientoArticulo, or with status {@code 400 (Bad Request)} if the movimientoArticulo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimiento-articulos")
    public ResponseEntity<MovimientoArticulo> createMovimientoArticulo(@Valid @RequestBody MovimientoArticulo movimientoArticulo)
        throws URISyntaxException {
        log.debug("REST request to save MovimientoArticulo : {}", movimientoArticulo);
        if (movimientoArticulo.getId() != null) {
            throw new BadRequestAlertException("A new movimientoArticulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovimientoArticulo result = movimientoArticuloService.save(movimientoArticulo);
        return ResponseEntity
            .created(new URI("/api/movimiento-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimiento-articulos/:id} : Updates an existing movimientoArticulo.
     *
     * @param id the id of the movimientoArticulo to save.
     * @param movimientoArticulo the movimientoArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoArticulo,
     * or with status {@code 400 (Bad Request)} if the movimientoArticulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimientoArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimiento-articulos/{id}")
    public ResponseEntity<MovimientoArticulo> updateMovimientoArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MovimientoArticulo movimientoArticulo
    ) throws URISyntaxException {
        log.debug("REST request to update MovimientoArticulo : {}, {}", id, movimientoArticulo);
        if (movimientoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientoArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MovimientoArticulo result = movimientoArticuloService.save(movimientoArticulo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoArticulo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /movimiento-articulos/:id} : Partial updates given fields of an existing movimientoArticulo, field will ignore if it is null
     *
     * @param id the id of the movimientoArticulo to save.
     * @param movimientoArticulo the movimientoArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimientoArticulo,
     * or with status {@code 400 (Bad Request)} if the movimientoArticulo is not valid,
     * or with status {@code 404 (Not Found)} if the movimientoArticulo is not found,
     * or with status {@code 500 (Internal Server Error)} if the movimientoArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/movimiento-articulos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MovimientoArticulo> partialUpdateMovimientoArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MovimientoArticulo movimientoArticulo
    ) throws URISyntaxException {
        log.debug("REST request to partial update MovimientoArticulo partially : {}, {}", id, movimientoArticulo);
        if (movimientoArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimientoArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MovimientoArticulo> result = movimientoArticuloService.partialUpdate(movimientoArticulo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimientoArticulo.getId().toString())
        );
    }

    /**
     * {@code GET  /movimiento-articulos} : get all the movimientoArticulos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientoArticulos in body.
     */
    @GetMapping("/movimiento-articulos")
    public List<MovimientoArticulo> getAllMovimientoArticulos() {
        log.debug("REST request to get all MovimientoArticulos");
        return movimientoArticuloService.findAll();
    }

    /**
     * {@code GET  /movimiento-articulos/:id} : get the "id" movimientoArticulo.
     *
     * @param id the id of the movimientoArticulo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimientoArticulo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimiento-articulos/{id}")
    public ResponseEntity<MovimientoArticulo> getMovimientoArticulo(@PathVariable Long id) {
        log.debug("REST request to get MovimientoArticulo : {}", id);
        Optional<MovimientoArticulo> movimientoArticulo = movimientoArticuloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movimientoArticulo);
    }

    /**
     * {@code DELETE  /movimiento-articulos/:id} : delete the "id" movimientoArticulo.
     *
     * @param id the id of the movimientoArticulo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimiento-articulos/{id}")
    public ResponseEntity<Void> deleteMovimientoArticulo(@PathVariable Long id) {
        log.debug("REST request to delete MovimientoArticulo : {}", id);
        movimientoArticuloService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
