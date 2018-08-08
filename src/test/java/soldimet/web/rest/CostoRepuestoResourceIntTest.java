package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.CostoRepuesto;
import soldimet.domain.TipoRepuesto;
import soldimet.domain.Articulo;
import soldimet.repository.CostoRepuestoRepository;
import soldimet.service.CostoRepuestoService;
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
 * Test class for the CostoRepuestoResource REST controller.
 *
 * @see CostoRepuestoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class CostoRepuestoResourceIntTest {

    private static final Float DEFAULT_VALOR = 0F;
    private static final Float UPDATED_VALOR = 1F;

    @Autowired
    private CostoRepuestoRepository costoRepuestoRepository;

    

    @Autowired
    private CostoRepuestoService costoRepuestoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCostoRepuestoMockMvc;

    private CostoRepuesto costoRepuesto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CostoRepuestoResource costoRepuestoResource = new CostoRepuestoResource(costoRepuestoService);
        this.restCostoRepuestoMockMvc = MockMvcBuilders.standaloneSetup(costoRepuestoResource)
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
    public static CostoRepuesto createEntity(EntityManager em) {
        CostoRepuesto costoRepuesto = new CostoRepuesto()
            .valor(DEFAULT_VALOR);
        // Add required entity
        TipoRepuesto tipoRepuesto = TipoRepuestoResourceIntTest.createEntity(em);
        em.persist(tipoRepuesto);
        em.flush();
        costoRepuesto.setTipoRepuesto(tipoRepuesto);
        // Add required entity
        Articulo articulo = ArticuloResourceIntTest.createEntity(em);
        em.persist(articulo);
        em.flush();
        costoRepuesto.setArticulo(articulo);
        return costoRepuesto;
    }

    @Before
    public void initTest() {
        costoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    public void createCostoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = costoRepuestoRepository.findAll().size();

        // Create the CostoRepuesto
        restCostoRepuestoMockMvc.perform(post("/api/costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);
        assertThat(testCostoRepuesto.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createCostoRepuestoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = costoRepuestoRepository.findAll().size();

        // Create the CostoRepuesto with an existing ID
        costoRepuesto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostoRepuestoMockMvc.perform(post("/api/costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = costoRepuestoRepository.findAll().size();
        // set the field null
        costoRepuesto.setValor(null);

        // Create the CostoRepuesto, which fails.

        restCostoRepuestoMockMvc.perform(post("/api/costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isBadRequest());

        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCostoRepuestos() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        // Get all the costoRepuestoList
        restCostoRepuestoMockMvc.perform(get("/api/costo-repuestos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getCostoRepuesto() throws Exception {
        // Initialize the database
        costoRepuestoRepository.saveAndFlush(costoRepuesto);

        // Get the costoRepuesto
        restCostoRepuestoMockMvc.perform(get("/api/costo-repuestos/{id}", costoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(costoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCostoRepuesto() throws Exception {
        // Get the costoRepuesto
        restCostoRepuestoMockMvc.perform(get("/api/costo-repuestos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCostoRepuesto() throws Exception {
        // Initialize the database
        costoRepuestoService.save(costoRepuesto);

        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();

        // Update the costoRepuesto
        CostoRepuesto updatedCostoRepuesto = costoRepuestoRepository.findById(costoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedCostoRepuesto are not directly saved in db
        em.detach(updatedCostoRepuesto);
        updatedCostoRepuesto
            .valor(UPDATED_VALOR);

        restCostoRepuestoMockMvc.perform(put("/api/costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCostoRepuesto)))
            .andExpect(status().isOk());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuesto testCostoRepuesto = costoRepuestoList.get(costoRepuestoList.size() - 1);
        assertThat(testCostoRepuesto.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoRepository.findAll().size();

        // Create the CostoRepuesto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCostoRepuestoMockMvc.perform(put("/api/costo-repuestos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuesto in the database
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCostoRepuesto() throws Exception {
        // Initialize the database
        costoRepuestoService.save(costoRepuesto);

        int databaseSizeBeforeDelete = costoRepuestoRepository.findAll().size();

        // Get the costoRepuesto
        restCostoRepuestoMockMvc.perform(delete("/api/costo-repuestos/{id}", costoRepuesto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CostoRepuesto> costoRepuestoList = costoRepuestoRepository.findAll();
        assertThat(costoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostoRepuesto.class);
        CostoRepuesto costoRepuesto1 = new CostoRepuesto();
        costoRepuesto1.setId(1L);
        CostoRepuesto costoRepuesto2 = new CostoRepuesto();
        costoRepuesto2.setId(costoRepuesto1.getId());
        assertThat(costoRepuesto1).isEqualTo(costoRepuesto2);
        costoRepuesto2.setId(2L);
        assertThat(costoRepuesto1).isNotEqualTo(costoRepuesto2);
        costoRepuesto1.setId(null);
        assertThat(costoRepuesto1).isNotEqualTo(costoRepuesto2);
    }
}
