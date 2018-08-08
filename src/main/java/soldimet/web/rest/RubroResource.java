package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Rubro;
import soldimet.service.RubroService;
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
 * REST controller for managing Rubro.
 */
@RestController
@RequestMapping("/api")
public class RubroResource {

    private final Logger log = LoggerFactory.getLogger(RubroResource.class);

    private static final String ENTITY_NAME = "rubro";

    private final RubroService rubroService;

    public RubroResource(RubroService rubroService) {
        this.rubroService = rubroService;
    }

    /**
     * POST  /rubros : Create a new rubro.
     *
     * @param rubro the rubro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rubro, or with status 400 (Bad Request) if the rubro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rubros")
    @Timed
    public ResponseEntity<Rubro> createRubro(@Valid @RequestBody Rubro rubro) throws URISyntaxException {
        log.debug("REST request to save Rubro : {}", rubro);
        if (rubro.getId() != null) {
            throw new BadRequestAlertException("A new rubro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rubro result = rubroService.save(rubro);
        return ResponseEntity.created(new URI("/api/rubros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rubros : Updates an existing rubro.
     *
     * @param rubro the rubro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rubro,
     * or with status 400 (Bad Request) if the rubro is not valid,
     * or with status 500 (Internal Server Error) if the rubro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rubros")
    @Timed
    public ResponseEntity<Rubro> updateRubro(@Valid @RequestBody Rubro rubro) throws URISyntaxException {
        log.debug("REST request to update Rubro : {}", rubro);
        if (rubro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Rubro result = rubroService.save(rubro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rubro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rubros : get all the rubros.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rubros in body
     */
    @GetMapping("/rubros")
    @Timed
    public List<Rubro> getAllRubros() {
        log.debug("REST request to get all Rubros");
        return rubroService.findAll();
    }

    /**
     * GET  /rubros/:id : get the "id" rubro.
     *
     * @param id the id of the rubro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rubro, or with status 404 (Not Found)
     */
    @GetMapping("/rubros/{id}")
    @Timed
    public ResponseEntity<Rubro> getRubro(@PathVariable Long id) {
        log.debug("REST request to get Rubro : {}", id);
        Optional<Rubro> rubro = rubroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rubro);
    }

    /**
     * DELETE  /rubros/:id : delete the "id" rubro.
     *
     * @param id the id of the rubro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rubros/{id}")
    @Timed
    public ResponseEntity<Void> deleteRubro(@PathVariable Long id) {
        log.debug("REST request to delete Rubro : {}", id);
        rubroService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
