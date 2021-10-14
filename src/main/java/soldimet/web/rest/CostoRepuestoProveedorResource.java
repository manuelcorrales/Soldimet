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
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.repository.CostoRepuestoProveedorRepository;
import soldimet.service.CostoRepuestoProveedorService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.CostoRepuestoProveedor}.
 */
@RestController
@RequestMapping("/api")
public class CostoRepuestoProveedorResource {

    private final Logger log = LoggerFactory.getLogger(CostoRepuestoProveedorResource.class);

    private static final String ENTITY_NAME = "costoRepuestoProveedor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CostoRepuestoProveedorService costoRepuestoProveedorService;

    private final CostoRepuestoProveedorRepository costoRepuestoProveedorRepository;

    public CostoRepuestoProveedorResource(
        CostoRepuestoProveedorService costoRepuestoProveedorService,
        CostoRepuestoProveedorRepository costoRepuestoProveedorRepository
    ) {
        this.costoRepuestoProveedorService = costoRepuestoProveedorService;
        this.costoRepuestoProveedorRepository = costoRepuestoProveedorRepository;
    }

    /**
     * {@code POST  /costo-repuesto-proveedors} : Create a new costoRepuestoProveedor.
     *
     * @param costoRepuestoProveedor the costoRepuestoProveedor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new costoRepuestoProveedor, or with status {@code 400 (Bad Request)} if the costoRepuestoProveedor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/costo-repuesto-proveedors")
    public ResponseEntity<CostoRepuestoProveedor> createCostoRepuestoProveedor(
        @Valid @RequestBody CostoRepuestoProveedor costoRepuestoProveedor
    ) throws URISyntaxException {
        log.debug("REST request to save CostoRepuestoProveedor : {}", costoRepuestoProveedor);
        if (costoRepuestoProveedor.getId() != null) {
            throw new BadRequestAlertException("A new costoRepuestoProveedor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CostoRepuestoProveedor result = costoRepuestoProveedorService.save(costoRepuestoProveedor);
        return ResponseEntity
            .created(new URI("/api/costo-repuesto-proveedors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /costo-repuesto-proveedors/:id} : Updates an existing costoRepuestoProveedor.
     *
     * @param id the id of the costoRepuestoProveedor to save.
     * @param costoRepuestoProveedor the costoRepuestoProveedor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated costoRepuestoProveedor,
     * or with status {@code 400 (Bad Request)} if the costoRepuestoProveedor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the costoRepuestoProveedor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/costo-repuesto-proveedors/{id}")
    public ResponseEntity<CostoRepuestoProveedor> updateCostoRepuestoProveedor(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CostoRepuestoProveedor costoRepuestoProveedor
    ) throws URISyntaxException {
        log.debug("REST request to update CostoRepuestoProveedor : {}, {}", id, costoRepuestoProveedor);
        if (costoRepuestoProveedor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, costoRepuestoProveedor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!costoRepuestoProveedorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CostoRepuestoProveedor result = costoRepuestoProveedorService.save(costoRepuestoProveedor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, costoRepuestoProveedor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /costo-repuesto-proveedors/:id} : Partial updates given fields of an existing costoRepuestoProveedor, field will ignore if it is null
     *
     * @param id the id of the costoRepuestoProveedor to save.
     * @param costoRepuestoProveedor the costoRepuestoProveedor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated costoRepuestoProveedor,
     * or with status {@code 400 (Bad Request)} if the costoRepuestoProveedor is not valid,
     * or with status {@code 404 (Not Found)} if the costoRepuestoProveedor is not found,
     * or with status {@code 500 (Internal Server Error)} if the costoRepuestoProveedor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/costo-repuesto-proveedors/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<CostoRepuestoProveedor> partialUpdateCostoRepuestoProveedor(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CostoRepuestoProveedor costoRepuestoProveedor
    ) throws URISyntaxException {
        log.debug("REST request to partial update CostoRepuestoProveedor partially : {}, {}", id, costoRepuestoProveedor);
        if (costoRepuestoProveedor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, costoRepuestoProveedor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!costoRepuestoProveedorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CostoRepuestoProveedor> result = costoRepuestoProveedorService.partialUpdate(costoRepuestoProveedor);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, costoRepuestoProveedor.getId().toString())
        );
    }

    /**
     * {@code GET  /costo-repuesto-proveedors} : get all the costoRepuestoProveedors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of costoRepuestoProveedors in body.
     */
    @GetMapping("/costo-repuesto-proveedors")
    public List<CostoRepuestoProveedor> getAllCostoRepuestoProveedors() {
        log.debug("REST request to get all CostoRepuestoProveedors");
        return costoRepuestoProveedorService.findAll();
    }

    /**
     * {@code GET  /costo-repuesto-proveedors/:id} : get the "id" costoRepuestoProveedor.
     *
     * @param id the id of the costoRepuestoProveedor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the costoRepuestoProveedor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/costo-repuesto-proveedors/{id}")
    public ResponseEntity<CostoRepuestoProveedor> getCostoRepuestoProveedor(@PathVariable Long id) {
        log.debug("REST request to get CostoRepuestoProveedor : {}", id);
        Optional<CostoRepuestoProveedor> costoRepuestoProveedor = costoRepuestoProveedorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(costoRepuestoProveedor);
    }

    /**
     * {@code DELETE  /costo-repuesto-proveedors/:id} : delete the "id" costoRepuestoProveedor.
     *
     * @param id the id of the costoRepuestoProveedor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/costo-repuesto-proveedors/{id}")
    public ResponseEntity<Void> deleteCostoRepuestoProveedor(@PathVariable Long id) {
        log.debug("REST request to delete CostoRepuestoProveedor : {}", id);
        costoRepuestoProveedorService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
