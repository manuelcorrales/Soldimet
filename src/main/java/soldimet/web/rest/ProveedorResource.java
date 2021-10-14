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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import soldimet.domain.Proveedor;
import soldimet.repository.ProveedorRepository;
import soldimet.service.ProveedorService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Proveedor}.
 */
@RestController
@RequestMapping("/api")
public class ProveedorResource {

    private final Logger log = LoggerFactory.getLogger(ProveedorResource.class);

    private static final String ENTITY_NAME = "proveedor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProveedorService proveedorService;

    private final ProveedorRepository proveedorRepository;

    public ProveedorResource(ProveedorService proveedorService, ProveedorRepository proveedorRepository) {
        this.proveedorService = proveedorService;
        this.proveedorRepository = proveedorRepository;
    }

    /**
     * {@code POST  /proveedors} : Create a new proveedor.
     *
     * @param proveedor the proveedor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new proveedor, or with status {@code 400 (Bad Request)} if the proveedor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/proveedors")
    public ResponseEntity<Proveedor> createProveedor(@Valid @RequestBody Proveedor proveedor) throws URISyntaxException {
        log.debug("REST request to save Proveedor : {}", proveedor);
        if (proveedor.getId() != null) {
            throw new BadRequestAlertException("A new proveedor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proveedor result = proveedorService.save(proveedor);
        return ResponseEntity
            .created(new URI("/api/proveedors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /proveedors/:id} : Updates an existing proveedor.
     *
     * @param id the id of the proveedor to save.
     * @param proveedor the proveedor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proveedor,
     * or with status {@code 400 (Bad Request)} if the proveedor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the proveedor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/proveedors/{id}")
    public ResponseEntity<Proveedor> updateProveedor(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Proveedor proveedor
    ) throws URISyntaxException {
        log.debug("REST request to update Proveedor : {}, {}", id, proveedor);
        if (proveedor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proveedor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proveedorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Proveedor result = proveedorService.save(proveedor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, proveedor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /proveedors/:id} : Partial updates given fields of an existing proveedor, field will ignore if it is null
     *
     * @param id the id of the proveedor to save.
     * @param proveedor the proveedor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated proveedor,
     * or with status {@code 400 (Bad Request)} if the proveedor is not valid,
     * or with status {@code 404 (Not Found)} if the proveedor is not found,
     * or with status {@code 500 (Internal Server Error)} if the proveedor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/proveedors/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Proveedor> partialUpdateProveedor(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Proveedor proveedor
    ) throws URISyntaxException {
        log.debug("REST request to partial update Proveedor partially : {}, {}", id, proveedor);
        if (proveedor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, proveedor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!proveedorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Proveedor> result = proveedorService.partialUpdate(proveedor);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, proveedor.getId().toString())
        );
    }

    /**
     * {@code GET  /proveedors} : get all the proveedors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of proveedors in body.
     */
    @GetMapping("/proveedors")
    public ResponseEntity<List<Proveedor>> getAllProveedors(Pageable pageable) {
        log.debug("REST request to get a page of Proveedors");
        Page<Proveedor> page = proveedorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /proveedors/:id} : get the "id" proveedor.
     *
     * @param id the id of the proveedor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the proveedor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/proveedors/{id}")
    public ResponseEntity<Proveedor> getProveedor(@PathVariable Long id) {
        log.debug("REST request to get Proveedor : {}", id);
        Optional<Proveedor> proveedor = proveedorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proveedor);
    }

    /**
     * {@code DELETE  /proveedors/:id} : delete the "id" proveedor.
     *
     * @param id the id of the proveedor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/proveedors/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Long id) {
        log.debug("REST request to delete Proveedor : {}", id);
        proveedorService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
