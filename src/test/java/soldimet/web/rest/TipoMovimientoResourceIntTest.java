package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.TipoMovimiento;
import soldimet.repository.TipoMovimientoRepository;
import soldimet.service.TipoMovimientoService;
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
 * Test class for the TipoMovimientoResource REST controller.
 *
 * @see TipoMovimientoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class TipoMovimientoResourceIntTest {

    private static final String DEFAULT_NOMBRE_TIPO_MOVIMIENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_MOVIMIENTO = "BBBBBBBBBB";

    @Autowired
    private TipoMovimientoRepository tipoMovimientoRepository;

    @Autowired
    private TipoMovimientoService tipoMovimientoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoMovimientoMockMvc;

    private TipoMovimiento tipoMovimiento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoMovimientoResource tipoMovimientoResource = new TipoMovimientoResource(tipoMovimientoService);
        this.restTipoMovimientoMockMvc = MockMvcBuilders.standaloneSetup(tipoMovimientoResource)
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
    public static TipoMovimiento createEntity(EntityManager em) {
        TipoMovimiento tipoMovimiento = new TipoMovimiento()
            .nombreTipoMovimiento(DEFAULT_NOMBRE_TIPO_MOVIMIENTO);
        return tipoMovimiento;
    }

    @Before
    public void initTest() {
        tipoMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoMovimiento() throws Exception {
        int databaseSizeBeforeCreate = tipoMovimientoRepository.findAll().size();

        // Create the TipoMovimiento
        restTipoMovimientoMockMvc.perform(post("/api/tipo-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento)))
            .andExpect(status().isCreated());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoMovimiento testTipoMovimiento = tipoMovimientoList.get(tipoMovimientoList.size() - 1);
        assertThat(testTipoMovimiento.getNombreTipoMovimiento()).isEqualTo(DEFAULT_NOMBRE_TIPO_MOVIMIENTO);
    }

    @Test
    @Transactional
    public void createTipoMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoMovimientoRepository.findAll().size();

        // Create the TipoMovimiento with an existing ID
        tipoMovimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoMovimientoMockMvc.perform(post("/api/tipo-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreTipoMovimientoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoMovimientoRepository.findAll().size();
        // set the field null
        tipoMovimiento.setNombreTipoMovimiento(null);

        // Create the TipoMovimiento, which fails.

        restTipoMovimientoMockMvc.perform(post("/api/tipo-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento)))
            .andExpect(status().isBadRequest());

        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoMovimientos() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        // Get all the tipoMovimientoList
        restTipoMovimientoMockMvc.perform(get("/api/tipo-movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoMovimiento").value(hasItem(DEFAULT_NOMBRE_TIPO_MOVIMIENTO.toString())));
    }

    @Test
    @Transactional
    public void getTipoMovimiento() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        // Get the tipoMovimiento
        restTipoMovimientoMockMvc.perform(get("/api/tipo-movimientos/{id}", tipoMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoMovimiento").value(DEFAULT_NOMBRE_TIPO_MOVIMIENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoMovimiento() throws Exception {
        // Get the tipoMovimiento
        restTipoMovimientoMockMvc.perform(get("/api/tipo-movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoMovimiento() throws Exception {
        // Initialize the database
        tipoMovimientoService.save(tipoMovimiento);

        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();

        // Update the tipoMovimiento
        TipoMovimiento updatedTipoMovimiento = tipoMovimientoRepository.findOne(tipoMovimiento.getId());
        updatedTipoMovimiento
            .nombreTipoMovimiento(UPDATED_NOMBRE_TIPO_MOVIMIENTO);

        restTipoMovimientoMockMvc.perform(put("/api/tipo-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoMovimiento)))
            .andExpect(status().isOk());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoMovimiento testTipoMovimiento = tipoMovimientoList.get(tipoMovimientoList.size() - 1);
        assertThat(testTipoMovimiento.getNombreTipoMovimiento()).isEqualTo(UPDATED_NOMBRE_TIPO_MOVIMIENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();

        // Create the TipoMovimiento

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoMovimientoMockMvc.perform(put("/api/tipo-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento)))
            .andExpect(status().isCreated());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTipoMovimiento() throws Exception {
        // Initialize the database
        tipoMovimientoService.save(tipoMovimiento);

        int databaseSizeBeforeDelete = tipoMovimientoRepository.findAll().size();

        // Get the tipoMovimiento
        restTipoMovimientoMockMvc.perform(delete("/api/tipo-movimientos/{id}", tipoMovimiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoMovimiento.class);
        TipoMovimiento tipoMovimiento1 = new TipoMovimiento();
        tipoMovimiento1.setId(1L);
        TipoMovimiento tipoMovimiento2 = new TipoMovimiento();
        tipoMovimiento2.setId(tipoMovimiento1.getId());
        assertThat(tipoMovimiento1).isEqualTo(tipoMovimiento2);
        tipoMovimiento2.setId(2L);
        assertThat(tipoMovimiento1).isNotEqualTo(tipoMovimiento2);
        tipoMovimiento1.setId(null);
        assertThat(tipoMovimiento1).isNotEqualTo(tipoMovimiento2);
    }
}
