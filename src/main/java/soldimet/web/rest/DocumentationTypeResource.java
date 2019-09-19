package soldimet.web.rest;

import soldimet.domain.DocumentationType;
import soldimet.repository.DocumentationTypeRepository;
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
 * REST controller for managing {@link soldimet.domain.DocumentationType}.
 */
@RestController
@RequestMapping("/api")
public class DocumentationTypeResource {

    private final Logger log = LoggerFactory.getLogger(DocumentationTypeResource.class);

    private static final String ENTITY_NAME = "documentationType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentationTypeRepository documentationTypeRepository;

    public DocumentationTypeResource(DocumentationTypeRepository documentationTypeRepository) {
        this.documentationTypeRepository = documentationTypeRepository;
    }

    /**
     * {@code POST  /documentation-types} : Create a new documentationType.
     *
     * @param documentationType the documentationType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentationType, or with status {@code 400 (Bad Request)} if the documentationType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/documentation-types")
    public ResponseEntity<DocumentationType> createDocumentationType(@Valid @RequestBody DocumentationType documentationType) throws URISyntaxException {
        log.debug("REST request to save DocumentationType : {}", documentationType);
        if (documentationType.getId() != null) {
            throw new BadRequestAlertException("A new documentationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentationType result = documentationTypeRepository.save(documentationType);
        return ResponseEntity.created(new URI("/api/documentation-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /documentation-types} : Updates an existing documentationType.
     *
     * @param documentationType the documentationType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentationType,
     * or with status {@code 400 (Bad Request)} if the documentationType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentationType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/documentation-types")
    public ResponseEntity<DocumentationType> updateDocumentationType(@Valid @RequestBody DocumentationType documentationType) throws URISyntaxException {
        log.debug("REST request to update DocumentationType : {}", documentationType);
        if (documentationType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentationType result = documentationTypeRepository.save(documentationType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, documentationType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /documentation-types} : get all the documentationTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentationTypes in body.
     */
    @GetMapping("/documentation-types")
    public List<DocumentationType> getAllDocumentationTypes() {
        log.debug("REST request to get all DocumentationTypes");
        return documentationTypeRepository.findAll();
    }

    /**
     * {@code GET  /documentation-types/:id} : get the "id" documentationType.
     *
     * @param id the id of the documentationType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentationType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/documentation-types/{id}")
    public ResponseEntity<DocumentationType> getDocumentationType(@PathVariable Long id) {
        log.debug("REST request to get DocumentationType : {}", id);
        Optional<DocumentationType> documentationType = documentationTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentationType);
    }

    /**
     * {@code DELETE  /documentation-types/:id} : delete the "id" documentationType.
     *
     * @param id the id of the documentationType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/documentation-types/{id}")
    public ResponseEntity<Void> deleteDocumentationType(@PathVariable Long id) {
        log.debug("REST request to delete DocumentationType : {}", id);
        documentationTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
