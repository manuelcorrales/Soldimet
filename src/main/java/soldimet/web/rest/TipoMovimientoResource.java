package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.TipoMovimiento;
import soldimet.service.TipoMovimientoService;
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
 * REST controller for managing TipoMovimiento.
 */
@RestController
@RequestMapping("/api")
public class TipoMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(TipoMovimientoResource.class);

    private static final String ENTITY_NAME = "tipoMovimiento";

    private final TipoMovimientoService tipoMovimientoService;

    public TipoMovimientoResource(TipoMovimientoService tipoMovimientoService) {
        this.tipoMovimientoService = tipoMovimientoService;
    }

    /**
     * POST  /tipo-movimientos : Create a new tipoMovimiento.
     *
     * @param tipoMovimiento the tipoMovimiento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoMovimiento, or with status 400 (Bad Request) if the tipoMovimiento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-movimientos")
    @Timed
    public ResponseEntity<TipoMovimiento> createTipoMovimiento(@Valid @RequestBody TipoMovimiento tipoMovimiento) throws URISyntaxException {
        log.debug("REST request to save TipoMovimiento : {}", tipoMovimiento);
        if (tipoMovimiento.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tipoMovimiento cannot already have an ID")).body(null);
        }
        TipoMovimiento result = tipoMovimientoService.save(tipoMovimiento);
        return ResponseEntity.created(new URI("/api/tipo-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-movimientos : Updates an existing tipoMovimiento.
     *
     * @param tipoMovimiento the tipoMovimiento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoMovimiento,
     * or with status 400 (Bad Request) if the tipoMovimiento is not valid,
     * or with status 500 (Internal Server Error) if the tipoMovimiento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-movimientos")
    @Timed
    public ResponseEntity<TipoMovimiento> updateTipoMovimiento(@Valid @RequestBody TipoMovimiento tipoMovimiento) throws URISyntaxException {
        log.debug("REST request to update TipoMovimiento : {}", tipoMovimiento);
        if (tipoMovimiento.getId() == null) {
            return createTipoMovimiento(tipoMovimiento);
        }
        TipoMovimiento result = tipoMovimientoService.save(tipoMovimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-movimientos : get all the tipoMovimientos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoMovimientos in body
     */
    @GetMapping("/tipo-movimientos")
    @Timed
    public List<TipoMovimiento> getAllTipoMovimientos() {
        log.debug("REST request to get all TipoMovimientos");
        return tipoMovimientoService.findAll();
        }

    /**
     * GET  /tipo-movimientos/:id : get the "id" tipoMovimiento.
     *
     * @param id the id of the tipoMovimiento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoMovimiento, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-movimientos/{id}")
    @Timed
    public ResponseEntity<TipoMovimiento> getTipoMovimiento(@PathVariable Long id) {
        log.debug("REST request to get TipoMovimiento : {}", id);
        TipoMovimiento tipoMovimiento = tipoMovimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipoMovimiento));
    }

    /**
     * DELETE  /tipo-movimientos/:id : delete the "id" tipoMovimiento.
     *
     * @param id the id of the tipoMovimiento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-movimientos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete TipoMovimiento : {}", id);
        tipoMovimientoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
