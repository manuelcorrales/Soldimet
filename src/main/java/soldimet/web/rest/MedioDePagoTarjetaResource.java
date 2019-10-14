package soldimet.web.rest;

import soldimet.domain.MedioDePagoTarjeta;
import soldimet.repository.MedioDePagoTarjetaRepository;
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
 * REST controller for managing {@link soldimet.domain.MedioDePagoTarjeta}.
 */
@RestController
@RequestMapping("/api")
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
    public ResponseEntity<MedioDePagoTarjeta> createMedioDePagoTarjeta(@Valid @RequestBody MedioDePagoTarjeta medioDePagoTarjeta) throws URISyntaxException {
        log.debug("REST request to save MedioDePagoTarjeta : {}", medioDePagoTarjeta);
        if (medioDePagoTarjeta.getId() != null) {
            throw new BadRequestAlertException("A new medioDePagoTarjeta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioDePagoTarjeta result = medioDePagoTarjetaRepository.save(medioDePagoTarjeta);
        return ResponseEntity.created(new URI("/api/medio-de-pago-tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medio-de-pago-tarjetas} : Updates an existing medioDePagoTarjeta.
     *
     * @param medioDePagoTarjeta the medioDePagoTarjeta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medioDePagoTarjeta,
     * or with status {@code 400 (Bad Request)} if the medioDePagoTarjeta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medioDePagoTarjeta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medio-de-pago-tarjetas")
    public ResponseEntity<MedioDePagoTarjeta> updateMedioDePagoTarjeta(@Valid @RequestBody MedioDePagoTarjeta medioDePagoTarjeta) throws URISyntaxException {
        log.debug("REST request to update MedioDePagoTarjeta : {}", medioDePagoTarjeta);
        if (medioDePagoTarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedioDePagoTarjeta result = medioDePagoTarjetaRepository.save(medioDePagoTarjeta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, medioDePagoTarjeta.getId().toString()))
            .body(result);
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
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
