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
import soldimet.domain.EstadoPersona;
import soldimet.repository.EstadoPersonaRepository;

/**
 * Integration tests for the {@link EstadoPersonaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoPersonaResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-personas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoPersonaMockMvc;

    private EstadoPersona estadoPersona;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoPersona createEntity(EntityManager em) {
        EstadoPersona estadoPersona = new EstadoPersona().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoPersona;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoPersona createUpdatedEntity(EntityManager em) {
        EstadoPersona estadoPersona = new EstadoPersona().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoPersona;
    }

    @BeforeEach
    public void initTest() {
        estadoPersona = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoPersona() throws Exception {
        int databaseSizeBeforeCreate = estadoPersonaRepository.findAll().size();
        // Create the EstadoPersona
        restEstadoPersonaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isCreated());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoPersona testEstadoPersona = estadoPersonaList.get(estadoPersonaList.size() - 1);
        assertThat(testEstadoPersona.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoPersonaWithExistingId() throws Exception {
        // Create the EstadoPersona with an existing ID
        estadoPersona.setId(1L);

        int databaseSizeBeforeCreate = estadoPersonaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoPersonaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoPersonaRepository.findAll().size();
        // set the field null
        estadoPersona.setNombreEstado(null);

        // Create the EstadoPersona, which fails.

        restEstadoPersonaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isBadRequest());

        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoPersonas() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        // Get all the estadoPersonaList
        restEstadoPersonaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoPersona.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoPersona() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        // Get the estadoPersona
        restEstadoPersonaMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoPersona.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoPersona.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoPersona() throws Exception {
        // Get the estadoPersona
        restEstadoPersonaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoPersona() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();

        // Update the estadoPersona
        EstadoPersona updatedEstadoPersona = estadoPersonaRepository.findById(estadoPersona.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoPersona are not directly saved in db
        em.detach(updatedEstadoPersona);
        updatedEstadoPersona.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPersonaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoPersona.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoPersona))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
        EstadoPersona testEstadoPersona = estadoPersonaList.get(estadoPersonaList.size() - 1);
        assertThat(testEstadoPersona.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoPersona() throws Exception {
        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();
        estadoPersona.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoPersonaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoPersona.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPersona))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoPersona() throws Exception {
        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();
        estadoPersona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPersonaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPersona))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoPersona() throws Exception {
        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();
        estadoPersona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPersonaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPersona)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoPersonaWithPatch() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();

        // Update the estadoPersona using partial update
        EstadoPersona partialUpdatedEstadoPersona = new EstadoPersona();
        partialUpdatedEstadoPersona.setId(estadoPersona.getId());

        partialUpdatedEstadoPersona.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoPersona.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoPersona))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
        EstadoPersona testEstadoPersona = estadoPersonaList.get(estadoPersonaList.size() - 1);
        assertThat(testEstadoPersona.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoPersonaWithPatch() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();

        // Update the estadoPersona using partial update
        EstadoPersona partialUpdatedEstadoPersona = new EstadoPersona();
        partialUpdatedEstadoPersona.setId(estadoPersona.getId());

        partialUpdatedEstadoPersona.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoPersona.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoPersona))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
        EstadoPersona testEstadoPersona = estadoPersonaList.get(estadoPersonaList.size() - 1);
        assertThat(testEstadoPersona.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoPersona() throws Exception {
        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();
        estadoPersona.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoPersona.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPersona))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoPersona() throws Exception {
        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();
        estadoPersona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPersona))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoPersona() throws Exception {
        int databaseSizeBeforeUpdate = estadoPersonaRepository.findAll().size();
        estadoPersona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(estadoPersona))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoPersona in the database
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoPersona() throws Exception {
        // Initialize the database
        estadoPersonaRepository.saveAndFlush(estadoPersona);

        int databaseSizeBeforeDelete = estadoPersonaRepository.findAll().size();

        // Delete the estadoPersona
        restEstadoPersonaMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoPersona.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoPersona> estadoPersonaList = estadoPersonaRepository.findAll();
        assertThat(estadoPersonaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
