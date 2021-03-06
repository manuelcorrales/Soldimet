package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.TipoTarjeta;
import soldimet.service.TipoTarjetaService;
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
 * REST controller for managing TipoTarjeta.
 */
@RestController
@RequestMapping("/api")
public class TipoTarjetaResource {

    private final Logger log = LoggerFactory.getLogger(TipoTarjetaResource.class);

    private static final String ENTITY_NAME = "tipoTarjeta";

    private final TipoTarjetaService tipoTarjetaService;

    public TipoTarjetaResource(TipoTarjetaService tipoTarjetaService) {
        this.tipoTarjetaService = tipoTarjetaService;
    }

    /**
     * POST  /tipo-tarjetas : Create a new tipoTarjeta.
     *
     * @param tipoTarjeta the tipoTarjeta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoTarjeta, or with status 400 (Bad Request) if the tipoTarjeta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-tarjetas")
    @Timed
    public ResponseEntity<TipoTarjeta> createTipoTarjeta(@Valid @RequestBody TipoTarjeta tipoTarjeta) throws URISyntaxException {
        log.debug("REST request to save TipoTarjeta : {}", tipoTarjeta);
        if (tipoTarjeta.getId() != null) {
            throw new BadRequestAlertException("A new tipoTarjeta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoTarjeta result = tipoTarjetaService.save(tipoTarjeta);
        return ResponseEntity.created(new URI("/api/tipo-tarjetas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-tarjetas : Updates an existing tipoTarjeta.
     *
     * @param tipoTarjeta the tipoTarjeta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoTarjeta,
     * or with status 400 (Bad Request) if the tipoTarjeta is not valid,
     * or with status 500 (Internal Server Error) if the tipoTarjeta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-tarjetas")
    @Timed
    public ResponseEntity<TipoTarjeta> updateTipoTarjeta(@Valid @RequestBody TipoTarjeta tipoTarjeta) throws URISyntaxException {
        log.debug("REST request to update TipoTarjeta : {}", tipoTarjeta);
        if (tipoTarjeta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoTarjeta result = tipoTarjetaService.save(tipoTarjeta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoTarjeta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-tarjetas : get all the tipoTarjetas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoTarjetas in body
     */
    @GetMapping("/tipo-tarjetas")
    @Timed
    public List<TipoTarjeta> getAllTipoTarjetas() {
        log.debug("REST request to get all TipoTarjetas");
        return tipoTarjetaService.findAll();
    }

    /**
     * GET  /tipo-tarjetas/:id : get the "id" tipoTarjeta.
     *
     * @param id the id of the tipoTarjeta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoTarjeta, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-tarjetas/{id}")
    @Timed
    public ResponseEntity<TipoTarjeta> getTipoTarjeta(@PathVariable Long id) {
        log.debug("REST request to get TipoTarjeta : {}", id);
        Optional<TipoTarjeta> tipoTarjeta = tipoTarjetaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoTarjeta);
    }

    /**
     * DELETE  /tipo-tarjetas/:id : delete the "id" tipoTarjeta.
     *
     * @param id the id of the tipoTarjeta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-tarjetas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoTarjeta(@PathVariable Long id) {
        log.debug("REST request to delete TipoTarjeta : {}", id);
        tipoTarjetaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
