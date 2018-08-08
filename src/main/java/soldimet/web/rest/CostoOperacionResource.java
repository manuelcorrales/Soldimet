package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.CostoOperacion;
import soldimet.service.CostoOperacionService;
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
 * REST controller for managing CostoOperacion.
 */
@RestController
@RequestMapping("/api")
public class CostoOperacionResource {

    private final Logger log = LoggerFactory.getLogger(CostoOperacionResource.class);

    private static final String ENTITY_NAME = "costoOperacion";

    private final CostoOperacionService costoOperacionService;

    public CostoOperacionResource(CostoOperacionService costoOperacionService) {
        this.costoOperacionService = costoOperacionService;
    }

    /**
     * POST  /costo-operacions : Create a new costoOperacion.
     *
     * @param costoOperacion the costoOperacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new costoOperacion, or with status 400 (Bad Request) if the costoOperacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/costo-operacions")
    @Timed
    public ResponseEntity<CostoOperacion> createCostoOperacion(@Valid @RequestBody CostoOperacion costoOperacion) throws URISyntaxException {
        log.debug("REST request to save CostoOperacion : {}", costoOperacion);
        if (costoOperacion.getId() != null) {
            throw new BadRequestAlertException("A new costoOperacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CostoOperacion result = costoOperacionService.save(costoOperacion);
        return ResponseEntity.created(new URI("/api/costo-operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /costo-operacions : Updates an existing costoOperacion.
     *
     * @param costoOperacion the costoOperacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated costoOperacion,
     * or with status 400 (Bad Request) if the costoOperacion is not valid,
     * or with status 500 (Internal Server Error) if the costoOperacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/costo-operacions")
    @Timed
    public ResponseEntity<CostoOperacion> updateCostoOperacion(@Valid @RequestBody CostoOperacion costoOperacion) throws URISyntaxException {
        log.debug("REST request to update CostoOperacion : {}", costoOperacion);
        if (costoOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CostoOperacion result = costoOperacionService.save(costoOperacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, costoOperacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /costo-operacions : get all the costoOperacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of costoOperacions in body
     */
    @GetMapping("/costo-operacions")
    @Timed
    public List<CostoOperacion> getAllCostoOperacions() {
        log.debug("REST request to get all CostoOperacions");
        return costoOperacionService.findAll();
    }

    /**
     * GET  /costo-operacions/:id : get the "id" costoOperacion.
     *
     * @param id the id of the costoOperacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the costoOperacion, or with status 404 (Not Found)
     */
    @GetMapping("/costo-operacions/{id}")
    @Timed
    public ResponseEntity<CostoOperacion> getCostoOperacion(@PathVariable Long id) {
        log.debug("REST request to get CostoOperacion : {}", id);
        Optional<CostoOperacion> costoOperacion = costoOperacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(costoOperacion);
    }

    /**
     * DELETE  /costo-operacions/:id : delete the "id" costoOperacion.
     *
     * @param id the id of the costoOperacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/costo-operacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCostoOperacion(@PathVariable Long id) {
        log.debug("REST request to delete CostoOperacion : {}", id);
        costoOperacionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
