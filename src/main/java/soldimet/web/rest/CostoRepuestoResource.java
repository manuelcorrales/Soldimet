package soldimet.web.rest;

import soldimet.domain.CostoRepuesto;
import soldimet.service.CostoRepuestoService;
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
 * REST controller for managing {@link soldimet.domain.CostoRepuesto}.
 */
@RestController
@RequestMapping("/api")
public class CostoRepuestoResource {

    private final Logger log = LoggerFactory.getLogger(CostoRepuestoResource.class);

    private static final String ENTITY_NAME = "costoRepuesto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CostoRepuestoService costoRepuestoService;

    public CostoRepuestoResource(CostoRepuestoService costoRepuestoService) {
        this.costoRepuestoService = costoRepuestoService;
    }

    /**
     * {@code POST  /costo-repuestos} : Create a new costoRepuesto.
     *
     * @param costoRepuesto the costoRepuesto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new costoRepuesto, or with status {@code 400 (Bad Request)} if the costoRepuesto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/costo-repuestos")
    public ResponseEntity<CostoRepuesto> createCostoRepuesto(@Valid @RequestBody CostoRepuesto costoRepuesto) throws URISyntaxException {
        log.debug("REST request to save CostoRepuesto : {}", costoRepuesto);
        if (costoRepuesto.getId() != null) {
            throw new BadRequestAlertException("A new costoRepuesto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CostoRepuesto result = costoRepuestoService.save(costoRepuesto);
        return ResponseEntity.created(new URI("/api/costo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /costo-repuestos} : Updates an existing costoRepuesto.
     *
     * @param costoRepuesto the costoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated costoRepuesto,
     * or with status {@code 400 (Bad Request)} if the costoRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the costoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/costo-repuestos")
    public ResponseEntity<CostoRepuesto> updateCostoRepuesto(@Valid @RequestBody CostoRepuesto costoRepuesto) throws URISyntaxException {
        log.debug("REST request to update CostoRepuesto : {}", costoRepuesto);
        if (costoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CostoRepuesto result = costoRepuestoService.save(costoRepuesto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, costoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /costo-repuestos} : get all the costoRepuestos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of costoRepuestos in body.
     */
    @GetMapping("/costo-repuestos")
    public List<CostoRepuesto> getAllCostoRepuestos() {
        log.debug("REST request to get all CostoRepuestos");
        return costoRepuestoService.findAll();
    }

    /**
     * {@code GET  /costo-repuestos/:id} : get the "id" costoRepuesto.
     *
     * @param id the id of the costoRepuesto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the costoRepuesto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/costo-repuestos/{id}")
    public ResponseEntity<CostoRepuesto> getCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to get CostoRepuesto : {}", id);
        Optional<CostoRepuesto> costoRepuesto = costoRepuestoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(costoRepuesto);
    }

    /**
     * {@code DELETE  /costo-repuestos/:id} : delete the "id" costoRepuesto.
     *
     * @param id the id of the costoRepuesto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/costo-repuestos/{id}")
    public ResponseEntity<Void> deleteCostoRepuesto(@PathVariable Long id) {
        log.debug("REST request to delete CostoRepuesto : {}", id);
        costoRepuestoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
