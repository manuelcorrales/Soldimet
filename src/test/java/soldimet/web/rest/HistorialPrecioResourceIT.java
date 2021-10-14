package soldimet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
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
import soldimet.domain.HistorialPrecio;
import soldimet.domain.PrecioRepuesto;
import soldimet.repository.HistorialPrecioRepository;

/**
 * Integration tests for the {@link HistorialPrecioResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class HistorialPrecioResourceIT {

    private static final LocalDate DEFAULT_FECHA_HISTORIAL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HISTORIAL = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/historial-precios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HistorialPrecioRepository historialPrecioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistorialPrecioMockMvc;

    private HistorialPrecio historialPrecio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistorialPrecio createEntity(EntityManager em) {
        HistorialPrecio historialPrecio = new HistorialPrecio().fechaHistorial(DEFAULT_FECHA_HISTORIAL);
        // Add required entity
        PrecioRepuesto precioRepuesto;
        if (TestUtil.findAll(em, PrecioRepuesto.class).isEmpty()) {
            precioRepuesto = PrecioRepuestoResourceIT.createEntity(em);
            em.persist(precioRepuesto);
            em.flush();
        } else {
            precioRepuesto = TestUtil.findAll(em, PrecioRepuesto.class).get(0);
        }
        historialPrecio.setPrecioRepuesto(precioRepuesto);
        return historialPrecio;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistorialPrecio createUpdatedEntity(EntityManager em) {
        HistorialPrecio historialPrecio = new HistorialPrecio().fechaHistorial(UPDATED_FECHA_HISTORIAL);
        // Add required entity
        PrecioRepuesto precioRepuesto;
        if (TestUtil.findAll(em, PrecioRepuesto.class).isEmpty()) {
            precioRepuesto = PrecioRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(precioRepuesto);
            em.flush();
        } else {
            precioRepuesto = TestUtil.findAll(em, PrecioRepuesto.class).get(0);
        }
        historialPrecio.setPrecioRepuesto(precioRepuesto);
        return historialPrecio;
    }

    @BeforeEach
    public void initTest() {
        historialPrecio = createEntity(em);
    }

    @Test
    @Transactional
    void createHistorialPrecio() throws Exception {
        int databaseSizeBeforeCreate = historialPrecioRepository.findAll().size();
        // Create the HistorialPrecio
        restHistorialPrecioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isCreated());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeCreate + 1);
        HistorialPrecio testHistorialPrecio = historialPrecioList.get(historialPrecioList.size() - 1);
        assertThat(testHistorialPrecio.getFechaHistorial()).isEqualTo(DEFAULT_FECHA_HISTORIAL);
    }

    @Test
    @Transactional
    void createHistorialPrecioWithExistingId() throws Exception {
        // Create the HistorialPrecio with an existing ID
        historialPrecio.setId(1L);

        int databaseSizeBeforeCreate = historialPrecioRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistorialPrecioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFechaHistorialIsRequired() throws Exception {
        int databaseSizeBeforeTest = historialPrecioRepository.findAll().size();
        // set the field null
        historialPrecio.setFechaHistorial(null);

        // Create the HistorialPrecio, which fails.

        restHistorialPrecioMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isBadRequest());

        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllHistorialPrecios() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        // Get all the historialPrecioList
        restHistorialPrecioMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historialPrecio.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaHistorial").value(hasItem(DEFAULT_FECHA_HISTORIAL.toString())));
    }

    @Test
    @Transactional
    void getHistorialPrecio() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        // Get the historialPrecio
        restHistorialPrecioMockMvc
            .perform(get(ENTITY_API_URL_ID, historialPrecio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historialPrecio.getId().intValue()))
            .andExpect(jsonPath("$.fechaHistorial").value(DEFAULT_FECHA_HISTORIAL.toString()));
    }

    @Test
    @Transactional
    void getNonExistingHistorialPrecio() throws Exception {
        // Get the historialPrecio
        restHistorialPrecioMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewHistorialPrecio() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();

        // Update the historialPrecio
        HistorialPrecio updatedHistorialPrecio = historialPrecioRepository.findById(historialPrecio.getId()).get();
        // Disconnect from session so that the updates on updatedHistorialPrecio are not directly saved in db
        em.detach(updatedHistorialPrecio);
        updatedHistorialPrecio.fechaHistorial(UPDATED_FECHA_HISTORIAL);

        restHistorialPrecioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHistorialPrecio.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedHistorialPrecio))
            )
            .andExpect(status().isOk());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
        HistorialPrecio testHistorialPrecio = historialPrecioList.get(historialPrecioList.size() - 1);
        assertThat(testHistorialPrecio.getFechaHistorial()).isEqualTo(UPDATED_FECHA_HISTORIAL);
    }

    @Test
    @Transactional
    void putNonExistingHistorialPrecio() throws Exception {
        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();
        historialPrecio.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistorialPrecioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, historialPrecio.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHistorialPrecio() throws Exception {
        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();
        historialPrecio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistorialPrecioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHistorialPrecio() throws Exception {
        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();
        historialPrecio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistorialPrecioMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHistorialPrecioWithPatch() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();

        // Update the historialPrecio using partial update
        HistorialPrecio partialUpdatedHistorialPrecio = new HistorialPrecio();
        partialUpdatedHistorialPrecio.setId(historialPrecio.getId());

        restHistorialPrecioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHistorialPrecio.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHistorialPrecio))
            )
            .andExpect(status().isOk());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
        HistorialPrecio testHistorialPrecio = historialPrecioList.get(historialPrecioList.size() - 1);
        assertThat(testHistorialPrecio.getFechaHistorial()).isEqualTo(DEFAULT_FECHA_HISTORIAL);
    }

    @Test
    @Transactional
    void fullUpdateHistorialPrecioWithPatch() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();

        // Update the historialPrecio using partial update
        HistorialPrecio partialUpdatedHistorialPrecio = new HistorialPrecio();
        partialUpdatedHistorialPrecio.setId(historialPrecio.getId());

        partialUpdatedHistorialPrecio.fechaHistorial(UPDATED_FECHA_HISTORIAL);

        restHistorialPrecioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHistorialPrecio.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHistorialPrecio))
            )
            .andExpect(status().isOk());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
        HistorialPrecio testHistorialPrecio = historialPrecioList.get(historialPrecioList.size() - 1);
        assertThat(testHistorialPrecio.getFechaHistorial()).isEqualTo(UPDATED_FECHA_HISTORIAL);
    }

    @Test
    @Transactional
    void patchNonExistingHistorialPrecio() throws Exception {
        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();
        historialPrecio.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistorialPrecioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, historialPrecio.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHistorialPrecio() throws Exception {
        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();
        historialPrecio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistorialPrecioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHistorialPrecio() throws Exception {
        int databaseSizeBeforeUpdate = historialPrecioRepository.findAll().size();
        historialPrecio.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistorialPrecioMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(historialPrecio))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HistorialPrecio in the database
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHistorialPrecio() throws Exception {
        // Initialize the database
        historialPrecioRepository.saveAndFlush(historialPrecio);

        int databaseSizeBeforeDelete = historialPrecioRepository.findAll().size();

        // Delete the historialPrecio
        restHistorialPrecioMockMvc
            .perform(delete(ENTITY_API_URL_ID, historialPrecio.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistorialPrecio> historialPrecioList = historialPrecioRepository.findAll();
        assertThat(historialPrecioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
