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
import soldimet.domain.EstadoArticulo;
import soldimet.repository.EstadoArticuloRepository;

/**
 * Integration tests for the {@link EstadoArticuloResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoArticuloResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-articulos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoArticuloRepository estadoArticuloRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoArticuloMockMvc;

    private EstadoArticulo estadoArticulo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoArticulo createEntity(EntityManager em) {
        EstadoArticulo estadoArticulo = new EstadoArticulo().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoArticulo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoArticulo createUpdatedEntity(EntityManager em) {
        EstadoArticulo estadoArticulo = new EstadoArticulo().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoArticulo;
    }

    @BeforeEach
    public void initTest() {
        estadoArticulo = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoArticulo() throws Exception {
        int databaseSizeBeforeCreate = estadoArticuloRepository.findAll().size();
        // Create the EstadoArticulo
        restEstadoArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoArticulo testEstadoArticulo = estadoArticuloList.get(estadoArticuloList.size() - 1);
        assertThat(testEstadoArticulo.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoArticuloWithExistingId() throws Exception {
        // Create the EstadoArticulo with an existing ID
        estadoArticulo.setId(1L);

        int databaseSizeBeforeCreate = estadoArticuloRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoArticuloRepository.findAll().size();
        // set the field null
        estadoArticulo.setNombreEstado(null);

        // Create the EstadoArticulo, which fails.

        restEstadoArticuloMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isBadRequest());

        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoArticulos() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        // Get all the estadoArticuloList
        restEstadoArticuloMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoArticulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoArticulo() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        // Get the estadoArticulo
        restEstadoArticuloMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoArticulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoArticulo.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoArticulo() throws Exception {
        // Get the estadoArticulo
        restEstadoArticuloMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoArticulo() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();

        // Update the estadoArticulo
        EstadoArticulo updatedEstadoArticulo = estadoArticuloRepository.findById(estadoArticulo.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoArticulo are not directly saved in db
        em.detach(updatedEstadoArticulo);
        updatedEstadoArticulo.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoArticulo))
            )
            .andExpect(status().isOk());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
        EstadoArticulo testEstadoArticulo = estadoArticuloList.get(estadoArticuloList.size() - 1);
        assertThat(testEstadoArticulo.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();
        estadoArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoArticulo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();
        estadoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoArticuloMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();
        estadoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoArticuloMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoArticulo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoArticuloWithPatch() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();

        // Update the estadoArticulo using partial update
        EstadoArticulo partialUpdatedEstadoArticulo = new EstadoArticulo();
        partialUpdatedEstadoArticulo.setId(estadoArticulo.getId());

        restEstadoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoArticulo))
            )
            .andExpect(status().isOk());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
        EstadoArticulo testEstadoArticulo = estadoArticuloList.get(estadoArticuloList.size() - 1);
        assertThat(testEstadoArticulo.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoArticuloWithPatch() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();

        // Update the estadoArticulo using partial update
        EstadoArticulo partialUpdatedEstadoArticulo = new EstadoArticulo();
        partialUpdatedEstadoArticulo.setId(estadoArticulo.getId());

        partialUpdatedEstadoArticulo.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoArticulo))
            )
            .andExpect(status().isOk());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
        EstadoArticulo testEstadoArticulo = estadoArticuloList.get(estadoArticuloList.size() - 1);
        assertThat(testEstadoArticulo.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();
        estadoArticulo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoArticulo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();
        estadoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoArticulo() throws Exception {
        int databaseSizeBeforeUpdate = estadoArticuloRepository.findAll().size();
        estadoArticulo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoArticuloMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(estadoArticulo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoArticulo in the database
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoArticulo() throws Exception {
        // Initialize the database
        estadoArticuloRepository.saveAndFlush(estadoArticulo);

        int databaseSizeBeforeDelete = estadoArticuloRepository.findAll().size();

        // Delete the estadoArticulo
        restEstadoArticuloMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoArticulo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoArticulo> estadoArticuloList = estadoArticuloRepository.findAll();
        assertThat(estadoArticuloList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
