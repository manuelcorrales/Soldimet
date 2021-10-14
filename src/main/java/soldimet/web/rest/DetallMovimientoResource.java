package soldimet.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.DetallMovimiento;
import soldimet.repository.DetallMovimientoRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.DetallMovimiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DetallMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(DetallMovimientoResource.class);

    private static final String ENTITY_NAME = "detallMovimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetallMovimientoRepository detallMovimientoRepository;

    public DetallMovimientoResource(DetallMovimientoRepository detallMovimientoRepository) {
        this.detallMovimientoRepository = detallMovimientoRepository;
    }

    /**
     * {@code POST  /detall-movimientos} : Create a new detallMovimiento.
     *
     * @param detallMovimiento the detallMovimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detallMovimiento, or with status {@code 400 (Bad Request)} if the detallMovimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detall-movimientos")
    public ResponseEntity<DetallMovimiento> createDetallMovimiento(@RequestBody DetallMovimiento detallMovimiento)
        throws URISyntaxException {
        log.debug("REST request to save DetallMovimiento : {}", detallMovimiento);
        if (detallMovimiento.getId() != null) {
            throw new BadRequestAlertException("A new detallMovimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetallMovimiento result = detallMovimientoRepository.save(detallMovimiento);
        return ResponseEntity
            .created(new URI("/api/detall-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detall-movimientos/:id} : Updates an existing detallMovimiento.
     *
     * @param id the id of the detallMovimiento to save.
     * @param detallMovimiento the detallMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detallMovimiento,
     * or with status {@code 400 (Bad Request)} if the detallMovimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detallMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detall-movimientos/{id}")
    public ResponseEntity<DetallMovimiento> updateDetallMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DetallMovimiento detallMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to update DetallMovimiento : {}, {}", id, detallMovimiento);
        if (detallMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detallMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detallMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DetallMovimiento result = detallMovimientoRepository.save(detallMovimiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detallMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /detall-movimientos/:id} : Partial updates given fields of an existing detallMovimiento, field will ignore if it is null
     *
     * @param id the id of the detallMovimiento to save.
     * @param detallMovimiento the detallMovimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detallMovimiento,
     * or with status {@code 400 (Bad Request)} if the detallMovimiento is not valid,
     * or with status {@code 404 (Not Found)} if the detallMovimiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the detallMovimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/detall-movimientos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<DetallMovimiento> partialUpdateDetallMovimiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DetallMovimiento detallMovimiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update DetallMovimiento partially : {}, {}", id, detallMovimiento);
        if (detallMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detallMovimiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detallMovimientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DetallMovimiento> result = detallMovimientoRepository
            .findById(detallMovimiento.getId())
            .map(
                existingDetallMovimiento -> {
                    return existingDetallMovimiento;
                }
            )
            .map(detallMovimientoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detallMovimiento.getId().toString())
        );
    }

    /**
     * {@code GET  /detall-movimientos} : get all the detallMovimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detallMovimientos in body.
     */
    @GetMapping("/detall-movimientos")
    public List<DetallMovimiento> getAllDetallMovimientos() {
        log.debug("REST request to get all DetallMovimientos");
        return detallMovimientoRepository.findAll();
    }

    /**
     * {@code GET  /detall-movimientos/:id} : get the "id" detallMovimiento.
     *
     * @param id the id of the detallMovimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detallMovimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detall-movimientos/{id}")
    public ResponseEntity<DetallMovimiento> getDetallMovimiento(@PathVariable Long id) {
        log.debug("REST request to get DetallMovimiento : {}", id);
        Optional<DetallMovimiento> detallMovimiento = detallMovimientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detallMovimiento);
    }

    /**
     * {@code DELETE  /detall-movimientos/:id} : delete the "id" detallMovimiento.
     *
     * @param id the id of the detallMovimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detall-movimientos/{id}")
    public ResponseEntity<Void> deleteDetallMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete DetallMovimiento : {}", id);
        detallMovimientoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
