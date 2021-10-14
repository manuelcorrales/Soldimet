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
import soldimet.domain.HistorialPrecio;
import soldimet.repository.HistorialPrecioRepository;
import soldimet.service.HistorialPrecioService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.HistorialPrecio}.
 */
@RestController
@RequestMapping("/api")
public class HistorialPrecioResource {

    private final Logger log = LoggerFactory.getLogger(HistorialPrecioResource.class);

    private static final String ENTITY_NAME = "historialPrecio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistorialPrecioService historialPrecioService;

    private final HistorialPrecioRepository historialPrecioRepository;

    public HistorialPrecioResource(HistorialPrecioService historialPrecioService, HistorialPrecioRepository historialPrecioRepository) {
        this.historialPrecioService = historialPrecioService;
        this.historialPrecioRepository = historialPrecioRepository;
    }

    /**
     * {@code POST  /historial-precios} : Create a new historialPrecio.
     *
     * @param historialPrecio the historialPrecio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historialPrecio, or with status {@code 400 (Bad Request)} if the historialPrecio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historial-precios")
    public ResponseEntity<HistorialPrecio> createHistorialPrecio(@Valid @RequestBody HistorialPrecio historialPrecio)
        throws URISyntaxException {
        log.debug("REST request to save HistorialPrecio : {}", historialPrecio);
        if (historialPrecio.getId() != null) {
            throw new BadRequestAlertException("A new historialPrecio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistorialPrecio result = historialPrecioService.save(historialPrecio);
        return ResponseEntity
            .created(new URI("/api/historial-precios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /historial-precios/:id} : Updates an existing historialPrecio.
     *
     * @param id the id of the historialPrecio to save.
     * @param historialPrecio the historialPrecio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historialPrecio,
     * or with status {@code 400 (Bad Request)} if the historialPrecio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historialPrecio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historial-precios/{id}")
    public ResponseEntity<HistorialPrecio> updateHistorialPrecio(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody HistorialPrecio historialPrecio
    ) throws URISyntaxException {
        log.debug("REST request to update HistorialPrecio : {}, {}", id, historialPrecio);
        if (historialPrecio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historialPrecio.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!historialPrecioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HistorialPrecio result = historialPrecioService.save(historialPrecio);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, historialPrecio.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /historial-precios/:id} : Partial updates given fields of an existing historialPrecio, field will ignore if it is null
     *
     * @param id the id of the historialPrecio to save.
     * @param historialPrecio the historialPrecio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historialPrecio,
     * or with status {@code 400 (Bad Request)} if the historialPrecio is not valid,
     * or with status {@code 404 (Not Found)} if the historialPrecio is not found,
     * or with status {@code 500 (Internal Server Error)} if the historialPrecio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/historial-precios/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<HistorialPrecio> partialUpdateHistorialPrecio(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody HistorialPrecio historialPrecio
    ) throws URISyntaxException {
        log.debug("REST request to partial update HistorialPrecio partially : {}, {}", id, historialPrecio);
        if (historialPrecio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historialPrecio.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!historialPrecioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HistorialPrecio> result = historialPrecioService.partialUpdate(historialPrecio);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, historialPrecio.getId().toString())
        );
    }

    /**
     * {@code GET  /historial-precios} : get all the historialPrecios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of historialPrecios in body.
     */
    @GetMapping("/historial-precios")
    public List<HistorialPrecio> getAllHistorialPrecios() {
        log.debug("REST request to get all HistorialPrecios");
        return historialPrecioService.findAll();
    }

    /**
     * {@code GET  /historial-precios/:id} : get the "id" historialPrecio.
     *
     * @param id the id of the historialPrecio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historialPrecio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/historial-precios/{id}")
    public ResponseEntity<HistorialPrecio> getHistorialPrecio(@PathVariable Long id) {
        log.debug("REST request to get HistorialPrecio : {}", id);
        Optional<HistorialPrecio> historialPrecio = historialPrecioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(historialPrecio);
    }

    /**
     * {@code DELETE  /historial-precios/:id} : delete the "id" historialPrecio.
     *
     * @param id the id of the historialPrecio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/historial-precios/{id}")
    public ResponseEntity<Void> deleteHistorialPrecio(@PathVariable Long id) {
        log.debug("REST request to delete HistorialPrecio : {}", id);
        historialPrecioService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
