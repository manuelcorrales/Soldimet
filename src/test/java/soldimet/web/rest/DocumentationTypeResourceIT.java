package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import soldimet.IntegrationTest;
import soldimet.domain.DocumentationType;
import soldimet.repository.DocumentationTypeRepository;

/**
 * Integration tests for the {@link DocumentationTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DocumentationTypeResourceIT {

    private static final String DEFAULT_DOCUMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/documentation-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DocumentationTypeRepository documentationTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDocumentationTypeMockMvc;

    private DocumentationType documentationType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentationType createEntity(EntityManager em) {
        DocumentationType documentationType = new DocumentationType().documentName(DEFAULT_DOCUMENT_NAME);
        return documentationType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentationType createUpdatedEntity(EntityManager em) {
        DocumentationType documentationType = new DocumentationType().documentName(UPDATED_DOCUMENT_NAME);
        return documentationType;
    }

    @BeforeEach
    public void initTest() {
        documentationType = createEntity(em);
    }

    @Test
    @Transactional
    void createDocumentationType() throws Exception {
        int databaseSizeBeforeCreate = documentationTypeRepository.findAll().size();
        // Create the DocumentationType
        restDocumentationTypeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isCreated());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentationType testDocumentationType = documentationTypeList.get(documentationTypeList.size() - 1);
        assertThat(testDocumentationType.getDocumentName()).isEqualTo(DEFAULT_DOCUMENT_NAME);
    }

    @Test
    @Transactional
    void createDocumentationTypeWithExistingId() throws Exception {
        // Create the DocumentationType with an existing ID
        documentationType.setId(1L);

        int databaseSizeBeforeCreate = documentationTypeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentationTypeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDocumentNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentationTypeRepository.findAll().size();
        // set the field null
        documentationType.setDocumentName(null);

        // Create the DocumentationType, which fails.

        restDocumentationTypeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isBadRequest());

        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDocumentationTypes() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        // Get all the documentationTypeList
        restDocumentationTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentName").value(hasItem(DEFAULT_DOCUMENT_NAME)));
    }

    @Test
    @Transactional
    void getDocumentationType() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        // Get the documentationType
        restDocumentationTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, documentationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(documentationType.getId().intValue()))
            .andExpect(jsonPath("$.documentName").value(DEFAULT_DOCUMENT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingDocumentationType() throws Exception {
        // Get the documentationType
        restDocumentationTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDocumentationType() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();

        // Update the documentationType
        DocumentationType updatedDocumentationType = documentationTypeRepository.findById(documentationType.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentationType are not directly saved in db
        em.detach(updatedDocumentationType);
        updatedDocumentationType.documentName(UPDATED_DOCUMENT_NAME);

        restDocumentationTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDocumentationType.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDocumentationType))
            )
            .andExpect(status().isOk());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
        DocumentationType testDocumentationType = documentationTypeList.get(documentationTypeList.size() - 1);
        assertThat(testDocumentationType.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
    }

    @Test
    @Transactional
    void putNonExistingDocumentationType() throws Exception {
        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();
        documentationType.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentationTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, documentationType.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDocumentationType() throws Exception {
        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();
        documentationType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentationTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDocumentationType() throws Exception {
        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();
        documentationType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentationTypeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDocumentationTypeWithPatch() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();

        // Update the documentationType using partial update
        DocumentationType partialUpdatedDocumentationType = new DocumentationType();
        partialUpdatedDocumentationType.setId(documentationType.getId());

        partialUpdatedDocumentationType.documentName(UPDATED_DOCUMENT_NAME);

        restDocumentationTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDocumentationType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDocumentationType))
            )
            .andExpect(status().isOk());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
        DocumentationType testDocumentationType = documentationTypeList.get(documentationTypeList.size() - 1);
        assertThat(testDocumentationType.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateDocumentationTypeWithPatch() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();

        // Update the documentationType using partial update
        DocumentationType partialUpdatedDocumentationType = new DocumentationType();
        partialUpdatedDocumentationType.setId(documentationType.getId());

        partialUpdatedDocumentationType.documentName(UPDATED_DOCUMENT_NAME);

        restDocumentationTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDocumentationType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDocumentationType))
            )
            .andExpect(status().isOk());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
        DocumentationType testDocumentationType = documentationTypeList.get(documentationTypeList.size() - 1);
        assertThat(testDocumentationType.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingDocumentationType() throws Exception {
        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();
        documentationType.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentationTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, documentationType.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDocumentationType() throws Exception {
        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();
        documentationType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentationTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDocumentationType() throws Exception {
        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();
        documentationType.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentationTypeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(documentationType))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDocumentationType() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        int databaseSizeBeforeDelete = documentationTypeRepository.findAll().size();

        // Delete the documentationType
        restDocumentationTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, documentationType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
