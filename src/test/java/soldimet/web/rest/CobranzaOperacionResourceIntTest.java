package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.CobranzaOperacion;
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.domain.Operacion;
import soldimet.repository.CobranzaOperacionRepository;
import soldimet.service.CobranzaOperacionService;
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


import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CobranzaOperacionResource REST controller.
 *
 * @see CobranzaOperacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class CobranzaOperacionResourceIntTest {

    private static final Float DEFAULT_COBRANZA_OPERACION = 0F;
    private static final Float UPDATED_COBRANZA_OPERACION = 1F;

    @Autowired
    private CobranzaOperacionRepository cobranzaOperacionRepository;

    

    @Autowired
    private CobranzaOperacionService cobranzaOperacionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCobranzaOperacionMockMvc;

    private CobranzaOperacion cobranzaOperacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CobranzaOperacionResource cobranzaOperacionResource = new CobranzaOperacionResource(cobranzaOperacionService);
        this.restCobranzaOperacionMockMvc = MockMvcBuilders.standaloneSetup(cobranzaOperacionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CobranzaOperacion createEntity(EntityManager em) {
        CobranzaOperacion cobranzaOperacion = new CobranzaOperacion()
            .cobranzaOperacion(DEFAULT_COBRANZA_OPERACION);
        // Add required entity
        EstadoCobranzaOperacion estadoCobranzaOperacion = EstadoCobranzaOperacionResourceIntTest.createEntity(em);
        em.persist(estadoCobranzaOperacion);
        em.flush();
        cobranzaOperacion.setEstadoCobranzaOperacion(estadoCobranzaOperacion);
        // Add required entity
        Operacion operacion = OperacionResourceIntTest.createEntity(em);
        em.persist(operacion);
        em.flush();
        cobranzaOperacion.setOperacion(operacion);
        return cobranzaOperacion;
    }

    @Before
    public void initTest() {
        cobranzaOperacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createCobranzaOperacion() throws Exception {
        int databaseSizeBeforeCreate = cobranzaOperacionRepository.findAll().size();

        // Create the CobranzaOperacion
        restCobranzaOperacionMockMvc.perform(post("/api/cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion)))
            .andExpect(status().isCreated());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        CobranzaOperacion testCobranzaOperacion = cobranzaOperacionList.get(cobranzaOperacionList.size() - 1);
        assertThat(testCobranzaOperacion.getCobranzaOperacion()).isEqualTo(DEFAULT_COBRANZA_OPERACION);
    }

    @Test
    @Transactional
    public void createCobranzaOperacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cobranzaOperacionRepository.findAll().size();

        // Create the CobranzaOperacion with an existing ID
        cobranzaOperacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCobranzaOperacionMockMvc.perform(post("/api/cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion)))
            .andExpect(status().isBadRequest());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCobranzaOperacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cobranzaOperacionRepository.findAll().size();
        // set the field null
        cobranzaOperacion.setCobranzaOperacion(null);

        // Create the CobranzaOperacion, which fails.

        restCobranzaOperacionMockMvc.perform(post("/api/cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion)))
            .andExpect(status().isBadRequest());

        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCobranzaOperacions() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        // Get all the cobranzaOperacionList
        restCobranzaOperacionMockMvc.perform(get("/api/cobranza-operacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobranzaOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].cobranzaOperacion").value(hasItem(DEFAULT_COBRANZA_OPERACION.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getCobranzaOperacion() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        // Get the cobranzaOperacion
        restCobranzaOperacionMockMvc.perform(get("/api/cobranza-operacions/{id}", cobranzaOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cobranzaOperacion.getId().intValue()))
            .andExpect(jsonPath("$.cobranzaOperacion").value(DEFAULT_COBRANZA_OPERACION.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCobranzaOperacion() throws Exception {
        // Get the cobranzaOperacion
        restCobranzaOperacionMockMvc.perform(get("/api/cobranza-operacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCobranzaOperacion() throws Exception {
        // Initialize the database
        cobranzaOperacionService.save(cobranzaOperacion);

        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();

        // Update the cobranzaOperacion
        CobranzaOperacion updatedCobranzaOperacion = cobranzaOperacionRepository.findById(cobranzaOperacion.getId()).get();
        // Disconnect from session so that the updates on updatedCobranzaOperacion are not directly saved in db
        em.detach(updatedCobranzaOperacion);
        updatedCobranzaOperacion
            .cobranzaOperacion(UPDATED_COBRANZA_OPERACION);

        restCobranzaOperacionMockMvc.perform(put("/api/cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCobranzaOperacion)))
            .andExpect(status().isOk());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        CobranzaOperacion testCobranzaOperacion = cobranzaOperacionList.get(cobranzaOperacionList.size() - 1);
        assertThat(testCobranzaOperacion.getCobranzaOperacion()).isEqualTo(UPDATED_COBRANZA_OPERACION);
    }

    @Test
    @Transactional
    public void updateNonExistingCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();

        // Create the CobranzaOperacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCobranzaOperacionMockMvc.perform(put("/api/cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion)))
            .andExpect(status().isBadRequest());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCobranzaOperacion() throws Exception {
        // Initialize the database
        cobranzaOperacionService.save(cobranzaOperacion);

        int databaseSizeBeforeDelete = cobranzaOperacionRepository.findAll().size();

        // Get the cobranzaOperacion
        restCobranzaOperacionMockMvc.perform(delete("/api/cobranza-operacions/{id}", cobranzaOperacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobranzaOperacion.class);
        CobranzaOperacion cobranzaOperacion1 = new CobranzaOperacion();
        cobranzaOperacion1.setId(1L);
        CobranzaOperacion cobranzaOperacion2 = new CobranzaOperacion();
        cobranzaOperacion2.setId(cobranzaOperacion1.getId());
        assertThat(cobranzaOperacion1).isEqualTo(cobranzaOperacion2);
        cobranzaOperacion2.setId(2L);
        assertThat(cobranzaOperacion1).isNotEqualTo(cobranzaOperacion2);
        cobranzaOperacion1.setId(null);
        assertThat(cobranzaOperacion1).isNotEqualTo(cobranzaOperacion2);
    }
}
