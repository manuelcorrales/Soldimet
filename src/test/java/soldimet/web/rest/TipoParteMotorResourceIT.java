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
import soldimet.domain.TipoParteMotor;
import soldimet.repository.TipoParteMotorRepository;

/**
 * Integration tests for the {@link TipoParteMotorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoParteMotorResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO_PARTE_MOTOR = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_PARTE_MOTOR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipo-parte-motors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TipoParteMotorRepository tipoParteMotorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoParteMotorMockMvc;

    private TipoParteMotor tipoParteMotor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoParteMotor createEntity(EntityManager em) {
        TipoParteMotor tipoParteMotor = new TipoParteMotor().nombreTipoParteMotor(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR);
        return tipoParteMotor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoParteMotor createUpdatedEntity(EntityManager em) {
        TipoParteMotor tipoParteMotor = new TipoParteMotor().nombreTipoParteMotor(UPDATED_NOMBRE_TIPO_PARTE_MOTOR);
        return tipoParteMotor;
    }

    @BeforeEach
    public void initTest() {
        tipoParteMotor = createEntity(em);
    }

    @Test
    @Transactional
    void createTipoParteMotor() throws Exception {
        int databaseSizeBeforeCreate = tipoParteMotorRepository.findAll().size();
        // Create the TipoParteMotor
        restTipoParteMotorMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isCreated());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeCreate + 1);
        TipoParteMotor testTipoParteMotor = tipoParteMotorList.get(tipoParteMotorList.size() - 1);
        assertThat(testTipoParteMotor.getNombreTipoParteMotor()).isEqualTo(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR);
    }

    @Test
    @Transactional
    void createTipoParteMotorWithExistingId() throws Exception {
        // Create the TipoParteMotor with an existing ID
        tipoParteMotor.setId(1L);

        int databaseSizeBeforeCreate = tipoParteMotorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoParteMotorMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreTipoParteMotorIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoParteMotorRepository.findAll().size();
        // set the field null
        tipoParteMotor.setNombreTipoParteMotor(null);

        // Create the TipoParteMotor, which fails.

        restTipoParteMotorMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isBadRequest());

        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTipoParteMotors() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        // Get all the tipoParteMotorList
        restTipoParteMotorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoParteMotor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoParteMotor").value(hasItem(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR)));
    }

    @Test
    @Transactional
    void getTipoParteMotor() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        // Get the tipoParteMotor
        restTipoParteMotorMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoParteMotor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoParteMotor.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoParteMotor").value(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR));
    }

    @Test
    @Transactional
    void getNonExistingTipoParteMotor() throws Exception {
        // Get the tipoParteMotor
        restTipoParteMotorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTipoParteMotor() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();

        // Update the tipoParteMotor
        TipoParteMotor updatedTipoParteMotor = tipoParteMotorRepository.findById(tipoParteMotor.getId()).get();
        // Disconnect from session so that the updates on updatedTipoParteMotor are not directly saved in db
        em.detach(updatedTipoParteMotor);
        updatedTipoParteMotor.nombreTipoParteMotor(UPDATED_NOMBRE_TIPO_PARTE_MOTOR);

        restTipoParteMotorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTipoParteMotor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipoParteMotor))
            )
            .andExpect(status().isOk());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
        TipoParteMotor testTipoParteMotor = tipoParteMotorList.get(tipoParteMotorList.size() - 1);
        assertThat(testTipoParteMotor.getNombreTipoParteMotor()).isEqualTo(UPDATED_NOMBRE_TIPO_PARTE_MOTOR);
    }

    @Test
    @Transactional
    void putNonExistingTipoParteMotor() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();
        tipoParteMotor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoParteMotorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoParteMotor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoParteMotor() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();
        tipoParteMotor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoParteMotorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoParteMotor() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();
        tipoParteMotor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoParteMotorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoParteMotor)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoParteMotorWithPatch() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();

        // Update the tipoParteMotor using partial update
        TipoParteMotor partialUpdatedTipoParteMotor = new TipoParteMotor();
        partialUpdatedTipoParteMotor.setId(tipoParteMotor.getId());

        restTipoParteMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoParteMotor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoParteMotor))
            )
            .andExpect(status().isOk());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
        TipoParteMotor testTipoParteMotor = tipoParteMotorList.get(tipoParteMotorList.size() - 1);
        assertThat(testTipoParteMotor.getNombreTipoParteMotor()).isEqualTo(DEFAULT_NOMBRE_TIPO_PARTE_MOTOR);
    }

    @Test
    @Transactional
    void fullUpdateTipoParteMotorWithPatch() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();

        // Update the tipoParteMotor using partial update
        TipoParteMotor partialUpdatedTipoParteMotor = new TipoParteMotor();
        partialUpdatedTipoParteMotor.setId(tipoParteMotor.getId());

        partialUpdatedTipoParteMotor.nombreTipoParteMotor(UPDATED_NOMBRE_TIPO_PARTE_MOTOR);

        restTipoParteMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoParteMotor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoParteMotor))
            )
            .andExpect(status().isOk());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
        TipoParteMotor testTipoParteMotor = tipoParteMotorList.get(tipoParteMotorList.size() - 1);
        assertThat(testTipoParteMotor.getNombreTipoParteMotor()).isEqualTo(UPDATED_NOMBRE_TIPO_PARTE_MOTOR);
    }

    @Test
    @Transactional
    void patchNonExistingTipoParteMotor() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();
        tipoParteMotor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoParteMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoParteMotor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoParteMotor() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();
        tipoParteMotor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoParteMotorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoParteMotor() throws Exception {
        int databaseSizeBeforeUpdate = tipoParteMotorRepository.findAll().size();
        tipoParteMotor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoParteMotorMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tipoParteMotor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoParteMotor in the database
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoParteMotor() throws Exception {
        // Initialize the database
        tipoParteMotorRepository.saveAndFlush(tipoParteMotor);

        int databaseSizeBeforeDelete = tipoParteMotorRepository.findAll().size();

        // Delete the tipoParteMotor
        restTipoParteMotorMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoParteMotor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoParteMotor> tipoParteMotorList = tipoParteMotorRepository.findAll();
        assertThat(tipoParteMotorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
