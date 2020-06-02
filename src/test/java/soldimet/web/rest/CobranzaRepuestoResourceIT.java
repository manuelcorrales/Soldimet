package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.TipoRepuesto;
import soldimet.domain.Marca;
import soldimet.domain.Cilindrada;
import soldimet.domain.Aplicacion;
import soldimet.repository.CobranzaRepuestoRepository;
import soldimet.service.CobranzaRepuestoService;
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
 * Integration tests for the {@link CobranzaRepuestoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class CobranzaRepuestoResourceIT {

    private static final Float DEFAULT_VALOR = 0F;
    private static final Float UPDATED_VALOR = 1F;
    private static final Float SMALLER_VALOR = 0F - 1F;

    private static final String DEFAULT_DETALLE = "AAAAAAAAAA";
    private static final String UPDATED_DETALLE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA = LocalDate.ofEpochDay(-1L);

    @Autowired
    private CobranzaRepuestoRepository cobranzaRepuestoRepository;

    @Autowired
    private CobranzaRepuestoService cobranzaRepuestoService;

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

    private MockMvc restCobranzaRepuestoMockMvc;

    private CobranzaRepuesto cobranzaRepuesto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CobranzaRepuestoResource cobranzaRepuestoResource = new CobranzaRepuestoResource(cobranzaRepuestoService);
        this.restCobranzaRepuestoMockMvc = MockMvcBuilders.standaloneSetup(cobranzaRepuestoResource)
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
    public static CobranzaRepuesto createEntity(EntityManager em) {
        CobranzaRepuesto cobranzaRepuesto = new CobranzaRepuesto()
            .valor(DEFAULT_VALOR)
            .detalle(DEFAULT_DETALLE)
            .fecha(DEFAULT_FECHA);
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        cobranzaRepuesto.setTipoRepuesto(tipoRepuesto);
        // Add required entity
        Marca marca;
        if (TestUtil.findAll(em, Marca.class).isEmpty()) {
            marca = MarcaResourceIT.createEntity(em);
            em.persist(marca);
            em.flush();
        } else {
            marca = TestUtil.findAll(em, Marca.class).get(0);
        }
        cobranzaRepuesto.setMarca(marca);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        cobranzaRepuesto.setCilindrada(cilindrada);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        cobranzaRepuesto.setAplicacion(aplicacion);
        return cobranzaRepuesto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CobranzaRepuesto createUpdatedEntity(EntityManager em) {
        CobranzaRepuesto cobranzaRepuesto = new CobranzaRepuesto()
            .valor(UPDATED_VALOR)
            .detalle(UPDATED_DETALLE)
            .fecha(UPDATED_FECHA);
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        cobranzaRepuesto.setTipoRepuesto(tipoRepuesto);
        // Add required entity
        Marca marca;
        if (TestUtil.findAll(em, Marca.class).isEmpty()) {
            marca = MarcaResourceIT.createUpdatedEntity(em);
            em.persist(marca);
            em.flush();
        } else {
            marca = TestUtil.findAll(em, Marca.class).get(0);
        }
        cobranzaRepuesto.setMarca(marca);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createUpdatedEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        cobranzaRepuesto.setCilindrada(cilindrada);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createUpdatedEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        cobranzaRepuesto.setAplicacion(aplicacion);
        return cobranzaRepuesto;
    }

    @BeforeEach
    public void initTest() {
        cobranzaRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeCreate = cobranzaRepuestoRepository.findAll().size();

        // Create the CobranzaRepuesto
        restCobranzaRepuestoMockMvc.perform(post("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto)))
            .andExpect(status().isCreated());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        CobranzaRepuesto testCobranzaRepuesto = cobranzaRepuestoList.get(cobranzaRepuestoList.size() - 1);
        assertThat(testCobranzaRepuesto.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testCobranzaRepuesto.getDetalle()).isEqualTo(DEFAULT_DETALLE);
        assertThat(testCobranzaRepuesto.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createCobranzaRepuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cobranzaRepuestoRepository.findAll().size();

        // Create the CobranzaRepuesto with an existing ID
        cobranzaRepuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCobranzaRepuestoMockMvc.perform(post("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = cobranzaRepuestoRepository.findAll().size();
        // set the field null
        cobranzaRepuesto.setValor(null);

        // Create the CobranzaRepuesto, which fails.

        restCobranzaRepuestoMockMvc.perform(post("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto)))
            .andExpect(status().isBadRequest());

        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDetalleIsRequired() throws Exception {
        int databaseSizeBeforeTest = cobranzaRepuestoRepository.findAll().size();
        // set the field null
        cobranzaRepuesto.setDetalle(null);

        // Create the CobranzaRepuesto, which fails.

        restCobranzaRepuestoMockMvc.perform(post("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto)))
            .andExpect(status().isBadRequest());

        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCobranzaRepuestos() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        // Get all the cobranzaRepuestoList
        restCobranzaRepuestoMockMvc.perform(get("/api/cobranza-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobranzaRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].detalle").value(hasItem(DEFAULT_DETALLE.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @Test
    @Transactional
    public void getCobranzaRepuesto() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        // Get the cobranzaRepuesto
        restCobranzaRepuestoMockMvc.perform(get("/api/cobranza-repuestos/{id}", cobranzaRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cobranzaRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.detalle").value(DEFAULT_DETALLE.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCobranzaRepuesto() throws Exception {
        // Get the cobranzaRepuesto
        restCobranzaRepuestoMockMvc.perform(get("/api/cobranza-repuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCobranzaRepuesto() throws Exception {
        // Initialize the database
        cobranzaRepuestoService.save(cobranzaRepuesto);

        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();

        // Update the cobranzaRepuesto
        CobranzaRepuesto updatedCobranzaRepuesto = cobranzaRepuestoRepository.findById(cobranzaRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedCobranzaRepuesto are not directly saved in db
        em.detach(updatedCobranzaRepuesto);
        updatedCobranzaRepuesto
            .valor(UPDATED_VALOR)
            .detalle(UPDATED_DETALLE)
            .fecha(UPDATED_FECHA);

        restCobranzaRepuestoMockMvc.perform(put("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCobranzaRepuesto)))
            .andExpect(status().isOk());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CobranzaRepuesto testCobranzaRepuesto = cobranzaRepuestoList.get(cobranzaRepuestoList.size() - 1);
        assertThat(testCobranzaRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testCobranzaRepuesto.getDetalle()).isEqualTo(UPDATED_DETALLE);
        assertThat(testCobranzaRepuesto.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();

        // Create the CobranzaRepuesto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCobranzaRepuestoMockMvc.perform(put("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCobranzaRepuesto() throws Exception {
        // Initialize the database
        cobranzaRepuestoService.save(cobranzaRepuesto);

        int databaseSizeBeforeDelete = cobranzaRepuestoRepository.findAll().size();

        // Delete the cobranzaRepuesto
        restCobranzaRepuestoMockMvc.perform(delete("/api/cobranza-repuestos/{id}", cobranzaRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CobranzaRepuesto.class);
        CobranzaRepuesto cobranzaRepuesto1 = new CobranzaRepuesto();
        cobranzaRepuesto1.setId(1L);
        CobranzaRepuesto cobranzaRepuesto2 = new CobranzaRepuesto();
        cobranzaRepuesto2.setId(cobranzaRepuesto1.getId());
        assertThat(cobranzaRepuesto1).isEqualTo(cobranzaRepuesto2);
        cobranzaRepuesto2.setId(2L);
        assertThat(cobranzaRepuesto1).isNotEqualTo(cobranzaRepuesto2);
        cobranzaRepuesto1.setId(null);
        assertThat(cobranzaRepuesto1).isNotEqualTo(cobranzaRepuesto2);
    }
}
