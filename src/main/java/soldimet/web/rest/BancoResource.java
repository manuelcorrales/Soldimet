package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.Banco;
import soldimet.service.BancoService;
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
 * REST controller for managing Banco.
 */
@RestController
@RequestMapping("/api")
public class BancoResource {

    private final Logger log = LoggerFactory.getLogger(BancoResource.class);

    private static final String ENTITY_NAME = "banco";

    private final BancoService bancoService;

    public BancoResource(BancoService bancoService) {
        this.bancoService = bancoService;
    }

    /**
     * POST  /bancos : Create a new banco.
     *
     * @param banco the banco to create
     * @return the ResponseEntity with status 201 (Created) and with body the new banco, or with status 400 (Bad Request) if the banco has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bancos")
    @Timed
    public ResponseEntity<Banco> createBanco(@Valid @RequestBody Banco banco) throws URISyntaxException {
        log.debug("REST request to save Banco : {}", banco);
        if (banco.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new banco cannot already have an ID")).body(null);
        }
        Banco result = bancoService.save(banco);
        return ResponseEntity.created(new URI("/api/bancos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bancos : Updates an existing banco.
     *
     * @param banco the banco to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated banco,
     * or with status 400 (Bad Request) if the banco is not valid,
     * or with status 500 (Internal Server Error) if the banco couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bancos")
    @Timed
    public ResponseEntity<Banco> updateBanco(@Valid @RequestBody Banco banco) throws URISyntaxException {
        log.debug("REST request to update Banco : {}", banco);
        if (banco.getId() == null) {
            return createBanco(banco);
        }
        Banco result = bancoService.save(banco);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, banco.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bancos : get all the bancos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bancos in body
     */
    @GetMapping("/bancos")
    @Timed
    public List<Banco> getAllBancos() {
        log.debug("REST request to get all Bancos");
        return bancoService.findAll();
        }

    /**
     * GET  /bancos/:id : get the "id" banco.
     *
     * @param id the id of the banco to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the banco, or with status 404 (Not Found)
     */
    @GetMapping("/bancos/{id}")
    @Timed
    public ResponseEntity<Banco> getBanco(@PathVariable Long id) {
        log.debug("REST request to get Banco : {}", id);
        Banco banco = bancoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(banco));
    }

    /**
     * DELETE  /bancos/:id : delete the "id" banco.
     *
     * @param id the id of the banco to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bancos/{id}")
    @Timed
    public ResponseEntity<Void> deleteBanco(@PathVariable Long id) {
        log.debug("REST request to delete Banco : {}", id);
        bancoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
