package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.PrecioRepuesto;
import soldimet.repository.PrecioRepuestoRepository;
import soldimet.service.PrecioRepuestoService;
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
 * Integration tests for the {@link PrecioRepuestoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class PrecioRepuestoResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA = LocalDate.ofEpochDay(-1L);

    private static final Float DEFAULT_PRECIO_PRIVADO = 0F;
    private static final Float UPDATED_PRECIO_PRIVADO = 1F;
    private static final Float SMALLER_PRECIO_PRIVADO = 0F - 1F;

    private static final Float DEFAULT_PRECIO_PUBLICO = 0F;
    private static final Float UPDATED_PRECIO_PUBLICO = 1F;
    private static final Float SMALLER_PRECIO_PUBLICO = 0F - 1F;

    @Autowired
    private PrecioRepuestoRepository precioRepuestoRepository;

    @Autowired
    private PrecioRepuestoService precioRepuestoService;

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

    private MockMvc restPrecioRepuestoMockMvc;

    private PrecioRepuesto precioRepuesto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PrecioRepuestoResource precioRepuestoResource = new PrecioRepuestoResource(precioRepuestoService);
        this.restPrecioRepuestoMockMvc = MockMvcBuilders.standaloneSetup(precioRepuestoResource)
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
    public static PrecioRepuesto createEntity(EntityManager em) {
        PrecioRepuesto precioRepuesto = new PrecioRepuesto()
            .fecha(DEFAULT_FECHA)
            .precioPrivado(DEFAULT_PRECIO_PRIVADO)
            .precioPublico(DEFAULT_PRECIO_PUBLICO);
        return precioRepuesto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrecioRepuesto createUpdatedEntity(EntityManager em) {
        PrecioRepuesto precioRepuesto = new PrecioRepuesto()
            .fecha(UPDATED_FECHA)
            .precioPrivado(UPDATED_PRECIO_PRIVADO)
            .precioPublico(UPDATED_PRECIO_PUBLICO);
        return precioRepuesto;
    }

    @BeforeEach
    public void initTest() {
        precioRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrecioRepuesto() throws Exception {
        int databaseSizeBeforeCreate = precioRepuestoRepository.findAll().size();

        // Create the PrecioRepuesto
        restPrecioRepuestoMockMvc.perform(post("/api/precio-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioRepuesto)))
            .andExpect(status().isCreated());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        PrecioRepuesto testPrecioRepuesto = precioRepuestoList.get(precioRepuestoList.size() - 1);
        assertThat(testPrecioRepuesto.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testPrecioRepuesto.getPrecioPrivado()).isEqualTo(DEFAULT_PRECIO_PRIVADO);
        assertThat(testPrecioRepuesto.getPrecioPublico()).isEqualTo(DEFAULT_PRECIO_PUBLICO);
    }

    @Test
    @Transactional
    public void createPrecioRepuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = precioRepuestoRepository.findAll().size();

        // Create the PrecioRepuesto with an existing ID
        precioRepuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrecioRepuestoMockMvc.perform(post("/api/precio-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = precioRepuestoRepository.findAll().size();
        // set the field null
        precioRepuesto.setFecha(null);

        // Create the PrecioRepuesto, which fails.

        restPrecioRepuestoMockMvc.perform(post("/api/precio-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioRepuesto)))
            .andExpect(status().isBadRequest());

        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrecioRepuestos() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        // Get all the precioRepuestoList
        restPrecioRepuestoMockMvc.perform(get("/api/precio-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(precioRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].precioPrivado").value(hasItem(DEFAULT_PRECIO_PRIVADO.doubleValue())))
            .andExpect(jsonPath("$.[*].precioPublico").value(hasItem(DEFAULT_PRECIO_PUBLICO.doubleValue())));
    }

    @Test
    @Transactional
    public void getPrecioRepuesto() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        // Get the precioRepuesto
        restPrecioRepuestoMockMvc.perform(get("/api/precio-repuestos/{id}", precioRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(precioRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.precioPrivado").value(DEFAULT_PRECIO_PRIVADO.doubleValue()))
            .andExpect(jsonPath("$.precioPublico").value(DEFAULT_PRECIO_PUBLICO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPrecioRepuesto() throws Exception {
        // Get the precioRepuesto
        restPrecioRepuestoMockMvc.perform(get("/api/precio-repuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrecioRepuesto() throws Exception {
        // Initialize the database
        precioRepuestoService.save(precioRepuesto);

        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();

        // Update the precioRepuesto
        PrecioRepuesto updatedPrecioRepuesto = precioRepuestoRepository.findById(precioRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedPrecioRepuesto are not directly saved in db
        em.detach(updatedPrecioRepuesto);
        updatedPrecioRepuesto
            .fecha(UPDATED_FECHA)
            .precioPrivado(UPDATED_PRECIO_PRIVADO)
            .precioPublico(UPDATED_PRECIO_PUBLICO);

        restPrecioRepuestoMockMvc.perform(put("/api/precio-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrecioRepuesto)))
            .andExpect(status().isOk());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
        PrecioRepuesto testPrecioRepuesto = precioRepuestoList.get(precioRepuestoList.size() - 1);
        assertThat(testPrecioRepuesto.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testPrecioRepuesto.getPrecioPrivado()).isEqualTo(UPDATED_PRECIO_PRIVADO);
        assertThat(testPrecioRepuesto.getPrecioPublico()).isEqualTo(UPDATED_PRECIO_PUBLICO);
    }

    @Test
    @Transactional
    public void updateNonExistingPrecioRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();

        // Create the PrecioRepuesto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrecioRepuestoMockMvc.perform(put("/api/precio-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(precioRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrecioRepuesto() throws Exception {
        // Initialize the database
        precioRepuestoService.save(precioRepuesto);

        int databaseSizeBeforeDelete = precioRepuestoRepository.findAll().size();

        // Delete the precioRepuesto
        restPrecioRepuestoMockMvc.perform(delete("/api/precio-repuestos/{id}", precioRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PrecioRepuesto.class);
        PrecioRepuesto precioRepuesto1 = new PrecioRepuesto();
        precioRepuesto1.setId(1L);
        PrecioRepuesto precioRepuesto2 = new PrecioRepuesto();
        precioRepuesto2.setId(precioRepuesto1.getId());
        assertThat(precioRepuesto1).isEqualTo(precioRepuesto2);
        precioRepuesto2.setId(2L);
        assertThat(precioRepuesto1).isNotEqualTo(precioRepuesto2);
        precioRepuesto1.setId(null);
        assertThat(precioRepuesto1).isNotEqualTo(precioRepuesto2);
    }
}
