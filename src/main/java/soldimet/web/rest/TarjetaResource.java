package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Tarjeta;
import soldimet.service.TarjetaService;
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
 * REST controller for managing Tarjeta.
 */
@RestController
@RequestMapping("/api")
public class TarjetaResource {

    private final Logger log = LoggerFactory.getLogger(TarjetaResource.class);

    private static final String ENTITY_NAME = "tarjeta";

    private final TarjetaService tarjetaService;

    public TarjetaResource(TarjetaService tarjetaService) {
        this.tarjetaService = tarjetaService;
    }

    /**
     * POST  /tarjetas : Create a new tarjeta.
     *
     * @param tarjeta the tarjeta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tarjeta, or with status 400 (Bad Request) if the tarjeta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tarjetas")
    @Timed
    public ResponseEntity<Tarjeta> createTarjeta(@Valid @RequestBody Tarjeta tarjeta) throws URISyntaxException {
        log.debug("REST request to save Tarjeta : {}", tarjeta);
        if (tarjeta.getId() != null) {
            throw new BadRequestAlertException("A new tarjeta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tarjeta result = tarjetaService.save(tarjeta);
        return ResponseEntity.created(new URI("/api/tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tarjetas : Updates an existing tarjeta.
     *
     * @param tarjeta the tarjeta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tarjeta,
     * or with status 400 (Bad Request) if the tarjeta is not valid,
     * or with status 500 (Internal Server Error) if the tarjeta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tarjetas")
    @Timed
    public ResponseEntity<Tarjeta> updateTarjeta(@Valid @RequestBody Tarjeta tarjeta) throws URISyntaxException {
        log.debug("REST request to update Tarjeta : {}", tarjeta);
        if (tarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tarjeta result = tarjetaService.save(tarjeta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tarjeta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tarjetas : get all the tarjetas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tarjetas in body
     */
    @GetMapping("/tarjetas")
    @Timed
    public List<Tarjeta> getAllTarjetas() {
        log.debug("REST request to get all Tarjetas");
        return tarjetaService.findAll();
    }

    /**
     * GET  /tarjetas/:id : get the "id" tarjeta.
     *
     * @param id the id of the tarjeta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tarjeta, or with status 404 (Not Found)
     */
    @GetMapping("/tarjetas/{id}")
    @Timed
    public ResponseEntity<Tarjeta> getTarjeta(@PathVariable Long id) {
        log.debug("REST request to get Tarjeta : {}", id);
        Optional<Tarjeta> tarjeta = tarjetaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tarjeta);
    }

    /**
     * DELETE  /tarjetas/:id : delete the "id" tarjeta.
     *
     * @param id the id of the tarjeta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tarjetas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTarjeta(@PathVariable Long id) {
        log.debug("REST request to delete Tarjeta : {}", id);
        tarjetaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
