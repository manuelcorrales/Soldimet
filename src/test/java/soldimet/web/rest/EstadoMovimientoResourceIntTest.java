package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.EstadoMovimiento;
import soldimet.repository.EstadoMovimientoRepository;
import soldimet.service.EstadoMovimientoService;
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
 * Test class for the EstadoMovimientoResource REST controller.
 *
 * @see EstadoMovimientoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class EstadoMovimientoResourceIntTest {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    @Autowired
    private EstadoMovimientoRepository estadoMovimientoRepository;

    

    @Autowired
    private EstadoMovimientoService estadoMovimientoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstadoMovimientoMockMvc;

    private EstadoMovimiento estadoMovimiento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoMovimientoResource estadoMovimientoResource = new EstadoMovimientoResource(estadoMovimientoService);
        this.restEstadoMovimientoMockMvc = MockMvcBuilders.standaloneSetup(estadoMovimientoResource)
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
    public static EstadoMovimiento createEntity(EntityManager em) {
        EstadoMovimiento estadoMovimiento = new EstadoMovimiento()
            .nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoMovimiento;
    }

    @Before
    public void initTest() {
        estadoMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoMovimiento() throws Exception {
        int databaseSizeBeforeCreate = estadoMovimientoRepository.findAll().size();

        // Create the EstadoMovimiento
        restEstadoMovimientoMockMvc.perform(post("/api/estado-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento)))
            .andExpect(status().isCreated());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoMovimiento testEstadoMovimiento = estadoMovimientoList.get(estadoMovimientoList.size() - 1);
        assertThat(testEstadoMovimiento.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void createEstadoMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoMovimientoRepository.findAll().size();

        // Create the EstadoMovimiento with an existing ID
        estadoMovimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoMovimientoMockMvc.perform(post("/api/estado-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoMovimientoRepository.findAll().size();
        // set the field null
        estadoMovimiento.setNombreEstado(null);

        // Create the EstadoMovimiento, which fails.

        restEstadoMovimientoMockMvc.perform(post("/api/estado-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento)))
            .andExpect(status().isBadRequest());

        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstadoMovimientos() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        // Get all the estadoMovimientoList
        restEstadoMovimientoMockMvc.perform(get("/api/estado-movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO.toString())));
    }
    

    @Test
    @Transactional
    public void getEstadoMovimiento() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        // Get the estadoMovimiento
        restEstadoMovimientoMockMvc.perform(get("/api/estado-movimientos/{id}", estadoMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEstadoMovimiento() throws Exception {
        // Get the estadoMovimiento
        restEstadoMovimientoMockMvc.perform(get("/api/estado-movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoMovimiento() throws Exception {
        // Initialize the database
        estadoMovimientoService.save(estadoMovimiento);

        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();

        // Update the estadoMovimiento
        EstadoMovimiento updatedEstadoMovimiento = estadoMovimientoRepository.findById(estadoMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoMovimiento are not directly saved in db
        em.detach(updatedEstadoMovimiento);
        updatedEstadoMovimiento
            .nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoMovimientoMockMvc.perform(put("/api/estado-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoMovimiento)))
            .andExpect(status().isOk());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        EstadoMovimiento testEstadoMovimiento = estadoMovimientoList.get(estadoMovimientoList.size() - 1);
        assertThat(testEstadoMovimiento.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();

        // Create the EstadoMovimiento

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstadoMovimientoMockMvc.perform(put("/api/estado-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoMovimiento() throws Exception {
        // Initialize the database
        estadoMovimientoService.save(estadoMovimiento);

        int databaseSizeBeforeDelete = estadoMovimientoRepository.findAll().size();

        // Get the estadoMovimiento
        restEstadoMovimientoMockMvc.perform(delete("/api/estado-movimientos/{id}", estadoMovimiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoMovimiento.class);
        EstadoMovimiento estadoMovimiento1 = new EstadoMovimiento();
        estadoMovimiento1.setId(1L);
        EstadoMovimiento estadoMovimiento2 = new EstadoMovimiento();
        estadoMovimiento2.setId(estadoMovimiento1.getId());
        assertThat(estadoMovimiento1).isEqualTo(estadoMovimiento2);
        estadoMovimiento2.setId(2L);
        assertThat(estadoMovimiento1).isNotEqualTo(estadoMovimiento2);
        estadoMovimiento1.setId(null);
        assertThat(estadoMovimiento1).isNotEqualTo(estadoMovimiento2);
    }
}
