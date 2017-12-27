package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.TipoParteMotor;
import soldimet.repository.TipoParteMotorRepository;
import soldimet.service.TipoParteMotorService;
import soldimet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TipoParteMotorResource REST controller.
 *
 * @see TipoParteMotorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class TipoParteMotorResourceIntTest {

    private static final String DEFAULT_NOMBRE_TIPO_PARTE_MOTOR = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_PARTE_MOTOR = "BBBBBBBBBB";

    @Autowired
    private TipoParteMotorRepository tipoParteMotorRepository;

    @Autowired
    private TipoParteMotorService tipoParteMotorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoParteMotorMockMvc;

    private TipoParteMotor tipoParteMotor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoParteMotorResource tipoParteMotorResource = new TipoParteMotorResource(tipoParteMotorService);
        this.restTipoParteMotorMockMvc = MockMvcBuilders.standaloneSetup(tipoParteMotorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoParteMotor createEntity(EntityManager em) {
        TipoParteMotor tipoParteMotor = new TipoParteMotor()
            .nombreTipoParteMotor(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR);
        return tipoParteMotor;
    }

    @Before
    public void initTest() {
        tipoParteMotor = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoParteMotor() throws Exception {
        int databaseSizeBeforeCreate = tipoParteMotorRepository.findAll().size();

        // Create the TipoParteMotor
        restTipoParteMotorMockMvc.perform(post("/api/tipo-parte-motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor)))
            .andExpect(status().isCreated());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeCreate + 1);
        TipoParteMotor testTipoParteMotor = tipoParteMotorList.get(tipoParteMotorList.size() - 1);
        assertThat(testTipoParteMotor.getNombreTipoParteMotor()).isEqualTo(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR);
    }

    @Test
    @Transactional
    public void createTipoParteMotorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoParteMotorRepository.findAll().size();

        // Create the TipoParteMotor with an existing ID
        tipoParteMotor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoParteMotorMockMvc.perform(post("/api/tipo-parte-motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor)))
            .andExpect(status().isBadRequest());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreTipoParteMotorIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoParteMotorRepository.findAll().size();
        // set the field null
        tipoParteMotor.setNombreTipoParteMotor(null);

        // Create the TipoParteMotor, which fails.

        restTipoParteMotorMockMvc.perform(post("/api/tipo-parte-motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor)))
            .andExpect(status().isBadRequest());

        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoParteMotors() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        // Get all the tipoParteMotorList
        restTipoParteMotorMockMvc.perform(get("/api/tipo-parte-motors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoParteMotor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoParteMotor").value(hasItem(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR.toString())));
    }

    @Test
    @Transactional
    public void getTipoParteMotor() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        // Get the tipoParteMotor
        restTipoParteMotorMockMvc.perform(get("/api/tipo-parte-motors/{id}", tipoParteMotor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoParteMotor.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoParteMotor").value(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoParteMotor() throws Exception {
        // Get the tipoParteMotor
        restTipoParteMotorMockMvc.perform(get("/api/tipo-parte-motors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoParteMotor() throws Exception {
        // Initialize the database
        tipoParteMotorService.save(tipoParteMotor);

        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();

        // Update the tipoParteMotor
        TipoParteMotor updatedTipoParteMotor = tipoParteMotorRepository.findOne(tipoParteMotor.getId());
        updatedTipoParteMotor
            .nombreTipoParteMotor(UPDATED_NOMBRE_TIPO_PARTE_MOTOR);

        restTipoParteMotorMockMvc.perform(put("/api/tipo-parte-motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoParteMotor)))
            .andExpect(status().isOk());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
        TipoParteMotor testTipoParteMotor = tipoParteMotorList.get(tipoParteMotorList.size() - 1);
        assertThat(testTipoParteMotor.getNombreTipoParteMotor()).isEqualTo(UPDATED_NOMBRE_TIPO_PARTE_MOTOR);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoParteMotor() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();

        // Create the TipoParteMotor

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoParteMotorMockMvc.perform(put("/api/tipo-parte-motors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor)))
            .andExpect(status().isCreated());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoParteMotor() throws Exception {
        // Initialize the database
        tipoParteMotorService.save(tipoParteMotor);

        int databaseSizeBeforeDelete = tipoParteMotorRepository.findAll().size();

        // Get the tipoParteMotor
        restTipoParteMotorMockMvc.perform(delete("/api/tipo-parte-motors/{id}", tipoParteMotor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoParteMotor.class);
        TipoParteMotor tipoParteMotor1 = new TipoParteMotor();
        tipoParteMotor1.setId(1L);
        TipoParteMotor tipoParteMotor2 = new TipoParteMotor();
        tipoParteMotor2.setId(tipoParteMotor1.getId());
        assertThat(tipoParteMotor1).isEqualTo(tipoParteMotor2);
        tipoParteMotor2.setId(2L);
        assertThat(tipoParteMotor1).isNotEqualTo(tipoParteMotor2);
        tipoParteMotor1.setId(null);
        assertThat(tipoParteMotor1).isNotEqualTo(tipoParteMotor2);
    }
}
