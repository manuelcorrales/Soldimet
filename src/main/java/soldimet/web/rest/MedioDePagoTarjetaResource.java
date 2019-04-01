package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.MedioDePagoTarjeta;
import soldimet.repository.MedioDePagoTarjetaRepository;
import soldimet.web.rest.errors.BadRequestAlertException;
import soldimet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MedioDePagoTarjeta.
 */
@RestController
@RequestMapping("/api")
public class MedioDePagoTarjetaResource {

    private final Logger log = LoggerFactory.getLogger(MedioDePagoTarjetaResource.class);

    private static final String ENTITY_NAME = "medioDePagoTarjeta";

    private final MedioDePagoTarjetaRepository medioDePagoTarjetaRepository;

    public MedioDePagoTarjetaResource(MedioDePagoTarjetaRepository medioDePagoTarjetaRepository) {
        this.medioDePagoTarjetaRepository = medioDePagoTarjetaRepository;
    }

    /**
     * POST  /medio-de-pago-tarjetas : Create a new medioDePagoTarjeta.
     *
     * @param medioDePagoTarjeta the medioDePagoTarjeta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medioDePagoTarjeta, or with status 400 (Bad Request) if the medioDePagoTarjeta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medio-de-pago-tarjetas")
    @Timed
    public ResponseEntity<MedioDePagoTarjeta> createMedioDePagoTarjeta(@Valid @RequestBody MedioDePagoTarjeta medioDePagoTarjeta) throws URISyntaxException {
        log.debug("REST request to save MedioDePagoTarjeta : {}", medioDePagoTarjeta);
        if (medioDePagoTarjeta.getId() != null) {
            throw new BadRequestAlertException("A new medioDePagoTarjeta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedioDePagoTarjeta result = medioDePagoTarjetaRepository.save(medioDePagoTarjeta);
        return ResponseEntity.created(new URI("/api/medio-de-pago-tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medio-de-pago-tarjetas : Updates an existing medioDePagoTarjeta.
     *
     * @param medioDePagoTarjeta the medioDePagoTarjeta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medioDePagoTarjeta,
     * or with status 400 (Bad Request) if the medioDePagoTarjeta is not valid,
     * or with status 500 (Internal Server Error) if the medioDePagoTarjeta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medio-de-pago-tarjetas")
    @Timed
    public ResponseEntity<MedioDePagoTarjeta> updateMedioDePagoTarjeta(@Valid @RequestBody MedioDePagoTarjeta medioDePagoTarjeta) throws URISyntaxException {
        log.debug("REST request to update MedioDePagoTarjeta : {}", medioDePagoTarjeta);
        if (medioDePagoTarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedioDePagoTarjeta result = medioDePagoTarjetaRepository.save(medioDePagoTarjeta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medioDePagoTarjeta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medio-de-pago-tarjetas : get all the medioDePagoTarjetas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medioDePagoTarjetas in body
     */
    @GetMapping("/medio-de-pago-tarjetas")
    @Timed
    public List<MedioDePagoTarjeta> getAllMedioDePagoTarjetas() {
        log.debug("REST request to get all MedioDePagoTarjetas");
        return medioDePagoTarjetaRepository.findAll();
    }

    /**
     * GET  /medio-de-pago-tarjetas/:id : get the "id" medioDePagoTarjeta.
     *
     * @param id the id of the medioDePagoTarjeta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medioDePagoTarjeta, or with status 404 (Not Found)
     */
    @GetMapping("/medio-de-pago-tarjetas/{id}")
    @Timed
    public ResponseEntity<MedioDePagoTarjeta> getMedioDePagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to get MedioDePagoTarjeta : {}", id);
        Optional<MedioDePagoTarjeta> medioDePagoTarjeta = medioDePagoTarjetaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medioDePagoTarjeta);
    }

    /**
     * DELETE  /medio-de-pago-tarjetas/:id : delete the "id" medioDePagoTarjeta.
     *
     * @param id the id of the medioDePagoTarjeta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medio-de-pago-tarjetas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedioDePagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to delete MedioDePagoTarjeta : {}", id);

        medioDePagoTarjetaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
