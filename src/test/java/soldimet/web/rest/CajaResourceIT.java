package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.Caja;
import soldimet.domain.Sucursal;
import soldimet.repository.CajaRepository;
import soldimet.service.CajaService;
import soldimet.web.rest.errors.ExceptionTranslator;
import soldimet.service.dto.CajaCriteria;
import soldimet.service.CajaQueryService;

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
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CajaResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class CajaResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA = LocalDate.ofEpochDay(-1L);

    private static final Instant DEFAULT_HORA_APERTURA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_APERTURA = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_APERTURA = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_HORA_CIERRE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_CIERRE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_HORA_CIERRE = Instant.ofEpochMilli(-1L);

    private static final Float DEFAULT_SALDO = 1F;
    private static final Float UPDATED_SALDO = 2F;
    private static final Float SMALLER_SALDO = 1F - 1F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Float DEFAULT_SALDOFISICO = 1F;
    private static final Float UPDATED_SALDOFISICO = 2F;
    private static final Float SMALLER_SALDOFISICO = 1F - 1F;

    @Autowired
    private CajaRepository cajaRepository;

    @Autowired
    private CajaService cajaService;

    @Autowired
    private CajaQueryService cajaQueryService;

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

    private MockMvc restCajaMockMvc;

    private Caja caja;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CajaResource cajaResource = new CajaResource(cajaService, cajaQueryService);
        this.restCajaMockMvc = MockMvcBuilders.standaloneSetup(cajaResource)
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
    public static Caja createEntity(EntityManager em) {
        Caja caja = new Caja()
            .fecha(DEFAULT_FECHA)
            .horaApertura(DEFAULT_HORA_APERTURA)
            .horaCierre(DEFAULT_HORA_CIERRE)
            .saldo(DEFAULT_SALDO)
            .observaciones(DEFAULT_OBSERVACIONES)
            .saldoFisico(DEFAULT_SALDOFISICO);
        return caja;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Caja createUpdatedEntity(EntityManager em) {
        Caja caja = new Caja()
            .fecha(UPDATED_FECHA)
            .horaApertura(UPDATED_HORA_APERTURA)
            .horaCierre(UPDATED_HORA_CIERRE)
            .saldo(UPDATED_SALDO)
            .observaciones(UPDATED_OBSERVACIONES)
            .saldoFisico(UPDATED_SALDOFISICO);
        return caja;
    }

    @BeforeEach
    public void initTest() {
        caja = createEntity(em);
    }

    @Test
    @Transactional
    public void createCaja() throws Exception {
        int databaseSizeBeforeCreate = cajaRepository.findAll().size();

        // Create the Caja
        restCajaMockMvc.perform(post("/api/cajas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isCreated());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeCreate + 1);
        Caja testCaja = cajaList.get(cajaList.size() - 1);
        assertThat(testCaja.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testCaja.getHoraApertura()).isEqualTo(DEFAULT_HORA_APERTURA);
        assertThat(testCaja.getHoraCierre()).isEqualTo(DEFAULT_HORA_CIERRE);
        assertThat(testCaja.getSaldo()).isEqualTo(DEFAULT_SALDO);
        assertThat(testCaja.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testCaja.getSaldoFisico()).isEqualTo(DEFAULT_SALDOFISICO);
    }

    @Test
    @Transactional
    public void createCajaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cajaRepository.findAll().size();

        // Create the Caja with an existing ID
        caja.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCajaMockMvc.perform(post("/api/cajas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isBadRequest());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cajaRepository.findAll().size();
        // set the field null
        caja.setFecha(null);

        // Create the Caja, which fails.

        restCajaMockMvc.perform(post("/api/cajas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isBadRequest());

        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHoraAperturaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cajaRepository.findAll().size();
        // set the field null
        caja.setHoraApertura(null);

        // Create the Caja, which fails.

        restCajaMockMvc.perform(post("/api/cajas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isBadRequest());

        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCajas() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList
        restCajaMockMvc.perform(get("/api/cajas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caja.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].horaApertura").value(hasItem(DEFAULT_HORA_APERTURA.toString())))
            .andExpect(jsonPath("$.[*].horaCierre").value(hasItem(DEFAULT_HORA_CIERRE.toString())))
            .andExpect(jsonPath("$.[*].saldo").value(hasItem(DEFAULT_SALDO.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES.toString())))
            .andExpect(jsonPath("$.[*].saldoFisico").value(hasItem(DEFAULT_SALDOFISICO.doubleValue())));
    }

    @Test
    @Transactional
    public void getCaja() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get the caja
        restCajaMockMvc.perform(get("/api/cajas/{id}", caja.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(caja.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.horaApertura").value(DEFAULT_HORA_APERTURA.toString()))
            .andExpect(jsonPath("$.horaCierre").value(DEFAULT_HORA_CIERRE.toString()))
            .andExpect(jsonPath("$.saldo").value(DEFAULT_SALDO.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES.toString()))
            .andExpect(jsonPath("$.saldoFisico").value(DEFAULT_SALDOFISICO.doubleValue()));
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha equals to DEFAULT_FECHA
        defaultCajaShouldBeFound("fecha.equals=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha equals to UPDATED_FECHA
        defaultCajaShouldNotBeFound("fecha.equals=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha in DEFAULT_FECHA or UPDATED_FECHA
        defaultCajaShouldBeFound("fecha.in=" + DEFAULT_FECHA + "," + UPDATED_FECHA);

        // Get all the cajaList where fecha equals to UPDATED_FECHA
        defaultCajaShouldNotBeFound("fecha.in=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is not null
        defaultCajaShouldBeFound("fecha.specified=true");

        // Get all the cajaList where fecha is null
        defaultCajaShouldNotBeFound("fecha.specified=false");
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is greater than or equal to DEFAULT_FECHA
        defaultCajaShouldBeFound("fecha.greaterThanOrEqual=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is greater than or equal to UPDATED_FECHA
        defaultCajaShouldNotBeFound("fecha.greaterThanOrEqual=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is less than or equal to DEFAULT_FECHA
        defaultCajaShouldBeFound("fecha.lessThanOrEqual=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is less than or equal to SMALLER_FECHA
        defaultCajaShouldNotBeFound("fecha.lessThanOrEqual=" + SMALLER_FECHA);
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsLessThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is less than DEFAULT_FECHA
        defaultCajaShouldNotBeFound("fecha.lessThan=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is less than UPDATED_FECHA
        defaultCajaShouldBeFound("fecha.lessThan=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is greater than DEFAULT_FECHA
        defaultCajaShouldNotBeFound("fecha.greaterThan=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is greater than SMALLER_FECHA
        defaultCajaShouldBeFound("fecha.greaterThan=" + SMALLER_FECHA);
    }


    @Test
    @Transactional
    public void getAllCajasByHoraAperturaIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaApertura equals to DEFAULT_HORA_APERTURA
        defaultCajaShouldBeFound("horaApertura.equals=" + DEFAULT_HORA_APERTURA);

        // Get all the cajaList where horaApertura equals to UPDATED_HORA_APERTURA
        defaultCajaShouldNotBeFound("horaApertura.equals=" + UPDATED_HORA_APERTURA);
    }

    @Test
    @Transactional
    public void getAllCajasByHoraAperturaIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaApertura in DEFAULT_HORA_APERTURA or UPDATED_HORA_APERTURA
        defaultCajaShouldBeFound("horaApertura.in=" + DEFAULT_HORA_APERTURA + "," + UPDATED_HORA_APERTURA);

        // Get all the cajaList where horaApertura equals to UPDATED_HORA_APERTURA
        defaultCajaShouldNotBeFound("horaApertura.in=" + UPDATED_HORA_APERTURA);
    }

    @Test
    @Transactional
    public void getAllCajasByHoraAperturaIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaApertura is not null
        defaultCajaShouldBeFound("horaApertura.specified=true");

        // Get all the cajaList where horaApertura is null
        defaultCajaShouldNotBeFound("horaApertura.specified=false");
    }

    @Test
    @Transactional
    public void getAllCajasByHoraCierreIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaCierre equals to DEFAULT_HORA_CIERRE
        defaultCajaShouldBeFound("horaCierre.equals=" + DEFAULT_HORA_CIERRE);

        // Get all the cajaList where horaCierre equals to UPDATED_HORA_CIERRE
        defaultCajaShouldNotBeFound("horaCierre.equals=" + UPDATED_HORA_CIERRE);
    }

    @Test
    @Transactional
    public void getAllCajasByHoraCierreIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaCierre in DEFAULT_HORA_CIERRE or UPDATED_HORA_CIERRE
        defaultCajaShouldBeFound("horaCierre.in=" + DEFAULT_HORA_CIERRE + "," + UPDATED_HORA_CIERRE);

        // Get all the cajaList where horaCierre equals to UPDATED_HORA_CIERRE
        defaultCajaShouldNotBeFound("horaCierre.in=" + UPDATED_HORA_CIERRE);
    }

    @Test
    @Transactional
    public void getAllCajasByHoraCierreIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaCierre is not null
        defaultCajaShouldBeFound("horaCierre.specified=true");

        // Get all the cajaList where horaCierre is null
        defaultCajaShouldNotBeFound("horaCierre.specified=false");
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo equals to DEFAULT_SALDO
        defaultCajaShouldBeFound("saldo.equals=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo equals to UPDATED_SALDO
        defaultCajaShouldNotBeFound("saldo.equals=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo in DEFAULT_SALDO or UPDATED_SALDO
        defaultCajaShouldBeFound("saldo.in=" + DEFAULT_SALDO + "," + UPDATED_SALDO);

        // Get all the cajaList where saldo equals to UPDATED_SALDO
        defaultCajaShouldNotBeFound("saldo.in=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is not null
        defaultCajaShouldBeFound("saldo.specified=true");

        // Get all the cajaList where saldo is null
        defaultCajaShouldNotBeFound("saldo.specified=false");
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is greater than or equal to DEFAULT_SALDO
        defaultCajaShouldBeFound("saldo.greaterThanOrEqual=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is greater than or equal to UPDATED_SALDO
        defaultCajaShouldNotBeFound("saldo.greaterThanOrEqual=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is less than or equal to DEFAULT_SALDO
        defaultCajaShouldBeFound("saldo.lessThanOrEqual=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is less than or equal to SMALLER_SALDO
        defaultCajaShouldNotBeFound("saldo.lessThanOrEqual=" + SMALLER_SALDO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoIsLessThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is less than DEFAULT_SALDO
        defaultCajaShouldNotBeFound("saldo.lessThan=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is less than UPDATED_SALDO
        defaultCajaShouldBeFound("saldo.lessThan=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is greater than DEFAULT_SALDO
        defaultCajaShouldNotBeFound("saldo.greaterThan=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is greater than SMALLER_SALDO
        defaultCajaShouldBeFound("saldo.greaterThan=" + SMALLER_SALDO);
    }


    @Test
    @Transactional
    public void getAllCajasByObservacionesIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones equals to DEFAULT_OBSERVACIONES
        defaultCajaShouldBeFound("observaciones.equals=" + DEFAULT_OBSERVACIONES);

        // Get all the cajaList where observaciones equals to UPDATED_OBSERVACIONES
        defaultCajaShouldNotBeFound("observaciones.equals=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllCajasByObservacionesIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones in DEFAULT_OBSERVACIONES or UPDATED_OBSERVACIONES
        defaultCajaShouldBeFound("observaciones.in=" + DEFAULT_OBSERVACIONES + "," + UPDATED_OBSERVACIONES);

        // Get all the cajaList where observaciones equals to UPDATED_OBSERVACIONES
        defaultCajaShouldNotBeFound("observaciones.in=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    public void getAllCajasByObservacionesIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones is not null
        defaultCajaShouldBeFound("observaciones.specified=true");

        // Get all the cajaList where observaciones is null
        defaultCajaShouldNotBeFound("observaciones.specified=false");
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoFisicoIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico equals to DEFAULT_SALDOFISICO
        defaultCajaShouldBeFound("saldoFisico.equals=" + DEFAULT_SALDOFISICO);

        // Get all the cajaList where saldoFisico equals to UPDATED_SALDOFISICO
        defaultCajaShouldNotBeFound("saldoFisico.equals=" + UPDATED_SALDOFISICO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoFisicoIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico in DEFAULT_SALDOFISICO or UPDATED_SALDOFISICO
        defaultCajaShouldBeFound("saldoFisico.in=" + DEFAULT_SALDOFISICO + "," + UPDATED_SALDOFISICO);

        // Get all the cajaList where saldoFisico equals to UPDATED_SALDOFISICO
        defaultCajaShouldNotBeFound("saldoFisico.in=" + UPDATED_SALDOFISICO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoFisicoIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is not null
        defaultCajaShouldBeFound("saldoFisico.specified=true");

        // Get all the cajaList where saldoFisico is null
        defaultCajaShouldNotBeFound("saldoFisico.specified=false");
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoFisicoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is greater than or equal to DEFAULT_SALDOFISICO
        defaultCajaShouldBeFound("saldoFisico.greaterThanOrEqual=" + DEFAULT_SALDOFISICO);

        // Get all the cajaList where saldoFisico is greater than or equal to UPDATED_SALDOFISICO
        defaultCajaShouldNotBeFound("saldoFisico.greaterThanOrEqual=" + UPDATED_SALDOFISICO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoFisicoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is less than or equal to DEFAULT_SALDOFISICO
        defaultCajaShouldBeFound("saldoFisico.lessThanOrEqual=" + DEFAULT_SALDOFISICO);

        // Get all the cajaList where saldoFisico is less than or equal to SMALLER_SALDOFISICO
        defaultCajaShouldNotBeFound("saldoFisico.lessThanOrEqual=" + SMALLER_SALDOFISICO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoFisicoIsLessThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is less than DEFAULT_SALDOFISICO
        defaultCajaShouldNotBeFound("saldoFisico.lessThan=" + DEFAULT_SALDOFISICO);

        // Get all the cajaList where saldoFisico is less than UPDATED_SALDOFISICO
        defaultCajaShouldBeFound("saldoFisico.lessThan=" + UPDATED_SALDOFISICO);
    }

    @Test
    @Transactional
    public void getAllCajasBySaldoFisicoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is greater than DEFAULT_SALDOFISICO
        defaultCajaShouldNotBeFound("saldoFisico.greaterThan=" + DEFAULT_SALDOFISICO);

        // Get all the cajaList where saldoFisico is greater than SMALLER_SALDOFISICO
        defaultCajaShouldBeFound("saldoFisico.greaterThan=" + SMALLER_SALDOFISICO);
    }


    @Test
    @Transactional
    public void getAllCajasBySucursalIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);
        Sucursal sucursal = SucursalResourceIT.createEntity(em);
        em.persist(sucursal);
        em.flush();
        caja.setSucursal(sucursal);
        cajaRepository.saveAndFlush(caja);
        Long sucursalId = sucursal.getId();

        // Get all the cajaList where sucursal equals to sucursalId
        defaultCajaShouldBeFound("sucursalId.equals=" + sucursalId);

        // Get all the cajaList where sucursal equals to sucursalId + 1
        defaultCajaShouldNotBeFound("sucursalId.equals=" + (sucursalId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultCajaShouldBeFound(String filter) throws Exception {
        restCajaMockMvc.perform(get("/api/cajas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caja.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].horaApertura").value(hasItem(DEFAULT_HORA_APERTURA.toString())))
            .andExpect(jsonPath("$.[*].horaCierre").value(hasItem(DEFAULT_HORA_CIERRE.toString())))
            .andExpect(jsonPath("$.[*].saldo").value(hasItem(DEFAULT_SALDO.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)))
            .andExpect(jsonPath("$.[*].saldoFisico").value(hasItem(DEFAULT_SALDOFISICO.doubleValue())));

        // Check, that the count call also returns 1
        restCajaMockMvc.perform(get("/api/cajas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultCajaShouldNotBeFound(String filter) throws Exception {
        restCajaMockMvc.perform(get("/api/cajas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCajaMockMvc.perform(get("/api/cajas/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingCaja() throws Exception {
        // Get the caja
        restCajaMockMvc.perform(get("/api/cajas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCaja() throws Exception {
        // Initialize the database
        cajaService.save(caja);

        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();

        // Update the caja
        Caja updatedCaja = cajaRepository.findById(caja.getId()).get();
        // Disconnect from session so that the updates on updatedCaja are not directly saved in db
        em.detach(updatedCaja);
        updatedCaja
            .fecha(UPDATED_FECHA)
            .horaApertura(UPDATED_HORA_APERTURA)
            .horaCierre(UPDATED_HORA_CIERRE)
            .saldo(UPDATED_SALDO)
            .observaciones(UPDATED_OBSERVACIONES)
            .saldoFisico(UPDATED_SALDOFISICO);

        restCajaMockMvc.perform(put("/api/cajas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCaja)))
            .andExpect(status().isOk());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
        Caja testCaja = cajaList.get(cajaList.size() - 1);
        assertThat(testCaja.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCaja.getHoraApertura()).isEqualTo(UPDATED_HORA_APERTURA);
        assertThat(testCaja.getHoraCierre()).isEqualTo(UPDATED_HORA_CIERRE);
        assertThat(testCaja.getSaldo()).isEqualTo(UPDATED_SALDO);
        assertThat(testCaja.getObservaciones()).isEqualTo(UPDATED_OBSERVACIONES);
        assertThat(testCaja.getSaldoFisico()).isEqualTo(UPDATED_SALDOFISICO);
    }

    @Test
    @Transactional
    public void updateNonExistingCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();

        // Create the Caja

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCajaMockMvc.perform(put("/api/cajas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isBadRequest());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCaja() throws Exception {
        // Initialize the database
        cajaService.save(caja);

        int databaseSizeBeforeDelete = cajaRepository.findAll().size();

        // Delete the caja
        restCajaMockMvc.perform(delete("/api/cajas/{id}", caja.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Caja.class);
        Caja caja1 = new Caja();
        caja1.setId(1L);
        caja1.setFecha(DEFAULT_FECHA);
        Caja caja2 = new Caja();
        caja2.setId(caja1.getId());
        caja2.setFecha(DEFAULT_FECHA);
        assertThat(caja1).isEqualTo(caja2);
        caja2.setId(2L);
        assertThat(caja1).isNotEqualTo(caja2);
        caja1.setId(null);
        assertThat(caja1).isNotEqualTo(caja2);
    }
}
