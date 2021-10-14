package soldimet.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.MedidaArticulo;
import soldimet.repository.MedidaArticuloRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.MedidaArticulo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedidaArticuloResource {

    private final Logger log = LoggerFactory.getLogger(MedidaArticuloResource.class);

    private static final String ENTITY_NAME = "medidaArticulo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedidaArticuloRepository medidaArticuloRepository;

    public MedidaArticuloResource(MedidaArticuloRepository medidaArticuloRepository) {
        this.medidaArticuloRepository = medidaArticuloRepository;
    }

    /**
     * {@code POST  /medida-articulos} : Create a new medidaArticulo.
     *
     * @param medidaArticulo the medidaArticulo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medidaArticulo, or with status {@code 400 (Bad Request)} if the medidaArticulo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medida-articulos")
    public ResponseEntity<MedidaArticulo> createMedidaArticulo(@RequestBody MedidaArticulo medidaArticulo) throws URISyntaxException {
        log.debug("REST request to save MedidaArticulo : {}", medidaArticulo);
        if (medidaArticulo.getId() != null) {
            throw new BadRequestAlertException("A new medidaArticulo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedidaArticulo result = medidaArticuloRepository.save(medidaArticulo);
        return ResponseEntity
            .created(new URI("/api/medida-articulos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medida-articulos/:id} : Updates an existing medidaArticulo.
     *
     * @param id the id of the medidaArticulo to save.
     * @param medidaArticulo the medidaArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medidaArticulo,
     * or with status {@code 400 (Bad Request)} if the medidaArticulo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medidaArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medida-articulos/{id}")
    public ResponseEntity<MedidaArticulo> updateMedidaArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MedidaArticulo medidaArticulo
    ) throws URISyntaxException {
        log.debug("REST request to update MedidaArticulo : {}, {}", id, medidaArticulo);
        if (medidaArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, medidaArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!medidaArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MedidaArticulo result = medidaArticuloRepository.save(medidaArticulo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medidaArticulo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /medida-articulos/:id} : Partial updates given fields of an existing medidaArticulo, field will ignore if it is null
     *
     * @param id the id of the medidaArticulo to save.
     * @param medidaArticulo the medidaArticulo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medidaArticulo,
     * or with status {@code 400 (Bad Request)} if the medidaArticulo is not valid,
     * or with status {@code 404 (Not Found)} if the medidaArticulo is not found,
     * or with status {@code 500 (Internal Server Error)} if the medidaArticulo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/medida-articulos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MedidaArticulo> partialUpdateMedidaArticulo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MedidaArticulo medidaArticulo
    ) throws URISyntaxException {
        log.debug("REST request to partial update MedidaArticulo partially : {}, {}", id, medidaArticulo);
        if (medidaArticulo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, medidaArticulo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!medidaArticuloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MedidaArticulo> result = medidaArticuloRepository
            .findById(medidaArticulo.getId())
            .map(
                existingMedidaArticulo -> {
                    if (medidaArticulo.getMedida() != null) {
                        existingMedidaArticulo.setMedida(medidaArticulo.getMedida());
                    }

                    return existingMedidaArticulo;
                }
            )
            .map(medidaArticuloRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medidaArticulo.getId().toString())
        );
    }

    /**
     * {@code GET  /medida-articulos} : get all the medidaArticulos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medidaArticulos in body.
     */
    @GetMapping("/medida-articulos")
    public List<MedidaArticulo> getAllMedidaArticulos() {
        log.debug("REST request to get all MedidaArticulos");
        return medidaArticuloRepository.findAll();
    }

    /**
     * {@code GET  /medida-articulos/:id} : get the "id" medidaArticulo.
     *
     * @param id the id of the medidaArticulo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medidaArticulo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medida-articulos/{id}")
    public ResponseEntity<MedidaArticulo> getMedidaArticulo(@PathVariable Long id) {
        log.debug("REST request to get MedidaArticulo : {}", id);
        Optional<MedidaArticulo> medidaArticulo = medidaArticuloRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medidaArticulo);
    }

    /**
     * {@code DELETE  /medida-articulos/:id} : delete the "id" medidaArticulo.
     *
     * @param id the id of the medidaArticulo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medida-articulos/{id}")
    public ResponseEntity<Void> deleteMedidaArticulo(@PathVariable Long id) {
        log.debug("REST request to delete MedidaArticulo : {}", id);
        medidaArticuloRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
