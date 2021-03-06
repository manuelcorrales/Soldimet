package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.PagoCheque;
import soldimet.domain.Banco;
import soldimet.domain.FormaDePago;
import soldimet.repository.PagoChequeRepository;
import soldimet.service.PagoChequeService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static soldimet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PagoChequeResource REST controller.
 *
 * @see PagoChequeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class PagoChequeResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_COBRO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_COBRO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_RECIBO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_RECIBO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NUMERO_CHEQUE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CHEQUE = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_CUENTA = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CUENTA = "BBBBBBBBBB";

    @Autowired
    private PagoChequeRepository pagoChequeRepository;

    

    @Autowired
    private PagoChequeService pagoChequeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPagoChequeMockMvc;

    private PagoCheque pagoCheque;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagoChequeResource pagoChequeResource = new PagoChequeResource(pagoChequeService);
        this.restPagoChequeMockMvc = MockMvcBuilders.standaloneSetup(pagoChequeResource)
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
    public static PagoCheque createEntity(EntityManager em) {
        PagoCheque pagoCheque = new PagoCheque()
            .fechaCobro(DEFAULT_FECHA_COBRO)
            .fechaRecibo(DEFAULT_FECHA_RECIBO)
            .numeroCheque(DEFAULT_NUMERO_CHEQUE)
            .numeroCuenta(DEFAULT_NUMERO_CUENTA);
        // Add required entity
        Banco banco = BancoResourceIntTest.createEntity(em);
        em.persist(banco);
        em.flush();
        pagoCheque.setBanco(banco);
        // Add required entity
        FormaDePago formaDePago = FormaDePagoResourceIntTest.createEntity(em);
        em.persist(formaDePago);
        em.flush();
        pagoCheque.setFormaDePago(formaDePago);
        return pagoCheque;
    }

    @Before
    public void initTest() {
        pagoCheque = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagoCheque() throws Exception {
        int databaseSizeBeforeCreate = pagoChequeRepository.findAll().size();

        // Create the PagoCheque
        restPagoChequeMockMvc.perform(post("/api/pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isCreated());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeCreate + 1);
        PagoCheque testPagoCheque = pagoChequeList.get(pagoChequeList.size() - 1);
        assertThat(testPagoCheque.getFechaCobro()).isEqualTo(DEFAULT_FECHA_COBRO);
        assertThat(testPagoCheque.getFechaRecibo()).isEqualTo(DEFAULT_FECHA_RECIBO);
        assertThat(testPagoCheque.getNumeroCheque()).isEqualTo(DEFAULT_NUMERO_CHEQUE);
        assertThat(testPagoCheque.getNumeroCuenta()).isEqualTo(DEFAULT_NUMERO_CUENTA);
    }

    @Test
    @Transactional
    public void createPagoChequeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagoChequeRepository.findAll().size();

        // Create the PagoCheque with an existing ID
        pagoCheque.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagoChequeMockMvc.perform(post("/api/pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isBadRequest());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaCobroIsRequired() throws Exception {
        int databaseSizeBeforeTest = pagoChequeRepository.findAll().size();
        // set the field null
        pagoCheque.setFechaCobro(null);

        // Create the PagoCheque, which fails.

        restPagoChequeMockMvc.perform(post("/api/pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isBadRequest());

        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaReciboIsRequired() throws Exception {
        int databaseSizeBeforeTest = pagoChequeRepository.findAll().size();
        // set the field null
        pagoCheque.setFechaRecibo(null);

        // Create the PagoCheque, which fails.

        restPagoChequeMockMvc.perform(post("/api/pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isBadRequest());

        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroChequeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pagoChequeRepository.findAll().size();
        // set the field null
        pagoCheque.setNumeroCheque(null);

        // Create the PagoCheque, which fails.

        restPagoChequeMockMvc.perform(post("/api/pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isBadRequest());

        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPagoCheques() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        // Get all the pagoChequeList
        restPagoChequeMockMvc.perform(get("/api/pago-cheques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagoCheque.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaCobro").value(hasItem(DEFAULT_FECHA_COBRO.toString())))
            .andExpect(jsonPath("$.[*].fechaRecibo").value(hasItem(DEFAULT_FECHA_RECIBO.toString())))
            .andExpect(jsonPath("$.[*].numeroCheque").value(hasItem(DEFAULT_NUMERO_CHEQUE.toString())))
            .andExpect(jsonPath("$.[*].numeroCuenta").value(hasItem(DEFAULT_NUMERO_CUENTA.toString())));
    }
    

    @Test
    @Transactional
    public void getPagoCheque() throws Exception {
        // Initialize the database
        pagoChequeRepository.saveAndFlush(pagoCheque);

        // Get the pagoCheque
        restPagoChequeMockMvc.perform(get("/api/pago-cheques/{id}", pagoCheque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagoCheque.getId().intValue()))
            .andExpect(jsonPath("$.fechaCobro").value(DEFAULT_FECHA_COBRO.toString()))
            .andExpect(jsonPath("$.fechaRecibo").value(DEFAULT_FECHA_RECIBO.toString()))
            .andExpect(jsonPath("$.numeroCheque").value(DEFAULT_NUMERO_CHEQUE.toString()))
            .andExpect(jsonPath("$.numeroCuenta").value(DEFAULT_NUMERO_CUENTA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPagoCheque() throws Exception {
        // Get the pagoCheque
        restPagoChequeMockMvc.perform(get("/api/pago-cheques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagoCheque() throws Exception {
        // Initialize the database
        pagoChequeService.save(pagoCheque);

        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();

        // Update the pagoCheque
        PagoCheque updatedPagoCheque = pagoChequeRepository.findById(pagoCheque.getId()).get();
        // Disconnect from session so that the updates on updatedPagoCheque are not directly saved in db
        em.detach(updatedPagoCheque);
        updatedPagoCheque
            .fechaCobro(UPDATED_FECHA_COBRO)
            .fechaRecibo(UPDATED_FECHA_RECIBO)
            .numeroCheque(UPDATED_NUMERO_CHEQUE)
            .numeroCuenta(UPDATED_NUMERO_CUENTA);

        restPagoChequeMockMvc.perform(put("/api/pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagoCheque)))
            .andExpect(status().isOk());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
        PagoCheque testPagoCheque = pagoChequeList.get(pagoChequeList.size() - 1);
        assertThat(testPagoCheque.getFechaCobro()).isEqualTo(UPDATED_FECHA_COBRO);
        assertThat(testPagoCheque.getFechaRecibo()).isEqualTo(UPDATED_FECHA_RECIBO);
        assertThat(testPagoCheque.getNumeroCheque()).isEqualTo(UPDATED_NUMERO_CHEQUE);
        assertThat(testPagoCheque.getNumeroCuenta()).isEqualTo(UPDATED_NUMERO_CUENTA);
    }

    @Test
    @Transactional
    public void updateNonExistingPagoCheque() throws Exception {
        int databaseSizeBeforeUpdate = pagoChequeRepository.findAll().size();

        // Create the PagoCheque

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPagoChequeMockMvc.perform(put("/api/pago-cheques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoCheque)))
            .andExpect(status().isBadRequest());

        // Validate the PagoCheque in the database
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagoCheque() throws Exception {
        // Initialize the database
        pagoChequeService.save(pagoCheque);

        int databaseSizeBeforeDelete = pagoChequeRepository.findAll().size();

        // Get the pagoCheque
        restPagoChequeMockMvc.perform(delete("/api/pago-cheques/{id}", pagoCheque.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PagoCheque> pagoChequeList = pagoChequeRepository.findAll();
        assertThat(pagoChequeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagoCheque.class);
        PagoCheque pagoCheque1 = new PagoCheque();
        pagoCheque1.setId(1L);
        PagoCheque pagoCheque2 = new PagoCheque();
        pagoCheque2.setId(pagoCheque1.getId());
        assertThat(pagoCheque1).isEqualTo(pagoCheque2);
        pagoCheque2.setId(2L);
        assertThat(pagoCheque1).isNotEqualTo(pagoCheque2);
        pagoCheque1.setId(null);
        assertThat(pagoCheque1).isNotEqualTo(pagoCheque2);
    }
}
