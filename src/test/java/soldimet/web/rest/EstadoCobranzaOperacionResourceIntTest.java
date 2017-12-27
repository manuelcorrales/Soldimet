package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.repository.EstadoCobranzaOperacionRepository;
import soldimet.service.EstadoCobranzaOperacionService;
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
 * Test class for the EstadoCobranzaOperacionResource REST controller.
 *
 * @see EstadoCobranzaOperacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoCobranzaOperacionResourceIntTest {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository;

    @Autowired
    private EstadoCobranzaOperacionService estadoCobranzaOperacionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstadoCobranzaOperacionMockMvc;

    private EstadoCobranzaOperacion estadoCobranzaOperacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoCobranzaOperacionResource estadoCobranzaOperacionResource = new EstadoCobranzaOperacionResource(estadoCobranzaOperacionService);
        this.restEstadoCobranzaOperacionMockMvc = MockMvcBuilders.standaloneSetup(estadoCobranzaOperacionResource)
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
    public static EstadoCobranzaOperacion createEntity(EntityManager em) {
        EstadoCobranzaOperacion estadoCobranzaOperacion = new EstadoCobranzaOperacion()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoCobranzaOperacion;
    }

    @Before
    public void initTest() {
        estadoCobranzaOperacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeCreate = estadoCobranzaOperacionRepository.findAll().size();

        // Create the EstadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc.perform(post("/api/estado-cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion)))
            .andExpect(status().isCreated());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoCobranzaOperacion testEstadoCobranzaOperacion = estadoCobranzaOperacionList.get(estadoCobranzaOperacionList.size() - 1);
        assertThat(testEstadoCobranzaOperacion.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoCobranzaOperacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoCobranzaOperacionRepository.findAll().size();

        // Create the EstadoCobranzaOperacion with an existing ID
        estadoCobranzaOperacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoCobranzaOperacionMockMvc.perform(post("/api/estado-cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoCobranzaOperacionRepository.findAll().size();
        // set the field null
        estadoCobranzaOperacion.setNombreEstado(null);

        // Create the EstadoCobranzaOperacion, which fails.

        restEstadoCobranzaOperacionMockMvc.perform(post("/api/estado-cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion)))
            .andExpect(status().isBadRequest());

        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoCobranzaOperacions() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        // Get all the estadoCobranzaOperacionList
        restEstadoCobranzaOperacionMockMvc.perform(get("/api/estado-cobranza-operacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoCobranzaOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void getEstadoCobranzaOperacion() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        // Get the estadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc.perform(get("/api/estado-cobranza-operacions/{id}", estadoCobranzaOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoCobranzaOperacion.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoCobranzaOperacion() throws Exception {
        // Get the estadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc.perform(get("/api/estado-cobranza-operacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoCobranzaOperacion() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionService.save(estadoCobranzaOperacion);

        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();

        // Update the estadoCobranzaOperacion
        EstadoCobranzaOperacion updatedEstadoCobranzaOperacion = estadoCobranzaOperacionRepository.findOne(estadoCobranzaOperacion.getId());
        updatedEstadoCobranzaOperacion
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoCobranzaOperacionMockMvc.perform(put("/api/estado-cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoCobranzaOperacion)))
            .andExpect(status().isOk());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoCobranzaOperacion testEstadoCobranzaOperacion = estadoCobranzaOperacionList.get(estadoCobranzaOperacionList.size() - 1);
        assertThat(testEstadoCobranzaOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();

        // Create the EstadoCobranzaOperacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstadoCobranzaOperacionMockMvc.perform(put("/api/estado-cobranza-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion)))
            .andExpect(status().isCreated());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEstadoCobranzaOperacion() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionService.save(estadoCobranzaOperacion);

        int databaseSizeBeforeDelete = estadoCobranzaOperacionRepository.findAll().size();

        // Get the estadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc.perform(delete("/api/estado-cobranza-operacions/{id}", estadoCobranzaOperacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoCobranzaOperacion.class);
        EstadoCobranzaOperacion estadoCobranzaOperacion1 = new EstadoCobranzaOperacion();
        estadoCobranzaOperacion1.setId(1L);
        EstadoCobranzaOperacion estadoCobranzaOperacion2 = new EstadoCobranzaOperacion();
        estadoCobranzaOperacion2.setId(estadoCobranzaOperacion1.getId());
        assertThat(estadoCobranzaOperacion1).isEqualTo(estadoCobranzaOperacion2);
        estadoCobranzaOperacion2.setId(2L);
        assertThat(estadoCobranzaOperacion1).isNotEqualTo(estadoCobranzaOperacion2);
        estadoCobranzaOperacion1.setId(null);
        assertThat(estadoCobranzaOperacion1).isNotEqualTo(estadoCobranzaOperacion2);
    }
}
