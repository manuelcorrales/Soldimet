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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.Sucursal;
import soldimet.repository.SucursalRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Sucursal}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SucursalResource {

    private final Logger log = LoggerFactory.getLogger(SucursalResource.class);

    private static final String ENTITY_NAME = "sucursal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SucursalRepository sucursalRepository;

    public SucursalResource(SucursalRepository sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    /**
     * {@code POST  /sucursals} : Create a new sucursal.
     *
     * @param sucursal the sucursal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sucursal, or with status {@code 400 (Bad Request)} if the sucursal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sucursals")
    public ResponseEntity<Sucursal> createSucursal(@Valid @RequestBody Sucursal sucursal) throws URISyntaxException {
        log.debug("REST request to save Sucursal : {}", sucursal);
        if (sucursal.getId() != null) {
            throw new BadRequestAlertException("A new sucursal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sucursal result = sucursalRepository.save(sucursal);
        return ResponseEntity
            .created(new URI("/api/sucursals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sucursals/:id} : Updates an existing sucursal.
     *
     * @param id the id of the sucursal to save.
     * @param sucursal the sucursal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sucursal,
     * or with status {@code 400 (Bad Request)} if the sucursal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sucursal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sucursals/{id}")
    public ResponseEntity<Sucursal> updateSucursal(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Sucursal sucursal
    ) throws URISyntaxException {
        log.debug("REST request to update Sucursal : {}, {}", id, sucursal);
        if (sucursal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sucursal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sucursalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Sucursal result = sucursalRepository.save(sucursal);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sucursal.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /sucursals/:id} : Partial updates given fields of an existing sucursal, field will ignore if it is null
     *
     * @param id the id of the sucursal to save.
     * @param sucursal the sucursal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sucursal,
     * or with status {@code 400 (Bad Request)} if the sucursal is not valid,
     * or with status {@code 404 (Not Found)} if the sucursal is not found,
     * or with status {@code 500 (Internal Server Error)} if the sucursal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/sucursals/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Sucursal> partialUpdateSucursal(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Sucursal sucursal
    ) throws URISyntaxException {
        log.debug("REST request to partial update Sucursal partially : {}, {}", id, sucursal);
        if (sucursal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sucursal.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sucursalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Sucursal> result = sucursalRepository
            .findById(sucursal.getId())
            .map(
                existingSucursal -> {
                    if (sucursal.getNombreSucursal() != null) {
                        existingSucursal.setNombreSucursal(sucursal.getNombreSucursal());
                    }

                    return existingSucursal;
                }
            )
            .map(sucursalRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sucursal.getId().toString())
        );
    }

    /**
     * {@code GET  /sucursals} : get all the sucursals.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sucursals in body.
     */
    @GetMapping("/sucursals")
    public List<Sucursal> getAllSucursals() {
        log.debug("REST request to get all Sucursals");
        return sucursalRepository.findAll();
    }

    /**
     * {@code GET  /sucursals/:id} : get the "id" sucursal.
     *
     * @param id the id of the sucursal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sucursal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sucursals/{id}")
    public ResponseEntity<Sucursal> getSucursal(@PathVariable Long id) {
        log.debug("REST request to get Sucursal : {}", id);
        Optional<Sucursal> sucursal = sucursalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sucursal);
    }

    /**
     * {@code DELETE  /sucursals/:id} : delete the "id" sucursal.
     *
     * @param id the id of the sucursal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sucursals/{id}")
    public ResponseEntity<Void> deleteSucursal(@PathVariable Long id) {
        log.debug("REST request to delete Sucursal : {}", id);
        sucursalRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
