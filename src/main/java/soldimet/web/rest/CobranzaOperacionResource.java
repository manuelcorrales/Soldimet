package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.CobranzaOperacion;
import soldimet.service.CobranzaOperacionService;
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
 * REST controller for managing CobranzaOperacion.
 */
@RestController
@RequestMapping("/api")
public class CobranzaOperacionResource {

    private final Logger log = LoggerFactory.getLogger(CobranzaOperacionResource.class);

    private static final String ENTITY_NAME = "cobranzaOperacion";

    private final CobranzaOperacionService cobranzaOperacionService;

    public CobranzaOperacionResource(CobranzaOperacionService cobranzaOperacionService) {
        this.cobranzaOperacionService = cobranzaOperacionService;
    }

    /**
     * POST  /cobranza-operacions : Create a new cobranzaOperacion.
     *
     * @param cobranzaOperacion the cobranzaOperacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cobranzaOperacion, or with status 400 (Bad Request) if the cobranzaOperacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cobranza-operacions")
    @Timed
    public ResponseEntity<CobranzaOperacion> createCobranzaOperacion(@Valid @RequestBody CobranzaOperacion cobranzaOperacion) throws URISyntaxException {
        log.debug("REST request to save CobranzaOperacion : {}", cobranzaOperacion);
        if (cobranzaOperacion.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new cobranzaOperacion cannot already have an ID")).body(null);
        }
        CobranzaOperacion result = cobranzaOperacionService.save(cobranzaOperacion);
        return ResponseEntity.created(new URI("/api/cobranza-operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cobranza-operacions : Updates an existing cobranzaOperacion.
     *
     * @param cobranzaOperacion the cobranzaOperacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cobranzaOperacion,
     * or with status 400 (Bad Request) if the cobranzaOperacion is not valid,
     * or with status 500 (Internal Server Error) if the cobranzaOperacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cobranza-operacions")
    @Timed
    public ResponseEntity<CobranzaOperacion> updateCobranzaOperacion(@Valid @RequestBody CobranzaOperacion cobranzaOperacion) throws URISyntaxException {
        log.debug("REST request to update CobranzaOperacion : {}", cobranzaOperacion);
        if (cobranzaOperacion.getId() == null) {
            return createCobranzaOperacion(cobranzaOperacion);
        }
        CobranzaOperacion result = cobranzaOperacionService.save(cobranzaOperacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cobranzaOperacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cobranza-operacions : get all the cobranzaOperacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cobranzaOperacions in body
     */
    @GetMapping("/cobranza-operacions")
    @Timed
    public List<CobranzaOperacion> getAllCobranzaOperacions() {
        log.debug("REST request to get all CobranzaOperacions");
        return cobranzaOperacionService.findAll();
        }

    /**
     * GET  /cobranza-operacions/:id : get the "id" cobranzaOperacion.
     *
     * @param id the id of the cobranzaOperacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cobranzaOperacion, or with status 404 (Not Found)
     */
    @GetMapping("/cobranza-operacions/{id}")
    @Timed
    public ResponseEntity<CobranzaOperacion> getCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to get CobranzaOperacion : {}", id);
        CobranzaOperacion cobranzaOperacion = cobranzaOperacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cobranzaOperacion));
    }

    /**
     * DELETE  /cobranza-operacions/:id : delete the "id" cobranzaOperacion.
     *
     * @param id the id of the cobranzaOperacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cobranza-operacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to delete CobranzaOperacion : {}", id);
        cobranzaOperacionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
