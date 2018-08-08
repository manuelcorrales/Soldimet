package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.EstadoMovimiento;
import soldimet.service.EstadoMovimientoService;
import soldimet.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing EstadoMovimiento.
 */
@RestController
@RequestMapping("/api")
public class EstadoMovimientoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoMovimientoResource.class);

    private static final String ENTITY_NAME = "estadoMovimiento";

    private final EstadoMovimientoService estadoMovimientoService;

    public EstadoMovimientoResource(EstadoMovimientoService estadoMovimientoService) {
        this.estadoMovimientoService = estadoMovimientoService;
    }

    /**
     * POST  /estado-movimientos : Create a new estadoMovimiento.
     *
     * @param estadoMovimiento the estadoMovimiento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estadoMovimiento, or with status 400 (Bad Request) if the estadoMovimiento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estado-movimientos")
    @Timed
    public ResponseEntity<EstadoMovimiento> createEstadoMovimiento(@Valid @RequestBody EstadoMovimiento estadoMovimiento) throws URISyntaxException {
        log.debug("REST request to save EstadoMovimiento : {}", estadoMovimiento);
        if (estadoMovimiento.getId() != null) {
            throw new BadRequestAlertException("A new estadoMovimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoMovimiento result = estadoMovimientoService.save(estadoMovimiento);
        return ResponseEntity.created(new URI("/api/estado-movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estado-movimientos : Updates an existing estadoMovimiento.
     *
     * @param estadoMovimiento the estadoMovimiento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estadoMovimiento,
     * or with status 400 (Bad Request) if the estadoMovimiento is not valid,
     * or with status 500 (Internal Server Error) if the estadoMovimiento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estado-movimientos")
    @Timed
    public ResponseEntity<EstadoMovimiento> updateEstadoMovimiento(@Valid @RequestBody EstadoMovimiento estadoMovimiento) throws URISyntaxException {
        log.debug("REST request to update EstadoMovimiento : {}", estadoMovimiento);
        if (estadoMovimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoMovimiento result = estadoMovimientoService.save(estadoMovimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estadoMovimiento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estado-movimientos : get all the estadoMovimientos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estadoMovimientos in body
     */
    @GetMapping("/estado-movimientos")
    @Timed
    public List<EstadoMovimiento> getAllEstadoMovimientos() {
        log.debug("REST request to get all EstadoMovimientos");
        return estadoMovimientoService.findAll();
    }

    /**
     * GET  /estado-movimientos/:id : get the "id" estadoMovimiento.
     *
     * @param id the id of the estadoMovimiento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estadoMovimiento, or with status 404 (Not Found)
     */
    @GetMapping("/estado-movimientos/{id}")
    @Timed
    public ResponseEntity<EstadoMovimiento> getEstadoMovimiento(@PathVariable Long id) {
        log.debug("REST request to get EstadoMovimiento : {}", id);
        Optional<EstadoMovimiento> estadoMovimiento = estadoMovimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(estadoMovimiento);
    }

    /**
     * DELETE  /estado-movimientos/:id : delete the "id" estadoMovimiento.
     *
     * @param id the id of the estadoMovimiento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estado-movimientos/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstadoMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete EstadoMovimiento : {}", id);
        estadoMovimientoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
