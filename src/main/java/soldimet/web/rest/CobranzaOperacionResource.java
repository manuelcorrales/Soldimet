package soldimet.web.rest;

import soldimet.domain.CobranzaOperacion;
import soldimet.service.CobranzaOperacionService;
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
 * REST controller for managing {@link soldimet.domain.CobranzaOperacion}.
 */
@RestController
@RequestMapping("/api")
public class CobranzaOperacionResource {

    private final Logger log = LoggerFactory.getLogger(CobranzaOperacionResource.class);

    private static final String ENTITY_NAME = "cobranzaOperacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CobranzaOperacionService cobranzaOperacionService;

    public CobranzaOperacionResource(CobranzaOperacionService cobranzaOperacionService) {
        this.cobranzaOperacionService = cobranzaOperacionService;
    }

    /**
     * {@code POST  /cobranza-operacions} : Create a new cobranzaOperacion.
     *
     * @param cobranzaOperacion the cobranzaOperacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cobranzaOperacion, or with status {@code 400 (Bad Request)} if the cobranzaOperacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cobranza-operacions")
    public ResponseEntity<CobranzaOperacion> createCobranzaOperacion(@Valid @RequestBody CobranzaOperacion cobranzaOperacion) throws URISyntaxException {
        log.debug("REST request to save CobranzaOperacion : {}", cobranzaOperacion);
        if (cobranzaOperacion.getId() != null) {
            throw new BadRequestAlertException("A new cobranzaOperacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CobranzaOperacion result = cobranzaOperacionService.save(cobranzaOperacion);
        return ResponseEntity.created(new URI("/api/cobranza-operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cobranza-operacions} : Updates an existing cobranzaOperacion.
     *
     * @param cobranzaOperacion the cobranzaOperacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cobranzaOperacion,
     * or with status {@code 400 (Bad Request)} if the cobranzaOperacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cobranzaOperacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cobranza-operacions")
    public ResponseEntity<CobranzaOperacion> updateCobranzaOperacion(@Valid @RequestBody CobranzaOperacion cobranzaOperacion) throws URISyntaxException {
        log.debug("REST request to update CobranzaOperacion : {}", cobranzaOperacion);
        if (cobranzaOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CobranzaOperacion result = cobranzaOperacionService.save(cobranzaOperacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cobranzaOperacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cobranza-operacions} : get all the cobranzaOperacions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cobranzaOperacions in body.
     */
    @GetMapping("/cobranza-operacions")
    public List<CobranzaOperacion> getAllCobranzaOperacions() {
        log.debug("REST request to get all CobranzaOperacions");
        return cobranzaOperacionService.findAll();
    }

    /**
     * {@code GET  /cobranza-operacions/:id} : get the "id" cobranzaOperacion.
     *
     * @param id the id of the cobranzaOperacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cobranzaOperacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cobranza-operacions/{id}")
    public ResponseEntity<CobranzaOperacion> getCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to get CobranzaOperacion : {}", id);
        Optional<CobranzaOperacion> cobranzaOperacion = cobranzaOperacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cobranzaOperacion);
    }

    /**
     * {@code DELETE  /cobranza-operacions/:id} : delete the "id" cobranzaOperacion.
     *
     * @param id the id of the cobranzaOperacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cobranza-operacions/{id}")
    public ResponseEntity<Void> deleteCobranzaOperacion(@PathVariable Long id) {
        log.debug("REST request to delete CobranzaOperacion : {}", id);
        cobranzaOperacionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
