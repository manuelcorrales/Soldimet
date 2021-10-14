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
import soldimet.domain.PagoEfectivo;
import soldimet.repository.PagoEfectivoRepository;

/**
 * Integration tests for the {@link PagoEfectivoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PagoEfectivoResourceIT {

    private static final String ENTITY_API_URL = "/api/pago-efectivos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PagoEfectivoRepository pagoEfectivoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPagoEfectivoMockMvc;

    private PagoEfectivo pagoEfectivo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoEfectivo createEntity(EntityManager em) {
        PagoEfectivo pagoEfectivo = new PagoEfectivo();
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoEfectivo.setFormaDePago(formaDePago);
        return pagoEfectivo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoEfectivo createUpdatedEntity(EntityManager em) {
        PagoEfectivo pagoEfectivo = new PagoEfectivo();
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createUpdatedEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoEfectivo.setFormaDePago(formaDePago);
        return pagoEfectivo;
    }

    @BeforeEach
    public void initTest() {
        pagoEfectivo = createEntity(em);
    }

    @Test
    @Transactional
    void createPagoEfectivo() throws Exception {
        int databaseSizeBeforeCreate = pagoEfectivoRepository.findAll().size();
        // Create the PagoEfectivo
        restPagoEfectivoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoEfectivo)))
            .andExpect(status().isCreated());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeCreate + 1);
        PagoEfectivo testPagoEfectivo = pagoEfectivoList.get(pagoEfectivoList.size() - 1);
    }

    @Test
    @Transactional
    void createPagoEfectivoWithExistingId() throws Exception {
        // Create the PagoEfectivo with an existing ID
        pagoEfectivo.setId(1L);

        int databaseSizeBeforeCreate = pagoEfectivoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagoEfectivoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoEfectivo)))
            .andExpect(status().isBadRequest());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPagoEfectivos() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        // Get all the pagoEfectivoList
        restPagoEfectivoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagoEfectivo.getId().intValue())));
    }

    @Test
    @Transactional
    void getPagoEfectivo() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        // Get the pagoEfectivo
        restPagoEfectivoMockMvc
            .perform(get(ENTITY_API_URL_ID, pagoEfectivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pagoEfectivo.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingPagoEfectivo() throws Exception {
        // Get the pagoEfectivo
        restPagoEfectivoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPagoEfectivo() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();

        // Update the pagoEfectivo
        PagoEfectivo updatedPagoEfectivo = pagoEfectivoRepository.findById(pagoEfectivo.getId()).get();
        // Disconnect from session so that the updates on updatedPagoEfectivo are not directly saved in db
        em.detach(updatedPagoEfectivo);

        restPagoEfectivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPagoEfectivo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPagoEfectivo))
            )
            .andExpect(status().isOk());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
        PagoEfectivo testPagoEfectivo = pagoEfectivoList.get(pagoEfectivoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingPagoEfectivo() throws Exception {
        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();
        pagoEfectivo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoEfectivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pagoEfectivo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pagoEfectivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPagoEfectivo() throws Exception {
        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();
        pagoEfectivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoEfectivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pagoEfectivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPagoEfectivo() throws Exception {
        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();
        pagoEfectivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoEfectivoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoEfectivo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePagoEfectivoWithPatch() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();

        // Update the pagoEfectivo using partial update
        PagoEfectivo partialUpdatedPagoEfectivo = new PagoEfectivo();
        partialUpdatedPagoEfectivo.setId(pagoEfectivo.getId());

        restPagoEfectivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPagoEfectivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPagoEfectivo))
            )
            .andExpect(status().isOk());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
        PagoEfectivo testPagoEfectivo = pagoEfectivoList.get(pagoEfectivoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdatePagoEfectivoWithPatch() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();

        // Update the pagoEfectivo using partial update
        PagoEfectivo partialUpdatedPagoEfectivo = new PagoEfectivo();
        partialUpdatedPagoEfectivo.setId(pagoEfectivo.getId());

        restPagoEfectivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPagoEfectivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPagoEfectivo))
            )
            .andExpect(status().isOk());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
        PagoEfectivo testPagoEfectivo = pagoEfectivoList.get(pagoEfectivoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingPagoEfectivo() throws Exception {
        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();
        pagoEfectivo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoEfectivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pagoEfectivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pagoEfectivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPagoEfectivo() throws Exception {
        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();
        pagoEfectivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoEfectivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pagoEfectivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPagoEfectivo() throws Exception {
        int databaseSizeBeforeUpdate = pagoEfectivoRepository.findAll().size();
        pagoEfectivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoEfectivoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pagoEfectivo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PagoEfectivo in the database
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePagoEfectivo() throws Exception {
        // Initialize the database
        pagoEfectivoRepository.saveAndFlush(pagoEfectivo);

        int databaseSizeBeforeDelete = pagoEfectivoRepository.findAll().size();

        // Delete the pagoEfectivo
        restPagoEfectivoMockMvc
            .perform(delete(ENTITY_API_URL_ID, pagoEfectivo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PagoEfectivo> pagoEfectivoList = pagoEfectivoRepository.findAll();
        assertThat(pagoEfectivoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
