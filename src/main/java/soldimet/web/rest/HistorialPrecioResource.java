package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.HistorialPrecio;
import soldimet.service.HistorialPrecioService;
import soldimet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HistorialPrecio.
 */
@RestController
@RequestMapping("/api")
public class HistorialPrecioResource {

    private final Logger log = LoggerFactory.getLogger(HistorialPrecioResource.class);

    private static final String ENTITY_NAME = "historialPrecio";

    private final HistorialPrecioService historialPrecioService;

    public HistorialPrecioResource(HistorialPrecioService historialPrecioService) {
        this.historialPrecioService = historialPrecioService;
    }

    /**
     * POST  /historial-precios : Create a new historialPrecio.
     *
     * @param historialPrecio the historialPrecio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new historialPrecio, or with status 400 (Bad Request) if the historialPrecio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/historial-precios")
    @Timed
    public ResponseEntity<HistorialPrecio> createHistorialPrecio(@Valid @RequestBody HistorialPrecio historialPrecio) throws URISyntaxException {
        log.debug("REST request to save HistorialPrecio : {}", historialPrecio);
        if (historialPrecio.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new historialPrecio cannot already have an ID")).body(null);
        }
        HistorialPrecio result = historialPrecioService.save(historialPrecio);
        return ResponseEntity.created(new URI("/api/historial-precios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /historial-precios : Updates an existing historialPrecio.
     *
     * @param historialPrecio the historialPrecio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated historialPrecio,
     * or with status 400 (Bad Request) if the historialPrecio is not valid,
     * or with status 500 (Internal Server Error) if the historialPrecio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/historial-precios")
    @Timed
    public ResponseEntity<HistorialPrecio> updateHistorialPrecio(@Valid @RequestBody HistorialPrecio historialPrecio) throws URISyntaxException {
        log.debug("REST request to update HistorialPrecio : {}", historialPrecio);
        if (historialPrecio.getId() == null) {
            return createHistorialPrecio(historialPrecio);
        }
        HistorialPrecio result = historialPrecioService.save(historialPrecio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, historialPrecio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /historial-precios : get all the historialPrecios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of historialPrecios in body
     */
    @GetMapping("/historial-precios")
    @Timed
    public List<HistorialPrecio> getAllHistorialPrecios() {
        log.debug("REST request to get all HistorialPrecios");
        return historialPrecioService.findAll();
        }

    /**
     * GET  /historial-precios/:id : get the "id" historialPrecio.
     *
     * @param id the id of the historialPrecio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the historialPrecio, or with status 404 (Not Found)
     */
    @GetMapping("/historial-precios/{id}")
    @Timed
    public ResponseEntity<HistorialPrecio> getHistorialPrecio(@PathVariable Long id) {
        log.debug("REST request to get HistorialPrecio : {}", id);
        HistorialPrecio historialPrecio = historialPrecioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(historialPrecio));
    }

    /**
     * DELETE  /historial-precios/:id : delete the "id" historialPrecio.
     *
     * @param id the id of the historialPrecio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/historial-precios/{id}")
    @Timed
    public ResponseEntity<Void> deleteHistorialPrecio(@PathVariable Long id) {
        log.debug("REST request to delete HistorialPrecio : {}", id);
        historialPrecioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
