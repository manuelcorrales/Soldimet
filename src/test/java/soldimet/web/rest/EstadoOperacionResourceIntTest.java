package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.EstadoOperacion;
import soldimet.repository.EstadoOperacionRepository;
import soldimet.service.EstadoOperacionService;
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
 * Test class for the EstadoOperacionResource REST controller.
 *
 * @see EstadoOperacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoOperacionResourceIntTest {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoOperacionRepository estadoOperacionRepository;

    

    @Autowired
    private EstadoOperacionService estadoOperacionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstadoOperacionMockMvc;

    private EstadoOperacion estadoOperacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoOperacionResource estadoOperacionResource = new EstadoOperacionResource(estadoOperacionService);
        this.restEstadoOperacionMockMvc = MockMvcBuilders.standaloneSetup(estadoOperacionResource)
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
    public static EstadoOperacion createEntity(EntityManager em) {
        EstadoOperacion estadoOperacion = new EstadoOperacion()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoOperacion;
    }

    @Before
    public void initTest() {
        estadoOperacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoOperacion() throws Exception {
        int databaseSizeBeforeCreate = estadoOperacionRepository.findAll().size();

        // Create the EstadoOperacion
        restEstadoOperacionMockMvc.perform(post("/api/estado-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoOperacion)))
            .andExpect(status().isCreated());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoOperacion testEstadoOperacion = estadoOperacionList.get(estadoOperacionList.size() - 1);
        assertThat(testEstadoOperacion.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoOperacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoOperacionRepository.findAll().size();

        // Create the EstadoOperacion with an existing ID
        estadoOperacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoOperacionMockMvc.perform(post("/api/estado-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoOperacion)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoOperacionRepository.findAll().size();
        // set the field null
        estadoOperacion.setNombreEstado(null);

        // Create the EstadoOperacion, which fails.

        restEstadoOperacionMockMvc.perform(post("/api/estado-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoOperacion)))
            .andExpect(status().isBadRequest());

        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoOperacions() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        // Get all the estadoOperacionList
        restEstadoOperacionMockMvc.perform(get("/api/estado-operacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }
    

    @Test
    @Transactional
    public void getEstadoOperacion() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        // Get the estadoOperacion
        restEstadoOperacionMockMvc.perform(get("/api/estado-operacions/{id}", estadoOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoOperacion.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEstadoOperacion() throws Exception {
        // Get the estadoOperacion
        restEstadoOperacionMockMvc.perform(get("/api/estado-operacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoOperacion() throws Exception {
        // Initialize the database
        estadoOperacionService.save(estadoOperacion);

        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();

        // Update the estadoOperacion
        EstadoOperacion updatedEstadoOperacion = estadoOperacionRepository.findById(estadoOperacion.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoOperacion are not directly saved in db
        em.detach(updatedEstadoOperacion);
        updatedEstadoOperacion
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoOperacionMockMvc.perform(put("/api/estado-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoOperacion)))
            .andExpect(status().isOk());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoOperacion testEstadoOperacion = estadoOperacionList.get(estadoOperacionList.size() - 1);
        assertThat(testEstadoOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();

        // Create the EstadoOperacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstadoOperacionMockMvc.perform(put("/api/estado-operacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoOperacion)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoOperacion() throws Exception {
        // Initialize the database
        estadoOperacionService.save(estadoOperacion);

        int databaseSizeBeforeDelete = estadoOperacionRepository.findAll().size();

        // Get the estadoOperacion
        restEstadoOperacionMockMvc.perform(delete("/api/estado-operacions/{id}", estadoOperacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoOperacion.class);
        EstadoOperacion estadoOperacion1 = new EstadoOperacion();
        estadoOperacion1.setId(1L);
        EstadoOperacion estadoOperacion2 = new EstadoOperacion();
        estadoOperacion2.setId(estadoOperacion1.getId());
        assertThat(estadoOperacion1).isEqualTo(estadoOperacion2);
        estadoOperacion2.setId(2L);
        assertThat(estadoOperacion1).isNotEqualTo(estadoOperacion2);
        estadoOperacion1.setId(null);
        assertThat(estadoOperacion1).isNotEqualTo(estadoOperacion2);
    }
}
