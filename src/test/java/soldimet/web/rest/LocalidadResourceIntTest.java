package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Localidad;
import soldimet.repository.LocalidadRepository;
import soldimet.service.LocalidadService;
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
 * Test class for the LocalidadResource REST controller.
 *
 * @see LocalidadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class LocalidadResourceIntTest {

    private static final String DEFAULT_NOMBRE_LOCALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_LOCALIDAD = "BBBBBBBBBB";

    @Autowired
    private LocalidadRepository localidadRepository;

    

    @Autowired
    private LocalidadService localidadService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLocalidadMockMvc;

    private Localidad localidad;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LocalidadResource localidadResource = new LocalidadResource(localidadService);
        this.restLocalidadMockMvc = MockMvcBuilders.standaloneSetup(localidadResource)
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
    public static Localidad createEntity(EntityManager em) {
        Localidad localidad = new Localidad()
            .nombreLocalidad(DEFAULT_NOMBRE_LOCALIDAD);
        return localidad;
    }

    @Before
    public void initTest() {
        localidad = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalidad() throws Exception {
        int databaseSizeBeforeCreate = localidadRepository.findAll().size();

        // Create the Localidad
        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isCreated());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeCreate + 1);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getNombreLocalidad()).isEqualTo(DEFAULT_NOMBRE_LOCALIDAD);
    }

    @Test
    @Transactional
    public void createLocalidadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localidadRepository.findAll().size();

        // Create the Localidad with an existing ID
        localidad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreLocalidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = localidadRepository.findAll().size();
        // set the field null
        localidad.setNombreLocalidad(null);

        // Create the Localidad, which fails.

        restLocalidadMockMvc.perform(post("/api/localidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalidads() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        // Get all the localidadList
        restLocalidadMockMvc.perform(get("/api/localidads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreLocalidad").value(hasItem(DEFAULT_NOMBRE_LOCALIDAD.toString())));
    }
    

    @Test
    @Transactional
    public void getLocalidad() throws Exception {
        // Initialize the database
        localidadRepository.saveAndFlush(localidad);

        // Get the localidad
        restLocalidadMockMvc.perform(get("/api/localidads/{id}", localidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(localidad.getId().intValue()))
            .andExpect(jsonPath("$.nombreLocalidad").value(DEFAULT_NOMBRE_LOCALIDAD.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLocalidad() throws Exception {
        // Get the localidad
        restLocalidadMockMvc.perform(get("/api/localidads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalidad() throws Exception {
        // Initialize the database
        localidadService.save(localidad);

        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();

        // Update the localidad
        Localidad updatedLocalidad = localidadRepository.findById(localidad.getId()).get();
        // Disconnect from session so that the updates on updatedLocalidad are not directly saved in db
        em.detach(updatedLocalidad);
        updatedLocalidad
            .nombreLocalidad(UPDATED_NOMBRE_LOCALIDAD);

        restLocalidadMockMvc.perform(put("/api/localidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLocalidad)))
            .andExpect(status().isOk());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
        Localidad testLocalidad = localidadList.get(localidadList.size() - 1);
        assertThat(testLocalidad.getNombreLocalidad()).isEqualTo(UPDATED_NOMBRE_LOCALIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalidad() throws Exception {
        int databaseSizeBeforeUpdate = localidadRepository.findAll().size();

        // Create the Localidad

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLocalidadMockMvc.perform(put("/api/localidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(localidad)))
            .andExpect(status().isBadRequest());

        // Validate the Localidad in the database
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalidad() throws Exception {
        // Initialize the database
        localidadService.save(localidad);

        int databaseSizeBeforeDelete = localidadRepository.findAll().size();

        // Get the localidad
        restLocalidadMockMvc.perform(delete("/api/localidads/{id}", localidad.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Localidad> localidadList = localidadRepository.findAll();
        assertThat(localidadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Localidad.class);
        Localidad localidad1 = new Localidad();
        localidad1.setId(1L);
        Localidad localidad2 = new Localidad();
        localidad2.setId(localidad1.getId());
        assertThat(localidad1).isEqualTo(localidad2);
        localidad2.setId(2L);
        assertThat(localidad1).isNotEqualTo(localidad2);
        localidad1.setId(null);
        assertThat(localidad1).isNotEqualTo(localidad2);
    }
}
