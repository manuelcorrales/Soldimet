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
import soldimet.domain.MedioDePagoTarjeta;
import soldimet.repository.MedioDePagoTarjetaRepository;

/**
 * Integration tests for the {@link MedioDePagoTarjetaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MedioDePagoTarjetaResourceIT {

    private static final String DEFAULT_ULTIMOS_4 = "AAAAAAAAAA";
    private static final String UPDATED_ULTIMOS_4 = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/medio-de-pago-tarjetas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MedioDePagoTarjetaRepository medioDePagoTarjetaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedioDePagoTarjetaMockMvc;

    private MedioDePagoTarjeta medioDePagoTarjeta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedioDePagoTarjeta createEntity(EntityManager em) {
        MedioDePagoTarjeta medioDePagoTarjeta = new MedioDePagoTarjeta().ultimos4(DEFAULT_ULTIMOS_4);
        return medioDePagoTarjeta;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedioDePagoTarjeta createUpdatedEntity(EntityManager em) {
        MedioDePagoTarjeta medioDePagoTarjeta = new MedioDePagoTarjeta().ultimos4(UPDATED_ULTIMOS_4);
        return medioDePagoTarjeta;
    }

    @BeforeEach
    public void initTest() {
        medioDePagoTarjeta = createEntity(em);
    }

    @Test
    @Transactional
    void createMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoTarjetaRepository.findAll().size();
        // Create the MedioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isCreated());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeCreate + 1);
        MedioDePagoTarjeta testMedioDePagoTarjeta = medioDePagoTarjetaList.get(medioDePagoTarjetaList.size() - 1);
        assertThat(testMedioDePagoTarjeta.getUltimos4()).isEqualTo(DEFAULT_ULTIMOS_4);
    }

    @Test
    @Transactional
    void createMedioDePagoTarjetaWithExistingId() throws Exception {
        // Create the MedioDePagoTarjeta with an existing ID
        medioDePagoTarjeta.setId(1L);

        int databaseSizeBeforeCreate = medioDePagoTarjetaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedioDePagoTarjetaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkUltimos4IsRequired() throws Exception {
        int databaseSizeBeforeTest = medioDePagoTarjetaRepository.findAll().size();
        // set the field null
        medioDePagoTarjeta.setUltimos4(null);

        // Create the MedioDePagoTarjeta, which fails.

        restMedioDePagoTarjetaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllMedioDePagoTarjetas() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        // Get all the medioDePagoTarjetaList
        restMedioDePagoTarjetaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medioDePagoTarjeta.getId().intValue())))
            .andExpect(jsonPath("$.[*].ultimos4").value(hasItem(DEFAULT_ULTIMOS_4)));
    }

    @Test
    @Transactional
    void getMedioDePagoTarjeta() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        // Get the medioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc
            .perform(get(ENTITY_API_URL_ID, medioDePagoTarjeta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medioDePagoTarjeta.getId().intValue()))
            .andExpect(jsonPath("$.ultimos4").value(DEFAULT_ULTIMOS_4));
    }

    @Test
    @Transactional
    void getNonExistingMedioDePagoTarjeta() throws Exception {
        // Get the medioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMedioDePagoTarjeta() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();

        // Update the medioDePagoTarjeta
        MedioDePagoTarjeta updatedMedioDePagoTarjeta = medioDePagoTarjetaRepository.findById(medioDePagoTarjeta.getId()).get();
        // Disconnect from session so that the updates on updatedMedioDePagoTarjeta are not directly saved in db
        em.detach(updatedMedioDePagoTarjeta);
        updatedMedioDePagoTarjeta.ultimos4(UPDATED_ULTIMOS_4);

        restMedioDePagoTarjetaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMedioDePagoTarjeta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMedioDePagoTarjeta))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoTarjeta testMedioDePagoTarjeta = medioDePagoTarjetaList.get(medioDePagoTarjetaList.size() - 1);
        assertThat(testMedioDePagoTarjeta.getUltimos4()).isEqualTo(UPDATED_ULTIMOS_4);
    }

    @Test
    @Transactional
    void putNonExistingMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();
        medioDePagoTarjeta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoTarjetaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, medioDePagoTarjeta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();
        medioDePagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoTarjetaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();
        medioDePagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoTarjetaMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMedioDePagoTarjetaWithPatch() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();

        // Update the medioDePagoTarjeta using partial update
        MedioDePagoTarjeta partialUpdatedMedioDePagoTarjeta = new MedioDePagoTarjeta();
        partialUpdatedMedioDePagoTarjeta.setId(medioDePagoTarjeta.getId());

        partialUpdatedMedioDePagoTarjeta.ultimos4(UPDATED_ULTIMOS_4);

        restMedioDePagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedioDePagoTarjeta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedioDePagoTarjeta))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoTarjeta testMedioDePagoTarjeta = medioDePagoTarjetaList.get(medioDePagoTarjetaList.size() - 1);
        assertThat(testMedioDePagoTarjeta.getUltimos4()).isEqualTo(UPDATED_ULTIMOS_4);
    }

    @Test
    @Transactional
    void fullUpdateMedioDePagoTarjetaWithPatch() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();

        // Update the medioDePagoTarjeta using partial update
        MedioDePagoTarjeta partialUpdatedMedioDePagoTarjeta = new MedioDePagoTarjeta();
        partialUpdatedMedioDePagoTarjeta.setId(medioDePagoTarjeta.getId());

        partialUpdatedMedioDePagoTarjeta.ultimos4(UPDATED_ULTIMOS_4);

        restMedioDePagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedioDePagoTarjeta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedioDePagoTarjeta))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        MedioDePagoTarjeta testMedioDePagoTarjeta = medioDePagoTarjetaList.get(medioDePagoTarjetaList.size() - 1);
        assertThat(testMedioDePagoTarjeta.getUltimos4()).isEqualTo(UPDATED_ULTIMOS_4);
    }

    @Test
    @Transactional
    void patchNonExistingMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();
        medioDePagoTarjeta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, medioDePagoTarjeta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();
        medioDePagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMedioDePagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoTarjetaRepository.findAll().size();
        medioDePagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePagoTarjeta))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedioDePagoTarjeta in the database
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMedioDePagoTarjeta() throws Exception {
        // Initialize the database
        medioDePagoTarjetaRepository.saveAndFlush(medioDePagoTarjeta);

        int databaseSizeBeforeDelete = medioDePagoTarjetaRepository.findAll().size();

        // Delete the medioDePagoTarjeta
        restMedioDePagoTarjetaMockMvc
            .perform(delete(ENTITY_API_URL_ID, medioDePagoTarjeta.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedioDePagoTarjeta> medioDePagoTarjetaList = medioDePagoTarjetaRepository.findAll();
        assertThat(medioDePagoTarjetaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
