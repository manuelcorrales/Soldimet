package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.TipoRepuesto;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.TipoRepuestoRepository;
import soldimet.service.TipoRepuestoService;
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
 * Integration tests for the {@link TipoRepuestoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class TipoRepuestoResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO_REPUESTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_REPUESTO = "BBBBBBBBBB";

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private TipoRepuestoService tipoRepuestoService;

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

    private MockMvc restTipoRepuestoMockMvc;

    private TipoRepuesto tipoRepuesto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoRepuestoResource tipoRepuestoResource = new TipoRepuestoResource(tipoRepuestoService);
        this.restTipoRepuestoMockMvc = MockMvcBuilders.standaloneSetup(tipoRepuestoResource)
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
    public static TipoRepuesto createEntity(EntityManager em) {
        TipoRepuesto tipoRepuesto = new TipoRepuesto()
            .nombreTipoRepuesto(DEFAULT_NOMBRE_TIPO_REPUESTO);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        tipoRepuesto.setTipoParteMotor(tipoParteMotor);
        return tipoRepuesto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoRepuesto createUpdatedEntity(EntityManager em) {
        TipoRepuesto tipoRepuesto = new TipoRepuesto()
            .nombreTipoRepuesto(UPDATED_NOMBRE_TIPO_REPUESTO);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createUpdatedEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        tipoRepuesto.setTipoParteMotor(tipoParteMotor);
        return tipoRepuesto;
    }

    @BeforeEach
    public void initTest() {
        tipoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = tipoRepuestoRepository.findAll().size();

        // Create the TipoRepuesto
        restTipoRepuestoMockMvc.perform(post("/api/tipo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoRepuesto testTipoRepuesto = tipoRepuestoList.get(tipoRepuestoList.size() - 1);
        assertThat(testTipoRepuesto.getNombreTipoRepuesto()).isEqualTo(DEFAULT_NOMBRE_TIPO_REPUESTO);
    }

    @Test
    @Transactional
    public void createTipoRepuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoRepuestoRepository.findAll().size();

        // Create the TipoRepuesto with an existing ID
        tipoRepuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoRepuestoMockMvc.perform(post("/api/tipo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNombreTipoRepuestoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoRepuestoRepository.findAll().size();
        // set the field null
        tipoRepuesto.setNombreTipoRepuesto(null);

        // Create the TipoRepuesto, which fails.

        restTipoRepuestoMockMvc.perform(post("/api/tipo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isBadRequest());

        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoRepuestos() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        // Get all the tipoRepuestoList
        restTipoRepuestoMockMvc.perform(get("/api/tipo-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoRepuesto").value(hasItem(DEFAULT_NOMBRE_TIPO_REPUESTO.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoRepuesto() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        // Get the tipoRepuesto
        restTipoRepuestoMockMvc.perform(get("/api/tipo-repuestos/{id}", tipoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoRepuesto").value(DEFAULT_NOMBRE_TIPO_REPUESTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoRepuesto() throws Exception {
        // Get the tipoRepuesto
        restTipoRepuestoMockMvc.perform(get("/api/tipo-repuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoRepuesto() throws Exception {
        // Initialize the database
        tipoRepuestoService.save(tipoRepuesto);

        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();

        // Update the tipoRepuesto
        TipoRepuesto updatedTipoRepuesto = tipoRepuestoRepository.findById(tipoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedTipoRepuesto are not directly saved in db
        em.detach(updatedTipoRepuesto);
        updatedTipoRepuesto
            .nombreTipoRepuesto(UPDATED_NOMBRE_TIPO_REPUESTO);

        restTipoRepuestoMockMvc.perform(put("/api/tipo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoRepuesto)))
            .andExpect(status().isOk());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        TipoRepuesto testTipoRepuesto = tipoRepuestoList.get(tipoRepuestoList.size() - 1);
        assertThat(testTipoRepuesto.getNombreTipoRepuesto()).isEqualTo(UPDATED_NOMBRE_TIPO_REPUESTO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();

        // Create the TipoRepuesto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoRepuestoMockMvc.perform(put("/api/tipo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoRepuesto() throws Exception {
        // Initialize the database
        tipoRepuestoService.save(tipoRepuesto);

        int databaseSizeBeforeDelete = tipoRepuestoRepository.findAll().size();

        // Delete the tipoRepuesto
        restTipoRepuestoMockMvc.perform(delete("/api/tipo-repuestos/{id}", tipoRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoRepuesto.class);
        TipoRepuesto tipoRepuesto1 = new TipoRepuesto();
        tipoRepuesto1.setId(1L);
        TipoRepuesto tipoRepuesto2 = new TipoRepuesto();
        tipoRepuesto2.setId(tipoRepuesto1.getId());
        assertThat(tipoRepuesto1).isEqualTo(tipoRepuesto2);
        tipoRepuesto2.setId(2L);
        assertThat(tipoRepuesto1).isNotEqualTo(tipoRepuesto2);
        tipoRepuesto1.setId(null);
        assertThat(tipoRepuesto1).isNotEqualTo(tipoRepuesto2);
    }
}
