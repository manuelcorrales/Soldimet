package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.Rubro;
import soldimet.repository.RubroRepository;
import soldimet.service.RubroService;
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
 * Integration tests for the {@link RubroResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class RubroResourceIT {

    private static final String DEFAULT_NOMBRE_RUBRO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_RUBRO = "BBBBBBBBBB";

    @Autowired
    private RubroRepository rubroRepository;

    @Autowired
    private RubroService rubroService;

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

    private MockMvc restRubroMockMvc;

    private Rubro rubro;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RubroResource rubroResource = new RubroResource(rubroService);
        this.restRubroMockMvc = MockMvcBuilders.standaloneSetup(rubroResource)
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
    public static Rubro createEntity(EntityManager em) {
        Rubro rubro = new Rubro()
            .nombreRubro(DEFAULT_NOMBRE_RUBRO);
        return rubro;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rubro createUpdatedEntity(EntityManager em) {
        Rubro rubro = new Rubro()
            .nombreRubro(UPDATED_NOMBRE_RUBRO);
        return rubro;
    }

    @BeforeEach
    public void initTest() {
        rubro = createEntity(em);
    }

    @Test
    @Transactional
    public void createRubro() throws Exception {
        int databaseSizeBeforeCreate = rubroRepository.findAll().size();

        // Create the Rubro
        restRubroMockMvc.perform(post("/api/rubros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isCreated());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeCreate + 1);
        Rubro testRubro = rubroList.get(rubroList.size() - 1);
        assertThat(testRubro.getNombreRubro()).isEqualTo(DEFAULT_NOMBRE_RUBRO);
    }

    @Test
    @Transactional
    public void createRubroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rubroRepository.findAll().size();

        // Create the Rubro with an existing ID
        rubro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRubroMockMvc.perform(post("/api/rubros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isBadRequest());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreRubroIsRequired() throws Exception {
        int databaseSizeBeforeTest = rubroRepository.findAll().size();
        // set the field null
        rubro.setNombreRubro(null);

        // Create the Rubro, which fails.

        restRubroMockMvc.perform(post("/api/rubros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isBadRequest());

        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRubros() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        // Get all the rubroList
        restRubroMockMvc.perform(get("/api/rubros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rubro.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreRubro").value(hasItem(DEFAULT_NOMBRE_RUBRO.toString())));
    }
    
    @Test
    @Transactional
    public void getRubro() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        // Get the rubro
        restRubroMockMvc.perform(get("/api/rubros/{id}", rubro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rubro.getId().intValue()))
            .andExpect(jsonPath("$.nombreRubro").value(DEFAULT_NOMBRE_RUBRO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRubro() throws Exception {
        // Get the rubro
        restRubroMockMvc.perform(get("/api/rubros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRubro() throws Exception {
        // Initialize the database
        rubroService.save(rubro);

        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();

        // Update the rubro
        Rubro updatedRubro = rubroRepository.findById(rubro.getId()).get();
        // Disconnect from session so that the updates on updatedRubro are not directly saved in db
        em.detach(updatedRubro);
        updatedRubro
            .nombreRubro(UPDATED_NOMBRE_RUBRO);

        restRubroMockMvc.perform(put("/api/rubros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRubro)))
            .andExpect(status().isOk());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
        Rubro testRubro = rubroList.get(rubroList.size() - 1);
        assertThat(testRubro.getNombreRubro()).isEqualTo(UPDATED_NOMBRE_RUBRO);
    }

    @Test
    @Transactional
    public void updateNonExistingRubro() throws Exception {
        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();

        // Create the Rubro

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRubroMockMvc.perform(put("/api/rubros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isBadRequest());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRubro() throws Exception {
        // Initialize the database
        rubroService.save(rubro);

        int databaseSizeBeforeDelete = rubroRepository.findAll().size();

        // Delete the rubro
        restRubroMockMvc.perform(delete("/api/rubros/{id}", rubro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rubro.class);
        Rubro rubro1 = new Rubro();
        rubro1.setId(1L);
        Rubro rubro2 = new Rubro();
        rubro2.setId(rubro1.getId());
        assertThat(rubro1).isEqualTo(rubro2);
        rubro2.setId(2L);
        assertThat(rubro1).isNotEqualTo(rubro2);
        rubro1.setId(null);
        assertThat(rubro1).isNotEqualTo(rubro2);
    }
}
