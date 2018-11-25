package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Sucursal;
import soldimet.repository.SucursalRepository;
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
 * REST controller for managing Sucursal.
 */
@RestController
@RequestMapping("/api")
public class SucursalResource {

    private final Logger log = LoggerFactory.getLogger(SucursalResource.class);

    private static final String ENTITY_NAME = "sucursal";

    private final SucursalRepository sucursalRepository;

    public SucursalResource(SucursalRepository sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    /**
     * POST  /sucursals : Create a new sucursal.
     *
     * @param sucursal the sucursal to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sucursal, or with status 400 (Bad Request) if the sucursal has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sucursals")
    @Timed
    public ResponseEntity<Sucursal> createSucursal(@Valid @RequestBody Sucursal sucursal) throws URISyntaxException {
        log.debug("REST request to save Sucursal : {}", sucursal);
        if (sucursal.getId() != null) {
            throw new BadRequestAlertException("A new sucursal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sucursal result = sucursalRepository.save(sucursal);
        return ResponseEntity.created(new URI("/api/sucursals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sucursals : Updates an existing sucursal.
     *
     * @param sucursal the sucursal to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sucursal,
     * or with status 400 (Bad Request) if the sucursal is not valid,
     * or with status 500 (Internal Server Error) if the sucursal couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sucursals")
    @Timed
    public ResponseEntity<Sucursal> updateSucursal(@Valid @RequestBody Sucursal sucursal) throws URISyntaxException {
        log.debug("REST request to update Sucursal : {}", sucursal);
        if (sucursal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sucursal result = sucursalRepository.save(sucursal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sucursal.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sucursals : get all the sucursals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sucursals in body
     */
    @GetMapping("/sucursals")
    @Timed
    public List<Sucursal> getAllSucursals() {
        log.debug("REST request to get all Sucursals");
        return sucursalRepository.findAll();
    }

    /**
     * GET  /sucursals/:id : get the "id" sucursal.
     *
     * @param id the id of the sucursal to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sucursal, or with status 404 (Not Found)
     */
    @GetMapping("/sucursals/{id}")
    @Timed
    public ResponseEntity<Sucursal> getSucursal(@PathVariable Long id) {
        log.debug("REST request to get Sucursal : {}", id);
        Optional<Sucursal> sucursal = sucursalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sucursal);
    }

    /**
     * DELETE  /sucursals/:id : delete the "id" sucursal.
     *
     * @param id the id of the sucursal to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sucursals/{id}")
    @Timed
    public ResponseEntity<Void> deleteSucursal(@PathVariable Long id) {
        log.debug("REST request to delete Sucursal : {}", id);

        sucursalRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
