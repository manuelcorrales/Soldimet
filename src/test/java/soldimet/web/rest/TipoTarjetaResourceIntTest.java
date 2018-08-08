package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.TipoTarjeta;
import soldimet.repository.TipoTarjetaRepository;
import soldimet.service.TipoTarjetaService;
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
 * Test class for the TipoTarjetaResource REST controller.
 *
 * @see TipoTarjetaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class TipoTarjetaResourceIntTest {

    private static final String DEFAULT_NOMBRE_TIPO_TARJETA = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_TARJETA = "BBBBBBBBBB";

    @Autowired
    private TipoTarjetaRepository tipoTarjetaRepository;

    

    @Autowired
    private TipoTarjetaService tipoTarjetaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoTarjetaMockMvc;

    private TipoTarjeta tipoTarjeta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoTarjetaResource tipoTarjetaResource = new TipoTarjetaResource(tipoTarjetaService);
        this.restTipoTarjetaMockMvc = MockMvcBuilders.standaloneSetup(tipoTarjetaResource)
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
    public static TipoTarjeta createEntity(EntityManager em) {
        TipoTarjeta tipoTarjeta = new TipoTarjeta()
            .nombreTipoTarjeta(DEFAULT_NOMBRE_TIPO_TARJETA);
        return tipoTarjeta;
    }

    @Before
    public void initTest() {
        tipoTarjeta = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoTarjeta() throws Exception {
        int databaseSizeBeforeCreate = tipoTarjetaRepository.findAll().size();

        // Create the TipoTarjeta
        restTipoTarjetaMockMvc.perform(post("/api/tipo-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTarjeta)))
            .andExpect(status().isCreated());

        // Validate the TipoTarjeta in the database
        List<TipoTarjeta> tipoTarjetaList = tipoTarjetaRepository.findAll();
        assertThat(tipoTarjetaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoTarjeta testTipoTarjeta = tipoTarjetaList.get(tipoTarjetaList.size() - 1);
        assertThat(testTipoTarjeta.getNombreTipoTarjeta()).isEqualTo(DEFAULT_NOMBRE_TIPO_TARJETA);
    }

    @Test
    @Transactional
    public void createTipoTarjetaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoTarjetaRepository.findAll().size();

        // Create the TipoTarjeta with an existing ID
        tipoTarjeta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoTarjetaMockMvc.perform(post("/api/tipo-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTarjeta)))
            .andExpect(status().isBadRequest());

        // Validate the TipoTarjeta in the database
        List<TipoTarjeta> tipoTarjetaList = tipoTarjetaRepository.findAll();
        assertThat(tipoTarjetaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreTipoTarjetaIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoTarjetaRepository.findAll().size();
        // set the field null
        tipoTarjeta.setNombreTipoTarjeta(null);

        // Create the TipoTarjeta, which fails.

        restTipoTarjetaMockMvc.perform(post("/api/tipo-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTarjeta)))
            .andExpect(status().isBadRequest());

        List<TipoTarjeta> tipoTarjetaList = tipoTarjetaRepository.findAll();
        assertThat(tipoTarjetaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoTarjetas() throws Exception {
        // Initialize the database
        tipoTarjetaRepository.saveAndFlush(tipoTarjeta);

        // Get all the tipoTarjetaList
        restTipoTarjetaMockMvc.perform(get("/api/tipo-tarjetas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoTarjeta.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoTarjeta").value(hasItem(DEFAULT_NOMBRE_TIPO_TARJETA.toString())));
    }
    

    @Test
    @Transactional
    public void getTipoTarjeta() throws Exception {
        // Initialize the database
        tipoTarjetaRepository.saveAndFlush(tipoTarjeta);

        // Get the tipoTarjeta
        restTipoTarjetaMockMvc.perform(get("/api/tipo-tarjetas/{id}", tipoTarjeta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoTarjeta.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoTarjeta").value(DEFAULT_NOMBRE_TIPO_TARJETA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTipoTarjeta() throws Exception {
        // Get the tipoTarjeta
        restTipoTarjetaMockMvc.perform(get("/api/tipo-tarjetas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoTarjeta() throws Exception {
        // Initialize the database
        tipoTarjetaService.save(tipoTarjeta);

        int databaseSizeBeforeUpdate = tipoTarjetaRepository.findAll().size();

        // Update the tipoTarjeta
        TipoTarjeta updatedTipoTarjeta = tipoTarjetaRepository.findById(tipoTarjeta.getId()).get();
        // Disconnect from session so that the updates on updatedTipoTarjeta are not directly saved in db
        em.detach(updatedTipoTarjeta);
        updatedTipoTarjeta
            .nombreTipoTarjeta(UPDATED_NOMBRE_TIPO_TARJETA);

        restTipoTarjetaMockMvc.perform(put("/api/tipo-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoTarjeta)))
            .andExpect(status().isOk());

        // Validate the TipoTarjeta in the database
        List<TipoTarjeta> tipoTarjetaList = tipoTarjetaRepository.findAll();
        assertThat(tipoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        TipoTarjeta testTipoTarjeta = tipoTarjetaList.get(tipoTarjetaList.size() - 1);
        assertThat(testTipoTarjeta.getNombreTipoTarjeta()).isEqualTo(UPDATED_NOMBRE_TIPO_TARJETA);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = tipoTarjetaRepository.findAll().size();

        // Create the TipoTarjeta

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoTarjetaMockMvc.perform(put("/api/tipo-tarjetas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoTarjeta)))
            .andExpect(status().isBadRequest());

        // Validate the TipoTarjeta in the database
        List<TipoTarjeta> tipoTarjetaList = tipoTarjetaRepository.findAll();
        assertThat(tipoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoTarjeta() throws Exception {
        // Initialize the database
        tipoTarjetaService.save(tipoTarjeta);

        int databaseSizeBeforeDelete = tipoTarjetaRepository.findAll().size();

        // Get the tipoTarjeta
        restTipoTarjetaMockMvc.perform(delete("/api/tipo-tarjetas/{id}", tipoTarjeta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoTarjeta> tipoTarjetaList = tipoTarjetaRepository.findAll();
        assertThat(tipoTarjetaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoTarjeta.class);
        TipoTarjeta tipoTarjeta1 = new TipoTarjeta();
        tipoTarjeta1.setId(1L);
        TipoTarjeta tipoTarjeta2 = new TipoTarjeta();
        tipoTarjeta2.setId(tipoTarjeta1.getId());
        assertThat(tipoTarjeta1).isEqualTo(tipoTarjeta2);
        tipoTarjeta2.setId(2L);
        assertThat(tipoTarjeta1).isNotEqualTo(tipoTarjeta2);
        tipoTarjeta1.setId(null);
        assertThat(tipoTarjeta1).isNotEqualTo(tipoTarjeta2);
    }
}
