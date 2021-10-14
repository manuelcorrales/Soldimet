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
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.repository.EstadoCostoRepuestoRepository;

/**
 * Integration tests for the {@link EstadoCostoRepuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoCostoRepuestoResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-costo-repuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoCostoRepuestoMockMvc;

    private EstadoCostoRepuesto estadoCostoRepuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoCostoRepuesto createEntity(EntityManager em) {
        EstadoCostoRepuesto estadoCostoRepuesto = new EstadoCostoRepuesto().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoCostoRepuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoCostoRepuesto createUpdatedEntity(EntityManager em) {
        EstadoCostoRepuesto estadoCostoRepuesto = new EstadoCostoRepuesto().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoCostoRepuesto;
    }

    @BeforeEach
    public void initTest() {
        estadoCostoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = estadoCostoRepuestoRepository.findAll().size();
        // Create the EstadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoCostoRepuesto testEstadoCostoRepuesto = estadoCostoRepuestoList.get(estadoCostoRepuestoList.size() - 1);
        assertThat(testEstadoCostoRepuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoCostoRepuestoWithExistingId() throws Exception {
        // Create the EstadoCostoRepuesto with an existing ID
        estadoCostoRepuesto.setId(1L);

        int databaseSizeBeforeCreate = estadoCostoRepuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoCostoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoCostoRepuestoRepository.findAll().size();
        // set the field null
        estadoCostoRepuesto.setNombreEstado(null);

        // Create the EstadoCostoRepuesto, which fails.

        restEstadoCostoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isBadRequest());

        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoCostoRepuestos() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        // Get all the estadoCostoRepuestoList
        restEstadoCostoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoCostoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoCostoRepuesto() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        // Get the estadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoCostoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoCostoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoCostoRepuesto() throws Exception {
        // Get the estadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoCostoRepuesto() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();

        // Update the estadoCostoRepuesto
        EstadoCostoRepuesto updatedEstadoCostoRepuesto = estadoCostoRepuestoRepository.findById(estadoCostoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoCostoRepuesto are not directly saved in db
        em.detach(updatedEstadoCostoRepuesto);
        updatedEstadoCostoRepuesto.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoCostoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoCostoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoCostoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoCostoRepuesto testEstadoCostoRepuesto = estadoCostoRepuestoList.get(estadoCostoRepuestoList.size() - 1);
        assertThat(testEstadoCostoRepuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();
        estadoCostoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoCostoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoCostoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();
        estadoCostoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCostoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();
        estadoCostoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCostoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoCostoRepuestoWithPatch() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();

        // Update the estadoCostoRepuesto using partial update
        EstadoCostoRepuesto partialUpdatedEstadoCostoRepuesto = new EstadoCostoRepuesto();
        partialUpdatedEstadoCostoRepuesto.setId(estadoCostoRepuesto.getId());

        restEstadoCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoCostoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoCostoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoCostoRepuesto testEstadoCostoRepuesto = estadoCostoRepuestoList.get(estadoCostoRepuestoList.size() - 1);
        assertThat(testEstadoCostoRepuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoCostoRepuestoWithPatch() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();

        // Update the estadoCostoRepuesto using partial update
        EstadoCostoRepuesto partialUpdatedEstadoCostoRepuesto = new EstadoCostoRepuesto();
        partialUpdatedEstadoCostoRepuesto.setId(estadoCostoRepuesto.getId());

        partialUpdatedEstadoCostoRepuesto.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoCostoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoCostoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoCostoRepuesto testEstadoCostoRepuesto = estadoCostoRepuestoList.get(estadoCostoRepuestoList.size() - 1);
        assertThat(testEstadoCostoRepuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();
        estadoCostoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoCostoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();
        estadoCostoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoCostoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoCostoRepuestoRepository.findAll().size();
        estadoCostoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCostoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoCostoRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoCostoRepuesto in the database
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoCostoRepuesto() throws Exception {
        // Initialize the database
        estadoCostoRepuestoRepository.saveAndFlush(estadoCostoRepuesto);

        int databaseSizeBeforeDelete = estadoCostoRepuestoRepository.findAll().size();

        // Delete the estadoCostoRepuesto
        restEstadoCostoRepuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoCostoRepuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoCostoRepuesto> estadoCostoRepuestoList = estadoCostoRepuestoRepository.findAll();
        assertThat(estadoCostoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
