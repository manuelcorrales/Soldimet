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
import soldimet.domain.MedioDePago;
import soldimet.repository.MedioDePagoRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.MedioDePago}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedioDePagoResource {

    private final Logger log = LoggerFactory.getLogger(MedioDePagoResource.class);

    private static final String ENTITY_NAME = "medioDePago";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedioDePagoRepository medioDePagoRepository;

    public MedioDePagoResource(MedioDePagoRepository medioDePagoRepository) {
        this.medioDePagoRepository = medioDePagoRepository;
    }

    /**
     * {@code POST  /medio-de-pagos} : Create a new medioDePago.
     *
     * @param medioDePago the medioDePago to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medioDePago, or with status {@code 400 (Bad Request)} if the medioDePago has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medio-de-pagos")
    public ResponseEntity<MedioDePago> createMedioDePago(@Valid @RequestBody MedioDePago medioDePago) throws URISyntaxException {
        log.debug("REST request to save MedioDePago : {}", medioDePago);
        if (medioDePago.getId() != null) {
            throw new BadRequestAlertException("A new medioDePago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioDePago result = medioDePagoRepository.save(medioDePago);
        return ResponseEntity
            .created(new URI("/api/medio-de-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medio-de-pagos/:id} : Updates an existing medioDePago.
     *
     * @param id the id of the medioDePago to save.
     * @param medioDePago the medioDePago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medioDePago,
     * or with status {@code 400 (Bad Request)} if the medioDePago is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medioDePago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medio-de-pagos/{id}")
    public ResponseEntity<MedioDePago> updateMedioDePago(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MedioDePago medioDePago
    ) throws URISyntaxException {
        log.debug("REST request to update MedioDePago : {}, {}", id, medioDePago);
        if (medioDePago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, medioDePago.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!medioDePagoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MedioDePago result = medioDePagoRepository.save(medioDePago);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medioDePago.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /medio-de-pagos/:id} : Partial updates given fields of an existing medioDePago, field will ignore if it is null
     *
     * @param id the id of the medioDePago to save.
     * @param medioDePago the medioDePago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medioDePago,
     * or with status {@code 400 (Bad Request)} if the medioDePago is not valid,
     * or with status {@code 404 (Not Found)} if the medioDePago is not found,
     * or with status {@code 500 (Internal Server Error)} if the medioDePago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/medio-de-pagos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MedioDePago> partialUpdateMedioDePago(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MedioDePago medioDePago
    ) throws URISyntaxException {
        log.debug("REST request to partial update MedioDePago partially : {}, {}", id, medioDePago);
        if (medioDePago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, medioDePago.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!medioDePagoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MedioDePago> result = medioDePagoRepository
            .findById(medioDePago.getId())
            .map(
                existingMedioDePago -> {
                    return existingMedioDePago;
                }
            )
            .map(medioDePagoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medioDePago.getId().toString())
        );
    }

    /**
     * {@code GET  /medio-de-pagos} : get all the medioDePagos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medioDePagos in body.
     */
    @GetMapping("/medio-de-pagos")
    public List<MedioDePago> getAllMedioDePagos() {
        log.debug("REST request to get all MedioDePagos");
        return medioDePagoRepository.findAll();
    }

    /**
     * {@code GET  /medio-de-pagos/:id} : get the "id" medioDePago.
     *
     * @param id the id of the medioDePago to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medioDePago, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medio-de-pagos/{id}")
    public ResponseEntity<MedioDePago> getMedioDePago(@PathVariable Long id) {
        log.debug("REST request to get MedioDePago : {}", id);
        Optional<MedioDePago> medioDePago = medioDePagoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medioDePago);
    }

    /**
     * {@code DELETE  /medio-de-pagos/:id} : delete the "id" medioDePago.
     *
     * @param id the id of the medioDePago to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medio-de-pagos/{id}")
    public ResponseEntity<Void> deleteMedioDePago(@PathVariable Long id) {
        log.debug("REST request to delete MedioDePago : {}", id);
        medioDePagoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
