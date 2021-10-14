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
import soldimet.domain.Rubro;
import soldimet.repository.RubroRepository;

/**
 * Integration tests for the {@link RubroResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RubroResourceIT {

    private static final String DEFAULT_NOMBRE_RUBRO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_RUBRO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/rubros";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RubroRepository rubroRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRubroMockMvc;

    private Rubro rubro;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rubro createEntity(EntityManager em) {
        Rubro rubro = new Rubro().nombreRubro(DEFAULT_NOMBRE_RUBRO);
        return rubro;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rubro createUpdatedEntity(EntityManager em) {
        Rubro rubro = new Rubro().nombreRubro(UPDATED_NOMBRE_RUBRO);
        return rubro;
    }

    @BeforeEach
    public void initTest() {
        rubro = createEntity(em);
    }

    @Test
    @Transactional
    void createRubro() throws Exception {
        int databaseSizeBeforeCreate = rubroRepository.findAll().size();
        // Create the Rubro
        restRubroMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isCreated());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeCreate + 1);
        Rubro testRubro = rubroList.get(rubroList.size() - 1);
        assertThat(testRubro.getNombreRubro()).isEqualTo(DEFAULT_NOMBRE_RUBRO);
    }

    @Test
    @Transactional
    void createRubroWithExistingId() throws Exception {
        // Create the Rubro with an existing ID
        rubro.setId(1L);

        int databaseSizeBeforeCreate = rubroRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRubroMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isBadRequest());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreRubroIsRequired() throws Exception {
        int databaseSizeBeforeTest = rubroRepository.findAll().size();
        // set the field null
        rubro.setNombreRubro(null);

        // Create the Rubro, which fails.

        restRubroMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isBadRequest());

        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRubros() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        // Get all the rubroList
        restRubroMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rubro.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreRubro").value(hasItem(DEFAULT_NOMBRE_RUBRO)));
    }

    @Test
    @Transactional
    void getRubro() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        // Get the rubro
        restRubroMockMvc
            .perform(get(ENTITY_API_URL_ID, rubro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rubro.getId().intValue()))
            .andExpect(jsonPath("$.nombreRubro").value(DEFAULT_NOMBRE_RUBRO));
    }

    @Test
    @Transactional
    void getNonExistingRubro() throws Exception {
        // Get the rubro
        restRubroMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRubro() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();

        // Update the rubro
        Rubro updatedRubro = rubroRepository.findById(rubro.getId()).get();
        // Disconnect from session so that the updates on updatedRubro are not directly saved in db
        em.detach(updatedRubro);
        updatedRubro.nombreRubro(UPDATED_NOMBRE_RUBRO);

        restRubroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRubro.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRubro))
            )
            .andExpect(status().isOk());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
        Rubro testRubro = rubroList.get(rubroList.size() - 1);
        assertThat(testRubro.getNombreRubro()).isEqualTo(UPDATED_NOMBRE_RUBRO);
    }

    @Test
    @Transactional
    void putNonExistingRubro() throws Exception {
        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();
        rubro.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRubroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, rubro.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rubro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRubro() throws Exception {
        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();
        rubro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRubroMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rubro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRubro() throws Exception {
        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();
        rubro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRubroMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRubroWithPatch() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();

        // Update the rubro using partial update
        Rubro partialUpdatedRubro = new Rubro();
        partialUpdatedRubro.setId(rubro.getId());

        restRubroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRubro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRubro))
            )
            .andExpect(status().isOk());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
        Rubro testRubro = rubroList.get(rubroList.size() - 1);
        assertThat(testRubro.getNombreRubro()).isEqualTo(DEFAULT_NOMBRE_RUBRO);
    }

    @Test
    @Transactional
    void fullUpdateRubroWithPatch() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();

        // Update the rubro using partial update
        Rubro partialUpdatedRubro = new Rubro();
        partialUpdatedRubro.setId(rubro.getId());

        partialUpdatedRubro.nombreRubro(UPDATED_NOMBRE_RUBRO);

        restRubroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRubro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRubro))
            )
            .andExpect(status().isOk());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
        Rubro testRubro = rubroList.get(rubroList.size() - 1);
        assertThat(testRubro.getNombreRubro()).isEqualTo(UPDATED_NOMBRE_RUBRO);
    }

    @Test
    @Transactional
    void patchNonExistingRubro() throws Exception {
        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();
        rubro.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRubroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, rubro.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rubro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRubro() throws Exception {
        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();
        rubro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRubroMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rubro))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRubro() throws Exception {
        int databaseSizeBeforeUpdate = rubroRepository.findAll().size();
        rubro.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRubroMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(rubro)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rubro in the database
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRubro() throws Exception {
        // Initialize the database
        rubroRepository.saveAndFlush(rubro);

        int databaseSizeBeforeDelete = rubroRepository.findAll().size();

        // Delete the rubro
        restRubroMockMvc
            .perform(delete(ENTITY_API_URL_ID, rubro.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rubro> rubroList = rubroRepository.findAll();
        assertThat(rubroList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
