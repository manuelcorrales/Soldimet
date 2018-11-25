package soldimet.web.rest;

import com.codahale.metrics.annotation.Timed;
import soldimet.domain.DocumentationType;
import soldimet.repository.DocumentationTypeRepository;
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
 * REST controller for managing DocumentationType.
 */
@RestController
@RequestMapping("/api")
public class DocumentationTypeResource {

    private final Logger log = LoggerFactory.getLogger(DocumentationTypeResource.class);

    private static final String ENTITY_NAME = "documentationType";

    private final DocumentationTypeRepository documentationTypeRepository;

    public DocumentationTypeResource(DocumentationTypeRepository documentationTypeRepository) {
        this.documentationTypeRepository = documentationTypeRepository;
    }

    /**
     * POST  /documentation-types : Create a new documentationType.
     *
     * @param documentationType the documentationType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentationType, or with status 400 (Bad Request) if the documentationType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documentation-types")
    @Timed
    public ResponseEntity<DocumentationType> createDocumentationType(@Valid @RequestBody DocumentationType documentationType) throws URISyntaxException {
        log.debug("REST request to save DocumentationType : {}", documentationType);
        if (documentationType.getId() != null) {
            throw new BadRequestAlertException("A new documentationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentationType result = documentationTypeRepository.save(documentationType);
        return ResponseEntity.created(new URI("/api/documentation-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documentation-types : Updates an existing documentationType.
     *
     * @param documentationType the documentationType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentationType,
     * or with status 400 (Bad Request) if the documentationType is not valid,
     * or with status 500 (Internal Server Error) if the documentationType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documentation-types")
    @Timed
    public ResponseEntity<DocumentationType> updateDocumentationType(@Valid @RequestBody DocumentationType documentationType) throws URISyntaxException {
        log.debug("REST request to update DocumentationType : {}", documentationType);
        if (documentationType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentationType result = documentationTypeRepository.save(documentationType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentationType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documentation-types : get all the documentationTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentationTypes in body
     */
    @GetMapping("/documentation-types")
    @Timed
    public List<DocumentationType> getAllDocumentationTypes() {
        log.debug("REST request to get all DocumentationTypes");
        return documentationTypeRepository.findAll();
    }

    /**
     * GET  /documentation-types/:id : get the "id" documentationType.
     *
     * @param id the id of the documentationType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentationType, or with status 404 (Not Found)
     */
    @GetMapping("/documentation-types/{id}")
    @Timed
    public ResponseEntity<DocumentationType> getDocumentationType(@PathVariable Long id) {
        log.debug("REST request to get DocumentationType : {}", id);
        Optional<DocumentationType> documentationType = documentationTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentationType);
    }

    /**
     * DELETE  /documentation-types/:id : delete the "id" documentationType.
     *
     * @param id the id of the documentationType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documentation-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentationType(@PathVariable Long id) {
        log.debug("REST request to delete DocumentationType : {}", id);

        documentationTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
