package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.Proveedor;
import soldimet.domain.Persona;
import soldimet.repository.ProveedorRepository;
import soldimet.service.ProveedorService;
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
 * Test class for the ProveedorResource REST controller.
 *
 * @see ProveedorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class ProveedorResourceIntTest {

    @Autowired
    private ProveedorRepository proveedorRepository;

    

    @Autowired
    private ProveedorService proveedorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProveedorMockMvc;

    private Proveedor proveedor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProveedorResource proveedorResource = new ProveedorResource(proveedorService);
        this.restProveedorMockMvc = MockMvcBuilders.standaloneSetup(proveedorResource)
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
    public static Proveedor createEntity(EntityManager em) {
        Proveedor proveedor = new Proveedor();
        // Add required entity
        Persona persona = PersonaResourceIntTest.createEntity(em);
        em.persist(persona);
        em.flush();
        proveedor.setPersona(persona);
        return proveedor;
    }

    @Before
    public void initTest() {
        proveedor = createEntity(em);
    }

    @Test
    @Transactional
    public void createProveedor() throws Exception {
        int databaseSizeBeforeCreate = proveedorRepository.findAll().size();

        // Create the Proveedor
        restProveedorMockMvc.perform(post("/api/proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proveedor)))
            .andExpect(status().isCreated());

        // Validate the Proveedor in the database
        List<Proveedor> proveedorList = proveedorRepository.findAll();
        assertThat(proveedorList).hasSize(databaseSizeBeforeCreate + 1);
        Proveedor testProveedor = proveedorList.get(proveedorList.size() - 1);
    }

    @Test
    @Transactional
    public void createProveedorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proveedorRepository.findAll().size();

        // Create the Proveedor with an existing ID
        proveedor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProveedorMockMvc.perform(post("/api/proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proveedor)))
            .andExpect(status().isBadRequest());

        // Validate the Proveedor in the database
        List<Proveedor> proveedorList = proveedorRepository.findAll();
        assertThat(proveedorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProveedors() throws Exception {
        // Initialize the database
        proveedorRepository.saveAndFlush(proveedor);

        // Get all the proveedorList
        restProveedorMockMvc.perform(get("/api/proveedors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proveedor.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getProveedor() throws Exception {
        // Initialize the database
        proveedorRepository.saveAndFlush(proveedor);

        // Get the proveedor
        restProveedorMockMvc.perform(get("/api/proveedors/{id}", proveedor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proveedor.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProveedor() throws Exception {
        // Get the proveedor
        restProveedorMockMvc.perform(get("/api/proveedors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProveedor() throws Exception {
        // Initialize the database
        proveedorService.save(proveedor);

        int databaseSizeBeforeUpdate = proveedorRepository.findAll().size();

        // Update the proveedor
        Proveedor updatedProveedor = proveedorRepository.findById(proveedor.getId()).get();
        // Disconnect from session so that the updates on updatedProveedor are not directly saved in db
        em.detach(updatedProveedor);

        restProveedorMockMvc.perform(put("/api/proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProveedor)))
            .andExpect(status().isOk());

        // Validate the Proveedor in the database
        List<Proveedor> proveedorList = proveedorRepository.findAll();
        assertThat(proveedorList).hasSize(databaseSizeBeforeUpdate);
        Proveedor testProveedor = proveedorList.get(proveedorList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProveedor() throws Exception {
        int databaseSizeBeforeUpdate = proveedorRepository.findAll().size();

        // Create the Proveedor

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProveedorMockMvc.perform(put("/api/proveedors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proveedor)))
            .andExpect(status().isBadRequest());

        // Validate the Proveedor in the database
        List<Proveedor> proveedorList = proveedorRepository.findAll();
        assertThat(proveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProveedor() throws Exception {
        // Initialize the database
        proveedorService.save(proveedor);

        int databaseSizeBeforeDelete = proveedorRepository.findAll().size();

        // Get the proveedor
        restProveedorMockMvc.perform(delete("/api/proveedors/{id}", proveedor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Proveedor> proveedorList = proveedorRepository.findAll();
        assertThat(proveedorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proveedor.class);
        Proveedor proveedor1 = new Proveedor();
        proveedor1.setId(1L);
        Proveedor proveedor2 = new Proveedor();
        proveedor2.setId(proveedor1.getId());
        assertThat(proveedor1).isEqualTo(proveedor2);
        proveedor2.setId(2L);
        assertThat(proveedor1).isNotEqualTo(proveedor2);
        proveedor1.setId(null);
        assertThat(proveedor1).isNotEqualTo(proveedor2);
    }
}
