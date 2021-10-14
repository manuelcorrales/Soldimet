package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import soldimet.IntegrationTest;
import soldimet.domain.Caja;
import soldimet.domain.Sucursal;
import soldimet.repository.CajaRepository;
import soldimet.service.criteria.CajaCriteria;

/**
 * Integration tests for the {@link CajaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CajaResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FECHA = LocalDate.ofEpochDay(-1L);

    private static final Instant DEFAULT_HORA_APERTURA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_APERTURA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_HORA_CIERRE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_CIERRE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_SALDO = 1F;
    private static final Float UPDATED_SALDO = 2F;
    private static final Float SMALLER_SALDO = 1F - 1F;

    private static final String DEFAULT_OBSERVACIONES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES = "BBBBBBBBBB";

    private static final Float DEFAULT_SALDO_FISICO = 1F;
    private static final Float UPDATED_SALDO_FISICO = 2F;
    private static final Float SMALLER_SALDO_FISICO = 1F - 1F;

    private static final String ENTITY_API_URL = "/api/cajas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CajaRepository cajaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCajaMockMvc;

    private Caja caja;

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
            .saldoFisico(DEFAULT_SALDO_FISICO);
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
            .saldoFisico(UPDATED_SALDO_FISICO);
        return caja;
    }

    @BeforeEach
    public void initTest() {
        caja = createEntity(em);
    }

    @Test
    @Transactional
    void createCaja() throws Exception {
        int databaseSizeBeforeCreate = cajaRepository.findAll().size();
        // Create the Caja
        restCajaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caja)))
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
        assertThat(testCaja.getSaldoFisico()).isEqualTo(DEFAULT_SALDO_FISICO);
    }

    @Test
    @Transactional
    void createCajaWithExistingId() throws Exception {
        // Create the Caja with an existing ID
        caja.setId(1L);

        int databaseSizeBeforeCreate = cajaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCajaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isBadRequest());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cajaRepository.findAll().size();
        // set the field null
        caja.setFecha(null);

        // Create the Caja, which fails.

        restCajaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isBadRequest());

        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkHoraAperturaIsRequired() throws Exception {
        int databaseSizeBeforeTest = cajaRepository.findAll().size();
        // set the field null
        caja.setHoraApertura(null);

        // Create the Caja, which fails.

        restCajaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isBadRequest());

        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCajas() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList
        restCajaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caja.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].horaApertura").value(hasItem(DEFAULT_HORA_APERTURA.toString())))
            .andExpect(jsonPath("$.[*].horaCierre").value(hasItem(DEFAULT_HORA_CIERRE.toString())))
            .andExpect(jsonPath("$.[*].saldo").value(hasItem(DEFAULT_SALDO.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)))
            .andExpect(jsonPath("$.[*].saldoFisico").value(hasItem(DEFAULT_SALDO_FISICO.doubleValue())));
    }

    @Test
    @Transactional
    void getCaja() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get the caja
        restCajaMockMvc
            .perform(get(ENTITY_API_URL_ID, caja.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(caja.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.horaApertura").value(DEFAULT_HORA_APERTURA.toString()))
            .andExpect(jsonPath("$.horaCierre").value(DEFAULT_HORA_CIERRE.toString()))
            .andExpect(jsonPath("$.saldo").value(DEFAULT_SALDO.doubleValue()))
            .andExpect(jsonPath("$.observaciones").value(DEFAULT_OBSERVACIONES))
            .andExpect(jsonPath("$.saldoFisico").value(DEFAULT_SALDO_FISICO.doubleValue()));
    }

    @Test
    @Transactional
    void getCajasByIdFiltering() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        Long id = caja.getId();

        defaultCajaShouldBeFound("id.equals=" + id);
        defaultCajaShouldNotBeFound("id.notEquals=" + id);

        defaultCajaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultCajaShouldNotBeFound("id.greaterThan=" + id);

        defaultCajaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultCajaShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha equals to DEFAULT_FECHA
        defaultCajaShouldBeFound("fecha.equals=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha equals to UPDATED_FECHA
        defaultCajaShouldNotBeFound("fecha.equals=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha not equals to DEFAULT_FECHA
        defaultCajaShouldNotBeFound("fecha.notEquals=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha not equals to UPDATED_FECHA
        defaultCajaShouldBeFound("fecha.notEquals=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha in DEFAULT_FECHA or UPDATED_FECHA
        defaultCajaShouldBeFound("fecha.in=" + DEFAULT_FECHA + "," + UPDATED_FECHA);

        // Get all the cajaList where fecha equals to UPDATED_FECHA
        defaultCajaShouldNotBeFound("fecha.in=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is not null
        defaultCajaShouldBeFound("fecha.specified=true");

        // Get all the cajaList where fecha is null
        defaultCajaShouldNotBeFound("fecha.specified=false");
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is greater than or equal to DEFAULT_FECHA
        defaultCajaShouldBeFound("fecha.greaterThanOrEqual=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is greater than or equal to UPDATED_FECHA
        defaultCajaShouldNotBeFound("fecha.greaterThanOrEqual=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is less than or equal to DEFAULT_FECHA
        defaultCajaShouldBeFound("fecha.lessThanOrEqual=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is less than or equal to SMALLER_FECHA
        defaultCajaShouldNotBeFound("fecha.lessThanOrEqual=" + SMALLER_FECHA);
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsLessThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is less than DEFAULT_FECHA
        defaultCajaShouldNotBeFound("fecha.lessThan=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is less than UPDATED_FECHA
        defaultCajaShouldBeFound("fecha.lessThan=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    void getAllCajasByFechaIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha is greater than DEFAULT_FECHA
        defaultCajaShouldNotBeFound("fecha.greaterThan=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha is greater than SMALLER_FECHA
        defaultCajaShouldBeFound("fecha.greaterThan=" + SMALLER_FECHA);
    }

    @Test
    @Transactional
    void getAllCajasByHoraAperturaIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaApertura equals to DEFAULT_HORA_APERTURA
        defaultCajaShouldBeFound("horaApertura.equals=" + DEFAULT_HORA_APERTURA);

        // Get all the cajaList where horaApertura equals to UPDATED_HORA_APERTURA
        defaultCajaShouldNotBeFound("horaApertura.equals=" + UPDATED_HORA_APERTURA);
    }

    @Test
    @Transactional
    void getAllCajasByHoraAperturaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaApertura not equals to DEFAULT_HORA_APERTURA
        defaultCajaShouldNotBeFound("horaApertura.notEquals=" + DEFAULT_HORA_APERTURA);

        // Get all the cajaList where horaApertura not equals to UPDATED_HORA_APERTURA
        defaultCajaShouldBeFound("horaApertura.notEquals=" + UPDATED_HORA_APERTURA);
    }

    @Test
    @Transactional
    void getAllCajasByHoraAperturaIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaApertura in DEFAULT_HORA_APERTURA or UPDATED_HORA_APERTURA
        defaultCajaShouldBeFound("horaApertura.in=" + DEFAULT_HORA_APERTURA + "," + UPDATED_HORA_APERTURA);

        // Get all the cajaList where horaApertura equals to UPDATED_HORA_APERTURA
        defaultCajaShouldNotBeFound("horaApertura.in=" + UPDATED_HORA_APERTURA);
    }

    @Test
    @Transactional
    void getAllCajasByHoraAperturaIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaApertura is not null
        defaultCajaShouldBeFound("horaApertura.specified=true");

        // Get all the cajaList where horaApertura is null
        defaultCajaShouldNotBeFound("horaApertura.specified=false");
    }

    @Test
    @Transactional
    void getAllCajasByHoraCierreIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaCierre equals to DEFAULT_HORA_CIERRE
        defaultCajaShouldBeFound("horaCierre.equals=" + DEFAULT_HORA_CIERRE);

        // Get all the cajaList where horaCierre equals to UPDATED_HORA_CIERRE
        defaultCajaShouldNotBeFound("horaCierre.equals=" + UPDATED_HORA_CIERRE);
    }

    @Test
    @Transactional
    void getAllCajasByHoraCierreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaCierre not equals to DEFAULT_HORA_CIERRE
        defaultCajaShouldNotBeFound("horaCierre.notEquals=" + DEFAULT_HORA_CIERRE);

        // Get all the cajaList where horaCierre not equals to UPDATED_HORA_CIERRE
        defaultCajaShouldBeFound("horaCierre.notEquals=" + UPDATED_HORA_CIERRE);
    }

    @Test
    @Transactional
    void getAllCajasByHoraCierreIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaCierre in DEFAULT_HORA_CIERRE or UPDATED_HORA_CIERRE
        defaultCajaShouldBeFound("horaCierre.in=" + DEFAULT_HORA_CIERRE + "," + UPDATED_HORA_CIERRE);

        // Get all the cajaList where horaCierre equals to UPDATED_HORA_CIERRE
        defaultCajaShouldNotBeFound("horaCierre.in=" + UPDATED_HORA_CIERRE);
    }

    @Test
    @Transactional
    void getAllCajasByHoraCierreIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where horaCierre is not null
        defaultCajaShouldBeFound("horaCierre.specified=true");

        // Get all the cajaList where horaCierre is null
        defaultCajaShouldNotBeFound("horaCierre.specified=false");
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo equals to DEFAULT_SALDO
        defaultCajaShouldBeFound("saldo.equals=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo equals to UPDATED_SALDO
        defaultCajaShouldNotBeFound("saldo.equals=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo not equals to DEFAULT_SALDO
        defaultCajaShouldNotBeFound("saldo.notEquals=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo not equals to UPDATED_SALDO
        defaultCajaShouldBeFound("saldo.notEquals=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo in DEFAULT_SALDO or UPDATED_SALDO
        defaultCajaShouldBeFound("saldo.in=" + DEFAULT_SALDO + "," + UPDATED_SALDO);

        // Get all the cajaList where saldo equals to UPDATED_SALDO
        defaultCajaShouldNotBeFound("saldo.in=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is not null
        defaultCajaShouldBeFound("saldo.specified=true");

        // Get all the cajaList where saldo is null
        defaultCajaShouldNotBeFound("saldo.specified=false");
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is greater than or equal to DEFAULT_SALDO
        defaultCajaShouldBeFound("saldo.greaterThanOrEqual=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is greater than or equal to UPDATED_SALDO
        defaultCajaShouldNotBeFound("saldo.greaterThanOrEqual=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is less than or equal to DEFAULT_SALDO
        defaultCajaShouldBeFound("saldo.lessThanOrEqual=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is less than or equal to SMALLER_SALDO
        defaultCajaShouldNotBeFound("saldo.lessThanOrEqual=" + SMALLER_SALDO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsLessThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is less than DEFAULT_SALDO
        defaultCajaShouldNotBeFound("saldo.lessThan=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is less than UPDATED_SALDO
        defaultCajaShouldBeFound("saldo.lessThan=" + UPDATED_SALDO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldo is greater than DEFAULT_SALDO
        defaultCajaShouldNotBeFound("saldo.greaterThan=" + DEFAULT_SALDO);

        // Get all the cajaList where saldo is greater than SMALLER_SALDO
        defaultCajaShouldBeFound("saldo.greaterThan=" + SMALLER_SALDO);
    }

    @Test
    @Transactional
    void getAllCajasByObservacionesIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones equals to DEFAULT_OBSERVACIONES
        defaultCajaShouldBeFound("observaciones.equals=" + DEFAULT_OBSERVACIONES);

        // Get all the cajaList where observaciones equals to UPDATED_OBSERVACIONES
        defaultCajaShouldNotBeFound("observaciones.equals=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void getAllCajasByObservacionesIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones not equals to DEFAULT_OBSERVACIONES
        defaultCajaShouldNotBeFound("observaciones.notEquals=" + DEFAULT_OBSERVACIONES);

        // Get all the cajaList where observaciones not equals to UPDATED_OBSERVACIONES
        defaultCajaShouldBeFound("observaciones.notEquals=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void getAllCajasByObservacionesIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones in DEFAULT_OBSERVACIONES or UPDATED_OBSERVACIONES
        defaultCajaShouldBeFound("observaciones.in=" + DEFAULT_OBSERVACIONES + "," + UPDATED_OBSERVACIONES);

        // Get all the cajaList where observaciones equals to UPDATED_OBSERVACIONES
        defaultCajaShouldNotBeFound("observaciones.in=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void getAllCajasByObservacionesIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones is not null
        defaultCajaShouldBeFound("observaciones.specified=true");

        // Get all the cajaList where observaciones is null
        defaultCajaShouldNotBeFound("observaciones.specified=false");
    }

    @Test
    @Transactional
    void getAllCajasByObservacionesContainsSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones contains DEFAULT_OBSERVACIONES
        defaultCajaShouldBeFound("observaciones.contains=" + DEFAULT_OBSERVACIONES);

        // Get all the cajaList where observaciones contains UPDATED_OBSERVACIONES
        defaultCajaShouldNotBeFound("observaciones.contains=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void getAllCajasByObservacionesNotContainsSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where observaciones does not contain DEFAULT_OBSERVACIONES
        defaultCajaShouldNotBeFound("observaciones.doesNotContain=" + DEFAULT_OBSERVACIONES);

        // Get all the cajaList where observaciones does not contain UPDATED_OBSERVACIONES
        defaultCajaShouldBeFound("observaciones.doesNotContain=" + UPDATED_OBSERVACIONES);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico equals to DEFAULT_SALDO_FISICO
        defaultCajaShouldBeFound("saldoFisico.equals=" + DEFAULT_SALDO_FISICO);

        // Get all the cajaList where saldoFisico equals to UPDATED_SALDO_FISICO
        defaultCajaShouldNotBeFound("saldoFisico.equals=" + UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico not equals to DEFAULT_SALDO_FISICO
        defaultCajaShouldNotBeFound("saldoFisico.notEquals=" + DEFAULT_SALDO_FISICO);

        // Get all the cajaList where saldoFisico not equals to UPDATED_SALDO_FISICO
        defaultCajaShouldBeFound("saldoFisico.notEquals=" + UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsInShouldWork() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico in DEFAULT_SALDO_FISICO or UPDATED_SALDO_FISICO
        defaultCajaShouldBeFound("saldoFisico.in=" + DEFAULT_SALDO_FISICO + "," + UPDATED_SALDO_FISICO);

        // Get all the cajaList where saldoFisico equals to UPDATED_SALDO_FISICO
        defaultCajaShouldNotBeFound("saldoFisico.in=" + UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsNullOrNotNull() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is not null
        defaultCajaShouldBeFound("saldoFisico.specified=true");

        // Get all the cajaList where saldoFisico is null
        defaultCajaShouldNotBeFound("saldoFisico.specified=false");
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is greater than or equal to DEFAULT_SALDO_FISICO
        defaultCajaShouldBeFound("saldoFisico.greaterThanOrEqual=" + DEFAULT_SALDO_FISICO);

        // Get all the cajaList where saldoFisico is greater than or equal to UPDATED_SALDO_FISICO
        defaultCajaShouldNotBeFound("saldoFisico.greaterThanOrEqual=" + UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is less than or equal to DEFAULT_SALDO_FISICO
        defaultCajaShouldBeFound("saldoFisico.lessThanOrEqual=" + DEFAULT_SALDO_FISICO);

        // Get all the cajaList where saldoFisico is less than or equal to SMALLER_SALDO_FISICO
        defaultCajaShouldNotBeFound("saldoFisico.lessThanOrEqual=" + SMALLER_SALDO_FISICO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsLessThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is less than DEFAULT_SALDO_FISICO
        defaultCajaShouldNotBeFound("saldoFisico.lessThan=" + DEFAULT_SALDO_FISICO);

        // Get all the cajaList where saldoFisico is less than UPDATED_SALDO_FISICO
        defaultCajaShouldBeFound("saldoFisico.lessThan=" + UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void getAllCajasBySaldoFisicoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where saldoFisico is greater than DEFAULT_SALDO_FISICO
        defaultCajaShouldNotBeFound("saldoFisico.greaterThan=" + DEFAULT_SALDO_FISICO);

        // Get all the cajaList where saldoFisico is greater than SMALLER_SALDO_FISICO
        defaultCajaShouldBeFound("saldoFisico.greaterThan=" + SMALLER_SALDO_FISICO);
    }

    @Test
    @Transactional
    void getAllCajasBySucursalIsEqualToSomething() throws Exception {
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

        // Get all the cajaList where sucursal equals to (sucursalId + 1)
        defaultCajaShouldNotBeFound("sucursalId.equals=" + (sucursalId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultCajaShouldBeFound(String filter) throws Exception {
        restCajaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caja.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].horaApertura").value(hasItem(DEFAULT_HORA_APERTURA.toString())))
            .andExpect(jsonPath("$.[*].horaCierre").value(hasItem(DEFAULT_HORA_CIERRE.toString())))
            .andExpect(jsonPath("$.[*].saldo").value(hasItem(DEFAULT_SALDO.doubleValue())))
            .andExpect(jsonPath("$.[*].observaciones").value(hasItem(DEFAULT_OBSERVACIONES)))
            .andExpect(jsonPath("$.[*].saldoFisico").value(hasItem(DEFAULT_SALDO_FISICO.doubleValue())));

        // Check, that the count call also returns 1
        restCajaMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultCajaShouldNotBeFound(String filter) throws Exception {
        restCajaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restCajaMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingCaja() throws Exception {
        // Get the caja
        restCajaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCaja() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

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
            .saldoFisico(UPDATED_SALDO_FISICO);

        restCajaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCaja.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCaja))
            )
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
        assertThat(testCaja.getSaldoFisico()).isEqualTo(UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void putNonExistingCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();
        caja.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCajaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, caja.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(caja))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();
        caja.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCajaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(caja))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();
        caja.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCajaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCajaWithPatch() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();

        // Update the caja using partial update
        Caja partialUpdatedCaja = new Caja();
        partialUpdatedCaja.setId(caja.getId());

        partialUpdatedCaja.fecha(UPDATED_FECHA).saldoFisico(UPDATED_SALDO_FISICO);

        restCajaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCaja.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCaja))
            )
            .andExpect(status().isOk());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
        Caja testCaja = cajaList.get(cajaList.size() - 1);
        assertThat(testCaja.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testCaja.getHoraApertura()).isEqualTo(DEFAULT_HORA_APERTURA);
        assertThat(testCaja.getHoraCierre()).isEqualTo(DEFAULT_HORA_CIERRE);
        assertThat(testCaja.getSaldo()).isEqualTo(DEFAULT_SALDO);
        assertThat(testCaja.getObservaciones()).isEqualTo(DEFAULT_OBSERVACIONES);
        assertThat(testCaja.getSaldoFisico()).isEqualTo(UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void fullUpdateCajaWithPatch() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();

        // Update the caja using partial update
        Caja partialUpdatedCaja = new Caja();
        partialUpdatedCaja.setId(caja.getId());

        partialUpdatedCaja
            .fecha(UPDATED_FECHA)
            .horaApertura(UPDATED_HORA_APERTURA)
            .horaCierre(UPDATED_HORA_CIERRE)
            .saldo(UPDATED_SALDO)
            .observaciones(UPDATED_OBSERVACIONES)
            .saldoFisico(UPDATED_SALDO_FISICO);

        restCajaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCaja.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCaja))
            )
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
        assertThat(testCaja.getSaldoFisico()).isEqualTo(UPDATED_SALDO_FISICO);
    }

    @Test
    @Transactional
    void patchNonExistingCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();
        caja.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCajaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, caja.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(caja))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();
        caja.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCajaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(caja))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();
        caja.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCajaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCaja() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        int databaseSizeBeforeDelete = cajaRepository.findAll().size();

        // Delete the caja
        restCajaMockMvc
            .perform(delete(ENTITY_API_URL_ID, caja.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
