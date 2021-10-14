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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import soldimet.domain.Movimiento;
import soldimet.repository.MovimientoRepository;
import soldimet.service.MovimientoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Movimiento}.
 */
@RestController
@RequestMapping("/api")
public class MovimientoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoResource.class);

    private static final String ENTITY_NAME = "movimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoService movimientoService;

    private final MovimientoRepository movimientoRepository;

    public MovimientoResource(MovimientoService movimientoService, MovimientoRepository movimientoRepository) {
        this.movimientoService = movimientoService;
        this.movimientoRepository = movimientoRepository;
    }

    /**
     * {@code POST  /movimientos} : Create a new movimiento.
     *
     * @param movimiento the movimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimiento, or with status {@code 400 (Bad Request)} if the movimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimientos")
    public ResponseEntity<Movimiento> createMovimiento(@Valid @RequestBody Movimiento movimiento) throws URISyntaxException {
        log.debug("REST request to save Movimiento : {}", movimiento);
        if (movimiento.getId() != null) {
            throw new BadRequestAlertException("A new movimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Movimiento result = movimientoService.save(movimiento);
        return ResponseEntity
            .created(new URI("/api/movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimientos/:id} : Updates an existing movimiento.
     *
     * @param id the id of the movimiento to save.
     * @param movimiento the movimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimiento,
     * or with status {@code 400 (Bad Request)} if the movimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimientos/{id}")
    public ResponseEntity<Movimiento> updateMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Movimiento movimiento
    ) throws URISyntaxException {
        log.debug("REST request to update Movimiento : {}, {}", id, movimiento);
        if (movimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Movimiento result = movimientoService.save(movimiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /movimientos/:id} : Partial updates given fields of an existing movimiento, field will ignore if it is null
     *
     * @param id the id of the movimiento to save.
     * @param movimiento the movimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimiento,
     * or with status {@code 400 (Bad Request)} if the movimiento is not valid,
     * or with status {@code 404 (Not Found)} if the movimiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the movimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/movimientos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Movimiento> partialUpdateMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Movimiento movimiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update Movimiento partially : {}, {}", id, movimiento);
        if (movimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, movimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!movimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Movimiento> result = movimientoService.partialUpdate(movimiento);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, movimiento.getId().toString())
        );
    }

    /**
     * {@code GET  /movimientos} : get all the movimientos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientos in body.
     */
    @GetMapping("/movimientos")
    public ResponseEntity<List<Movimiento>> getAllMovimientos(Pageable pageable) {
        log.debug("REST request to get a page of Movimientos");
        Page<Movimiento> page = movimientoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /movimientos/:id} : get the "id" movimiento.
     *
     * @param id the id of the movimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimientos/{id}")
    public ResponseEntity<Movimiento> getMovimiento(@PathVariable Long id) {
        log.debug("REST request to get Movimiento : {}", id);
        Optional<Movimiento> movimiento = movimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movimiento);
    }

    /**
     * {@code DELETE  /movimientos/:id} : delete the "id" movimiento.
     *
     * @param id the id of the movimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimientos/{id}")
    public ResponseEntity<Void> deleteMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete Movimiento : {}", id);
        movimientoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
