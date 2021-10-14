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
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;
import soldimet.service.ListaPrecioRectificacionCRAMService;
import soldimet.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link soldimet.domain.ListaPrecioRectificacionCRAM}.
 */
@RestController
@RequestMapping("/api")
public class ListaPrecioRectificacionCRAMResource {

    private final Logger log = LoggerFactory.getLogger(ListaPrecioRectificacionCRAMResource.class);

    private static final String ENTITY_NAME = "listaPrecioRectificacionCRAM";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ListaPrecioRectificacionCRAMService listaPrecioRectificacionCRAMService;

    private final ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    public ListaPrecioRectificacionCRAMResource(
        ListaPrecioRectificacionCRAMService listaPrecioRectificacionCRAMService,
        ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository
    ) {
        this.listaPrecioRectificacionCRAMService = listaPrecioRectificacionCRAMService;
        this.listaPrecioRectificacionCRAMRepository = listaPrecioRectificacionCRAMRepository;
    }

    /**
     * {@code POST  /lista-precio-rectificacion-crams} : Create a new listaPrecioRectificacionCRAM.
     *
     * @param listaPrecioRectificacionCRAM the listaPrecioRectificacionCRAM to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new listaPrecioRectificacionCRAM, or with status {@code 400 (Bad Request)} if the listaPrecioRectificacionCRAM has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lista-precio-rectificacion-crams")
    public ResponseEntity<ListaPrecioRectificacionCRAM> createListaPrecioRectificacionCRAM(
        @Valid @RequestBody ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM
    ) throws URISyntaxException {
        log.debug("REST request to save ListaPrecioRectificacionCRAM : {}", listaPrecioRectificacionCRAM);
        if (listaPrecioRectificacionCRAM.getId() != null) {
            throw new BadRequestAlertException("A new listaPrecioRectificacionCRAM cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListaPrecioRectificacionCRAM result = listaPrecioRectificacionCRAMService.save(listaPrecioRectificacionCRAM);
        return ResponseEntity
            .created(new URI("/api/lista-precio-rectificacion-crams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lista-precio-rectificacion-crams/:id} : Updates an existing listaPrecioRectificacionCRAM.
     *
     * @param id the id of the listaPrecioRectificacionCRAM to save.
     * @param listaPrecioRectificacionCRAM the listaPrecioRectificacionCRAM to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listaPrecioRectificacionCRAM,
     * or with status {@code 400 (Bad Request)} if the listaPrecioRectificacionCRAM is not valid,
     * or with status {@code 500 (Internal Server Error)} if the listaPrecioRectificacionCRAM couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lista-precio-rectificacion-crams/{id}")
    public ResponseEntity<ListaPrecioRectificacionCRAM> updateListaPrecioRectificacionCRAM(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM
    ) throws URISyntaxException {
        log.debug("REST request to update ListaPrecioRectificacionCRAM : {}, {}", id, listaPrecioRectificacionCRAM);
        if (listaPrecioRectificacionCRAM.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, listaPrecioRectificacionCRAM.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!listaPrecioRectificacionCRAMRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ListaPrecioRectificacionCRAM result = listaPrecioRectificacionCRAMService.save(listaPrecioRectificacionCRAM);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, listaPrecioRectificacionCRAM.getId().toString())
            )
            .body(result);
    }

    /**
     * {@code PATCH  /lista-precio-rectificacion-crams/:id} : Partial updates given fields of an existing listaPrecioRectificacionCRAM, field will ignore if it is null
     *
     * @param id the id of the listaPrecioRectificacionCRAM to save.
     * @param listaPrecioRectificacionCRAM the listaPrecioRectificacionCRAM to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listaPrecioRectificacionCRAM,
     * or with status {@code 400 (Bad Request)} if the listaPrecioRectificacionCRAM is not valid,
     * or with status {@code 404 (Not Found)} if the listaPrecioRectificacionCRAM is not found,
     * or with status {@code 500 (Internal Server Error)} if the listaPrecioRectificacionCRAM couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lista-precio-rectificacion-crams/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ListaPrecioRectificacionCRAM> partialUpdateListaPrecioRectificacionCRAM(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM
    ) throws URISyntaxException {
        log.debug("REST request to partial update ListaPrecioRectificacionCRAM partially : {}, {}", id, listaPrecioRectificacionCRAM);
        if (listaPrecioRectificacionCRAM.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, listaPrecioRectificacionCRAM.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!listaPrecioRectificacionCRAMRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ListaPrecioRectificacionCRAM> result = listaPrecioRectificacionCRAMService.partialUpdate(listaPrecioRectificacionCRAM);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, listaPrecioRectificacionCRAM.getId().toString())
        );
    }

    /**
     * {@code GET  /lista-precio-rectificacion-crams} : get all the listaPrecioRectificacionCRAMS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of listaPrecioRectificacionCRAMS in body.
     */
    @GetMapping("/lista-precio-rectificacion-crams")
    public List<ListaPrecioRectificacionCRAM> getAllListaPrecioRectificacionCRAMS() {
        log.debug("REST request to get all ListaPrecioRectificacionCRAMS");
        return listaPrecioRectificacionCRAMService.findAll();
    }

    /**
     * {@code GET  /lista-precio-rectificacion-crams/:id} : get the "id" listaPrecioRectificacionCRAM.
     *
     * @param id the id of the listaPrecioRectificacionCRAM to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the listaPrecioRectificacionCRAM, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lista-precio-rectificacion-crams/{id}")
    public ResponseEntity<ListaPrecioRectificacionCRAM> getListaPrecioRectificacionCRAM(@PathVariable Long id) {
        log.debug("REST request to get ListaPrecioRectificacionCRAM : {}", id);
        Optional<ListaPrecioRectificacionCRAM> listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAMService.findOne(id);
        return ResponseUtil.wrapOrNotFound(listaPrecioRectificacionCRAM);
    }

    /**
     * {@code DELETE  /lista-precio-rectificacion-crams/:id} : delete the "id" listaPrecioRectificacionCRAM.
     *
     * @param id the id of the listaPrecioRectificacionCRAM to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lista-precio-rectificacion-crams/{id}")
    public ResponseEntity<Void> deleteListaPrecioRectificacionCRAM(@PathVariable Long id) {
        log.debug("REST request to delete ListaPrecioRectificacionCRAM : {}", id);
        listaPrecioRectificacionCRAMService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
