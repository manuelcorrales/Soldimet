package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.CobranzaRepuesto;
import soldimet.service.CobranzaRepuestoService;
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
 * REST controller for managing CobranzaRepuesto.
 */
@RestController
@RequestMapping("/api")
public class CobranzaRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(CobranzaRepuestoResource.class);

    private static final String ENTITY_NAME = "cobranzaRepuesto";

    private final CobranzaRepuestoService cobranzaRepuestoService;

    public CobranzaRepuestoResource(CobranzaRepuestoService cobranzaRepuestoService) {
        this.cobranzaRepuestoService = cobranzaRepuestoService;
    }

    /**
     * POST  /cobranza-repuestos : Create a new cobranzaRepuesto.
     *
     * @param cobranzaRepuesto the cobranzaRepuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cobranzaRepuesto, or with status 400 (Bad Request) if the cobranzaRepuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cobranza-repuestos")
    @Timed
    public ResponseEntity<CobranzaRepuesto> createCobranzaRepuesto(@Valid @RequestBody CobranzaRepuesto cobranzaRepuesto) throws URISyntaxException {
        log.debug("REST request to save CobranzaRepuesto : {}", cobranzaRepuesto);
        if (cobranzaRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new cobranzaRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CobranzaRepuesto result = cobranzaRepuestoService.save(cobranzaRepuesto);
        return ResponseEntity.created(new URI("/api/cobranza-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cobranza-repuestos : Updates an existing cobranzaRepuesto.
     *
     * @param cobranzaRepuesto the cobranzaRepuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cobranzaRepuesto,
     * or with status 400 (Bad Request) if the cobranzaRepuesto is not valid,
     * or with status 500 (Internal Server Error) if the cobranzaRepuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cobranza-repuestos")
    @Timed
    public ResponseEntity<CobranzaRepuesto> updateCobranzaRepuesto(@Valid @RequestBody CobranzaRepuesto cobranzaRepuesto) throws URISyntaxException {
        log.debug("REST request to update CobranzaRepuesto : {}", cobranzaRepuesto);
        if (cobranzaRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CobranzaRepuesto result = cobranzaRepuestoService.save(cobranzaRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cobranzaRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cobranza-repuestos : get all the cobranzaRepuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cobranzaRepuestos in body
     */
    @GetMapping("/cobranza-repuestos")
    @Timed
    public List<CobranzaRepuesto> getAllCobranzaRepuestos() {
        log.debug("REST request to get all CobranzaRepuestos");
        return cobranzaRepuestoService.findAll();
    }

    /**
     * GET  /cobranza-repuestos/:id : get the "id" cobranzaRepuesto.
     *
     * @param id the id of the cobranzaRepuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cobranzaRepuesto, or with status 404 (Not Found)
     */
    @GetMapping("/cobranza-repuestos/{id}")
    @Timed
    public ResponseEntity<CobranzaRepuesto> getCobranzaRepuesto(@PathVariable Long id) {
        log.debug("REST request to get CobranzaRepuesto : {}", id);
        Optional<CobranzaRepuesto> cobranzaRepuesto = cobranzaRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cobranzaRepuesto);
    }

    /**
     * DELETE  /cobranza-repuestos/:id : delete the "id" cobranzaRepuesto.
     *
     * @param id the id of the cobranzaRepuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cobranza-repuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCobranzaRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete CobranzaRepuesto : {}", id);
        cobranzaRepuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
