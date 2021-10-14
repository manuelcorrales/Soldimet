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
import soldimet.domain.FormaDePago;
import soldimet.domain.MedioDePago;
import soldimet.repository.MedioDePagoRepository;

/**
 * Integration tests for the {@link MedioDePagoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MedioDePagoResourceIT {

    private static final String ENTITY_API_URL = "/api/medio-de-pagos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MedioDePagoRepository medioDePagoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedioDePagoMockMvc;

    private MedioDePago medioDePago;

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
    void createMedioDePago() throws Exception {
        int databaseSizeBeforeCreate = medioDePagoRepository.findAll().size();
        // Create the MedioDePago
        restMedioDePagoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePago)))
            .andExpect(status().isCreated());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeCreate + 1);
        MedioDePago testMedioDePago = medioDePagoList.get(medioDePagoList.size() - 1);
    }

    @Test
    @Transactional
    void createMedioDePagoWithExistingId() throws Exception {
        // Create the MedioDePago with an existing ID
        medioDePago.setId(1L);

        int databaseSizeBeforeCreate = medioDePagoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedioDePagoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePago)))
            .andExpect(status().isBadRequest());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMedioDePagos() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        // Get all the medioDePagoList
        restMedioDePagoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medioDePago.getId().intValue())));
    }

    @Test
    @Transactional
    void getMedioDePago() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        // Get the medioDePago
        restMedioDePagoMockMvc
            .perform(get(ENTITY_API_URL_ID, medioDePago.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medioDePago.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingMedioDePago() throws Exception {
        // Get the medioDePago
        restMedioDePagoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMedioDePago() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();

        // Update the medioDePago
        MedioDePago updatedMedioDePago = medioDePagoRepository.findById(medioDePago.getId()).get();
        // Disconnect from session so that the updates on updatedMedioDePago are not directly saved in db
        em.detach(updatedMedioDePago);

        restMedioDePagoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMedioDePago.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMedioDePago))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
        MedioDePago testMedioDePago = medioDePagoList.get(medioDePagoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingMedioDePago() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();
        medioDePago.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, medioDePago.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medioDePago))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMedioDePago() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();
        medioDePago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(medioDePago))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMedioDePago() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();
        medioDePago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(medioDePago)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMedioDePagoWithPatch() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();

        // Update the medioDePago using partial update
        MedioDePago partialUpdatedMedioDePago = new MedioDePago();
        partialUpdatedMedioDePago.setId(medioDePago.getId());

        restMedioDePagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedioDePago.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedioDePago))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
        MedioDePago testMedioDePago = medioDePagoList.get(medioDePagoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateMedioDePagoWithPatch() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();

        // Update the medioDePago using partial update
        MedioDePago partialUpdatedMedioDePago = new MedioDePago();
        partialUpdatedMedioDePago.setId(medioDePago.getId());

        restMedioDePagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMedioDePago.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMedioDePago))
            )
            .andExpect(status().isOk());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
        MedioDePago testMedioDePago = medioDePagoList.get(medioDePagoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingMedioDePago() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();
        medioDePago.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedioDePagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, medioDePago.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePago))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMedioDePago() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();
        medioDePago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(medioDePago))
            )
            .andExpect(status().isBadRequest());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMedioDePago() throws Exception {
        int databaseSizeBeforeUpdate = medioDePagoRepository.findAll().size();
        medioDePago.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMedioDePagoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(medioDePago))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the MedioDePago in the database
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMedioDePago() throws Exception {
        // Initialize the database
        medioDePagoRepository.saveAndFlush(medioDePago);

        int databaseSizeBeforeDelete = medioDePagoRepository.findAll().size();

        // Delete the medioDePago
        restMedioDePagoMockMvc
            .perform(delete(ENTITY_API_URL_ID, medioDePago.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedioDePago> medioDePagoList = medioDePagoRepository.findAll();
        assertThat(medioDePagoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
