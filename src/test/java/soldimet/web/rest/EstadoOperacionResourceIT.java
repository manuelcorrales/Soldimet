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
import soldimet.domain.EstadoOperacion;
import soldimet.repository.EstadoOperacionRepository;

/**
 * Integration tests for the {@link EstadoOperacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoOperacionResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-operacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoOperacionRepository estadoOperacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoOperacionMockMvc;

    private EstadoOperacion estadoOperacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoOperacion createEntity(EntityManager em) {
        EstadoOperacion estadoOperacion = new EstadoOperacion().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoOperacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoOperacion createUpdatedEntity(EntityManager em) {
        EstadoOperacion estadoOperacion = new EstadoOperacion().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoOperacion;
    }

    @BeforeEach
    public void initTest() {
        estadoOperacion = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoOperacion() throws Exception {
        int databaseSizeBeforeCreate = estadoOperacionRepository.findAll().size();
        // Create the EstadoOperacion
        restEstadoOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoOperacion testEstadoOperacion = estadoOperacionList.get(estadoOperacionList.size() - 1);
        assertThat(testEstadoOperacion.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoOperacionWithExistingId() throws Exception {
        // Create the EstadoOperacion with an existing ID
        estadoOperacion.setId(1L);

        int databaseSizeBeforeCreate = estadoOperacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoOperacionRepository.findAll().size();
        // set the field null
        estadoOperacion.setNombreEstado(null);

        // Create the EstadoOperacion, which fails.

        restEstadoOperacionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isBadRequest());

        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoOperacions() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        // Get all the estadoOperacionList
        restEstadoOperacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoOperacion() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        // Get the estadoOperacion
        restEstadoOperacionMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoOperacion.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoOperacion() throws Exception {
        // Get the estadoOperacion
        restEstadoOperacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoOperacion() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();

        // Update the estadoOperacion
        EstadoOperacion updatedEstadoOperacion = estadoOperacionRepository.findById(estadoOperacion.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoOperacion are not directly saved in db
        em.detach(updatedEstadoOperacion);
        updatedEstadoOperacion.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoOperacion))
            )
            .andExpect(status().isOk());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoOperacion testEstadoOperacion = estadoOperacionList.get(estadoOperacionList.size() - 1);
        assertThat(testEstadoOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();
        estadoOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();
        estadoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();
        estadoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoOperacionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoOperacionWithPatch() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();

        // Update the estadoOperacion using partial update
        EstadoOperacion partialUpdatedEstadoOperacion = new EstadoOperacion();
        partialUpdatedEstadoOperacion.setId(estadoOperacion.getId());

        partialUpdatedEstadoOperacion.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoOperacion))
            )
            .andExpect(status().isOk());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoOperacion testEstadoOperacion = estadoOperacionList.get(estadoOperacionList.size() - 1);
        assertThat(testEstadoOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoOperacionWithPatch() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();

        // Update the estadoOperacion using partial update
        EstadoOperacion partialUpdatedEstadoOperacion = new EstadoOperacion();
        partialUpdatedEstadoOperacion.setId(estadoOperacion.getId());

        partialUpdatedEstadoOperacion.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoOperacion))
            )
            .andExpect(status().isOk());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoOperacion testEstadoOperacion = estadoOperacionList.get(estadoOperacionList.size() - 1);
        assertThat(testEstadoOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();
        estadoOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();
        estadoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoOperacionRepository.findAll().size();
        estadoOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoOperacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoOperacion in the database
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoOperacion() throws Exception {
        // Initialize the database
        estadoOperacionRepository.saveAndFlush(estadoOperacion);

        int databaseSizeBeforeDelete = estadoOperacionRepository.findAll().size();

        // Delete the estadoOperacion
        restEstadoOperacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoOperacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoOperacion> estadoOperacionList = estadoOperacionRepository.findAll();
        assertThat(estadoOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
