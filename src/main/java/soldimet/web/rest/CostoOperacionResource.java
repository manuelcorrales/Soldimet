package soldimet.web.rest;

import soldimet.domain.CostoOperacion;
import soldimet.service.CostoOperacionService;
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
 * REST controller for managing {@link soldimet.domain.CostoOperacion}.
 */
@RestController
@RequestMapping("/api")
public class CostoOperacionResource {

    private final Logger log = LoggerFactory.getLogger(CostoOperacionResource.class);

    private static final String ENTITY_NAME = "costoOperacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CostoOperacionService costoOperacionService;

    public CostoOperacionResource(CostoOperacionService costoOperacionService) {
        this.costoOperacionService = costoOperacionService;
    }

    /**
     * {@code POST  /costo-operacions} : Create a new costoOperacion.
     *
     * @param costoOperacion the costoOperacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new costoOperacion, or with status {@code 400 (Bad Request)} if the costoOperacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/costo-operacions")
    public ResponseEntity<CostoOperacion> createCostoOperacion(@Valid @RequestBody CostoOperacion costoOperacion) throws URISyntaxException {
        log.debug("REST request to save CostoOperacion : {}", costoOperacion);
        if (costoOperacion.getId() != null) {
            throw new BadRequestAlertException("A new costoOperacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CostoOperacion result = costoOperacionService.save(costoOperacion);
        return ResponseEntity.created(new URI("/api/costo-operacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /costo-operacions} : Updates an existing costoOperacion.
     *
     * @param costoOperacion the costoOperacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated costoOperacion,
     * or with status {@code 400 (Bad Request)} if the costoOperacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the costoOperacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/costo-operacions")
    public ResponseEntity<CostoOperacion> updateCostoOperacion(@Valid @RequestBody CostoOperacion costoOperacion) throws URISyntaxException {
        log.debug("REST request to update CostoOperacion : {}", costoOperacion);
        if (costoOperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CostoOperacion result = costoOperacionService.save(costoOperacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, costoOperacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /costo-operacions} : get all the costoOperacions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of costoOperacions in body.
     */
    @GetMapping("/costo-operacions")
    public List<CostoOperacion> getAllCostoOperacions() {
        log.debug("REST request to get all CostoOperacions");
        return costoOperacionService.findAll();
    }

    /**
     * {@code GET  /costo-operacions/:id} : get the "id" costoOperacion.
     *
     * @param id the id of the costoOperacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the costoOperacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/costo-operacions/{id}")
    public ResponseEntity<CostoOperacion> getCostoOperacion(@PathVariable Long id) {
        log.debug("REST request to get CostoOperacion : {}", id);
        Optional<CostoOperacion> costoOperacion = costoOperacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(costoOperacion);
    }

    /**
     * {@code DELETE  /costo-operacions/:id} : delete the "id" costoOperacion.
     *
     * @param id the id of the costoOperacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/costo-operacions/{id}")
    public ResponseEntity<Void> deleteCostoOperacion(@PathVariable Long id) {
        log.debug("REST request to delete CostoOperacion : {}", id);
        costoOperacionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
