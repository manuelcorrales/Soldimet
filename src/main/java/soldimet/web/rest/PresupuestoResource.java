package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Presupuesto;
import soldimet.service.PresupuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import soldimet.web.rest.util.HeaderUtil;
import soldimet.web.rest.util.PaginationUtil;
import soldimet.service.dto.PresupuestoCriteria;
import soldimet.service.PresupuestoQueryService;
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
 * REST controller for managing Presupuesto.
 */
@RestController
@RequestMapping("/api")
public class PresupuestoResource {

    private final Logger log = LoggerFactory.getLogger(PresupuestoResource.class);

    private static final String ENTITY_NAME = "presupuesto";

    private final PresupuestoService presupuestoService;

    private final PresupuestoQueryService presupuestoQueryService;

    public PresupuestoResource(PresupuestoService presupuestoService, PresupuestoQueryService presupuestoQueryService) {
        this.presupuestoService = presupuestoService;
        this.presupuestoQueryService = presupuestoQueryService;
    }

    /**
     * POST  /presupuestos : Create a new presupuesto.
     *
     * @param presupuesto the presupuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new presupuesto, or with status 400 (Bad Request) if the presupuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/presupuestos")
    @Timed
    public ResponseEntity<Presupuesto> createPresupuesto(@Valid @RequestBody Presupuesto presupuesto) throws URISyntaxException {
        log.debug("REST request to save Presupuesto : {}", presupuesto);
        if (presupuesto.getId() != null) {
            throw new BadRequestAlertException("A new presupuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Presupuesto result = presupuestoService.save(presupuesto);
        return ResponseEntity.created(new URI("/api/presupuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /presupuestos : Updates an existing presupuesto.
     *
     * @param presupuesto the presupuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated presupuesto,
     * or with status 400 (Bad Request) if the presupuesto is not valid,
     * or with status 500 (Internal Server Error) if the presupuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/presupuestos")
    @Timed
    public ResponseEntity<Presupuesto> updatePresupuesto(@Valid @RequestBody Presupuesto presupuesto) throws URISyntaxException {
        log.debug("REST request to update Presupuesto : {}", presupuesto);
        if (presupuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Presupuesto result = presupuestoService.save(presupuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, presupuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /presupuestos : get all the presupuestos.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of presupuestos in body
     */
    @GetMapping("/presupuestos")
    @Timed
    public ResponseEntity<List<Presupuesto>> getAllPresupuestos(PresupuestoCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Presupuestos by criteria: {}", criteria);
        Page<Presupuesto> page = presupuestoQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/presupuestos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /presupuestos/:id : get the "id" presupuesto.
     *
     * @param id the id of the presupuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the presupuesto, or with status 404 (Not Found)
     */
    @GetMapping("/presupuestos/{id}")
    @Timed
    public ResponseEntity<Presupuesto> getPresupuesto(@PathVariable Long id) {
        log.debug("REST request to get Presupuesto : {}", id);
        Optional<Presupuesto> presupuesto = presupuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(presupuesto);
    }

    /**
     * DELETE  /presupuestos/:id : delete the "id" presupuesto.
     *
     * @param id the id of the presupuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/presupuestos/{id}")
    @Timed
    public ResponseEntity<Void> deletePresupuesto(@PathVariable Long id) {
        log.debug("REST request to delete Presupuesto : {}", id);
        presupuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
