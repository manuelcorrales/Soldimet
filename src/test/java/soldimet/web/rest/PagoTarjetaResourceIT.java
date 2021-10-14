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
import soldimet.domain.PagoTarjeta;
import soldimet.repository.PagoTarjetaRepository;

/**
 * Integration tests for the {@link PagoTarjetaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PagoTarjetaResourceIT {

    private static final String ENTITY_API_URL = "/api/pago-tarjetas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PagoTarjetaRepository pagoTarjetaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPagoTarjetaMockMvc;

    private PagoTarjeta pagoTarjeta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoTarjeta createEntity(EntityManager em) {
        PagoTarjeta pagoTarjeta = new PagoTarjeta();
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoTarjeta.setFormaDePago(formaDePago);
        return pagoTarjeta;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoTarjeta createUpdatedEntity(EntityManager em) {
        PagoTarjeta pagoTarjeta = new PagoTarjeta();
        // Add required entity
        FormaDePago formaDePago;
        if (TestUtil.findAll(em, FormaDePago.class).isEmpty()) {
            formaDePago = FormaDePagoResourceIT.createUpdatedEntity(em);
            em.persist(formaDePago);
            em.flush();
        } else {
            formaDePago = TestUtil.findAll(em, FormaDePago.class).get(0);
        }
        pagoTarjeta.setFormaDePago(formaDePago);
        return pagoTarjeta;
    }

    @BeforeEach
    public void initTest() {
        pagoTarjeta = createEntity(em);
    }

    @Test
    @Transactional
    void createPagoTarjeta() throws Exception {
        int databaseSizeBeforeCreate = pagoTarjetaRepository.findAll().size();
        // Create the PagoTarjeta
        restPagoTarjetaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoTarjeta)))
            .andExpect(status().isCreated());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeCreate + 1);
        PagoTarjeta testPagoTarjeta = pagoTarjetaList.get(pagoTarjetaList.size() - 1);
    }

    @Test
    @Transactional
    void createPagoTarjetaWithExistingId() throws Exception {
        // Create the PagoTarjeta with an existing ID
        pagoTarjeta.setId(1L);

        int databaseSizeBeforeCreate = pagoTarjetaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagoTarjetaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoTarjeta)))
            .andExpect(status().isBadRequest());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPagoTarjetas() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        // Get all the pagoTarjetaList
        restPagoTarjetaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagoTarjeta.getId().intValue())));
    }

    @Test
    @Transactional
    void getPagoTarjeta() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        // Get the pagoTarjeta
        restPagoTarjetaMockMvc
            .perform(get(ENTITY_API_URL_ID, pagoTarjeta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pagoTarjeta.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingPagoTarjeta() throws Exception {
        // Get the pagoTarjeta
        restPagoTarjetaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPagoTarjeta() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();

        // Update the pagoTarjeta
        PagoTarjeta updatedPagoTarjeta = pagoTarjetaRepository.findById(pagoTarjeta.getId()).get();
        // Disconnect from session so that the updates on updatedPagoTarjeta are not directly saved in db
        em.detach(updatedPagoTarjeta);

        restPagoTarjetaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPagoTarjeta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPagoTarjeta))
            )
            .andExpect(status().isOk());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        PagoTarjeta testPagoTarjeta = pagoTarjetaList.get(pagoTarjetaList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingPagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();
        pagoTarjeta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoTarjetaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pagoTarjeta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();
        pagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoTarjetaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();
        pagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoTarjetaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pagoTarjeta)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePagoTarjetaWithPatch() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();

        // Update the pagoTarjeta using partial update
        PagoTarjeta partialUpdatedPagoTarjeta = new PagoTarjeta();
        partialUpdatedPagoTarjeta.setId(pagoTarjeta.getId());

        restPagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPagoTarjeta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPagoTarjeta))
            )
            .andExpect(status().isOk());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        PagoTarjeta testPagoTarjeta = pagoTarjetaList.get(pagoTarjetaList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdatePagoTarjetaWithPatch() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();

        // Update the pagoTarjeta using partial update
        PagoTarjeta partialUpdatedPagoTarjeta = new PagoTarjeta();
        partialUpdatedPagoTarjeta.setId(pagoTarjeta.getId());

        restPagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPagoTarjeta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPagoTarjeta))
            )
            .andExpect(status().isOk());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
        PagoTarjeta testPagoTarjeta = pagoTarjetaList.get(pagoTarjetaList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingPagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();
        pagoTarjeta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pagoTarjeta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();
        pagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pagoTarjeta))
            )
            .andExpect(status().isBadRequest());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPagoTarjeta() throws Exception {
        int databaseSizeBeforeUpdate = pagoTarjetaRepository.findAll().size();
        pagoTarjeta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPagoTarjetaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pagoTarjeta))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PagoTarjeta in the database
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePagoTarjeta() throws Exception {
        // Initialize the database
        pagoTarjetaRepository.saveAndFlush(pagoTarjeta);

        int databaseSizeBeforeDelete = pagoTarjetaRepository.findAll().size();

        // Delete the pagoTarjeta
        restPagoTarjetaMockMvc
            .perform(delete(ENTITY_API_URL_ID, pagoTarjeta.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PagoTarjeta> pagoTarjetaList = pagoTarjetaRepository.findAll();
        assertThat(pagoTarjetaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
