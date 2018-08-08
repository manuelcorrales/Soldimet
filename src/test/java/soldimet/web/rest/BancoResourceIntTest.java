package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Banco;
import soldimet.repository.BancoRepository;
import soldimet.service.BancoService;
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
 * Test class for the BancoResource REST controller.
 *
 * @see BancoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class BancoResourceIntTest {

    private static final String DEFAULT_NOMBRE_BANCO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_BANCO = "BBBBBBBBBB";

    @Autowired
    private BancoRepository bancoRepository;

    

    @Autowired
    private BancoService bancoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBancoMockMvc;

    private Banco banco;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BancoResource bancoResource = new BancoResource(bancoService);
        this.restBancoMockMvc = MockMvcBuilders.standaloneSetup(bancoResource)
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
    public static Banco createEntity(EntityManager em) {
        Banco banco = new Banco()
            .nombreBanco(DEFAULT_NOMBRE_BANCO);
        return banco;
    }

    @Before
    public void initTest() {
        banco = createEntity(em);
    }

    @Test
    @Transactional
    public void createBanco() throws Exception {
        int databaseSizeBeforeCreate = bancoRepository.findAll().size();

        // Create the Banco
        restBancoMockMvc.perform(post("/api/bancos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isCreated());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeCreate + 1);
        Banco testBanco = bancoList.get(bancoList.size() - 1);
        assertThat(testBanco.getNombreBanco()).isEqualTo(DEFAULT_NOMBRE_BANCO);
    }

    @Test
    @Transactional
    public void createBancoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bancoRepository.findAll().size();

        // Create the Banco with an existing ID
        banco.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBancoMockMvc.perform(post("/api/bancos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isBadRequest());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreBancoIsRequired() throws Exception {
        int databaseSizeBeforeTest = bancoRepository.findAll().size();
        // set the field null
        banco.setNombreBanco(null);

        // Create the Banco, which fails.

        restBancoMockMvc.perform(post("/api/bancos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isBadRequest());

        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBancos() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        // Get all the bancoList
        restBancoMockMvc.perform(get("/api/bancos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(banco.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreBanco").value(hasItem(DEFAULT_NOMBRE_BANCO.toString())));
    }
    

    @Test
    @Transactional
    public void getBanco() throws Exception {
        // Initialize the database
        bancoRepository.saveAndFlush(banco);

        // Get the banco
        restBancoMockMvc.perform(get("/api/bancos/{id}", banco.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(banco.getId().intValue()))
            .andExpect(jsonPath("$.nombreBanco").value(DEFAULT_NOMBRE_BANCO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBanco() throws Exception {
        // Get the banco
        restBancoMockMvc.perform(get("/api/bancos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBanco() throws Exception {
        // Initialize the database
        bancoService.save(banco);

        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();

        // Update the banco
        Banco updatedBanco = bancoRepository.findById(banco.getId()).get();
        // Disconnect from session so that the updates on updatedBanco are not directly saved in db
        em.detach(updatedBanco);
        updatedBanco
            .nombreBanco(UPDATED_NOMBRE_BANCO);

        restBancoMockMvc.perform(put("/api/bancos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBanco)))
            .andExpect(status().isOk());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
        Banco testBanco = bancoList.get(bancoList.size() - 1);
        assertThat(testBanco.getNombreBanco()).isEqualTo(UPDATED_NOMBRE_BANCO);
    }

    @Test
    @Transactional
    public void updateNonExistingBanco() throws Exception {
        int databaseSizeBeforeUpdate = bancoRepository.findAll().size();

        // Create the Banco

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBancoMockMvc.perform(put("/api/bancos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(banco)))
            .andExpect(status().isBadRequest());

        // Validate the Banco in the database
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBanco() throws Exception {
        // Initialize the database
        bancoService.save(banco);

        int databaseSizeBeforeDelete = bancoRepository.findAll().size();

        // Get the banco
        restBancoMockMvc.perform(delete("/api/bancos/{id}", banco.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Banco> bancoList = bancoRepository.findAll();
        assertThat(bancoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Banco.class);
        Banco banco1 = new Banco();
        banco1.setId(1L);
        Banco banco2 = new Banco();
        banco2.setId(banco1.getId());
        assertThat(banco1).isEqualTo(banco2);
        banco2.setId(2L);
        assertThat(banco1).isNotEqualTo(banco2);
        banco1.setId(null);
        assertThat(banco1).isNotEqualTo(banco2);
    }
}
