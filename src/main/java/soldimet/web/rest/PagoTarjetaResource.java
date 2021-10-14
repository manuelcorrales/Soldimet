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
import soldimet.domain.PagoTarjeta;
import soldimet.repository.PagoTarjetaRepository;
import soldimet.service.PagoTarjetaService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.PagoTarjeta}.
 */
@RestController
@RequestMapping("/api")
public class PagoTarjetaResource {

    private final Logger log = LoggerFactory.getLogger(PagoTarjetaResource.class);

    private static final String ENTITY_NAME = "pagoTarjeta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagoTarjetaService pagoTarjetaService;

    private final PagoTarjetaRepository pagoTarjetaRepository;

    public PagoTarjetaResource(PagoTarjetaService pagoTarjetaService, PagoTarjetaRepository pagoTarjetaRepository) {
        this.pagoTarjetaService = pagoTarjetaService;
        this.pagoTarjetaRepository = pagoTarjetaRepository;
    }

    /**
     * {@code POST  /pago-tarjetas} : Create a new pagoTarjeta.
     *
     * @param pagoTarjeta the pagoTarjeta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pagoTarjeta, or with status {@code 400 (Bad Request)} if the pagoTarjeta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pago-tarjetas")
    public ResponseEntity<PagoTarjeta> createPagoTarjeta(@Valid @RequestBody PagoTarjeta pagoTarjeta) throws URISyntaxException {
        log.debug("REST request to save PagoTarjeta : {}", pagoTarjeta);
        if (pagoTarjeta.getId() != null) {
            throw new BadRequestAlertException("A new pagoTarjeta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagoTarjeta result = pagoTarjetaService.save(pagoTarjeta);
        return ResponseEntity
            .created(new URI("/api/pago-tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pago-tarjetas/:id} : Updates an existing pagoTarjeta.
     *
     * @param id the id of the pagoTarjeta to save.
     * @param pagoTarjeta the pagoTarjeta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagoTarjeta,
     * or with status {@code 400 (Bad Request)} if the pagoTarjeta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pagoTarjeta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pago-tarjetas/{id}")
    public ResponseEntity<PagoTarjeta> updatePagoTarjeta(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PagoTarjeta pagoTarjeta
    ) throws URISyntaxException {
        log.debug("REST request to update PagoTarjeta : {}, {}", id, pagoTarjeta);
        if (pagoTarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pagoTarjeta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoTarjetaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PagoTarjeta result = pagoTarjetaService.save(pagoTarjeta);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pagoTarjeta.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pago-tarjetas/:id} : Partial updates given fields of an existing pagoTarjeta, field will ignore if it is null
     *
     * @param id the id of the pagoTarjeta to save.
     * @param pagoTarjeta the pagoTarjeta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagoTarjeta,
     * or with status {@code 400 (Bad Request)} if the pagoTarjeta is not valid,
     * or with status {@code 404 (Not Found)} if the pagoTarjeta is not found,
     * or with status {@code 500 (Internal Server Error)} if the pagoTarjeta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pago-tarjetas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<PagoTarjeta> partialUpdatePagoTarjeta(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PagoTarjeta pagoTarjeta
    ) throws URISyntaxException {
        log.debug("REST request to partial update PagoTarjeta partially : {}, {}", id, pagoTarjeta);
        if (pagoTarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pagoTarjeta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pagoTarjetaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PagoTarjeta> result = pagoTarjetaService.partialUpdate(pagoTarjeta);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pagoTarjeta.getId().toString())
        );
    }

    /**
     * {@code GET  /pago-tarjetas} : get all the pagoTarjetas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagoTarjetas in body.
     */
    @GetMapping("/pago-tarjetas")
    public List<PagoTarjeta> getAllPagoTarjetas() {
        log.debug("REST request to get all PagoTarjetas");
        return pagoTarjetaService.findAll();
    }

    /**
     * {@code GET  /pago-tarjetas/:id} : get the "id" pagoTarjeta.
     *
     * @param id the id of the pagoTarjeta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pagoTarjeta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pago-tarjetas/{id}")
    public ResponseEntity<PagoTarjeta> getPagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to get PagoTarjeta : {}", id);
        Optional<PagoTarjeta> pagoTarjeta = pagoTarjetaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pagoTarjeta);
    }

    /**
     * {@code DELETE  /pago-tarjetas/:id} : delete the "id" pagoTarjeta.
     *
     * @param id the id of the pagoTarjeta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pago-tarjetas/{id}")
    public ResponseEntity<Void> deletePagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to delete PagoTarjeta : {}", id);
        pagoTarjetaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
