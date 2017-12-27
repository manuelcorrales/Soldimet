package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.EstadoPresupuesto;
import soldimet.repository.EstadoPresupuestoRepository;
import soldimet.service.EstadoPresupuestoService;
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
 * Test class for the EstadoPresupuestoResource REST controller.
 *
 * @see EstadoPresupuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoPresupuestoResourceIntTest {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoPresupuestoRepository estadoPresupuestoRepository;

    @Autowired
    private EstadoPresupuestoService estadoPresupuestoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstadoPresupuestoMockMvc;

    private EstadoPresupuesto estadoPresupuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoPresupuestoResource estadoPresupuestoResource = new EstadoPresupuestoResource(estadoPresupuestoService);
        this.restEstadoPresupuestoMockMvc = MockMvcBuilders.standaloneSetup(estadoPresupuestoResource)
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
    public static EstadoPresupuesto createEntity(EntityManager em) {
        EstadoPresupuesto estadoPresupuesto = new EstadoPresupuesto()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoPresupuesto;
    }

    @Before
    public void initTest() {
        estadoPresupuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeCreate = estadoPresupuestoRepository.findAll().size();

        // Create the EstadoPresupuesto
        restEstadoPresupuestoMockMvc.perform(post("/api/estado-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto)))
            .andExpect(status().isCreated());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoPresupuesto testEstadoPresupuesto = estadoPresupuestoList.get(estadoPresupuestoList.size() - 1);
        assertThat(testEstadoPresupuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoPresupuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoPresupuestoRepository.findAll().size();

        // Create the EstadoPresupuesto with an existing ID
        estadoPresupuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoPresupuestoMockMvc.perform(post("/api/estado-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoPresupuestoRepository.findAll().size();
        // set the field null
        estadoPresupuesto.setNombreEstado(null);

        // Create the EstadoPresupuesto, which fails.

        restEstadoPresupuestoMockMvc.perform(post("/api/estado-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto)))
            .andExpect(status().isBadRequest());

        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoPresupuestos() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        // Get all the estadoPresupuestoList
        restEstadoPresupuestoMockMvc.perform(get("/api/estado-presupuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoPresupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }

    @Test
    @Transactional
    public void getEstadoPresupuesto() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        // Get the estadoPresupuesto
        restEstadoPresupuestoMockMvc.perform(get("/api/estado-presupuestos/{id}", estadoPresupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoPresupuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoPresupuesto() throws Exception {
        // Get the estadoPresupuesto
        restEstadoPresupuestoMockMvc.perform(get("/api/estado-presupuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoPresupuesto() throws Exception {
        // Initialize the database
        estadoPresupuestoService.save(estadoPresupuesto);

        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();

        // Update the estadoPresupuesto
        EstadoPresupuesto updatedEstadoPresupuesto = estadoPresupuestoRepository.findOne(estadoPresupuesto.getId());
        updatedEstadoPresupuesto
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPresupuestoMockMvc.perform(put("/api/estado-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoPresupuesto)))
            .andExpect(status().isOk());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPresupuesto testEstadoPresupuesto = estadoPresupuestoList.get(estadoPresupuestoList.size() - 1);
        assertThat(testEstadoPresupuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();

        // Create the EstadoPresupuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstadoPresupuestoMockMvc.perform(put("/api/estado-presupuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto)))
            .andExpect(status().isCreated());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEstadoPresupuesto() throws Exception {
        // Initialize the database
        estadoPresupuestoService.save(estadoPresupuesto);

        int databaseSizeBeforeDelete = estadoPresupuestoRepository.findAll().size();

        // Get the estadoPresupuesto
        restEstadoPresupuestoMockMvc.perform(delete("/api/estado-presupuestos/{id}", estadoPresupuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoPresupuesto.class);
        EstadoPresupuesto estadoPresupuesto1 = new EstadoPresupuesto();
        estadoPresupuesto1.setId(1L);
        EstadoPresupuesto estadoPresupuesto2 = new EstadoPresupuesto();
        estadoPresupuesto2.setId(estadoPresupuesto1.getId());
        assertThat(estadoPresupuesto1).isEqualTo(estadoPresupuesto2);
        estadoPresupuesto2.setId(2L);
        assertThat(estadoPresupuesto1).isNotEqualTo(estadoPresupuesto2);
        estadoPresupuesto1.setId(null);
        assertThat(estadoPresupuesto1).isNotEqualTo(estadoPresupuesto2);
    }
}
