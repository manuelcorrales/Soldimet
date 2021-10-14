package soldimet.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.CostoRepuesto;
import soldimet.repository.CostoRepuestoRepository;
import soldimet.service.CostoRepuestoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

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

    private final CostoRepuestoRepository costoRepuestoRepository;

    public CostoRepuestoResource(CostoRepuestoService costoRepuestoService, CostoRepuestoRepository costoRepuestoRepository) {
        this.costoRepuestoService = costoRepuestoService;
        this.costoRepuestoRepository = costoRepuestoRepository;
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
        return ResponseEntity
            .created(new URI("/api/costo-repuestos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /costo-repuestos/:id} : Updates an existing costoRepuesto.
     *
     * @param id the id of the costoRepuesto to save.
     * @param costoRepuesto the costoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated costoRepuesto,
     * or with status {@code 400 (Bad Request)} if the costoRepuesto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the costoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/costo-repuestos/{id}")
    public ResponseEntity<CostoRepuesto> updateCostoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CostoRepuesto costoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to update CostoRepuesto : {}, {}", id, costoRepuesto);
        if (costoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, costoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!costoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CostoRepuesto result = costoRepuestoService.save(costoRepuesto);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, costoRepuesto.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /costo-repuestos/:id} : Partial updates given fields of an existing costoRepuesto, field will ignore if it is null
     *
     * @param id the id of the costoRepuesto to save.
     * @param costoRepuesto the costoRepuesto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated costoRepuesto,
     * or with status {@code 400 (Bad Request)} if the costoRepuesto is not valid,
     * or with status {@code 404 (Not Found)} if the costoRepuesto is not found,
     * or with status {@code 500 (Internal Server Error)} if the costoRepuesto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/costo-repuestos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CostoRepuesto> partialUpdateCostoRepuesto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CostoRepuesto costoRepuesto
    ) throws URISyntaxException {
        log.debug("REST request to partial update CostoRepuesto partially : {}, {}", id, costoRepuesto);
        if (costoRepuesto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, costoRepuesto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!costoRepuestoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CostoRepuesto> result = costoRepuestoService.partialUpdate(costoRepuesto);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, costoRepuesto.getId().toString())
        );
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
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
