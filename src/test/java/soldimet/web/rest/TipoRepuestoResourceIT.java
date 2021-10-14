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
import soldimet.domain.TipoRepuesto;
import soldimet.repository.TipoRepuestoRepository;

/**
 * Integration tests for the {@link TipoRepuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoRepuestoResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO_REPUESTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_REPUESTO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipo-repuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoRepuestoMockMvc;

    private TipoRepuesto tipoRepuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoRepuesto createEntity(EntityManager em) {
        TipoRepuesto tipoRepuesto = new TipoRepuesto().nombreTipoRepuesto(DEFAULT_NOMBRE_TIPO_REPUESTO);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        tipoRepuesto.setTipoParteMotor(tipoParteMotor);
        return tipoRepuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoRepuesto createUpdatedEntity(EntityManager em) {
        TipoRepuesto tipoRepuesto = new TipoRepuesto().nombreTipoRepuesto(UPDATED_NOMBRE_TIPO_REPUESTO);
        // Add required entity
        TipoParteMotor tipoParteMotor;
        if (TestUtil.findAll(em, TipoParteMotor.class).isEmpty()) {
            tipoParteMotor = TipoParteMotorResourceIT.createUpdatedEntity(em);
            em.persist(tipoParteMotor);
            em.flush();
        } else {
            tipoParteMotor = TestUtil.findAll(em, TipoParteMotor.class).get(0);
        }
        tipoRepuesto.setTipoParteMotor(tipoParteMotor);
        return tipoRepuesto;
    }

    @BeforeEach
    public void initTest() {
        tipoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createTipoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = tipoRepuestoRepository.findAll().size();
        // Create the TipoRepuesto
        restTipoRepuestoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isCreated());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoRepuesto testTipoRepuesto = tipoRepuestoList.get(tipoRepuestoList.size() - 1);
        assertThat(testTipoRepuesto.getNombreTipoRepuesto()).isEqualTo(DEFAULT_NOMBRE_TIPO_REPUESTO);
    }

    @Test
    @Transactional
    void createTipoRepuestoWithExistingId() throws Exception {
        // Create the TipoRepuesto with an existing ID
        tipoRepuesto.setId(1L);

        int databaseSizeBeforeCreate = tipoRepuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoRepuestoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isBadRequest());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreTipoRepuestoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoRepuestoRepository.findAll().size();
        // set the field null
        tipoRepuesto.setNombreTipoRepuesto(null);

        // Create the TipoRepuesto, which fails.

        restTipoRepuestoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isBadRequest());

        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTipoRepuestos() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        // Get all the tipoRepuestoList
        restTipoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoRepuesto").value(hasItem(DEFAULT_NOMBRE_TIPO_REPUESTO)));
    }

    @Test
    @Transactional
    void getTipoRepuesto() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        // Get the tipoRepuesto
        restTipoRepuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoRepuesto").value(DEFAULT_NOMBRE_TIPO_REPUESTO));
    }

    @Test
    @Transactional
    void getNonExistingTipoRepuesto() throws Exception {
        // Get the tipoRepuesto
        restTipoRepuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTipoRepuesto() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();

        // Update the tipoRepuesto
        TipoRepuesto updatedTipoRepuesto = tipoRepuestoRepository.findById(tipoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedTipoRepuesto are not directly saved in db
        em.detach(updatedTipoRepuesto);
        updatedTipoRepuesto.nombreTipoRepuesto(UPDATED_NOMBRE_TIPO_REPUESTO);

        restTipoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTipoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        TipoRepuesto testTipoRepuesto = tipoRepuestoList.get(tipoRepuestoList.size() - 1);
        assertThat(testTipoRepuesto.getNombreTipoRepuesto()).isEqualTo(UPDATED_NOMBRE_TIPO_REPUESTO);
    }

    @Test
    @Transactional
    void putNonExistingTipoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();
        tipoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();
        tipoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();
        tipoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoRepuestoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoRepuesto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoRepuestoWithPatch() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();

        // Update the tipoRepuesto using partial update
        TipoRepuesto partialUpdatedTipoRepuesto = new TipoRepuesto();
        partialUpdatedTipoRepuesto.setId(tipoRepuesto.getId());

        partialUpdatedTipoRepuesto.nombreTipoRepuesto(UPDATED_NOMBRE_TIPO_REPUESTO);

        restTipoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        TipoRepuesto testTipoRepuesto = tipoRepuestoList.get(tipoRepuestoList.size() - 1);
        assertThat(testTipoRepuesto.getNombreTipoRepuesto()).isEqualTo(UPDATED_NOMBRE_TIPO_REPUESTO);
    }

    @Test
    @Transactional
    void fullUpdateTipoRepuestoWithPatch() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();

        // Update the tipoRepuesto using partial update
        TipoRepuesto partialUpdatedTipoRepuesto = new TipoRepuesto();
        partialUpdatedTipoRepuesto.setId(tipoRepuesto.getId());

        partialUpdatedTipoRepuesto.nombreTipoRepuesto(UPDATED_NOMBRE_TIPO_REPUESTO);

        restTipoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        TipoRepuesto testTipoRepuesto = tipoRepuestoList.get(tipoRepuestoList.size() - 1);
        assertThat(testTipoRepuesto.getNombreTipoRepuesto()).isEqualTo(UPDATED_NOMBRE_TIPO_REPUESTO);
    }

    @Test
    @Transactional
    void patchNonExistingTipoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();
        tipoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();
        tipoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = tipoRepuestoRepository.findAll().size();
        tipoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tipoRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoRepuesto in the database
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoRepuesto() throws Exception {
        // Initialize the database
        tipoRepuestoRepository.saveAndFlush(tipoRepuesto);

        int databaseSizeBeforeDelete = tipoRepuestoRepository.findAll().size();

        // Delete the tipoRepuesto
        restTipoRepuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoRepuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoRepuesto> tipoRepuestoList = tipoRepuestoRepository.findAll();
        assertThat(tipoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
