package soldimet.web.rest;

import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.service.ListaPrecioRectificacionCRAMService;
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

    public ListaPrecioRectificacionCRAMResource(ListaPrecioRectificacionCRAMService listaPrecioRectificacionCRAMService) {
        this.listaPrecioRectificacionCRAMService = listaPrecioRectificacionCRAMService;
    }

    /**
     * {@code POST  /lista-precio-rectificacion-crams} : Create a new listaPrecioRectificacionCRAM.
     *
     * @param listaPrecioRectificacionCRAM the listaPrecioRectificacionCRAM to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new listaPrecioRectificacionCRAM, or with status {@code 400 (Bad Request)} if the listaPrecioRectificacionCRAM has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lista-precio-rectificacion-crams")
    public ResponseEntity<ListaPrecioRectificacionCRAM> createListaPrecioRectificacionCRAM(@Valid @RequestBody ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM) throws URISyntaxException {
        log.debug("REST request to save ListaPrecioRectificacionCRAM : {}", listaPrecioRectificacionCRAM);
        if (listaPrecioRectificacionCRAM.getId() != null) {
            throw new BadRequestAlertException("A new listaPrecioRectificacionCRAM cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListaPrecioRectificacionCRAM result = listaPrecioRectificacionCRAMService.save(listaPrecioRectificacionCRAM);
        return ResponseEntity.created(new URI("/api/lista-precio-rectificacion-crams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lista-precio-rectificacion-crams} : Updates an existing listaPrecioRectificacionCRAM.
     *
     * @param listaPrecioRectificacionCRAM the listaPrecioRectificacionCRAM to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listaPrecioRectificacionCRAM,
     * or with status {@code 400 (Bad Request)} if the listaPrecioRectificacionCRAM is not valid,
     * or with status {@code 500 (Internal Server Error)} if the listaPrecioRectificacionCRAM couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lista-precio-rectificacion-crams")
    public ResponseEntity<ListaPrecioRectificacionCRAM> updateListaPrecioRectificacionCRAM(@Valid @RequestBody ListaPrecioRectificacionCRAM listaPrecioRectificacionCRAM) throws URISyntaxException {
        log.debug("REST request to update ListaPrecioRectificacionCRAM : {}", listaPrecioRectificacionCRAM);
        if (listaPrecioRectificacionCRAM.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ListaPrecioRectificacionCRAM result = listaPrecioRectificacionCRAMService.save(listaPrecioRectificacionCRAM);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, listaPrecioRectificacionCRAM.getId().toString()))
            .body(result);
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
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
