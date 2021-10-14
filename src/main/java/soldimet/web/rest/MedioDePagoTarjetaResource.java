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
import soldimet.domain.MedioDePagoTarjeta;
import soldimet.repository.MedioDePagoTarjetaRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.MedioDePagoTarjeta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedioDePagoTarjetaResource {

    private final Logger log = LoggerFactory.getLogger(MedioDePagoTarjetaResource.class);

    private static final String ENTITY_NAME = "medioDePagoTarjeta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedioDePagoTarjetaRepository medioDePagoTarjetaRepository;

    public MedioDePagoTarjetaResource(MedioDePagoTarjetaRepository medioDePagoTarjetaRepository) {
        this.medioDePagoTarjetaRepository = medioDePagoTarjetaRepository;
    }

    /**
     * {@code POST  /medio-de-pago-tarjetas} : Create a new medioDePagoTarjeta.
     *
     * @param medioDePagoTarjeta the medioDePagoTarjeta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medioDePagoTarjeta, or with status {@code 400 (Bad Request)} if the medioDePagoTarjeta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medio-de-pago-tarjetas")
    public ResponseEntity<MedioDePagoTarjeta> createMedioDePagoTarjeta(@Valid @RequestBody MedioDePagoTarjeta medioDePagoTarjeta)
        throws URISyntaxException {
        log.debug("REST request to save MedioDePagoTarjeta : {}", medioDePagoTarjeta);
        if (medioDePagoTarjeta.getId() != null) {
            throw new BadRequestAlertException("A new medioDePagoTarjeta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioDePagoTarjeta result = medioDePagoTarjetaRepository.save(medioDePagoTarjeta);
        return ResponseEntity
            .created(new URI("/api/medio-de-pago-tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medio-de-pago-tarjetas/:id} : Updates an existing medioDePagoTarjeta.
     *
     * @param id the id of the medioDePagoTarjeta to save.
     * @param medioDePagoTarjeta the medioDePagoTarjeta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medioDePagoTarjeta,
     * or with status {@code 400 (Bad Request)} if the medioDePagoTarjeta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medioDePagoTarjeta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medio-de-pago-tarjetas/{id}")
    public ResponseEntity<MedioDePagoTarjeta> updateMedioDePagoTarjeta(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody MedioDePagoTarjeta medioDePagoTarjeta
    ) throws URISyntaxException {
        log.debug("REST request to update MedioDePagoTarjeta : {}, {}", id, medioDePagoTarjeta);
        if (medioDePagoTarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, medioDePagoTarjeta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!medioDePagoTarjetaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MedioDePagoTarjeta result = medioDePagoTarjetaRepository.save(medioDePagoTarjeta);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medioDePagoTarjeta.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /medio-de-pago-tarjetas/:id} : Partial updates given fields of an existing medioDePagoTarjeta, field will ignore if it is null
     *
     * @param id the id of the medioDePagoTarjeta to save.
     * @param medioDePagoTarjeta the medioDePagoTarjeta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medioDePagoTarjeta,
     * or with status {@code 400 (Bad Request)} if the medioDePagoTarjeta is not valid,
     * or with status {@code 404 (Not Found)} if the medioDePagoTarjeta is not found,
     * or with status {@code 500 (Internal Server Error)} if the medioDePagoTarjeta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/medio-de-pago-tarjetas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MedioDePagoTarjeta> partialUpdateMedioDePagoTarjeta(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody MedioDePagoTarjeta medioDePagoTarjeta
    ) throws URISyntaxException {
        log.debug("REST request to partial update MedioDePagoTarjeta partially : {}, {}", id, medioDePagoTarjeta);
        if (medioDePagoTarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, medioDePagoTarjeta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!medioDePagoTarjetaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MedioDePagoTarjeta> result = medioDePagoTarjetaRepository
            .findById(medioDePagoTarjeta.getId())
            .map(
                existingMedioDePagoTarjeta -> {
                    if (medioDePagoTarjeta.getUltimos4() != null) {
                        existingMedioDePagoTarjeta.setUltimos4(medioDePagoTarjeta.getUltimos4());
                    }

                    return existingMedioDePagoTarjeta;
                }
            )
            .map(medioDePagoTarjetaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medioDePagoTarjeta.getId().toString())
        );
    }

    /**
     * {@code GET  /medio-de-pago-tarjetas} : get all the medioDePagoTarjetas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medioDePagoTarjetas in body.
     */
    @GetMapping("/medio-de-pago-tarjetas")
    public List<MedioDePagoTarjeta> getAllMedioDePagoTarjetas() {
        log.debug("REST request to get all MedioDePagoTarjetas");
        return medioDePagoTarjetaRepository.findAll();
    }

    /**
     * {@code GET  /medio-de-pago-tarjetas/:id} : get the "id" medioDePagoTarjeta.
     *
     * @param id the id of the medioDePagoTarjeta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medioDePagoTarjeta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medio-de-pago-tarjetas/{id}")
    public ResponseEntity<MedioDePagoTarjeta> getMedioDePagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to get MedioDePagoTarjeta : {}", id);
        Optional<MedioDePagoTarjeta> medioDePagoTarjeta = medioDePagoTarjetaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medioDePagoTarjeta);
    }

    /**
     * {@code DELETE  /medio-de-pago-tarjetas/:id} : delete the "id" medioDePagoTarjeta.
     *
     * @param id the id of the medioDePagoTarjeta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medio-de-pago-tarjetas/{id}")
    public ResponseEntity<Void> deleteMedioDePagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to delete MedioDePagoTarjeta : {}", id);
        medioDePagoTarjetaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
