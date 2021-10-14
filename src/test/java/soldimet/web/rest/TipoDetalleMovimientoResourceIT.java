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
import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.TipoDetalleMovimientoRepository;

/**
 * Integration tests for the {@link TipoDetalleMovimientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TipoDetalleMovimientoResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO_DETALLE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO_DETALLE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tipo-detalle-movimientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TipoDetalleMovimientoRepository tipoDetalleMovimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoDetalleMovimientoMockMvc;

    private TipoDetalleMovimiento tipoDetalleMovimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDetalleMovimiento createEntity(EntityManager em) {
        TipoDetalleMovimiento tipoDetalleMovimiento = new TipoDetalleMovimiento().nombreTipoDetalle(DEFAULT_NOMBRE_TIPO_DETALLE);
        return tipoDetalleMovimiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoDetalleMovimiento createUpdatedEntity(EntityManager em) {
        TipoDetalleMovimiento tipoDetalleMovimiento = new TipoDetalleMovimiento().nombreTipoDetalle(UPDATED_NOMBRE_TIPO_DETALLE);
        return tipoDetalleMovimiento;
    }

    @BeforeEach
    public void initTest() {
        tipoDetalleMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    void createTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeCreate = tipoDetalleMovimientoRepository.findAll().size();
        // Create the TipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isCreated());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoDetalleMovimiento testTipoDetalleMovimiento = tipoDetalleMovimientoList.get(tipoDetalleMovimientoList.size() - 1);
        assertThat(testTipoDetalleMovimiento.getNombreTipoDetalle()).isEqualTo(DEFAULT_NOMBRE_TIPO_DETALLE);
    }

    @Test
    @Transactional
    void createTipoDetalleMovimientoWithExistingId() throws Exception {
        // Create the TipoDetalleMovimiento with an existing ID
        tipoDetalleMovimiento.setId(1L);

        int databaseSizeBeforeCreate = tipoDetalleMovimientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoDetalleMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreTipoDetalleIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoDetalleMovimientoRepository.findAll().size();
        // set the field null
        tipoDetalleMovimiento.setNombreTipoDetalle(null);

        // Create the TipoDetalleMovimiento, which fails.

        restTipoDetalleMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTipoDetalleMovimientos() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        // Get all the tipoDetalleMovimientoList
        restTipoDetalleMovimientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoDetalleMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipoDetalle").value(hasItem(DEFAULT_NOMBRE_TIPO_DETALLE)));
    }

    @Test
    @Transactional
    void getTipoDetalleMovimiento() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        // Get the tipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc
            .perform(get(ENTITY_API_URL_ID, tipoDetalleMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoDetalleMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipoDetalle").value(DEFAULT_NOMBRE_TIPO_DETALLE));
    }

    @Test
    @Transactional
    void getNonExistingTipoDetalleMovimiento() throws Exception {
        // Get the tipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTipoDetalleMovimiento() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();

        // Update the tipoDetalleMovimiento
        TipoDetalleMovimiento updatedTipoDetalleMovimiento = tipoDetalleMovimientoRepository.findById(tipoDetalleMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedTipoDetalleMovimiento are not directly saved in db
        em.detach(updatedTipoDetalleMovimiento);
        updatedTipoDetalleMovimiento.nombreTipoDetalle(UPDATED_NOMBRE_TIPO_DETALLE);

        restTipoDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTipoDetalleMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTipoDetalleMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoDetalleMovimiento testTipoDetalleMovimiento = tipoDetalleMovimientoList.get(tipoDetalleMovimientoList.size() - 1);
        assertThat(testTipoDetalleMovimiento.getNombreTipoDetalle()).isEqualTo(UPDATED_NOMBRE_TIPO_DETALLE);
    }

    @Test
    @Transactional
    void putNonExistingTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();
        tipoDetalleMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tipoDetalleMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();
        tipoDetalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();
        tipoDetalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTipoDetalleMovimientoWithPatch() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();

        // Update the tipoDetalleMovimiento using partial update
        TipoDetalleMovimiento partialUpdatedTipoDetalleMovimiento = new TipoDetalleMovimiento();
        partialUpdatedTipoDetalleMovimiento.setId(tipoDetalleMovimiento.getId());

        partialUpdatedTipoDetalleMovimiento.nombreTipoDetalle(UPDATED_NOMBRE_TIPO_DETALLE);

        restTipoDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoDetalleMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoDetalleMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoDetalleMovimiento testTipoDetalleMovimiento = tipoDetalleMovimientoList.get(tipoDetalleMovimientoList.size() - 1);
        assertThat(testTipoDetalleMovimiento.getNombreTipoDetalle()).isEqualTo(UPDATED_NOMBRE_TIPO_DETALLE);
    }

    @Test
    @Transactional
    void fullUpdateTipoDetalleMovimientoWithPatch() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();

        // Update the tipoDetalleMovimiento using partial update
        TipoDetalleMovimiento partialUpdatedTipoDetalleMovimiento = new TipoDetalleMovimiento();
        partialUpdatedTipoDetalleMovimiento.setId(tipoDetalleMovimiento.getId());

        partialUpdatedTipoDetalleMovimiento.nombreTipoDetalle(UPDATED_NOMBRE_TIPO_DETALLE);

        restTipoDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTipoDetalleMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTipoDetalleMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        TipoDetalleMovimiento testTipoDetalleMovimiento = tipoDetalleMovimientoList.get(tipoDetalleMovimientoList.size() - 1);
        assertThat(testTipoDetalleMovimiento.getNombreTipoDetalle()).isEqualTo(UPDATED_NOMBRE_TIPO_DETALLE);
    }

    @Test
    @Transactional
    void patchNonExistingTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();
        tipoDetalleMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tipoDetalleMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();
        tipoDetalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTipoDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = tipoDetalleMovimientoRepository.findAll().size();
        tipoDetalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTipoDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tipoDetalleMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TipoDetalleMovimiento in the database
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTipoDetalleMovimiento() throws Exception {
        // Initialize the database
        tipoDetalleMovimientoRepository.saveAndFlush(tipoDetalleMovimiento);

        int databaseSizeBeforeDelete = tipoDetalleMovimientoRepository.findAll().size();

        // Delete the tipoDetalleMovimiento
        restTipoDetalleMovimientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, tipoDetalleMovimiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoDetalleMovimiento> tipoDetalleMovimientoList = tipoDetalleMovimientoRepository.findAll();
        assertThat(tipoDetalleMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
