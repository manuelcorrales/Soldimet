package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.DocumentationType;
import soldimet.repository.DocumentationTypeRepository;
import soldimet.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DocumentationTypeResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class DocumentationTypeResourceIT {

    private static final String DEFAULT_DOCUMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NAME = "BBBBBBBBBB";

    @Autowired
    private DocumentationTypeRepository documentationTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDocumentationTypeMockMvc;

    private DocumentationType documentationType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentationTypeResource documentationTypeResource = new DocumentationTypeResource(documentationTypeRepository);
        this.restDocumentationTypeMockMvc = MockMvcBuilders.standaloneSetup(documentationTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentationType createEntity(EntityManager em) {
        DocumentationType documentationType = new DocumentationType()
            .documentName(DEFAULT_DOCUMENT_NAME);
        return documentationType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentationType createUpdatedEntity(EntityManager em) {
        DocumentationType documentationType = new DocumentationType()
            .documentName(UPDATED_DOCUMENT_NAME);
        return documentationType;
    }

    @BeforeEach
    public void initTest() {
        documentationType = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentationType() throws Exception {
        int databaseSizeBeforeCreate = documentationTypeRepository.findAll().size();

        // Create the DocumentationType
        restDocumentationTypeMockMvc.perform(post("/api/documentation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentationType)))
            .andExpect(status().isCreated());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentationType testDocumentationType = documentationTypeList.get(documentationTypeList.size() - 1);
        assertThat(testDocumentationType.getDocumentName()).isEqualTo(DEFAULT_DOCUMENT_NAME);
    }

    @Test
    @Transactional
    public void createDocumentationTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentationTypeRepository.findAll().size();

        // Create the DocumentationType with an existing ID
        documentationType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentationTypeMockMvc.perform(post("/api/documentation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentationType)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDocumentNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentationTypeRepository.findAll().size();
        // set the field null
        documentationType.setDocumentName(null);

        // Create the DocumentationType, which fails.

        restDocumentationTypeMockMvc.perform(post("/api/documentation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentationType)))
            .andExpect(status().isBadRequest());

        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDocumentationTypes() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        // Get all the documentationTypeList
        restDocumentationTypeMockMvc.perform(get("/api/documentation-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].documentName").value(hasItem(DEFAULT_DOCUMENT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getDocumentationType() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        // Get the documentationType
        restDocumentationTypeMockMvc.perform(get("/api/documentation-types/{id}", documentationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentationType.getId().intValue()))
            .andExpect(jsonPath("$.documentName").value(DEFAULT_DOCUMENT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentationType() throws Exception {
        // Get the documentationType
        restDocumentationTypeMockMvc.perform(get("/api/documentation-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentationType() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();

        // Update the documentationType
        DocumentationType updatedDocumentationType = documentationTypeRepository.findById(documentationType.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentationType are not directly saved in db
        em.detach(updatedDocumentationType);
        updatedDocumentationType
            .documentName(UPDATED_DOCUMENT_NAME);

        restDocumentationTypeMockMvc.perform(put("/api/documentation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentationType)))
            .andExpect(status().isOk());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
        DocumentationType testDocumentationType = documentationTypeList.get(documentationTypeList.size() - 1);
        assertThat(testDocumentationType.getDocumentName()).isEqualTo(UPDATED_DOCUMENT_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentationType() throws Exception {
        int databaseSizeBeforeUpdate = documentationTypeRepository.findAll().size();

        // Create the DocumentationType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentationTypeMockMvc.perform(put("/api/documentation-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentationType)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentationType in the database
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentationType() throws Exception {
        // Initialize the database
        documentationTypeRepository.saveAndFlush(documentationType);

        int databaseSizeBeforeDelete = documentationTypeRepository.findAll().size();

        // Delete the documentationType
        restDocumentationTypeMockMvc.perform(delete("/api/documentation-types/{id}", documentationType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DocumentationType> documentationTypeList = documentationTypeRepository.findAll();
        assertThat(documentationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentationType.class);
        DocumentationType documentationType1 = new DocumentationType();
        documentationType1.setId(1L);
        DocumentationType documentationType2 = new DocumentationType();
        documentationType2.setId(documentationType1.getId());
        assertThat(documentationType1).isEqualTo(documentationType2);
        documentationType2.setId(2L);
        assertThat(documentationType1).isNotEqualTo(documentationType2);
        documentationType1.setId(null);
        assertThat(documentationType1).isNotEqualTo(documentationType2);
    }
}
