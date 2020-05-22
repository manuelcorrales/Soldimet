package soldimet.web.rest;

import soldimet.domain.Caja;
import soldimet.service.CajaService;
import soldimet.web.rest.errors.BadRequestAlertException;
import soldimet.service.dto.CajaCriteria;
import soldimet.service.CajaQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link soldimet.domain.Caja}.
 */
@RestController
@RequestMapping("/api")
public class CajaResource {

    private final Logger log = LoggerFactory.getLogger(CajaResource.class);

    private static final String ENTITY_NAME = "caja";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CajaService cajaService;

    private final CajaQueryService cajaQueryService;

    public CajaResource(CajaService cajaService, CajaQueryService cajaQueryService) {
        this.cajaService = cajaService;
        this.cajaQueryService = cajaQueryService;
    }

    /**
     * {@code POST  /cajas} : Create a new caja.
     *
     * @param caja the caja to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new caja, or with status {@code 400 (Bad Request)} if the caja has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cajas")
    public ResponseEntity<Caja> createCaja(@Valid @RequestBody Caja caja) throws URISyntaxException {
        log.debug("REST request to save Caja : {}", caja);
        if (caja.getId() != null) {
            throw new BadRequestAlertException("A new caja cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Caja result = cajaService.save(caja);
        return ResponseEntity.created(new URI("/api/cajas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cajas} : Updates an existing caja.
     *
     * @param caja the caja to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated caja,
     * or with status {@code 400 (Bad Request)} if the caja is not valid,
     * or with status {@code 500 (Internal Server Error)} if the caja couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cajas")
    public ResponseEntity<Caja> updateCaja(@Valid @RequestBody Caja caja) throws URISyntaxException {
        log.debug("REST request to update Caja : {}", caja);
        if (caja.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Caja result = cajaService.save(caja);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, caja.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cajas} : get all the cajas.
     *

     * @param pageable the pagination information.

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cajas in body.
     */
    @GetMapping("/cajas")
    public ResponseEntity<List<Caja>> getAllCajas(CajaCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Cajas by criteria: {}", criteria);
        Page<Caja> page = cajaQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
    * {@code GET  /cajas/count} : count all the cajas.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/cajas/count")
    public ResponseEntity<Long> countCajas(CajaCriteria criteria) {
        log.debug("REST request to count Cajas by criteria: {}", criteria);
        return ResponseEntity.ok().body(cajaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /cajas/:id} : get the "id" caja.
     *
     * @param id the id of the caja to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the caja, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cajas/{id}")
    public ResponseEntity<Caja> getCaja(@PathVariable Long id) {
        log.debug("REST request to get Caja : {}", id);
        Optional<Caja> caja = cajaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(caja);
    }

    /**
     * {@code DELETE  /cajas/:id} : delete the "id" caja.
     *
     * @param id the id of the caja to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cajas/{id}")
    public ResponseEntity<Void> deleteCaja(@PathVariable Long id) {
        log.debug("REST request to delete Caja : {}", id);
        cajaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
