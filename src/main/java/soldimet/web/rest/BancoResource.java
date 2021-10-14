package soldimet.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soldimet.domain.Banco;
import soldimet.repository.BancoRepository;
import soldimet.service.BancoService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.Banco}.
 */
@RestController
@RequestMapping("/api")
public class BancoResource {

    private final Logger log = LoggerFactory.getLogger(BancoResource.class);

    private static final String ENTITY_NAME = "banco";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BancoService bancoService;

    private final BancoRepository bancoRepository;

    public BancoResource(BancoService bancoService, BancoRepository bancoRepository) {
        this.bancoService = bancoService;
        this.bancoRepository = bancoRepository;
    }

    /**
     * {@code POST  /bancos} : Create a new banco.
     *
     * @param banco the banco to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new banco, or with status {@code 400 (Bad Request)} if the banco has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bancos")
    public ResponseEntity<Banco> createBanco(@Valid @RequestBody Banco banco) throws URISyntaxException {
        log.debug("REST request to save Banco : {}", banco);
        if (banco.getId() != null) {
            throw new BadRequestAlertException("A new banco cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Banco result = bancoService.save(banco);
        return ResponseEntity
            .created(new URI("/api/bancos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bancos/:id} : Updates an existing banco.
     *
     * @param id the id of the banco to save.
     * @param banco the banco to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated banco,
     * or with status {@code 400 (Bad Request)} if the banco is not valid,
     * or with status {@code 500 (Internal Server Error)} if the banco couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bancos/{id}")
    public ResponseEntity<Banco> updateBanco(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Banco banco)
        throws URISyntaxException {
        log.debug("REST request to update Banco : {}, {}", id, banco);
        if (banco.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, banco.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bancoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Banco result = bancoService.save(banco);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, banco.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /bancos/:id} : Partial updates given fields of an existing banco, field will ignore if it is null
     *
     * @param id the id of the banco to save.
     * @param banco the banco to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated banco,
     * or with status {@code 400 (Bad Request)} if the banco is not valid,
     * or with status {@code 404 (Not Found)} if the banco is not found,
     * or with status {@code 500 (Internal Server Error)} if the banco couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/bancos/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Banco> partialUpdateBanco(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Banco banco
    ) throws URISyntaxException {
        log.debug("REST request to partial update Banco partially : {}, {}", id, banco);
        if (banco.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, banco.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bancoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Banco> result = bancoService.partialUpdate(banco);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, banco.getId().toString())
        );
    }

    /**
     * {@code GET  /bancos} : get all the bancos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bancos in body.
     */
    @GetMapping("/bancos")
    public List<Banco> getAllBancos() {
        log.debug("REST request to get all Bancos");
        return bancoService.findAll();
    }

    /**
     * {@code GET  /bancos/:id} : get the "id" banco.
     *
     * @param id the id of the banco to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the banco, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bancos/{id}")
    public ResponseEntity<Banco> getBanco(@PathVariable Long id) {
        log.debug("REST request to get Banco : {}", id);
        Optional<Banco> banco = bancoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(banco);
    }

    /**
     * {@code DELETE  /bancos/:id} : delete the "id" banco.
     *
     * @param id the id of the banco to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bancos/{id}")
    public ResponseEntity<Void> deleteBanco(@PathVariable Long id) {
        log.debug("REST request to delete Banco : {}", id);
        bancoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
