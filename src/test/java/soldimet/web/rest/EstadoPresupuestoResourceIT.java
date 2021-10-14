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
import soldimet.domain.EstadoPresupuesto;
import soldimet.repository.EstadoPresupuestoRepository;

/**
 * Integration tests for the {@link EstadoPresupuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoPresupuestoResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-presupuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoPresupuestoRepository estadoPresupuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoPresupuestoMockMvc;

    private EstadoPresupuesto estadoPresupuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoPresupuesto createEntity(EntityManager em) {
        EstadoPresupuesto estadoPresupuesto = new EstadoPresupuesto().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoPresupuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoPresupuesto createUpdatedEntity(EntityManager em) {
        EstadoPresupuesto estadoPresupuesto = new EstadoPresupuesto().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoPresupuesto;
    }

    @BeforeEach
    public void initTest() {
        estadoPresupuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeCreate = estadoPresupuestoRepository.findAll().size();
        // Create the EstadoPresupuesto
        restEstadoPresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoPresupuesto testEstadoPresupuesto = estadoPresupuestoList.get(estadoPresupuestoList.size() - 1);
        assertThat(testEstadoPresupuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoPresupuestoWithExistingId() throws Exception {
        // Create the EstadoPresupuesto with an existing ID
        estadoPresupuesto.setId(1L);

        int databaseSizeBeforeCreate = estadoPresupuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoPresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoPresupuestoRepository.findAll().size();
        // set the field null
        estadoPresupuesto.setNombreEstado(null);

        // Create the EstadoPresupuesto, which fails.

        restEstadoPresupuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoPresupuestos() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        // Get all the estadoPresupuestoList
        restEstadoPresupuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoPresupuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoPresupuesto() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        // Get the estadoPresupuesto
        restEstadoPresupuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoPresupuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoPresupuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoPresupuesto() throws Exception {
        // Get the estadoPresupuesto
        restEstadoPresupuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoPresupuesto() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();

        // Update the estadoPresupuesto
        EstadoPresupuesto updatedEstadoPresupuesto = estadoPresupuestoRepository.findById(estadoPresupuesto.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoPresupuesto are not directly saved in db
        em.detach(updatedEstadoPresupuesto);
        updatedEstadoPresupuesto.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoPresupuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoPresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPresupuesto testEstadoPresupuesto = estadoPresupuestoList.get(estadoPresupuestoList.size() - 1);
        assertThat(testEstadoPresupuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();
        estadoPresupuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoPresupuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();
        estadoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();
        estadoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPresupuestoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoPresupuestoWithPatch() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();

        // Update the estadoPresupuesto using partial update
        EstadoPresupuesto partialUpdatedEstadoPresupuesto = new EstadoPresupuesto();
        partialUpdatedEstadoPresupuesto.setId(estadoPresupuesto.getId());

        partialUpdatedEstadoPresupuesto.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoPresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoPresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPresupuesto testEstadoPresupuesto = estadoPresupuestoList.get(estadoPresupuestoList.size() - 1);
        assertThat(testEstadoPresupuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoPresupuestoWithPatch() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();

        // Update the estadoPresupuesto using partial update
        EstadoPresupuesto partialUpdatedEstadoPresupuesto = new EstadoPresupuesto();
        partialUpdatedEstadoPresupuesto.setId(estadoPresupuesto.getId());

        partialUpdatedEstadoPresupuesto.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoPresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoPresupuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPresupuesto testEstadoPresupuesto = estadoPresupuestoList.get(estadoPresupuestoList.size() - 1);
        assertThat(testEstadoPresupuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();
        estadoPresupuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoPresupuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();
        estadoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoPresupuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPresupuestoRepository.findAll().size();
        estadoPresupuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPresupuestoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPresupuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoPresupuesto in the database
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoPresupuesto() throws Exception {
        // Initialize the database
        estadoPresupuestoRepository.saveAndFlush(estadoPresupuesto);

        int databaseSizeBeforeDelete = estadoPresupuestoRepository.findAll().size();

        // Delete the estadoPresupuesto
        restEstadoPresupuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoPresupuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoPresupuesto> estadoPresupuestoList = estadoPresupuestoRepository.findAll();
        assertThat(estadoPresupuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
