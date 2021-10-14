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
import soldimet.domain.EstadoOperacion;
import soldimet.domain.Operacion;
import soldimet.domain.TipoParteMotor;
import soldimet.repository.OperacionRepository;

/**
 * Integration tests for the {@link OperacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OperacionResourceIT {

    private static final String DEFAULT_NOMBRE_OPERACION = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_OPERACION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/operacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OperacionRepository operacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOperacionMockMvc;

    private Operacion operacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Operacion createEntity(EntityManager em) {
        Operacion operacion = new Operacion().nombreOperacion(DEFAULT_NOMBRE_OPERACION);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        operacion.setTipoParteMotor(tipoParteMotor);
        // Add required entity
        EstadoOperacion estadoOperacion;
        if (TestUtil.findAll(em, EstadoOperacion.class).isEmpty()) {
            estadoOperacion = EstadoOperacionResourceIT.createEntity(em);
            em.persist(estadoOperacion);
            em.flush();
        } else {
            estadoOperacion = TestUtil.findAll(em, EstadoOperacion.class).get(0);
        }
        operacion.setEstadoOperacion(estadoOperacion);
        return operacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Operacion createUpdatedEntity(EntityManager em) {
        Operacion operacion = new Operacion().nombreOperacion(UPDATED_NOMBRE_OPERACION);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createUpdatedEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        operacion.setTipoParteMotor(tipoParteMotor);
        // Add required entity
        EstadoOperacion estadoOperacion;
        if (TestUtil.findAll(em, EstadoOperacion.class).isEmpty()) {
            estadoOperacion = EstadoOperacionResourceIT.createUpdatedEntity(em);
            em.persist(estadoOperacion);
            em.flush();
        } else {
            estadoOperacion = TestUtil.findAll(em, EstadoOperacion.class).get(0);
        }
        operacion.setEstadoOperacion(estadoOperacion);
        return operacion;
    }

    @BeforeEach
    public void initTest() {
        operacion = createEntity(em);
    }

    @Test
    @Transactional
    void createOperacion() throws Exception {
        int databaseSizeBeforeCreate = operacionRepository.findAll().size();
        // Create the Operacion
        restOperacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operacion)))
            .andExpect(status().isCreated());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeCreate + 1);
        Operacion testOperacion = operacionList.get(operacionList.size() - 1);
        assertThat(testOperacion.getNombreOperacion()).isEqualTo(DEFAULT_NOMBRE_OPERACION);
    }

    @Test
    @Transactional
    void createOperacionWithExistingId() throws Exception {
        // Create the Operacion with an existing ID
        operacion.setId(1L);

        int databaseSizeBeforeCreate = operacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operacion)))
            .andExpect(status().isBadRequest());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreOperacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = operacionRepository.findAll().size();
        // set the field null
        operacion.setNombreOperacion(null);

        // Create the Operacion, which fails.

        restOperacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operacion)))
            .andExpect(status().isBadRequest());

        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOperacions() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        // Get all the operacionList
        restOperacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreOperacion").value(hasItem(DEFAULT_NOMBRE_OPERACION)));
    }

    @Test
    @Transactional
    void getOperacion() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        // Get the operacion
        restOperacionMockMvc
            .perform(get(ENTITY_API_URL_ID, operacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(operacion.getId().intValue()))
            .andExpect(jsonPath("$.nombreOperacion").value(DEFAULT_NOMBRE_OPERACION));
    }

    @Test
    @Transactional
    void getNonExistingOperacion() throws Exception {
        // Get the operacion
        restOperacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewOperacion() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();

        // Update the operacion
        Operacion updatedOperacion = operacionRepository.findById(operacion.getId()).get();
        // Disconnect from session so that the updates on updatedOperacion are not directly saved in db
        em.detach(updatedOperacion);
        updatedOperacion.nombreOperacion(UPDATED_NOMBRE_OPERACION);

        restOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOperacion))
            )
            .andExpect(status().isOk());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
        Operacion testOperacion = operacionList.get(operacionList.size() - 1);
        assertThat(testOperacion.getNombreOperacion()).isEqualTo(UPDATED_NOMBRE_OPERACION);
    }

    @Test
    @Transactional
    void putNonExistingOperacion() throws Exception {
        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();
        operacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, operacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(operacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOperacion() throws Exception {
        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();
        operacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(operacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOperacion() throws Exception {
        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();
        operacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperacionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operacion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOperacionWithPatch() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();

        // Update the operacion using partial update
        Operacion partialUpdatedOperacion = new Operacion();
        partialUpdatedOperacion.setId(operacion.getId());

        restOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOperacion))
            )
            .andExpect(status().isOk());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
        Operacion testOperacion = operacionList.get(operacionList.size() - 1);
        assertThat(testOperacion.getNombreOperacion()).isEqualTo(DEFAULT_NOMBRE_OPERACION);
    }

    @Test
    @Transactional
    void fullUpdateOperacionWithPatch() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();

        // Update the operacion using partial update
        Operacion partialUpdatedOperacion = new Operacion();
        partialUpdatedOperacion.setId(operacion.getId());

        partialUpdatedOperacion.nombreOperacion(UPDATED_NOMBRE_OPERACION);

        restOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOperacion))
            )
            .andExpect(status().isOk());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
        Operacion testOperacion = operacionList.get(operacionList.size() - 1);
        assertThat(testOperacion.getNombreOperacion()).isEqualTo(UPDATED_NOMBRE_OPERACION);
    }

    @Test
    @Transactional
    void patchNonExistingOperacion() throws Exception {
        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();
        operacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, operacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(operacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOperacion() throws Exception {
        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();
        operacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(operacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOperacion() throws Exception {
        int databaseSizeBeforeUpdate = operacionRepository.findAll().size();
        operacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(operacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Operacion in the database
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOperacion() throws Exception {
        // Initialize the database
        operacionRepository.saveAndFlush(operacion);

        int databaseSizeBeforeDelete = operacionRepository.findAll().size();

        // Delete the operacion
        restOperacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, operacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Operacion> operacionList = operacionRepository.findAll();
        assertThat(operacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
