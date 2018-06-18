package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.CobranzaRepuestoRepository;
import soldimet.service.CobranzaRepuestoService;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CobranzaRepuestoResource REST controller.
 *
 * @see CobranzaRepuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class CobranzaRepuestoResourceIntTest {

    private static final Float DEFAULT_VALOR = 0F;
    private static final Float UPDATED_VALOR = 1F;

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

    private MockMvc restCobranzaRepuestoMockMvc;

    private CobranzaRepuesto cobranzaRepuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CobranzaRepuestoResource cobranzaRepuestoResource = new CobranzaRepuestoResource(cobranzaRepuestoService);
        this.restCobranzaRepuestoMockMvc = MockMvcBuilders.standaloneSetup(cobranzaRepuestoResource)
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
    public static CobranzaRepuesto createEntity(EntityManager em) {
        CobranzaRepuesto cobranzaRepuesto = new CobranzaRepuesto()
            .valor(DEFAULT_VALOR);
        // Add required entity
        TipoRepuesto tipoRepuesto = TipoRepuestoResourceIntTest.createEntity(em);
        em.persist(tipoRepuesto);
        em.flush();
        cobranzaRepuesto.setTipoRepuesto(tipoRepuesto);
        return cobranzaRepuesto;
    }

    @Before
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
    public void getAllCobranzaRepuestos() throws Exception {
        // Initialize the database
        cobranzaRepuestoRepository.saveAndFlush(cobranzaRepuesto);

        // Get all the cobranzaRepuestoList
        restCobranzaRepuestoMockMvc.perform(get("/api/cobranza-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobranzaRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())));
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
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()));
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
        CobranzaRepuesto updatedCobranzaRepuesto = cobranzaRepuestoRepository.findOne(cobranzaRepuesto.getId());
        updatedCobranzaRepuesto
            .valor(UPDATED_VALOR);

        restCobranzaRepuestoMockMvc.perform(put("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCobranzaRepuesto)))
            .andExpect(status().isOk());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CobranzaRepuesto testCobranzaRepuesto = cobranzaRepuestoList.get(cobranzaRepuestoList.size() - 1);
        assertThat(testCobranzaRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingCobranzaRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaRepuestoRepository.findAll().size();

        // Create the CobranzaRepuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCobranzaRepuestoMockMvc.perform(put("/api/cobranza-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cobranzaRepuesto)))
            .andExpect(status().isCreated());

        // Validate the CobranzaRepuesto in the database
        List<CobranzaRepuesto> cobranzaRepuestoList = cobranzaRepuestoRepository.findAll();
        assertThat(cobranzaRepuestoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCobranzaRepuesto() throws Exception {
        // Initialize the database
        cobranzaRepuestoService.save(cobranzaRepuesto);

        int databaseSizeBeforeDelete = cobranzaRepuestoRepository.findAll().size();

        // Get the cobranzaRepuesto
        restCobranzaRepuestoMockMvc.perform(delete("/api/cobranza-repuestos/{id}", cobranzaRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
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
