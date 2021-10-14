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
import soldimet.domain.Aplicacion;
import soldimet.domain.Motor;
import soldimet.repository.AplicacionRepository;

/**
 * Integration tests for the {@link AplicacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AplicacionResourceIT {

    private static final String DEFAULT_NOMBRE_APLICACION = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_APLICACION = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO_GRUPO = 1;
    private static final Integer UPDATED_NUMERO_GRUPO = 2;

    private static final String ENTITY_API_URL = "/api/aplicacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AplicacionRepository aplicacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAplicacionMockMvc;

    private Aplicacion aplicacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aplicacion createEntity(EntityManager em) {
        Aplicacion aplicacion = new Aplicacion().nombreAplicacion(DEFAULT_NOMBRE_APLICACION).numeroGrupo(DEFAULT_NUMERO_GRUPO);
        // Add required entity
        Motor motor;
        if (TestUtil.findAll(em, Motor.class).isEmpty()) {
            motor = MotorResourceIT.createEntity(em);
            em.persist(motor);
            em.flush();
        } else {
            motor = TestUtil.findAll(em, Motor.class).get(0);
        }
        aplicacion.setMotor(motor);
        return aplicacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aplicacion createUpdatedEntity(EntityManager em) {
        Aplicacion aplicacion = new Aplicacion().nombreAplicacion(UPDATED_NOMBRE_APLICACION).numeroGrupo(UPDATED_NUMERO_GRUPO);
        // Add required entity
        Motor motor;
        if (TestUtil.findAll(em, Motor.class).isEmpty()) {
            motor = MotorResourceIT.createUpdatedEntity(em);
            em.persist(motor);
            em.flush();
        } else {
            motor = TestUtil.findAll(em, Motor.class).get(0);
        }
        aplicacion.setMotor(motor);
        return aplicacion;
    }

    @BeforeEach
    public void initTest() {
        aplicacion = createEntity(em);
    }

    @Test
    @Transactional
    void createAplicacion() throws Exception {
        int databaseSizeBeforeCreate = aplicacionRepository.findAll().size();
        // Create the Aplicacion
        restAplicacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isCreated());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeCreate + 1);
        Aplicacion testAplicacion = aplicacionList.get(aplicacionList.size() - 1);
        assertThat(testAplicacion.getNombreAplicacion()).isEqualTo(DEFAULT_NOMBRE_APLICACION);
        assertThat(testAplicacion.getNumeroGrupo()).isEqualTo(DEFAULT_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void createAplicacionWithExistingId() throws Exception {
        // Create the Aplicacion with an existing ID
        aplicacion.setId(1L);

        int databaseSizeBeforeCreate = aplicacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAplicacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isBadRequest());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreAplicacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = aplicacionRepository.findAll().size();
        // set the field null
        aplicacion.setNombreAplicacion(null);

        // Create the Aplicacion, which fails.

        restAplicacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isBadRequest());

        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNumeroGrupoIsRequired() throws Exception {
        int databaseSizeBeforeTest = aplicacionRepository.findAll().size();
        // set the field null
        aplicacion.setNumeroGrupo(null);

        // Create the Aplicacion, which fails.

        restAplicacionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isBadRequest());

        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAplicacions() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        // Get all the aplicacionList
        restAplicacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aplicacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreAplicacion").value(hasItem(DEFAULT_NOMBRE_APLICACION)))
            .andExpect(jsonPath("$.[*].numeroGrupo").value(hasItem(DEFAULT_NUMERO_GRUPO)));
    }

    @Test
    @Transactional
    void getAplicacion() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        // Get the aplicacion
        restAplicacionMockMvc
            .perform(get(ENTITY_API_URL_ID, aplicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aplicacion.getId().intValue()))
            .andExpect(jsonPath("$.nombreAplicacion").value(DEFAULT_NOMBRE_APLICACION))
            .andExpect(jsonPath("$.numeroGrupo").value(DEFAULT_NUMERO_GRUPO));
    }

    @Test
    @Transactional
    void getNonExistingAplicacion() throws Exception {
        // Get the aplicacion
        restAplicacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAplicacion() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();

        // Update the aplicacion
        Aplicacion updatedAplicacion = aplicacionRepository.findById(aplicacion.getId()).get();
        // Disconnect from session so that the updates on updatedAplicacion are not directly saved in db
        em.detach(updatedAplicacion);
        updatedAplicacion.nombreAplicacion(UPDATED_NOMBRE_APLICACION).numeroGrupo(UPDATED_NUMERO_GRUPO);

        restAplicacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAplicacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAplicacion))
            )
            .andExpect(status().isOk());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
        Aplicacion testAplicacion = aplicacionList.get(aplicacionList.size() - 1);
        assertThat(testAplicacion.getNombreAplicacion()).isEqualTo(UPDATED_NOMBRE_APLICACION);
        assertThat(testAplicacion.getNumeroGrupo()).isEqualTo(UPDATED_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void putNonExistingAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();
        aplicacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAplicacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, aplicacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aplicacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();
        aplicacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAplicacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aplicacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();
        aplicacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAplicacionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aplicacion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAplicacionWithPatch() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();

        // Update the aplicacion using partial update
        Aplicacion partialUpdatedAplicacion = new Aplicacion();
        partialUpdatedAplicacion.setId(aplicacion.getId());

        partialUpdatedAplicacion.nombreAplicacion(UPDATED_NOMBRE_APLICACION);

        restAplicacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAplicacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAplicacion))
            )
            .andExpect(status().isOk());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
        Aplicacion testAplicacion = aplicacionList.get(aplicacionList.size() - 1);
        assertThat(testAplicacion.getNombreAplicacion()).isEqualTo(UPDATED_NOMBRE_APLICACION);
        assertThat(testAplicacion.getNumeroGrupo()).isEqualTo(DEFAULT_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void fullUpdateAplicacionWithPatch() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();

        // Update the aplicacion using partial update
        Aplicacion partialUpdatedAplicacion = new Aplicacion();
        partialUpdatedAplicacion.setId(aplicacion.getId());

        partialUpdatedAplicacion.nombreAplicacion(UPDATED_NOMBRE_APLICACION).numeroGrupo(UPDATED_NUMERO_GRUPO);

        restAplicacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAplicacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAplicacion))
            )
            .andExpect(status().isOk());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
        Aplicacion testAplicacion = aplicacionList.get(aplicacionList.size() - 1);
        assertThat(testAplicacion.getNombreAplicacion()).isEqualTo(UPDATED_NOMBRE_APLICACION);
        assertThat(testAplicacion.getNumeroGrupo()).isEqualTo(UPDATED_NUMERO_GRUPO);
    }

    @Test
    @Transactional
    void patchNonExistingAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();
        aplicacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAplicacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, aplicacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aplicacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();
        aplicacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAplicacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aplicacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAplicacion() throws Exception {
        int databaseSizeBeforeUpdate = aplicacionRepository.findAll().size();
        aplicacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAplicacionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(aplicacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aplicacion in the database
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAplicacion() throws Exception {
        // Initialize the database
        aplicacionRepository.saveAndFlush(aplicacion);

        int databaseSizeBeforeDelete = aplicacionRepository.findAll().size();

        // Delete the aplicacion
        restAplicacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, aplicacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aplicacion> aplicacionList = aplicacionRepository.findAll();
        assertThat(aplicacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
