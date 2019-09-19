package soldimet.web.rest;

import soldimet.domain.Cilindrada;
import soldimet.service.CilindradaService;
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
 * REST controller for managing {@link soldimet.domain.Cilindrada}.
 */
@RestController
@RequestMapping("/api")
public class CilindradaResource {

    private final Logger log = LoggerFactory.getLogger(CilindradaResource.class);

    private static final String ENTITY_NAME = "cilindrada";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CilindradaService cilindradaService;

    public CilindradaResource(CilindradaService cilindradaService) {
        this.cilindradaService = cilindradaService;
    }

    /**
     * {@code POST  /cilindradas} : Create a new cilindrada.
     *
     * @param cilindrada the cilindrada to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cilindrada, or with status {@code 400 (Bad Request)} if the cilindrada has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cilindradas")
    public ResponseEntity<Cilindrada> createCilindrada(@Valid @RequestBody Cilindrada cilindrada) throws URISyntaxException {
        log.debug("REST request to save Cilindrada : {}", cilindrada);
        if (cilindrada.getId() != null) {
            throw new BadRequestAlertException("A new cilindrada cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cilindrada result = cilindradaService.save(cilindrada);
        return ResponseEntity.created(new URI("/api/cilindradas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cilindradas} : Updates an existing cilindrada.
     *
     * @param cilindrada the cilindrada to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cilindrada,
     * or with status {@code 400 (Bad Request)} if the cilindrada is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cilindrada couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cilindradas")
    public ResponseEntity<Cilindrada> updateCilindrada(@Valid @RequestBody Cilindrada cilindrada) throws URISyntaxException {
        log.debug("REST request to update Cilindrada : {}", cilindrada);
        if (cilindrada.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cilindrada result = cilindradaService.save(cilindrada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cilindrada.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cilindradas} : get all the cilindradas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cilindradas in body.
     */
    @GetMapping("/cilindradas")
    public List<Cilindrada> getAllCilindradas() {
        log.debug("REST request to get all Cilindradas");
        return cilindradaService.findAll();
    }

    /**
     * {@code GET  /cilindradas/:id} : get the "id" cilindrada.
     *
     * @param id the id of the cilindrada to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cilindrada, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cilindradas/{id}")
    public ResponseEntity<Cilindrada> getCilindrada(@PathVariable Long id) {
        log.debug("REST request to get Cilindrada : {}", id);
        Optional<Cilindrada> cilindrada = cilindradaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cilindrada);
    }

    /**
     * {@code DELETE  /cilindradas/:id} : delete the "id" cilindrada.
     *
     * @param id the id of the cilindrada to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cilindradas/{id}")
    public ResponseEntity<Void> deleteCilindrada(@PathVariable Long id) {
        log.debug("REST request to delete Cilindrada : {}", id);
        cilindradaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
