package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Cilindrada;
import soldimet.service.CilindradaService;
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
 * REST controller for managing Cilindrada.
 */
@RestController
@RequestMapping("/api")
public class CilindradaResource {

    private final Logger log = LoggerFactory.getLogger(CilindradaResource.class);

    private static final String ENTITY_NAME = "cilindrada";

    private final CilindradaService cilindradaService;

    public CilindradaResource(CilindradaService cilindradaService) {
        this.cilindradaService = cilindradaService;
    }

    /**
     * POST  /cilindradas : Create a new cilindrada.
     *
     * @param cilindrada the cilindrada to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cilindrada, or with status 400 (Bad Request) if the cilindrada has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cilindradas")
    @Timed
    public ResponseEntity<Cilindrada> createCilindrada(@Valid @RequestBody Cilindrada cilindrada) throws URISyntaxException {
        log.debug("REST request to save Cilindrada : {}", cilindrada);
        if (cilindrada.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new cilindrada cannot already have an ID")).body(null);
        }
        Cilindrada result = cilindradaService.save(cilindrada);
        return ResponseEntity.created(new URI("/api/cilindradas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cilindradas : Updates an existing cilindrada.
     *
     * @param cilindrada the cilindrada to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cilindrada,
     * or with status 400 (Bad Request) if the cilindrada is not valid,
     * or with status 500 (Internal Server Error) if the cilindrada couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cilindradas")
    @Timed
    public ResponseEntity<Cilindrada> updateCilindrada(@Valid @RequestBody Cilindrada cilindrada) throws URISyntaxException {
        log.debug("REST request to update Cilindrada : {}", cilindrada);
        if (cilindrada.getId() == null) {
            return createCilindrada(cilindrada);
        }
        Cilindrada result = cilindradaService.save(cilindrada);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cilindrada.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cilindradas : get all the cilindradas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cilindradas in body
     */
    @GetMapping("/cilindradas")
    @Timed
    public List<Cilindrada> getAllCilindradas() {
        log.debug("REST request to get all Cilindradas");
        return cilindradaService.findAll();
        }

    /**
     * GET  /cilindradas/:id : get the "id" cilindrada.
     *
     * @param id the id of the cilindrada to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cilindrada, or with status 404 (Not Found)
     */
    @GetMapping("/cilindradas/{id}")
    @Timed
    public ResponseEntity<Cilindrada> getCilindrada(@PathVariable Long id) {
        log.debug("REST request to get Cilindrada : {}", id);
        Cilindrada cilindrada = cilindradaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cilindrada));
    }

    /**
     * DELETE  /cilindradas/:id : delete the "id" cilindrada.
     *
     * @param id the id of the cilindrada to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cilindradas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCilindrada(@PathVariable Long id) {
        log.debug("REST request to delete Cilindrada : {}", id);
        cilindradaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
