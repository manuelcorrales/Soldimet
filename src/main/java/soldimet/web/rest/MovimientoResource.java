package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Movimiento;
import soldimet.service.MovimientoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import soldimet.web.rest.util.HeaderUtil;
import soldimet.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Movimiento.
 */
@RestController
@RequestMapping("/api")
public class MovimientoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoResource.class);

    private static final String ENTITY_NAME = "movimiento";

    private final MovimientoService movimientoService;

    public MovimientoResource(MovimientoService movimientoService) {
        this.movimientoService = movimientoService;
    }

    /**
     * POST  /movimientos : Create a new movimiento.
     *
     * @param movimiento the movimiento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movimiento, or with status 400 (Bad Request) if the movimiento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movimientos")
    @Timed
    public ResponseEntity<Movimiento> createMovimiento(@Valid @RequestBody Movimiento movimiento) throws URISyntaxException {
        log.debug("REST request to save Movimiento : {}", movimiento);
        if (movimiento.getId() != null) {
            throw new BadRequestAlertException("A new movimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Movimiento result = movimientoService.save(movimiento);
        return ResponseEntity.created(new URI("/api/movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movimientos : Updates an existing movimiento.
     *
     * @param movimiento the movimiento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movimiento,
     * or with status 400 (Bad Request) if the movimiento is not valid,
     * or with status 500 (Internal Server Error) if the movimiento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movimientos")
    @Timed
    public ResponseEntity<Movimiento> updateMovimiento(@Valid @RequestBody Movimiento movimiento) throws URISyntaxException {
        log.debug("REST request to update Movimiento : {}", movimiento);
        if (movimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Movimiento result = movimientoService.save(movimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movimiento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movimientos : get all the movimientos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of movimientos in body
     */
    @GetMapping("/movimientos")
    @Timed
    public ResponseEntity<List<Movimiento>> getAllMovimientos(Pageable pageable) {
        log.debug("REST request to get a page of Movimientos");
        Page<Movimiento> page = movimientoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/movimientos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /movimientos/:id : get the "id" movimiento.
     *
     * @param id the id of the movimiento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movimiento, or with status 404 (Not Found)
     */
    @GetMapping("/movimientos/{id}")
    @Timed
    public ResponseEntity<Movimiento> getMovimiento(@PathVariable Long id) {
        log.debug("REST request to get Movimiento : {}", id);
        Optional<Movimiento> movimiento = movimientoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movimiento);
    }

    /**
     * DELETE  /movimientos/:id : delete the "id" movimiento.
     *
     * @param id the id of the movimiento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movimientos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete Movimiento : {}", id);
        movimientoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
