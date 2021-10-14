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
import soldimet.domain.TipoMovimiento;
import soldimet.repository.TipoMovimientoRepository;

/**
 * Integration tests for the {@link TipoMovimientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoMovimientoResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO_MOVIMIENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_MOVIMIENTO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipo-movimientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TipoMovimientoRepository tipoMovimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoMovimientoMockMvc;

    private TipoMovimiento tipoMovimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoMovimiento createEntity(EntityManager em) {
        TipoMovimiento tipoMovimiento = new TipoMovimiento().nombreTipoMovimiento(DEFAULT_NOMBRE_TIPO_MOVIMIENTO);
        return tipoMovimiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoMovimiento createUpdatedEntity(EntityManager em) {
        TipoMovimiento tipoMovimiento = new TipoMovimiento().nombreTipoMovimiento(UPDATED_NOMBRE_TIPO_MOVIMIENTO);
        return tipoMovimiento;
    }

    @BeforeEach
    public void initTest() {
        tipoMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    void createTipoMovimiento() throws Exception {
        int databaseSizeBeforeCreate = tipoMovimientoRepository.findAll().size();
        // Create the TipoMovimiento
        restTipoMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isCreated());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoMovimiento testTipoMovimiento = tipoMovimientoList.get(tipoMovimientoList.size() - 1);
        assertThat(testTipoMovimiento.getNombreTipoMovimiento()).isEqualTo(DEFAULT_NOMBRE_TIPO_MOVIMIENTO);
    }

    @Test
    @Transactional
    void createTipoMovimientoWithExistingId() throws Exception {
        // Create the TipoMovimiento with an existing ID
        tipoMovimiento.setId(1L);

        int databaseSizeBeforeCreate = tipoMovimientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreTipoMovimientoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoMovimientoRepository.findAll().size();
        // set the field null
        tipoMovimiento.setNombreTipoMovimiento(null);

        // Create the TipoMovimiento, which fails.

        restTipoMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isBadRequest());

        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTipoMovimientos() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        // Get all the tipoMovimientoList
        restTipoMovimientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoMovimiento").value(hasItem(DEFAULT_NOMBRE_TIPO_MOVIMIENTO)));
    }

    @Test
    @Transactional
    void getTipoMovimiento() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        // Get the tipoMovimiento
        restTipoMovimientoMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoMovimiento").value(DEFAULT_NOMBRE_TIPO_MOVIMIENTO));
    }

    @Test
    @Transactional
    void getNonExistingTipoMovimiento() throws Exception {
        // Get the tipoMovimiento
        restTipoMovimientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTipoMovimiento() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();

        // Update the tipoMovimiento
        TipoMovimiento updatedTipoMovimiento = tipoMovimientoRepository.findById(tipoMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedTipoMovimiento are not directly saved in db
        em.detach(updatedTipoMovimiento);
        updatedTipoMovimiento.nombreTipoMovimiento(UPDATED_NOMBRE_TIPO_MOVIMIENTO);

        restTipoMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTipoMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipoMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoMovimiento testTipoMovimiento = tipoMovimientoList.get(tipoMovimientoList.size() - 1);
        assertThat(testTipoMovimiento.getNombreTipoMovimiento()).isEqualTo(UPDATED_NOMBRE_TIPO_MOVIMIENTO);
    }

    @Test
    @Transactional
    void putNonExistingTipoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();
        tipoMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();
        tipoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();
        tipoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoMovimientoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tipoMovimiento)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoMovimientoWithPatch() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();

        // Update the tipoMovimiento using partial update
        TipoMovimiento partialUpdatedTipoMovimiento = new TipoMovimiento();
        partialUpdatedTipoMovimiento.setId(tipoMovimiento.getId());

        partialUpdatedTipoMovimiento.nombreTipoMovimiento(UPDATED_NOMBRE_TIPO_MOVIMIENTO);

        restTipoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoMovimiento testTipoMovimiento = tipoMovimientoList.get(tipoMovimientoList.size() - 1);
        assertThat(testTipoMovimiento.getNombreTipoMovimiento()).isEqualTo(UPDATED_NOMBRE_TIPO_MOVIMIENTO);
    }

    @Test
    @Transactional
    void fullUpdateTipoMovimientoWithPatch() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();

        // Update the tipoMovimiento using partial update
        TipoMovimiento partialUpdatedTipoMovimiento = new TipoMovimiento();
        partialUpdatedTipoMovimiento.setId(tipoMovimiento.getId());

        partialUpdatedTipoMovimiento.nombreTipoMovimiento(UPDATED_NOMBRE_TIPO_MOVIMIENTO);

        restTipoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoMovimiento testTipoMovimiento = tipoMovimientoList.get(tipoMovimientoList.size() - 1);
        assertThat(testTipoMovimiento.getNombreTipoMovimiento()).isEqualTo(UPDATED_NOMBRE_TIPO_MOVIMIENTO);
    }

    @Test
    @Transactional
    void patchNonExistingTipoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();
        tipoMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();
        tipoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoMovimientoRepository.findAll().size();
        tipoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tipoMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoMovimiento in the database
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoMovimiento() throws Exception {
        // Initialize the database
        tipoMovimientoRepository.saveAndFlush(tipoMovimiento);

        int databaseSizeBeforeDelete = tipoMovimientoRepository.findAll().size();

        // Delete the tipoMovimiento
        restTipoMovimientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoMovimiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoMovimiento> tipoMovimientoList = tipoMovimientoRepository.findAll();
        assertThat(tipoMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
