package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import soldimet.IntegrationTest;
import soldimet.domain.CobranzaOperacion;
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.domain.Operacion;
import soldimet.repository.CobranzaOperacionRepository;

/**
 * Integration tests for the {@link CobranzaOperacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CobranzaOperacionResourceIT {

    private static final Float DEFAULT_COBRANZA_OPERACION = 0F;
    private static final Float UPDATED_COBRANZA_OPERACION = 1F;

    private static final String ENTITY_API_URL = "/api/cobranza-operacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CobranzaOperacionRepository cobranzaOperacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCobranzaOperacionMockMvc;

    private CobranzaOperacion cobranzaOperacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CobranzaOperacion createEntity(EntityManager em) {
        CobranzaOperacion cobranzaOperacion = new CobranzaOperacion().cobranzaOperacion(DEFAULT_COBRANZA_OPERACION);
        // Add required entity
        EstadoCobranzaOperacion estadoCobranzaOperacion;
        if (TestUtil.findAll(em, EstadoCobranzaOperacion.class).isEmpty()) {
            estadoCobranzaOperacion = EstadoCobranzaOperacionResourceIT.createEntity(em);
            em.persist(estadoCobranzaOperacion);
            em.flush();
        } else {
            estadoCobranzaOperacion = TestUtil.findAll(em, EstadoCobranzaOperacion.class).get(0);
        }
        cobranzaOperacion.setEstadoCobranzaOperacion(estadoCobranzaOperacion);
        // Add required entity
        Operacion operacion;
        if (TestUtil.findAll(em, Operacion.class).isEmpty()) {
            operacion = OperacionResourceIT.createEntity(em);
            em.persist(operacion);
            em.flush();
        } else {
            operacion = TestUtil.findAll(em, Operacion.class).get(0);
        }
        cobranzaOperacion.setOperacion(operacion);
        return cobranzaOperacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CobranzaOperacion createUpdatedEntity(EntityManager em) {
        CobranzaOperacion cobranzaOperacion = new CobranzaOperacion().cobranzaOperacion(UPDATED_COBRANZA_OPERACION);
        // Add required entity
        EstadoCobranzaOperacion estadoCobranzaOperacion;
        if (TestUtil.findAll(em, EstadoCobranzaOperacion.class).isEmpty()) {
            estadoCobranzaOperacion = EstadoCobranzaOperacionResourceIT.createUpdatedEntity(em);
            em.persist(estadoCobranzaOperacion);
            em.flush();
        } else {
            estadoCobranzaOperacion = TestUtil.findAll(em, EstadoCobranzaOperacion.class).get(0);
        }
        cobranzaOperacion.setEstadoCobranzaOperacion(estadoCobranzaOperacion);
        // Add required entity
        Operacion operacion;
        if (TestUtil.findAll(em, Operacion.class).isEmpty()) {
            operacion = OperacionResourceIT.createUpdatedEntity(em);
            em.persist(operacion);
            em.flush();
        } else {
            operacion = TestUtil.findAll(em, Operacion.class).get(0);
        }
        cobranzaOperacion.setOperacion(operacion);
        return cobranzaOperacion;
    }

    @BeforeEach
    public void initTest() {
        cobranzaOperacion = createEntity(em);
    }

    @Test
    @Transactional
    void createCobranzaOperacion() throws Exception {
        int databaseSizeBeforeCreate = cobranzaOperacionRepository.findAll().size();
        // Create the CobranzaOperacion
        restCobranzaOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isCreated());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        CobranzaOperacion testCobranzaOperacion = cobranzaOperacionList.get(cobranzaOperacionList.size() - 1);
        assertThat(testCobranzaOperacion.getCobranzaOperacion()).isEqualTo(DEFAULT_COBRANZA_OPERACION);
    }

    @Test
    @Transactional
    void createCobranzaOperacionWithExistingId() throws Exception {
        // Create the CobranzaOperacion with an existing ID
        cobranzaOperacion.setId(1L);

        int databaseSizeBeforeCreate = cobranzaOperacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCobranzaOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCobranzaOperacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cobranzaOperacionRepository.findAll().size();
        // set the field null
        cobranzaOperacion.setCobranzaOperacion(null);

        // Create the CobranzaOperacion, which fails.

        restCobranzaOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCobranzaOperacions() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        // Get all the cobranzaOperacionList
        restCobranzaOperacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cobranzaOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].cobranzaOperacion").value(hasItem(DEFAULT_COBRANZA_OPERACION.doubleValue())));
    }

    @Test
    @Transactional
    void getCobranzaOperacion() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        // Get the cobranzaOperacion
        restCobranzaOperacionMockMvc
            .perform(get(ENTITY_API_URL_ID, cobranzaOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cobranzaOperacion.getId().intValue()))
            .andExpect(jsonPath("$.cobranzaOperacion").value(DEFAULT_COBRANZA_OPERACION.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingCobranzaOperacion() throws Exception {
        // Get the cobranzaOperacion
        restCobranzaOperacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCobranzaOperacion() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();

        // Update the cobranzaOperacion
        CobranzaOperacion updatedCobranzaOperacion = cobranzaOperacionRepository.findById(cobranzaOperacion.getId()).get();
        // Disconnect from session so that the updates on updatedCobranzaOperacion are not directly saved in db
        em.detach(updatedCobranzaOperacion);
        updatedCobranzaOperacion.cobranzaOperacion(UPDATED_COBRANZA_OPERACION);

        restCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCobranzaOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCobranzaOperacion))
            )
            .andExpect(status().isOk());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        CobranzaOperacion testCobranzaOperacion = cobranzaOperacionList.get(cobranzaOperacionList.size() - 1);
        assertThat(testCobranzaOperacion.getCobranzaOperacion()).isEqualTo(UPDATED_COBRANZA_OPERACION);
    }

    @Test
    @Transactional
    void putNonExistingCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();
        cobranzaOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cobranzaOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();
        cobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();
        cobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCobranzaOperacionWithPatch() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();

        // Update the cobranzaOperacion using partial update
        CobranzaOperacion partialUpdatedCobranzaOperacion = new CobranzaOperacion();
        partialUpdatedCobranzaOperacion.setId(cobranzaOperacion.getId());

        restCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCobranzaOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCobranzaOperacion))
            )
            .andExpect(status().isOk());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        CobranzaOperacion testCobranzaOperacion = cobranzaOperacionList.get(cobranzaOperacionList.size() - 1);
        assertThat(testCobranzaOperacion.getCobranzaOperacion()).isEqualTo(DEFAULT_COBRANZA_OPERACION);
    }

    @Test
    @Transactional
    void fullUpdateCobranzaOperacionWithPatch() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();

        // Update the cobranzaOperacion using partial update
        CobranzaOperacion partialUpdatedCobranzaOperacion = new CobranzaOperacion();
        partialUpdatedCobranzaOperacion.setId(cobranzaOperacion.getId());

        partialUpdatedCobranzaOperacion.cobranzaOperacion(UPDATED_COBRANZA_OPERACION);

        restCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCobranzaOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCobranzaOperacion))
            )
            .andExpect(status().isOk());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        CobranzaOperacion testCobranzaOperacion = cobranzaOperacionList.get(cobranzaOperacionList.size() - 1);
        assertThat(testCobranzaOperacion.getCobranzaOperacion()).isEqualTo(UPDATED_COBRANZA_OPERACION);
    }

    @Test
    @Transactional
    void patchNonExistingCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();
        cobranzaOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cobranzaOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();
        cobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = cobranzaOperacionRepository.findAll().size();
        cobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cobranzaOperacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CobranzaOperacion in the database
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCobranzaOperacion() throws Exception {
        // Initialize the database
        cobranzaOperacionRepository.saveAndFlush(cobranzaOperacion);

        int databaseSizeBeforeDelete = cobranzaOperacionRepository.findAll().size();

        // Delete the cobranzaOperacion
        restCobranzaOperacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, cobranzaOperacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CobranzaOperacion> cobranzaOperacionList = cobranzaOperacionRepository.findAll();
        assertThat(cobranzaOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
