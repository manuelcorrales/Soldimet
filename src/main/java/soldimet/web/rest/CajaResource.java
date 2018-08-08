package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Caja;
import soldimet.service.CajaService;
import soldimet.web.rest.errors.BadRequestAlertException;
import soldimet.web.rest.util.HeaderUtil;
import soldimet.web.rest.util.PaginationUtil;
import soldimet.service.dto.CajaCriteria;
import soldimet.service.CajaQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Caja.
 */
@RestController
@RequestMapping("/api")
public class CajaResource {

    private final Logger log = LoggerFactory.getLogger(CajaResource.class);

    private static final String ENTITY_NAME = "caja";

    private final CajaService cajaService;

    private final CajaQueryService cajaQueryService;

    public CajaResource(CajaService cajaService, CajaQueryService cajaQueryService) {
        this.cajaService = cajaService;
        this.cajaQueryService = cajaQueryService;
    }

    /**
     * POST  /cajas : Create a new caja.
     *
     * @param caja the caja to create
     * @return the ResponseEntity with status 201 (Created) and with body the new caja, or with status 400 (Bad Request) if the caja has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cajas")
    @Timed
    public ResponseEntity<Caja> createCaja(@Valid @RequestBody Caja caja) throws URISyntaxException {
        log.debug("REST request to save Caja : {}", caja);
        if (caja.getId() != null) {
            throw new BadRequestAlertException("A new caja cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Caja result = cajaService.save(caja);
        return ResponseEntity.created(new URI("/api/cajas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cajas : Updates an existing caja.
     *
     * @param caja the caja to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated caja,
     * or with status 400 (Bad Request) if the caja is not valid,
     * or with status 500 (Internal Server Error) if the caja couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cajas")
    @Timed
    public ResponseEntity<Caja> updateCaja(@Valid @RequestBody Caja caja) throws URISyntaxException {
        log.debug("REST request to update Caja : {}", caja);
        if (caja.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Caja result = cajaService.save(caja);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, caja.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cajas : get all the cajas.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of cajas in body
     */
    @GetMapping("/cajas")
    @Timed
    public ResponseEntity<List<Caja>> getAllCajas(CajaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Cajas by criteria: {}", criteria);
        Page<Caja> page = cajaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cajas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cajas/:id : get the "id" caja.
     *
     * @param id the id of the caja to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the caja, or with status 404 (Not Found)
     */
    @GetMapping("/cajas/{id}")
    @Timed
    public ResponseEntity<Caja> getCaja(@PathVariable Long id) {
        log.debug("REST request to get Caja : {}", id);
        Optional<Caja> caja = cajaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(caja);
    }

    /**
     * DELETE  /cajas/:id : delete the "id" caja.
     *
     * @param id the id of the caja to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cajas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCaja(@PathVariable Long id) {
        log.debug("REST request to delete Caja : {}", id);
        cajaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
