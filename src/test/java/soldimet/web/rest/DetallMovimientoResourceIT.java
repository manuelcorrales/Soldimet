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
import soldimet.domain.DetallMovimiento;
import soldimet.repository.DetallMovimientoRepository;

/**
 * Integration tests for the {@link DetallMovimientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DetallMovimientoResourceIT {

    private static final String ENTITY_API_URL = "/api/detall-movimientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DetallMovimientoRepository detallMovimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetallMovimientoMockMvc;

    private DetallMovimiento detallMovimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetallMovimiento createEntity(EntityManager em) {
        DetallMovimiento detallMovimiento = new DetallMovimiento();
        return detallMovimiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetallMovimiento createUpdatedEntity(EntityManager em) {
        DetallMovimiento detallMovimiento = new DetallMovimiento();
        return detallMovimiento;
    }

    @BeforeEach
    public void initTest() {
        detallMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    void createDetallMovimiento() throws Exception {
        int databaseSizeBeforeCreate = detallMovimientoRepository.findAll().size();
        // Create the DetallMovimiento
        restDetallMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isCreated());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        DetallMovimiento testDetallMovimiento = detallMovimientoList.get(detallMovimientoList.size() - 1);
    }

    @Test
    @Transactional
    void createDetallMovimientoWithExistingId() throws Exception {
        // Create the DetallMovimiento with an existing ID
        detallMovimiento.setId(1L);

        int databaseSizeBeforeCreate = detallMovimientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetallMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDetallMovimientos() throws Exception {
        // Initialize the database
        detallMovimientoRepository.saveAndFlush(detallMovimiento);

        // Get all the detallMovimientoList
        restDetallMovimientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detallMovimiento.getId().intValue())));
    }

    @Test
    @Transactional
    void getDetallMovimiento() throws Exception {
        // Initialize the database
        detallMovimientoRepository.saveAndFlush(detallMovimiento);

        // Get the detallMovimiento
        restDetallMovimientoMockMvc
            .perform(get(ENTITY_API_URL_ID, detallMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detallMovimiento.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingDetallMovimiento() throws Exception {
        // Get the detallMovimiento
        restDetallMovimientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDetallMovimiento() throws Exception {
        // Initialize the database
        detallMovimientoRepository.saveAndFlush(detallMovimiento);

        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();

        // Update the detallMovimiento
        DetallMovimiento updatedDetallMovimiento = detallMovimientoRepository.findById(detallMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedDetallMovimiento are not directly saved in db
        em.detach(updatedDetallMovimiento);

        restDetallMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDetallMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDetallMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetallMovimiento testDetallMovimiento = detallMovimientoList.get(detallMovimientoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingDetallMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();
        detallMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetallMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, detallMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDetallMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();
        detallMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDetallMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();
        detallMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDetallMovimientoWithPatch() throws Exception {
        // Initialize the database
        detallMovimientoRepository.saveAndFlush(detallMovimiento);

        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();

        // Update the detallMovimiento using partial update
        DetallMovimiento partialUpdatedDetallMovimiento = new DetallMovimiento();
        partialUpdatedDetallMovimiento.setId(detallMovimiento.getId());

        restDetallMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetallMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetallMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetallMovimiento testDetallMovimiento = detallMovimientoList.get(detallMovimientoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateDetallMovimientoWithPatch() throws Exception {
        // Initialize the database
        detallMovimientoRepository.saveAndFlush(detallMovimiento);

        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();

        // Update the detallMovimiento using partial update
        DetallMovimiento partialUpdatedDetallMovimiento = new DetallMovimiento();
        partialUpdatedDetallMovimiento.setId(detallMovimiento.getId());

        restDetallMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetallMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetallMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetallMovimiento testDetallMovimiento = detallMovimientoList.get(detallMovimientoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingDetallMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();
        detallMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetallMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, detallMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDetallMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();
        detallMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDetallMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detallMovimientoRepository.findAll().size();
        detallMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetallMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detallMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetallMovimiento in the database
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDetallMovimiento() throws Exception {
        // Initialize the database
        detallMovimientoRepository.saveAndFlush(detallMovimiento);

        int databaseSizeBeforeDelete = detallMovimientoRepository.findAll().size();

        // Delete the detallMovimiento
        restDetallMovimientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, detallMovimiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetallMovimiento> detallMovimientoList = detallMovimientoRepository.findAll();
        assertThat(detallMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
