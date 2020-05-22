package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.MedioDePagoCheque;
import soldimet.domain.Banco;
import soldimet.repository.MedioDePagoChequeRepository;
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
 * Integration tests for the {@link MedioDePagoChequeResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class MedioDePagoChequeResourceIT {

    private static final String DEFAULT_NUMERO_CHEQUE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CHEQUE = "BBBBBBBBBB";

    @Autowired
    private MedioDePagoChequeRepository medioDePagoChequeRepository;

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

    private MockMvc restMedioDePagoChequeMockMvc;

    private MedioDePagoCheque medioDePagoCheque;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedioDePagoChequeResource medioDePagoChequeResource = new MedioDePagoChequeResource(medioDePagoChequeRepository);
        this.restMedioDePagoChequeMockMvc = MockMvcBuilders.standaloneSetup(medioDePagoChequeResource)
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
    public static MedioDePagoCheque createEntity(EntityManager em) {
        MedioDePagoCheque medioDePagoCheque = new MedioDePagoCheque()
            .numeroCheque(DEFAULT_NUMERO_CHEQUE);
        // Add required entity
        Banco banco;
        if (TestUtil.findAll(em, Banco.class).isEmpty()) {
            banco = BancoResourceIT.createEntity(em);
            em.persist(banco);
            em.flush();
        } else {
            banco = TestUtil.findAll(em, Banco.class).get(0);
        }
        medioDePagoCheque.setBanco(banco);
        return medioDePagoCheque;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedioDePagoCheque createUpdatedEntity(EntityManager em) {
        MedioDePagoCheque medioDePagoCheque = new MedioDePagoCheque()
            .numeroCheque(UPDATED_NUMERO_CHEQUE);
        // Add required entity
        Banco banco;
        if (TestUtil.findAll(em, Banco.class).isEmpty()) {
            banco = BancoResourceIT.createUpdatedEntity(em);
            em.persist(banco);
            em.flush();
        } else {
            banco = TestUtil.findAll(em, Banco.class).get(0);
        }
        medioDePagoCheque.setBanco(banco);
        return medioDePagoCheque;
    }

    @BeforeEach
    public void initTest() {
        medioDePagoCheque = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoChequeRepository.findAll().size();

        // Create the MedioDePagoCheque
        restMedioDePagoChequeMockMvc.perform(post("/api/medio-de-pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque)))
            .andExpect(status().isCreated());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeCreate + 1);
        MedioDePagoCheque testMedioDePagoCheque = medioDePagoChequeList.get(medioDePagoChequeList.size() - 1);
        assertThat(testMedioDePagoCheque.getNumeroCheque()).isEqualTo(DEFAULT_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    public void createMedioDePagoChequeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoChequeRepository.findAll().size();

        // Create the MedioDePagoCheque with an existing ID
        medioDePagoCheque.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedioDePagoChequeMockMvc.perform(post("/api/medio-de-pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque)))
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNumeroChequeIsRequired() throws Exception {
        int databaseSizeBeforeTest = medioDePagoChequeRepository.findAll().size();
        // set the field null
        medioDePagoCheque.setNumeroCheque(null);

        // Create the MedioDePagoCheque, which fails.

        restMedioDePagoChequeMockMvc.perform(post("/api/medio-de-pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque)))
            .andExpect(status().isBadRequest());

        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMedioDePagoCheques() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        // Get all the medioDePagoChequeList
        restMedioDePagoChequeMockMvc.perform(get("/api/medio-de-pago-cheques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medioDePagoCheque.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroCheque").value(hasItem(DEFAULT_NUMERO_CHEQUE.toString())));
    }

    @Test
    @Transactional
    public void getMedioDePagoCheque() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        // Get the medioDePagoCheque
        restMedioDePagoChequeMockMvc.perform(get("/api/medio-de-pago-cheques/{id}", medioDePagoCheque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medioDePagoCheque.getId().intValue()))
            .andExpect(jsonPath("$.numeroCheque").value(DEFAULT_NUMERO_CHEQUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedioDePagoCheque() throws Exception {
        // Get the medioDePagoCheque
        restMedioDePagoChequeMockMvc.perform(get("/api/medio-de-pago-cheques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedioDePagoCheque() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();

        // Update the medioDePagoCheque
        MedioDePagoCheque updatedMedioDePagoCheque = medioDePagoChequeRepository.findById(medioDePagoCheque.getId()).get();
        // Disconnect from session so that the updates on updatedMedioDePagoCheque are not directly saved in db
        em.detach(updatedMedioDePagoCheque);
        updatedMedioDePagoCheque
            .numeroCheque(UPDATED_NUMERO_CHEQUE);

        restMedioDePagoChequeMockMvc.perform(put("/api/medio-de-pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedioDePagoCheque)))
            .andExpect(status().isOk());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoCheque testMedioDePagoCheque = medioDePagoChequeList.get(medioDePagoChequeList.size() - 1);
        assertThat(testMedioDePagoCheque.getNumeroCheque()).isEqualTo(UPDATED_NUMERO_CHEQUE);
    }

    @Test
    @Transactional
    public void updateNonExistingMedioDePagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoChequeRepository.findAll().size();

        // Create the MedioDePagoCheque

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoChequeMockMvc.perform(put("/api/medio-de-pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePagoCheque)))
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoCheque in the database
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedioDePagoCheque() throws Exception {
        // Initialize the database
        medioDePagoChequeRepository.saveAndFlush(medioDePagoCheque);

        int databaseSizeBeforeDelete = medioDePagoChequeRepository.findAll().size();

        // Delete the medioDePagoCheque
        restMedioDePagoChequeMockMvc.perform(delete("/api/medio-de-pago-cheques/{id}", medioDePagoCheque.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedioDePagoCheque> medioDePagoChequeList = medioDePagoChequeRepository.findAll();
        assertThat(medioDePagoChequeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioDePagoCheque.class);
        MedioDePagoCheque medioDePagoCheque1 = new MedioDePagoCheque();
        medioDePagoCheque1.setId(1L);
        MedioDePagoCheque medioDePagoCheque2 = new MedioDePagoCheque();
        medioDePagoCheque2.setId(medioDePagoCheque1.getId());
        assertThat(medioDePagoCheque1).isEqualTo(medioDePagoCheque2);
        medioDePagoCheque2.setId(2L);
        assertThat(medioDePagoCheque1).isNotEqualTo(medioDePagoCheque2);
        medioDePagoCheque1.setId(null);
        assertThat(medioDePagoCheque1).isNotEqualTo(medioDePagoCheque2);
    }
}
