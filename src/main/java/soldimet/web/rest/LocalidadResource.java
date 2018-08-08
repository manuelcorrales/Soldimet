package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Localidad;
import soldimet.service.LocalidadService;
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
 * REST controller for managing Localidad.
 */
@RestController
@RequestMapping("/api")
public class LocalidadResource {

    private final Logger log = LoggerFactory.getLogger(LocalidadResource.class);

    private static final String ENTITY_NAME = "localidad";

    private final LocalidadService localidadService;

    public LocalidadResource(LocalidadService localidadService) {
        this.localidadService = localidadService;
    }

    /**
     * POST  /localidads : Create a new localidad.
     *
     * @param localidad the localidad to create
     * @return the ResponseEntity with status 201 (Created) and with body the new localidad, or with status 400 (Bad Request) if the localidad has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/localidads")
    @Timed
    public ResponseEntity<Localidad> createLocalidad(@Valid @RequestBody Localidad localidad) throws URISyntaxException {
        log.debug("REST request to save Localidad : {}", localidad);
        if (localidad.getId() != null) {
            throw new BadRequestAlertException("A new localidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Localidad result = localidadService.save(localidad);
        return ResponseEntity.created(new URI("/api/localidads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /localidads : Updates an existing localidad.
     *
     * @param localidad the localidad to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated localidad,
     * or with status 400 (Bad Request) if the localidad is not valid,
     * or with status 500 (Internal Server Error) if the localidad couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/localidads")
    @Timed
    public ResponseEntity<Localidad> updateLocalidad(@Valid @RequestBody Localidad localidad) throws URISyntaxException {
        log.debug("REST request to update Localidad : {}", localidad);
        if (localidad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Localidad result = localidadService.save(localidad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, localidad.getId().toString()))
            .body(result);
    }

    /**
     * GET  /localidads : get all the localidads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of localidads in body
     */
    @GetMapping("/localidads")
    @Timed
    public List<Localidad> getAllLocalidads() {
        log.debug("REST request to get all Localidads");
        return localidadService.findAll();
    }

    /**
     * GET  /localidads/:id : get the "id" localidad.
     *
     * @param id the id of the localidad to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the localidad, or with status 404 (Not Found)
     */
    @GetMapping("/localidads/{id}")
    @Timed
    public ResponseEntity<Localidad> getLocalidad(@PathVariable Long id) {
        log.debug("REST request to get Localidad : {}", id);
        Optional<Localidad> localidad = localidadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(localidad);
    }

    /**
     * DELETE  /localidads/:id : delete the "id" localidad.
     *
     * @param id the id of the localidad to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/localidads/{id}")
    @Timed
    public ResponseEntity<Void> deleteLocalidad(@PathVariable Long id) {
        log.debug("REST request to delete Localidad : {}", id);
        localidadService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
