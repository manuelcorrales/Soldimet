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
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.repository.EstadoCobranzaOperacionRepository;

/**
 * Integration tests for the {@link EstadoCobranzaOperacionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoCobranzaOperacionResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-cobranza-operacions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoCobranzaOperacionMockMvc;

    private EstadoCobranzaOperacion estadoCobranzaOperacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoCobranzaOperacion createEntity(EntityManager em) {
        EstadoCobranzaOperacion estadoCobranzaOperacion = new EstadoCobranzaOperacion().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoCobranzaOperacion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoCobranzaOperacion createUpdatedEntity(EntityManager em) {
        EstadoCobranzaOperacion estadoCobranzaOperacion = new EstadoCobranzaOperacion().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoCobranzaOperacion;
    }

    @BeforeEach
    public void initTest() {
        estadoCobranzaOperacion = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeCreate = estadoCobranzaOperacionRepository.findAll().size();
        // Create the EstadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoCobranzaOperacion testEstadoCobranzaOperacion = estadoCobranzaOperacionList.get(estadoCobranzaOperacionList.size() - 1);
        assertThat(testEstadoCobranzaOperacion.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoCobranzaOperacionWithExistingId() throws Exception {
        // Create the EstadoCobranzaOperacion with an existing ID
        estadoCobranzaOperacion.setId(1L);

        int databaseSizeBeforeCreate = estadoCobranzaOperacionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoCobranzaOperacionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoCobranzaOperacionRepository.findAll().size();
        // set the field null
        estadoCobranzaOperacion.setNombreEstado(null);

        // Create the EstadoCobranzaOperacion, which fails.

        restEstadoCobranzaOperacionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoCobranzaOperacions() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        // Get all the estadoCobranzaOperacionList
        restEstadoCobranzaOperacionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoCobranzaOperacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoCobranzaOperacion() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        // Get the estadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoCobranzaOperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoCobranzaOperacion.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoCobranzaOperacion() throws Exception {
        // Get the estadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoCobranzaOperacion() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();

        // Update the estadoCobranzaOperacion
        EstadoCobranzaOperacion updatedEstadoCobranzaOperacion = estadoCobranzaOperacionRepository
            .findById(estadoCobranzaOperacion.getId())
            .get();
        // Disconnect from session so that the updates on updatedEstadoCobranzaOperacion are not directly saved in db
        em.detach(updatedEstadoCobranzaOperacion);
        updatedEstadoCobranzaOperacion.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoCobranzaOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoCobranzaOperacion))
            )
            .andExpect(status().isOk());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoCobranzaOperacion testEstadoCobranzaOperacion = estadoCobranzaOperacionList.get(estadoCobranzaOperacionList.size() - 1);
        assertThat(testEstadoCobranzaOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();
        estadoCobranzaOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoCobranzaOperacion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();
        estadoCobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();
        estadoCobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCobranzaOperacionMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoCobranzaOperacionWithPatch() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();

        // Update the estadoCobranzaOperacion using partial update
        EstadoCobranzaOperacion partialUpdatedEstadoCobranzaOperacion = new EstadoCobranzaOperacion();
        partialUpdatedEstadoCobranzaOperacion.setId(estadoCobranzaOperacion.getId());

        partialUpdatedEstadoCobranzaOperacion.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoCobranzaOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoCobranzaOperacion))
            )
            .andExpect(status().isOk());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoCobranzaOperacion testEstadoCobranzaOperacion = estadoCobranzaOperacionList.get(estadoCobranzaOperacionList.size() - 1);
        assertThat(testEstadoCobranzaOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoCobranzaOperacionWithPatch() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();

        // Update the estadoCobranzaOperacion using partial update
        EstadoCobranzaOperacion partialUpdatedEstadoCobranzaOperacion = new EstadoCobranzaOperacion();
        partialUpdatedEstadoCobranzaOperacion.setId(estadoCobranzaOperacion.getId());

        partialUpdatedEstadoCobranzaOperacion.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoCobranzaOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoCobranzaOperacion))
            )
            .andExpect(status().isOk());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
        EstadoCobranzaOperacion testEstadoCobranzaOperacion = estadoCobranzaOperacionList.get(estadoCobranzaOperacionList.size() - 1);
        assertThat(testEstadoCobranzaOperacion.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();
        estadoCobranzaOperacion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoCobranzaOperacion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();
        estadoCobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoCobranzaOperacion() throws Exception {
        int databaseSizeBeforeUpdate = estadoCobranzaOperacionRepository.findAll().size();
        estadoCobranzaOperacion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoCobranzaOperacionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoCobranzaOperacion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoCobranzaOperacion in the database
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoCobranzaOperacion() throws Exception {
        // Initialize the database
        estadoCobranzaOperacionRepository.saveAndFlush(estadoCobranzaOperacion);

        int databaseSizeBeforeDelete = estadoCobranzaOperacionRepository.findAll().size();

        // Delete the estadoCobranzaOperacion
        restEstadoCobranzaOperacionMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoCobranzaOperacion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoCobranzaOperacion> estadoCobranzaOperacionList = estadoCobranzaOperacionRepository.findAll();
        assertThat(estadoCobranzaOperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
