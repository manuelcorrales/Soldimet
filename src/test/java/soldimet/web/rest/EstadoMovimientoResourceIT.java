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
import soldimet.domain.EstadoMovimiento;
import soldimet.repository.EstadoMovimientoRepository;

/**
 * Integration tests for the {@link EstadoMovimientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoMovimientoResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-movimientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoMovimientoRepository estadoMovimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoMovimientoMockMvc;

    private EstadoMovimiento estadoMovimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoMovimiento createEntity(EntityManager em) {
        EstadoMovimiento estadoMovimiento = new EstadoMovimiento().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoMovimiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoMovimiento createUpdatedEntity(EntityManager em) {
        EstadoMovimiento estadoMovimiento = new EstadoMovimiento().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoMovimiento;
    }

    @BeforeEach
    public void initTest() {
        estadoMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoMovimiento() throws Exception {
        int databaseSizeBeforeCreate = estadoMovimientoRepository.findAll().size();
        // Create the EstadoMovimiento
        restEstadoMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoMovimiento testEstadoMovimiento = estadoMovimientoList.get(estadoMovimientoList.size() - 1);
        assertThat(testEstadoMovimiento.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoMovimientoWithExistingId() throws Exception {
        // Create the EstadoMovimiento with an existing ID
        estadoMovimiento.setId(1L);

        int databaseSizeBeforeCreate = estadoMovimientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoMovimientoRepository.findAll().size();
        // set the field null
        estadoMovimiento.setNombreEstado(null);

        // Create the EstadoMovimiento, which fails.

        restEstadoMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isBadRequest());

        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoMovimientos() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        // Get all the estadoMovimientoList
        restEstadoMovimientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoMovimiento() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        // Get the estadoMovimiento
        restEstadoMovimientoMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoMovimiento() throws Exception {
        // Get the estadoMovimiento
        restEstadoMovimientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoMovimiento() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();

        // Update the estadoMovimiento
        EstadoMovimiento updatedEstadoMovimiento = estadoMovimientoRepository.findById(estadoMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoMovimiento are not directly saved in db
        em.detach(updatedEstadoMovimiento);
        updatedEstadoMovimiento.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        EstadoMovimiento testEstadoMovimiento = estadoMovimientoList.get(estadoMovimientoList.size() - 1);
        assertThat(testEstadoMovimiento.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();
        estadoMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();
        estadoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();
        estadoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoMovimientoWithPatch() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();

        // Update the estadoMovimiento using partial update
        EstadoMovimiento partialUpdatedEstadoMovimiento = new EstadoMovimiento();
        partialUpdatedEstadoMovimiento.setId(estadoMovimiento.getId());

        partialUpdatedEstadoMovimiento.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        EstadoMovimiento testEstadoMovimiento = estadoMovimientoList.get(estadoMovimientoList.size() - 1);
        assertThat(testEstadoMovimiento.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoMovimientoWithPatch() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();

        // Update the estadoMovimiento using partial update
        EstadoMovimiento partialUpdatedEstadoMovimiento = new EstadoMovimiento();
        partialUpdatedEstadoMovimiento.setId(estadoMovimiento.getId());

        partialUpdatedEstadoMovimiento.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
        EstadoMovimiento testEstadoMovimiento = estadoMovimientoList.get(estadoMovimientoList.size() - 1);
        assertThat(testEstadoMovimiento.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();
        estadoMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();
        estadoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = estadoMovimientoRepository.findAll().size();
        estadoMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoMovimiento in the database
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoMovimiento() throws Exception {
        // Initialize the database
        estadoMovimientoRepository.saveAndFlush(estadoMovimiento);

        int databaseSizeBeforeDelete = estadoMovimientoRepository.findAll().size();

        // Delete the estadoMovimiento
        restEstadoMovimientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoMovimiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoMovimiento> estadoMovimientoList = estadoMovimientoRepository.findAll();
        assertThat(estadoMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
