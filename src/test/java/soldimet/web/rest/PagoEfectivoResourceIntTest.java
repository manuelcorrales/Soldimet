package soldimet.web.rest;

import soldimet.SoldimetApp;

import soldimet.domain.PagoEfectivo;
import soldimet.domain.FormaDePago;
import soldimet.repository.PagoEfectivoRepository;
import soldimet.service.PagoEfectivoService;
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
 * Test class for the PagoEfectivoResource REST controller.
 *
 * @see PagoEfectivoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SoldimetApp.class)
public class PagoEfectivoResourceIntTest {

    @Autowired
    private PagoEfectivoRepository pagoEfectivoRepository;

    @Autowired
    private PagoEfectivoService pagoEfectivoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPagoEfectivoMockMvc;

    private PagoEfectivo pagoEfectivo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagoEfectivoResource pagoEfectivoResource = new PagoEfectivoResource(pagoEfectivoService);
        this.restPagoEfectivoMockMvc = MockMvcBuilders.standaloneSetup(pagoEfectivoResource)
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
    public static PagoEfectivo createEntity(EntityManager em) {
        PagoEfectivo pagoEfectivo = new PagoEfectivo();
        // Add required entity
        FormaDePago formaDePago = FormaDePagoResourceIntTest.createEntity(em);
        em.persist(formaDePago);
        em.flush();
        pagoEfectivo.setFormaDePago(formaDePago);
        return pagoEfectivo;
    }

    @Before
    public void initTest() {
        pagoEfectivo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagoEfectivo() throws Exception {
        int databaseSizeBeforeCreate = pagoEfectivoRepository.findAll().size();

        // Create the PagoEfectivo
        restPagoEfectivoMockMvc.perform(post("/api/pago-efectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoEfectivo)))
            .andExpect(status().isCreated());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeCreate + 1);
        PagoEfectivo testPagoEfectivo = pagoEfectivoList.get(pagoEfectivoList.size() - 1);
    }

    @Test
    @Transactional
    public void createPagoEfectivoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagoEfectivoRepository.findAll().size();

        // Create the PagoEfectivo with an existing ID
        pagoEfectivo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagoEfectivoMockMvc.perform(post("/api/pago-efectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoEfectivo)))
            .andExpect(status().isBadRequest());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPagoEfectivos() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        // Get all the pagoEfectivoList
        restPagoEfectivoMockMvc.perform(get("/api/pago-efectivos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagoEfectivo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getPagoEfectivo() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        // Get the pagoEfectivo
        restPagoEfectivoMockMvc.perform(get("/api/pago-efectivos/{id}", pagoEfectivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagoEfectivo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPagoEfectivo() throws Exception {
        // Get the pagoEfectivo
        restPagoEfectivoMockMvc.perform(get("/api/pago-efectivos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagoEfectivo() throws Exception {
        // Initialize the database
        pagoEfectivoService.save(pagoEfectivo);

        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();

        // Update the pagoEfectivo
        PagoEfectivo updatedPagoEfectivo = pagoEfectivoRepository.findOne(pagoEfectivo.getId());

        restPagoEfectivoMockMvc.perform(put("/api/pago-efectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagoEfectivo)))
            .andExpect(status().isOk());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
        PagoEfectivo testPagoEfectivo = pagoEfectivoList.get(pagoEfectivoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPagoEfectivo() throws Exception {
        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();

        // Create the PagoEfectivo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPagoEfectivoMockMvc.perform(put("/api/pago-efectivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoEfectivo)))
            .andExpect(status().isCreated());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePagoEfectivo() throws Exception {
        // Initialize the database
        pagoEfectivoService.save(pagoEfectivo);

        int databaseSizeBeforeDelete = pagoEfectivoRepository.findAll().size();

        // Get the pagoEfectivo
        restPagoEfectivoMockMvc.perform(delete("/api/pago-efectivos/{id}", pagoEfectivo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagoEfectivo.class);
        PagoEfectivo pagoEfectivo1 = new PagoEfectivo();
        pagoEfectivo1.setId(1L);
        PagoEfectivo pagoEfectivo2 = new PagoEfectivo();
        pagoEfectivo2.setId(pagoEfectivo1.getId());
        assertThat(pagoEfectivo1).isEqualTo(pagoEfectivo2);
        pagoEfectivo2.setId(2L);
        assertThat(pagoEfectivo1).isNotEqualTo(pagoEfectivo2);
        pagoEfectivo1.setId(null);
        assertThat(pagoEfectivo1).isNotEqualTo(pagoEfectivo2);
    }
}
