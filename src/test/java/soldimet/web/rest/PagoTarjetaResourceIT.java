package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.PagoTarjeta;
import soldimet.domain.FormaDePago;
import soldimet.domain.Tarjeta;
import soldimet.domain.TipoTarjeta;
import soldimet.repository.PagoTarjetaRepository;
import soldimet.service.PagoTarjetaService;
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
import java.util.List;

import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PagoTarjetaResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class PagoTarjetaResourceIT {

    private static final String DEFAULT_NUMERO_TARJETA = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_TARJETA = "BBBBBBBBBB";

    @Autowired
    private PagoTarjetaRepository pagoTarjetaRepository;

    @Autowired
    private PagoTarjetaService pagoTarjetaService;

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

    private MockMvc restPagoTarjetaMockMvc;

    private PagoTarjeta pagoTarjeta;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagoTarjetaResource pagoTarjetaResource = new PagoTarjetaResource(pagoTarjetaService);
        this.restPagoTarjetaMockMvc = MockMvcBuilders.standaloneSetup(pagoTarjetaResource)
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
    public static PagoTarjeta createEntity(EntityManager em) {
        PagoTarjeta pagoTarjeta = new PagoTarjeta()
            .numeroTarjeta(DEFAULT_NUMERO_TARJETA);
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoTarjeta.setFormaDePago(formaDePago);
        // Add required entity
        Tarjeta tarjeta;
        if (TestUtil.findAll(em, Tarjeta.class).isEmpty()) {
            tarjeta = TarjetaResourceIT.createEntity(em);
            em.persist(tarjeta);
            em.flush();
        } else {
            tarjeta = TestUtil.findAll(em, Tarjeta.class).get(0);
        }
        pagoTarjeta.setTarjeta(tarjeta);
        // Add required entity
        TipoTarjeta tipoTarjeta;
        if (TestUtil.findAll(em, TipoTarjeta.class).isEmpty()) {
            tipoTarjeta = TipoTarjetaResourceIT.createEntity(em);
            em.persist(tipoTarjeta);
            em.flush();
        } else {
            tipoTarjeta = TestUtil.findAll(em, TipoTarjeta.class).get(0);
        }
        pagoTarjeta.setTipoTarjeta(tipoTarjeta);
        return pagoTarjeta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoTarjeta createUpdatedEntity(EntityManager em) {
        PagoTarjeta pagoTarjeta = new PagoTarjeta()
            .numeroTarjeta(UPDATED_NUMERO_TARJETA);
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createUpdatedEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoTarjeta.setFormaDePago(formaDePago);
        // Add required entity
        Tarjeta tarjeta;
        if (TestUtil.findAll(em, Tarjeta.class).isEmpty()) {
            tarjeta = TarjetaResourceIT.createUpdatedEntity(em);
            em.persist(tarjeta);
            em.flush();
        } else {
            tarjeta = TestUtil.findAll(em, Tarjeta.class).get(0);
        }
        pagoTarjeta.setTarjeta(tarjeta);
        // Add required entity
        TipoTarjeta tipoTarjeta;
        if (TestUtil.findAll(em, TipoTarjeta.class).isEmpty()) {
            tipoTarjeta = TipoTarjetaResourceIT.createUpdatedEntity(em);
            em.persist(tipoTarjeta);
            em.flush();
        } else {
            tipoTarjeta = TestUtil.findAll(em, TipoTarjeta.class).get(0);
        }
        pagoTarjeta.setTipoTarjeta(tipoTarjeta);
        return pagoTarjeta;
    }

    @BeforeEach
    public void initTest() {
        pagoTarjeta = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagoTarjeta() throws Exception {
        int databaseSizeBeforeCreate = pagoTarjetaRepository.findAll().size();

        // Create the PagoTarjeta
        restPagoTarjetaMockMvc.perform(post("/api/pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta)))
            .andExpect(status().isCreated());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeCreate + 1);
        PagoTarjeta testPagoTarjeta = pagoTarjetaList.get(pagoTarjetaList.size() - 1);
        assertThat(testPagoTarjeta.getNumeroTarjeta()).isEqualTo(DEFAULT_NUMERO_TARJETA);
    }

    @Test
    @Transactional
    public void createPagoTarjetaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagoTarjetaRepository.findAll().size();

        // Create the PagoTarjeta with an existing ID
        pagoTarjeta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagoTarjetaMockMvc.perform(post("/api/pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta)))
            .andExpect(status().isBadRequest());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNumeroTarjetaIsRequired() throws Exception {
        int databaseSizeBeforeTest = pagoTarjetaRepository.findAll().size();
        // set the field null
        pagoTarjeta.setNumeroTarjeta(null);

        // Create the PagoTarjeta, which fails.

        restPagoTarjetaMockMvc.perform(post("/api/pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta)))
            .andExpect(status().isBadRequest());

        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPagoTarjetas() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        // Get all the pagoTarjetaList
        restPagoTarjetaMockMvc.perform(get("/api/pago-tarjetas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagoTarjeta.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroTarjeta").value(hasItem(DEFAULT_NUMERO_TARJETA.toString())));
    }
    
    @Test
    @Transactional
    public void getPagoTarjeta() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        // Get the pagoTarjeta
        restPagoTarjetaMockMvc.perform(get("/api/pago-tarjetas/{id}", pagoTarjeta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagoTarjeta.getId().intValue()))
            .andExpect(jsonPath("$.numeroTarjeta").value(DEFAULT_NUMERO_TARJETA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPagoTarjeta() throws Exception {
        // Get the pagoTarjeta
        restPagoTarjetaMockMvc.perform(get("/api/pago-tarjetas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagoTarjeta() throws Exception {
        // Initialize the database
        pagoTarjetaService.save(pagoTarjeta);

        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();

        // Update the pagoTarjeta
        PagoTarjeta updatedPagoTarjeta = pagoTarjetaRepository.findById(pagoTarjeta.getId()).get();
        // Disconnect from session so that the updates on updatedPagoTarjeta are not directly saved in db
        em.detach(updatedPagoTarjeta);
        updatedPagoTarjeta
            .numeroTarjeta(UPDATED_NUMERO_TARJETA);

        restPagoTarjetaMockMvc.perform(put("/api/pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagoTarjeta)))
            .andExpect(status().isOk());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        PagoTarjeta testPagoTarjeta = pagoTarjetaList.get(pagoTarjetaList.size() - 1);
        assertThat(testPagoTarjeta.getNumeroTarjeta()).isEqualTo(UPDATED_NUMERO_TARJETA);
    }

    @Test
    @Transactional
    public void updateNonExistingPagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();

        // Create the PagoTarjeta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoTarjetaMockMvc.perform(put("/api/pago-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta)))
            .andExpect(status().isBadRequest());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagoTarjeta() throws Exception {
        // Initialize the database
        pagoTarjetaService.save(pagoTarjeta);

        int databaseSizeBeforeDelete = pagoTarjetaRepository.findAll().size();

        // Delete the pagoTarjeta
        restPagoTarjetaMockMvc.perform(delete("/api/pago-tarjetas/{id}", pagoTarjeta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagoTarjeta.class);
        PagoTarjeta pagoTarjeta1 = new PagoTarjeta();
        pagoTarjeta1.setId(1L);
        PagoTarjeta pagoTarjeta2 = new PagoTarjeta();
        pagoTarjeta2.setId(pagoTarjeta1.getId());
        assertThat(pagoTarjeta1).isEqualTo(pagoTarjeta2);
        pagoTarjeta2.setId(2L);
        assertThat(pagoTarjeta1).isNotEqualTo(pagoTarjeta2);
        pagoTarjeta1.setId(null);
        assertThat(pagoTarjeta1).isNotEqualTo(pagoTarjeta2);
    }
}
