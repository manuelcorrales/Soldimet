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
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;

/**
 * Integration tests for the {@link EstadoPedidoRepuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoPedidoRepuestoResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-pedido-repuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoPedidoRepuestoMockMvc;

    private EstadoPedidoRepuesto estadoPedidoRepuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoPedidoRepuesto createEntity(EntityManager em) {
        EstadoPedidoRepuesto estadoPedidoRepuesto = new EstadoPedidoRepuesto().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoPedidoRepuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoPedidoRepuesto createUpdatedEntity(EntityManager em) {
        EstadoPedidoRepuesto estadoPedidoRepuesto = new EstadoPedidoRepuesto().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoPedidoRepuesto;
    }

    @BeforeEach
    public void initTest() {
        estadoPedidoRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeCreate = estadoPedidoRepuestoRepository.findAll().size();
        // Create the EstadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoPedidoRepuesto testEstadoPedidoRepuesto = estadoPedidoRepuestoList.get(estadoPedidoRepuestoList.size() - 1);
        assertThat(testEstadoPedidoRepuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoPedidoRepuestoWithExistingId() throws Exception {
        // Create the EstadoPedidoRepuesto with an existing ID
        estadoPedidoRepuesto.setId(1L);

        int databaseSizeBeforeCreate = estadoPedidoRepuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoPedidoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoPedidoRepuestoRepository.findAll().size();
        // set the field null
        estadoPedidoRepuesto.setNombreEstado(null);

        // Create the EstadoPedidoRepuesto, which fails.

        restEstadoPedidoRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoPedidoRepuestos() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        // Get all the estadoPedidoRepuestoList
        restEstadoPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoPedidoRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoPedidoRepuesto() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        // Get the estadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoPedidoRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoPedidoRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoPedidoRepuesto() throws Exception {
        // Get the estadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoPedidoRepuesto() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();

        // Update the estadoPedidoRepuesto
        EstadoPedidoRepuesto updatedEstadoPedidoRepuesto = estadoPedidoRepuestoRepository.findById(estadoPedidoRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoPedidoRepuesto are not directly saved in db
        em.detach(updatedEstadoPedidoRepuesto);
        updatedEstadoPedidoRepuesto.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPedidoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoPedidoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoPedidoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPedidoRepuesto testEstadoPedidoRepuesto = estadoPedidoRepuestoList.get(estadoPedidoRepuestoList.size() - 1);
        assertThat(testEstadoPedidoRepuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();
        estadoPedidoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoPedidoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoPedidoRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();
        estadoPedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPedidoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();
        estadoPedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPedidoRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoPedidoRepuestoWithPatch() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();

        // Update the estadoPedidoRepuesto using partial update
        EstadoPedidoRepuesto partialUpdatedEstadoPedidoRepuesto = new EstadoPedidoRepuesto();
        partialUpdatedEstadoPedidoRepuesto.setId(estadoPedidoRepuesto.getId());

        restEstadoPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoPedidoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoPedidoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPedidoRepuesto testEstadoPedidoRepuesto = estadoPedidoRepuestoList.get(estadoPedidoRepuestoList.size() - 1);
        assertThat(testEstadoPedidoRepuesto.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoPedidoRepuestoWithPatch() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();

        // Update the estadoPedidoRepuesto using partial update
        EstadoPedidoRepuesto partialUpdatedEstadoPedidoRepuesto = new EstadoPedidoRepuesto();
        partialUpdatedEstadoPedidoRepuesto.setId(estadoPedidoRepuesto.getId());

        partialUpdatedEstadoPedidoRepuesto.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoPedidoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoPedidoRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
        EstadoPedidoRepuesto testEstadoPedidoRepuesto = estadoPedidoRepuestoList.get(estadoPedidoRepuestoList.size() - 1);
        assertThat(testEstadoPedidoRepuesto.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();
        estadoPedidoRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoPedidoRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();
        estadoPedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoPedidoRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = estadoPedidoRepuestoRepository.findAll().size();
        estadoPedidoRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoPedidoRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoPedidoRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoPedidoRepuesto in the database
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoPedidoRepuesto() throws Exception {
        // Initialize the database
        estadoPedidoRepuestoRepository.saveAndFlush(estadoPedidoRepuesto);

        int databaseSizeBeforeDelete = estadoPedidoRepuestoRepository.findAll().size();

        // Delete the estadoPedidoRepuesto
        restEstadoPedidoRepuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoPedidoRepuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoPedidoRepuesto> estadoPedidoRepuestoList = estadoPedidoRepuestoRepository.findAll();
        assertThat(estadoPedidoRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
