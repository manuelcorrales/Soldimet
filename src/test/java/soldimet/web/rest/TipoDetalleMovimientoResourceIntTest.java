package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.TipoDetalleMovimientoRepository;
import soldimet.service.TipoDetalleMovimientoService;
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
 * Test class for the TipoDetalleMovimientoResource REST controller.
 *
 * @see TipoDetalleMovimientoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class TipoDetalleMovimientoResourceIntTest {

    private static final String DEFAULT_NOMBRE_TIPO_DETALLE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_DETALLE = "BBBBBBBBBB";

    @Autowired
    private TipoDetalleMovimientoRepository tipoDetalleMovimientoRepository;

    

    @Autowired
    private TipoDetalleMovimientoService tipoDetalleMovimientoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoDetalleMovimientoMockMvc;

    private TipoDetalleMovimiento tipoDetalleMovimiento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoDetalleMovimientoResource tipoDetalleMovimientoResource = new TipoDetalleMovimientoResource(tipoDetalleMovimientoService);
        this.restTipoDetalleMovimientoMockMvc = MockMvcBuilders.standaloneSetup(tipoDetalleMovimientoResource)
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
    public static TipoDetalleMovimiento createEntity(EntityManager em) {
        TipoDetalleMovimiento tipoDetalleMovimiento = new TipoDetalleMovimiento()
            .nombreTipoDetalle(DEFAULT_NOMBRE_TIPO_DETALLE);
        return tipoDetalleMovimiento;
    }

    @Before
    public void initTest() {
        tipoDetalleMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeCreate = tipoDetalleMovimientoRepository.findAll().size();

        // Create the TipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc.perform(post("/api/tipo-detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento)))
            .andExpect(status().isCreated());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDetalleMovimiento testTipoDetalleMovimiento = tipoDetalleMovimientoList.get(tipoDetalleMovimientoList.size() - 1);
        assertThat(testTipoDetalleMovimiento.getNombreTipoDetalle()).isEqualTo(DEFAULT_NOMBRE_TIPO_DETALLE);
    }

    @Test
    @Transactional
    public void createTipoDetalleMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoDetalleMovimientoRepository.findAll().size();

        // Create the TipoDetalleMovimiento with an existing ID
        tipoDetalleMovimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDetalleMovimientoMockMvc.perform(post("/api/tipo-detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreTipoDetalleIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoDetalleMovimientoRepository.findAll().size();
        // set the field null
        tipoDetalleMovimiento.setNombreTipoDetalle(null);

        // Create the TipoDetalleMovimiento, which fails.

        restTipoDetalleMovimientoMockMvc.perform(post("/api/tipo-detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento)))
            .andExpect(status().isBadRequest());

        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoDetalleMovimientos() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        // Get all the tipoDetalleMovimientoList
        restTipoDetalleMovimientoMockMvc.perform(get("/api/tipo-detalle-movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDetalleMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoDetalle").value(hasItem(DEFAULT_NOMBRE_TIPO_DETALLE.toString())));
    }
    

    @Test
    @Transactional
    public void getTipoDetalleMovimiento() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        // Get the tipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc.perform(get("/api/tipo-detalle-movimientos/{id}", tipoDetalleMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDetalleMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoDetalle").value(DEFAULT_NOMBRE_TIPO_DETALLE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTipoDetalleMovimiento() throws Exception {
        // Get the tipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc.perform(get("/api/tipo-detalle-movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoDetalleMovimiento() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoService.save(tipoDetalleMovimiento);

        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();

        // Update the tipoDetalleMovimiento
        TipoDetalleMovimiento updatedTipoDetalleMovimiento = tipoDetalleMovimientoRepository.findById(tipoDetalleMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDetalleMovimiento are not directly saved in db
        em.detach(updatedTipoDetalleMovimiento);
        updatedTipoDetalleMovimiento
            .nombreTipoDetalle(UPDATED_NOMBRE_TIPO_DETALLE);

        restTipoDetalleMovimientoMockMvc.perform(put("/api/tipo-detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoDetalleMovimiento)))
            .andExpect(status().isOk());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoDetalleMovimiento testTipoDetalleMovimiento = tipoDetalleMovimientoList.get(tipoDetalleMovimientoList.size() - 1);
        assertThat(testTipoDetalleMovimiento.getNombreTipoDetalle()).isEqualTo(UPDATED_NOMBRE_TIPO_DETALLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();

        // Create the TipoDetalleMovimiento

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoDetalleMovimientoMockMvc.perform(put("/api/tipo-detalle-movimientos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoDetalleMovimiento() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoService.save(tipoDetalleMovimiento);

        int databaseSizeBeforeDelete = tipoDetalleMovimientoRepository.findAll().size();

        // Get the tipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc.perform(delete("/api/tipo-detalle-movimientos/{id}", tipoDetalleMovimiento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDetalleMovimiento.class);
        TipoDetalleMovimiento tipoDetalleMovimiento1 = new TipoDetalleMovimiento();
        tipoDetalleMovimiento1.setId(1L);
        TipoDetalleMovimiento tipoDetalleMovimiento2 = new TipoDetalleMovimiento();
        tipoDetalleMovimiento2.setId(tipoDetalleMovimiento1.getId());
        assertThat(tipoDetalleMovimiento1).isEqualTo(tipoDetalleMovimiento2);
        tipoDetalleMovimiento2.setId(2L);
        assertThat(tipoDetalleMovimiento1).isNotEqualTo(tipoDetalleMovimiento2);
        tipoDetalleMovimiento1.setId(null);
        assertThat(tipoDetalleMovimiento1).isNotEqualTo(tipoDetalleMovimiento2);
    }
}
