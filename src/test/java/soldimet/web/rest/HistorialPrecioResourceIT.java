package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.HistorialPrecio;
import soldimet.domain.PrecioRepuesto;
import soldimet.repository.HistorialPrecioRepository;
import soldimet.service.HistorialPrecioService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link HistorialPrecioResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class HistorialPrecioResourceIT {

    private static final LocalDate DEFAULT_FECHA_HISTORIAL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HISTORIAL = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA_HISTORIAL = LocalDate.ofEpochDay(-1L);

    @Autowired
    private HistorialPrecioRepository historialPrecioRepository;

    @Autowired
    private HistorialPrecioService historialPrecioService;

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

    private MockMvc restHistorialPrecioMockMvc;

    private HistorialPrecio historialPrecio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HistorialPrecioResource historialPrecioResource = new HistorialPrecioResource(historialPrecioService);
        this.restHistorialPrecioMockMvc = MockMvcBuilders.standaloneSetup(historialPrecioResource)
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
    public static HistorialPrecio createEntity(EntityManager em) {
        HistorialPrecio historialPrecio = new HistorialPrecio()
            .fechaHistorial(DEFAULT_FECHA_HISTORIAL);
        // Add required entity
        PrecioRepuesto precioRepuesto;
        if (TestUtil.findAll(em, PrecioRepuesto.class).isEmpty()) {
            precioRepuesto = PrecioRepuestoResourceIT.createEntity(em);
            em.persist(precioRepuesto);
            em.flush();
        } else {
            precioRepuesto = TestUtil.findAll(em, PrecioRepuesto.class).get(0);
        }
        historialPrecio.setPrecioRepuesto(precioRepuesto);
        return historialPrecio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistorialPrecio createUpdatedEntity(EntityManager em) {
        HistorialPrecio historialPrecio = new HistorialPrecio()
            .fechaHistorial(UPDATED_FECHA_HISTORIAL);
        // Add required entity
        PrecioRepuesto precioRepuesto;
        if (TestUtil.findAll(em, PrecioRepuesto.class).isEmpty()) {
            precioRepuesto = PrecioRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(precioRepuesto);
            em.flush();
        } else {
            precioRepuesto = TestUtil.findAll(em, PrecioRepuesto.class).get(0);
        }
        historialPrecio.setPrecioRepuesto(precioRepuesto);
        return historialPrecio;
    }

    @BeforeEach
    public void initTest() {
        historialPrecio = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistorialPrecio() throws Exception {
        int databaseSizeBeforeCreate = historialPrecioRepository.findAll().size();

        // Create the HistorialPrecio
        restHistorialPrecioMockMvc.perform(post("/api/historial-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historialPrecio)))
            .andExpect(status().isCreated());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeCreate + 1);
        HistorialPrecio testHistorialPrecio = historialPrecioList.get(historialPrecioList.size() - 1);
        assertThat(testHistorialPrecio.getFechaHistorial()).isEqualTo(DEFAULT_FECHA_HISTORIAL);
    }

    @Test
    @Transactional
    public void createHistorialPrecioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historialPrecioRepository.findAll().size();

        // Create the HistorialPrecio with an existing ID
        historialPrecio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistorialPrecioMockMvc.perform(post("/api/historial-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historialPrecio)))
            .andExpect(status().isBadRequest());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaHistorialIsRequired() throws Exception {
        int databaseSizeBeforeTest = historialPrecioRepository.findAll().size();
        // set the field null
        historialPrecio.setFechaHistorial(null);

        // Create the HistorialPrecio, which fails.

        restHistorialPrecioMockMvc.perform(post("/api/historial-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historialPrecio)))
            .andExpect(status().isBadRequest());

        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHistorialPrecios() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        // Get all the historialPrecioList
        restHistorialPrecioMockMvc.perform(get("/api/historial-precios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historialPrecio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaHistorial").value(hasItem(DEFAULT_FECHA_HISTORIAL.toString())));
    }
    
    @Test
    @Transactional
    public void getHistorialPrecio() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        // Get the historialPrecio
        restHistorialPrecioMockMvc.perform(get("/api/historial-precios/{id}", historialPrecio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(historialPrecio.getId().intValue()))
            .andExpect(jsonPath("$.fechaHistorial").value(DEFAULT_FECHA_HISTORIAL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHistorialPrecio() throws Exception {
        // Get the historialPrecio
        restHistorialPrecioMockMvc.perform(get("/api/historial-precios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistorialPrecio() throws Exception {
        // Initialize the database
        historialPrecioService.save(historialPrecio);

        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();

        // Update the historialPrecio
        HistorialPrecio updatedHistorialPrecio = historialPrecioRepository.findById(historialPrecio.getId()).get();
        // Disconnect from session so that the updates on updatedHistorialPrecio are not directly saved in db
        em.detach(updatedHistorialPrecio);
        updatedHistorialPrecio
            .fechaHistorial(UPDATED_FECHA_HISTORIAL);

        restHistorialPrecioMockMvc.perform(put("/api/historial-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistorialPrecio)))
            .andExpect(status().isOk());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
        HistorialPrecio testHistorialPrecio = historialPrecioList.get(historialPrecioList.size() - 1);
        assertThat(testHistorialPrecio.getFechaHistorial()).isEqualTo(UPDATED_FECHA_HISTORIAL);
    }

    @Test
    @Transactional
    public void updateNonExistingHistorialPrecio() throws Exception {
        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();

        // Create the HistorialPrecio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistorialPrecioMockMvc.perform(put("/api/historial-precios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historialPrecio)))
            .andExpect(status().isBadRequest());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistorialPrecio() throws Exception {
        // Initialize the database
        historialPrecioService.save(historialPrecio);

        int databaseSizeBeforeDelete = historialPrecioRepository.findAll().size();

        // Delete the historialPrecio
        restHistorialPrecioMockMvc.perform(delete("/api/historial-precios/{id}", historialPrecio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistorialPrecio.class);
        HistorialPrecio historialPrecio1 = new HistorialPrecio();
        historialPrecio1.setId(1L);
        HistorialPrecio historialPrecio2 = new HistorialPrecio();
        historialPrecio2.setId(historialPrecio1.getId());
        assertThat(historialPrecio1).isEqualTo(historialPrecio2);
        historialPrecio2.setId(2L);
        assertThat(historialPrecio1).isNotEqualTo(historialPrecio2);
        historialPrecio1.setId(null);
        assertThat(historialPrecio1).isNotEqualTo(historialPrecio2);
    }
}
