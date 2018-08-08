package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.FormaDePago;
import soldimet.repository.FormaDePagoRepository;
import soldimet.service.FormaDePagoService;
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
 * Test class for the FormaDePagoResource REST controller.
 *
 * @see FormaDePagoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class FormaDePagoResourceIntTest {

    private static final String DEFAULT_NOMBRE_FORMA_DE_PAGO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_FORMA_DE_PAGO = "BBBBBBBBBB";

    @Autowired
    private FormaDePagoRepository formaDePagoRepository;

    

    @Autowired
    private FormaDePagoService formaDePagoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormaDePagoMockMvc;

    private FormaDePago formaDePago;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormaDePagoResource formaDePagoResource = new FormaDePagoResource(formaDePagoService);
        this.restFormaDePagoMockMvc = MockMvcBuilders.standaloneSetup(formaDePagoResource)
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
    public static FormaDePago createEntity(EntityManager em) {
        FormaDePago formaDePago = new FormaDePago()
            .nombreFormaDePago(DEFAULT_NOMBRE_FORMA_DE_PAGO);
        return formaDePago;
    }

    @Before
    public void initTest() {
        formaDePago = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormaDePago() throws Exception {
        int databaseSizeBeforeCreate = formaDePagoRepository.findAll().size();

        // Create the FormaDePago
        restFormaDePagoMockMvc.perform(post("/api/forma-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formaDePago)))
            .andExpect(status().isCreated());

        // Validate the FormaDePago in the database
        List<FormaDePago> formaDePagoList = formaDePagoRepository.findAll();
        assertThat(formaDePagoList).hasSize(databaseSizeBeforeCreate + 1);
        FormaDePago testFormaDePago = formaDePagoList.get(formaDePagoList.size() - 1);
        assertThat(testFormaDePago.getNombreFormaDePago()).isEqualTo(DEFAULT_NOMBRE_FORMA_DE_PAGO);
    }

    @Test
    @Transactional
    public void createFormaDePagoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formaDePagoRepository.findAll().size();

        // Create the FormaDePago with an existing ID
        formaDePago.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormaDePagoMockMvc.perform(post("/api/forma-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formaDePago)))
            .andExpect(status().isBadRequest());

        // Validate the FormaDePago in the database
        List<FormaDePago> formaDePagoList = formaDePagoRepository.findAll();
        assertThat(formaDePagoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreFormaDePagoIsRequired() throws Exception {
        int databaseSizeBeforeTest = formaDePagoRepository.findAll().size();
        // set the field null
        formaDePago.setNombreFormaDePago(null);

        // Create the FormaDePago, which fails.

        restFormaDePagoMockMvc.perform(post("/api/forma-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formaDePago)))
            .andExpect(status().isBadRequest());

        List<FormaDePago> formaDePagoList = formaDePagoRepository.findAll();
        assertThat(formaDePagoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFormaDePagos() throws Exception {
        // Initialize the database
        formaDePagoRepository.saveAndFlush(formaDePago);

        // Get all the formaDePagoList
        restFormaDePagoMockMvc.perform(get("/api/forma-de-pagos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formaDePago.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreFormaDePago").value(hasItem(DEFAULT_NOMBRE_FORMA_DE_PAGO.toString())));
    }
    

    @Test
    @Transactional
    public void getFormaDePago() throws Exception {
        // Initialize the database
        formaDePagoRepository.saveAndFlush(formaDePago);

        // Get the formaDePago
        restFormaDePagoMockMvc.perform(get("/api/forma-de-pagos/{id}", formaDePago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(formaDePago.getId().intValue()))
            .andExpect(jsonPath("$.nombreFormaDePago").value(DEFAULT_NOMBRE_FORMA_DE_PAGO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFormaDePago() throws Exception {
        // Get the formaDePago
        restFormaDePagoMockMvc.perform(get("/api/forma-de-pagos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormaDePago() throws Exception {
        // Initialize the database
        formaDePagoService.save(formaDePago);

        int databaseSizeBeforeUpdate = formaDePagoRepository.findAll().size();

        // Update the formaDePago
        FormaDePago updatedFormaDePago = formaDePagoRepository.findById(formaDePago.getId()).get();
        // Disconnect from session so that the updates on updatedFormaDePago are not directly saved in db
        em.detach(updatedFormaDePago);
        updatedFormaDePago
            .nombreFormaDePago(UPDATED_NOMBRE_FORMA_DE_PAGO);

        restFormaDePagoMockMvc.perform(put("/api/forma-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormaDePago)))
            .andExpect(status().isOk());

        // Validate the FormaDePago in the database
        List<FormaDePago> formaDePagoList = formaDePagoRepository.findAll();
        assertThat(formaDePagoList).hasSize(databaseSizeBeforeUpdate);
        FormaDePago testFormaDePago = formaDePagoList.get(formaDePagoList.size() - 1);
        assertThat(testFormaDePago.getNombreFormaDePago()).isEqualTo(UPDATED_NOMBRE_FORMA_DE_PAGO);
    }

    @Test
    @Transactional
    public void updateNonExistingFormaDePago() throws Exception {
        int databaseSizeBeforeUpdate = formaDePagoRepository.findAll().size();

        // Create the FormaDePago

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormaDePagoMockMvc.perform(put("/api/forma-de-pagos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formaDePago)))
            .andExpect(status().isBadRequest());

        // Validate the FormaDePago in the database
        List<FormaDePago> formaDePagoList = formaDePagoRepository.findAll();
        assertThat(formaDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormaDePago() throws Exception {
        // Initialize the database
        formaDePagoService.save(formaDePago);

        int databaseSizeBeforeDelete = formaDePagoRepository.findAll().size();

        // Get the formaDePago
        restFormaDePagoMockMvc.perform(delete("/api/forma-de-pagos/{id}", formaDePago.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FormaDePago> formaDePagoList = formaDePagoRepository.findAll();
        assertThat(formaDePagoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormaDePago.class);
        FormaDePago formaDePago1 = new FormaDePago();
        formaDePago1.setId(1L);
        FormaDePago formaDePago2 = new FormaDePago();
        formaDePago2.setId(formaDePago1.getId());
        assertThat(formaDePago1).isEqualTo(formaDePago2);
        formaDePago2.setId(2L);
        assertThat(formaDePago1).isNotEqualTo(formaDePago2);
        formaDePago1.setId(null);
        assertThat(formaDePago1).isNotEqualTo(formaDePago2);
    }
}
