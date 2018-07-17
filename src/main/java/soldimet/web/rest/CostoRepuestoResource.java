package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.CostoRepuesto;
import soldimet.service.CostoRepuestoService;
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
 * REST controller for managing CostoRepuesto.
 */
@RestController
@RequestMapping("/api")
public class CostoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(CostoRepuestoResource.class);

    private static final String ENTITY_NAME = "costoRepuesto";

    private final CostoRepuestoService costoRepuestoService;

    public CostoRepuestoResource(CostoRepuestoService costoRepuestoService) {
        this.costoRepuestoService = costoRepuestoService;
    }

    /**
     * POST  /costo-repuestos : Create a new costoRepuesto.
     *
     * @param costoRepuesto the costoRepuesto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new costoRepuesto, or with status 400 (Bad Request) if the costoRepuesto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/costo-repuestos")
    @Timed
    public ResponseEntity<CostoRepuesto> createCostoRepuesto(@Valid @RequestBody CostoRepuesto costoRepuesto) throws URISyntaxException {
        log.debug("REST request to save CostoRepuesto : {}", costoRepuesto);
        if (costoRepuesto.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new costoRepuesto cannot already have an ID")).body(null);
        }
        CostoRepuesto result = costoRepuestoService.save(costoRepuesto);
        return ResponseEntity.created(new URI("/api/costo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /costo-repuestos : Updates an existing costoRepuesto.
     *
     * @param costoRepuesto the costoRepuesto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated costoRepuesto,
     * or with status 400 (Bad Request) if the costoRepuesto is not valid,
     * or with status 500 (Internal Server Error) if the costoRepuesto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/costo-repuestos")
    @Timed
    public ResponseEntity<CostoRepuesto> updateCostoRepuesto(@Valid @RequestBody CostoRepuesto costoRepuesto) throws URISyntaxException {
        log.debug("REST request to update CostoRepuesto : {}", costoRepuesto);
        if (costoRepuesto.getId() == null) {
            return createCostoRepuesto(costoRepuesto);
        }
        CostoRepuesto result = costoRepuestoService.save(costoRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, costoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /costo-repuestos : get all the costoRepuestos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of costoRepuestos in body
     */
    @GetMapping("/costo-repuestos")
    @Timed
    public List<CostoRepuesto> getAllCostoRepuestos() {
        log.debug("REST request to get all CostoRepuestos");
        return costoRepuestoService.findAll();
        }

    /**
     * GET  /costo-repuestos/:id : get the "id" costoRepuesto.
     *
     * @param id the id of the costoRepuesto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the costoRepuesto, or with status 404 (Not Found)
     */
    @GetMapping("/costo-repuestos/{id}")
    @Timed
    public ResponseEntity<CostoRepuesto> getCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get CostoRepuesto : {}", id);
        CostoRepuesto costoRepuesto = costoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(costoRepuesto));
    }

    /**
     * DELETE  /costo-repuestos/:id : delete the "id" costoRepuesto.
     *
     * @param id the id of the costoRepuesto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/costo-repuestos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete CostoRepuesto : {}", id);
        costoRepuestoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
