package soldimet.web.rest;

import soldimet.SoldimetApp;
import soldimet.domain.MedioDePago;
import soldimet.domain.FormaDePago;
import soldimet.repository.MedioDePagoRepository;
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
 * Integration tests for the {@link MedioDePagoResource} REST controller.
 */
@SpringBootTest(classes = SoldimetApp.class)
public class MedioDePagoResourceIT {

    @Autowired
    private MedioDePagoRepository medioDePagoRepository;

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

    private MockMvc restMedioDePagoMockMvc;

    private MedioDePago medioDePago;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedioDePagoResource medioDePagoResource = new MedioDePagoResource(medioDePagoRepository);
        this.restMedioDePagoMockMvc = MockMvcBuilders.standaloneSetup(medioDePagoResource)
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
    public static MedioDePago createEntity(EntityManager em) {
        MedioDePago medioDePago = new MedioDePago();
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        medioDePago.setFormaDePago(formaDePago);
        return medioDePago;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedioDePago createUpdatedEntity(EntityManager em) {
        MedioDePago medioDePago = new MedioDePago();
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createUpdatedEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        medioDePago.setFormaDePago(formaDePago);
        return medioDePago;
    }

    @BeforeEach
    public void initTest() {
        medioDePago = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedioDePago() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoRepository.findAll().size();

        // Create the MedioDePago
        restMedioDePagoMockMvc.perform(post("/api/medio-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePago)))
            .andExpect(status().isCreated());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeCreate + 1);
        MedioDePago testMedioDePago = medioDePagoList.get(medioDePagoList.size() - 1);
    }

    @Test
    @Transactional
    public void createMedioDePagoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoRepository.findAll().size();

        // Create the MedioDePago with an existing ID
        medioDePago.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedioDePagoMockMvc.perform(post("/api/medio-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePago)))
            .andExpect(status().isBadRequest());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMedioDePagos() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        // Get all the medioDePagoList
        restMedioDePagoMockMvc.perform(get("/api/medio-de-pagos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medioDePago.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getMedioDePago() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        // Get the medioDePago
        restMedioDePagoMockMvc.perform(get("/api/medio-de-pagos/{id}", medioDePago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medioDePago.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMedioDePago() throws Exception {
        // Get the medioDePago
        restMedioDePagoMockMvc.perform(get("/api/medio-de-pagos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedioDePago() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();

        // Update the medioDePago
        MedioDePago updatedMedioDePago = medioDePagoRepository.findById(medioDePago.getId()).get();
        // Disconnect from session so that the updates on updatedMedioDePago are not directly saved in db
        em.detach(updatedMedioDePago);

        restMedioDePagoMockMvc.perform(put("/api/medio-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedioDePago)))
            .andExpect(status().isOk());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
        MedioDePago testMedioDePago = medioDePagoList.get(medioDePagoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMedioDePago() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();

        // Create the MedioDePago

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoMockMvc.perform(put("/api/medio-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medioDePago)))
            .andExpect(status().isBadRequest());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedioDePago() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        int databaseSizeBeforeDelete = medioDePagoRepository.findAll().size();

        // Delete the medioDePago
        restMedioDePagoMockMvc.perform(delete("/api/medio-de-pagos/{id}", medioDePago.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedioDePago.class);
        MedioDePago medioDePago1 = new MedioDePago();
        medioDePago1.setId(1L);
        MedioDePago medioDePago2 = new MedioDePago();
        medioDePago2.setId(medioDePago1.getId());
        assertThat(medioDePago1).isEqualTo(medioDePago2);
        medioDePago2.setId(2L);
        assertThat(medioDePago1).isNotEqualTo(medioDePago2);
        medioDePago1.setId(null);
        assertThat(medioDePago1).isNotEqualTo(medioDePago2);
    }
}
