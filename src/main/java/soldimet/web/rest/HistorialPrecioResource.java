package soldimet.web.rest;

import soldimet.domain.HistorialPrecio;
import soldimet.service.HistorialPrecioService;
import soldimet.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

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

    public HistorialPrecioResource(HistorialPrecioService historialPrecioService) {
        this.historialPrecioService = historialPrecioService;
    }

    /**
     * {@code POST  /historial-precios} : Create a new historialPrecio.
     *
     * @param historialPrecio the historialPrecio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historialPrecio, or with status {@code 400 (Bad Request)} if the historialPrecio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historial-precios")
    public ResponseEntity<HistorialPrecio> createHistorialPrecio(@Valid @RequestBody HistorialPrecio historialPrecio) throws URISyntaxException {
        log.debug("REST request to save HistorialPrecio : {}", historialPrecio);
        if (historialPrecio.getId() != null) {
            throw new BadRequestAlertException("A new historialPrecio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistorialPrecio result = historialPrecioService.save(historialPrecio);
        return ResponseEntity.created(new URI("/api/historial-precios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /historial-precios} : Updates an existing historialPrecio.
     *
     * @param historialPrecio the historialPrecio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historialPrecio,
     * or with status {@code 400 (Bad Request)} if the historialPrecio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historialPrecio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historial-precios")
    public ResponseEntity<HistorialPrecio> updateHistorialPrecio(@Valid @RequestBody HistorialPrecio historialPrecio) throws URISyntaxException {
        log.debug("REST request to update HistorialPrecio : {}", historialPrecio);
        if (historialPrecio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistorialPrecio result = historialPrecioService.save(historialPrecio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, historialPrecio.getId().toString()))
            .body(result);
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
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
