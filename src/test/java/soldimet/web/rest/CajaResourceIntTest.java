package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Caja;
import soldimet.repository.CajaRepository;
import soldimet.service.CajaService;
import soldimet.web.rest.errors.ExceptionTranslator;
import soldimet.service.dto.CajaCriteria;
import soldimet.service.CajaQueryService;

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
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CajaResource REST controller.
 *
 * @see CajaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class CajaResourceIntTest {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_HORA_APERTURA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_APERTURA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_HORA_CIERRE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_HORA_CIERRE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

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

    private MockMvc restCajaMockMvc;

    private Caja caja;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CajaResource cajaResource = new CajaResource(cajaService, cajaQueryService);
        this.restCajaMockMvc = MockMvcBuilders.standaloneSetup(cajaResource)
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
    public static Caja createEntity(EntityManager em) {
        Caja caja = new Caja()
            .fecha(DEFAULT_FECHA)
            .horaApertura(DEFAULT_HORA_APERTURA)
            .horaCierre(DEFAULT_HORA_CIERRE);
        return caja;
    }

    @Before
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
            .andExpect(jsonPath("$.[*].horaCierre").value(hasItem(DEFAULT_HORA_CIERRE.toString())));
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
            .andExpect(jsonPath("$.horaCierre").value(DEFAULT_HORA_CIERRE.toString()));
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

        // Get all the cajaList where fecha greater than or equals to DEFAULT_FECHA
        defaultCajaShouldBeFound("fecha.greaterOrEqualThan=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha greater than or equals to UPDATED_FECHA
        defaultCajaShouldNotBeFound("fecha.greaterOrEqualThan=" + UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void getAllCajasByFechaIsLessThanSomething() throws Exception {
        // Initialize the database
        cajaRepository.saveAndFlush(caja);

        // Get all the cajaList where fecha less than or equals to DEFAULT_FECHA
        defaultCajaShouldNotBeFound("fecha.lessThan=" + DEFAULT_FECHA);

        // Get all the cajaList where fecha less than or equals to UPDATED_FECHA
        defaultCajaShouldBeFound("fecha.lessThan=" + UPDATED_FECHA);
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

    /**
     * Executes the search, and checks that the default entity is returned
     */
    private void defaultCajaShouldBeFound(String filter) throws Exception {
        restCajaMockMvc.perform(get("/api/cajas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caja.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].horaApertura").value(hasItem(DEFAULT_HORA_APERTURA.toString())))
            .andExpect(jsonPath("$.[*].horaCierre").value(hasItem(DEFAULT_HORA_CIERRE.toString())));
    }

    /**
     * Executes the search, and checks that the default entity is not returned
     */
    private void defaultCajaShouldNotBeFound(String filter) throws Exception {
        restCajaMockMvc.perform(get("/api/cajas?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());
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
        Caja updatedCaja = cajaRepository.findOne(caja.getId());
        updatedCaja
            .fecha(UPDATED_FECHA)
            .horaApertura(UPDATED_HORA_APERTURA)
            .horaCierre(UPDATED_HORA_CIERRE);

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
    }

    @Test
    @Transactional
    public void updateNonExistingCaja() throws Exception {
        int databaseSizeBeforeUpdate = cajaRepository.findAll().size();

        // Create the Caja

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCajaMockMvc.perform(put("/api/cajas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caja)))
            .andExpect(status().isCreated());

        // Validate the Caja in the database
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCaja() throws Exception {
        // Initialize the database
        cajaService.save(caja);

        int databaseSizeBeforeDelete = cajaRepository.findAll().size();

        // Get the caja
        restCajaMockMvc.perform(delete("/api/cajas/{id}", caja.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Caja> cajaList = cajaRepository.findAll();
        assertThat(cajaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Caja.class);
        Caja caja1 = new Caja();
        caja1.setId(1L);
        Caja caja2 = new Caja();
        caja2.setId(caja1.getId());
        assertThat(caja1).isEqualTo(caja2);
        caja2.setId(2L);
        assertThat(caja1).isNotEqualTo(caja2);
        caja1.setId(null);
        assertThat(caja1).isNotEqualTo(caja2);
    }
}
