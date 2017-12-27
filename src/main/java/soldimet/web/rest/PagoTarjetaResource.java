package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.PagoTarjeta;
import soldimet.service.PagoTarjetaService;
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
 * REST controller for managing PagoTarjeta.
 */
@RestController
@RequestMapping("/api")
public class PagoTarjetaResource {

    private final Logger log = LoggerFactory.getLogger(PagoTarjetaResource.class);

    private static final String ENTITY_NAME = "pagoTarjeta";

    private final PagoTarjetaService pagoTarjetaService;

    public PagoTarjetaResource(PagoTarjetaService pagoTarjetaService) {
        this.pagoTarjetaService = pagoTarjetaService;
    }

    /**
     * POST  /pago-tarjetas : Create a new pagoTarjeta.
     *
     * @param pagoTarjeta the pagoTarjeta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pagoTarjeta, or with status 400 (Bad Request) if the pagoTarjeta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pago-tarjetas")
    @Timed
    public ResponseEntity<PagoTarjeta> createPagoTarjeta(@Valid @RequestBody PagoTarjeta pagoTarjeta) throws URISyntaxException {
        log.debug("REST request to save PagoTarjeta : {}", pagoTarjeta);
        if (pagoTarjeta.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new pagoTarjeta cannot already have an ID")).body(null);
        }
        PagoTarjeta result = pagoTarjetaService.save(pagoTarjeta);
        return ResponseEntity.created(new URI("/api/pago-tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pago-tarjetas : Updates an existing pagoTarjeta.
     *
     * @param pagoTarjeta the pagoTarjeta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pagoTarjeta,
     * or with status 400 (Bad Request) if the pagoTarjeta is not valid,
     * or with status 500 (Internal Server Error) if the pagoTarjeta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pago-tarjetas")
    @Timed
    public ResponseEntity<PagoTarjeta> updatePagoTarjeta(@Valid @RequestBody PagoTarjeta pagoTarjeta) throws URISyntaxException {
        log.debug("REST request to update PagoTarjeta : {}", pagoTarjeta);
        if (pagoTarjeta.getId() == null) {
            return createPagoTarjeta(pagoTarjeta);
        }
        PagoTarjeta result = pagoTarjetaService.save(pagoTarjeta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pagoTarjeta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pago-tarjetas : get all the pagoTarjetas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pagoTarjetas in body
     */
    @GetMapping("/pago-tarjetas")
    @Timed
    public List<PagoTarjeta> getAllPagoTarjetas() {
        log.debug("REST request to get all PagoTarjetas");
        return pagoTarjetaService.findAll();
        }

    /**
     * GET  /pago-tarjetas/:id : get the "id" pagoTarjeta.
     *
     * @param id the id of the pagoTarjeta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pagoTarjeta, or with status 404 (Not Found)
     */
    @GetMapping("/pago-tarjetas/{id}")
    @Timed
    public ResponseEntity<PagoTarjeta> getPagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to get PagoTarjeta : {}", id);
        PagoTarjeta pagoTarjeta = pagoTarjetaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pagoTarjeta));
    }

    /**
     * DELETE  /pago-tarjetas/:id : delete the "id" pagoTarjeta.
     *
     * @param id the id of the pagoTarjeta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pago-tarjetas/{id}")
    @Timed
    public ResponseEntity<Void> deletePagoTarjeta(@PathVariable Long id) {
        log.debug("REST request to delete PagoTarjeta : {}", id);
        pagoTarjetaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
