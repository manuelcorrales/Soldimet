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
import soldimet.domain.PagoEfectivo;
import soldimet.repository.PagoEfectivoRepository;
import soldimet.service.PagoEfectivoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.PagoEfectivo}.
 */
@RestController
@RequestMapping("/api")
public class PagoEfectivoResource {

    private final Logger log = LoggerFactory.getLogger(PagoEfectivoResource.class);

    private static final String ENTITY_NAME = "pagoEfectivo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagoEfectivoService pagoEfectivoService;

    private final PagoEfectivoRepository pagoEfectivoRepository;

    public PagoEfectivoResource(PagoEfectivoService pagoEfectivoService, PagoEfectivoRepository pagoEfectivoRepository) {
        this.pagoEfectivoService = pagoEfectivoService;
        this.pagoEfectivoRepository = pagoEfectivoRepository;
    }

    /**
     * {@code POST  /pago-efectivos} : Create a new pagoEfectivo.
     *
     * @param pagoEfectivo the pagoEfectivo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pagoEfectivo, or with status {@code 400 (Bad Request)} if the pagoEfectivo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pago-efectivos")
    public ResponseEntity<PagoEfectivo> createPagoEfectivo(@Valid @RequestBody PagoEfectivo pagoEfectivo) throws URISyntaxException {
        log.debug("REST request to save PagoEfectivo : {}", pagoEfectivo);
        if (pagoEfectivo.getId() != null) {
            throw new BadRequestAlertException("A new pagoEfectivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagoEfectivo result = pagoEfectivoService.save(pagoEfectivo);
        return ResponseEntity
            .created(new URI("/api/pago-efectivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pago-efectivos/:id} : Updates an existing pagoEfectivo.
     *
     * @param id the id of the pagoEfectivo to save.
     * @param pagoEfectivo the pagoEfectivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagoEfectivo,
     * or with status {@code 400 (Bad Request)} if the pagoEfectivo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pagoEfectivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pago-efectivos/{id}")
    public ResponseEntity<PagoEfectivo> updatePagoEfectivo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PagoEfectivo pagoEfectivo
    ) throws URISyntaxException {
        log.debug("REST request to update PagoEfectivo : {}, {}", id, pagoEfectivo);
        if (pagoEfectivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pagoEfectivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoEfectivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PagoEfectivo result = pagoEfectivoService.save(pagoEfectivo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pagoEfectivo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pago-efectivos/:id} : Partial updates given fields of an existing pagoEfectivo, field will ignore if it is null
     *
     * @param id the id of the pagoEfectivo to save.
     * @param pagoEfectivo the pagoEfectivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagoEfectivo,
     * or with status {@code 400 (Bad Request)} if the pagoEfectivo is not valid,
     * or with status {@code 404 (Not Found)} if the pagoEfectivo is not found,
     * or with status {@code 500 (Internal Server Error)} if the pagoEfectivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pago-efectivos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PagoEfectivo> partialUpdatePagoEfectivo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PagoEfectivo pagoEfectivo
    ) throws URISyntaxException {
        log.debug("REST request to partial update PagoEfectivo partially : {}, {}", id, pagoEfectivo);
        if (pagoEfectivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pagoEfectivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoEfectivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PagoEfectivo> result = pagoEfectivoService.partialUpdate(pagoEfectivo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pagoEfectivo.getId().toString())
        );
    }

    /**
     * {@code GET  /pago-efectivos} : get all the pagoEfectivos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagoEfectivos in body.
     */
    @GetMapping("/pago-efectivos")
    public List<PagoEfectivo> getAllPagoEfectivos() {
        log.debug("REST request to get all PagoEfectivos");
        return pagoEfectivoService.findAll();
    }

    /**
     * {@code GET  /pago-efectivos/:id} : get the "id" pagoEfectivo.
     *
     * @param id the id of the pagoEfectivo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pagoEfectivo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pago-efectivos/{id}")
    public ResponseEntity<PagoEfectivo> getPagoEfectivo(@PathVariable Long id) {
        log.debug("REST request to get PagoEfectivo : {}", id);
        Optional<PagoEfectivo> pagoEfectivo = pagoEfectivoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pagoEfectivo);
    }

    /**
     * {@code DELETE  /pago-efectivos/:id} : delete the "id" pagoEfectivo.
     *
     * @param id the id of the pagoEfectivo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pago-efectivos/{id}")
    public ResponseEntity<Void> deletePagoEfectivo(@PathVariable Long id) {
        log.debug("REST request to delete PagoEfectivo : {}", id);
        pagoEfectivoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
