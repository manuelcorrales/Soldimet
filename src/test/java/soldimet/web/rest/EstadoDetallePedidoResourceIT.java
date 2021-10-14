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
import soldimet.domain.EstadoDetallePedido;
import soldimet.repository.EstadoDetallePedidoRepository;

/**
 * Integration tests for the {@link EstadoDetallePedidoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EstadoDetallePedidoResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/estado-detalle-pedidos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EstadoDetallePedidoRepository estadoDetallePedidoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstadoDetallePedidoMockMvc;

    private EstadoDetallePedido estadoDetallePedido;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoDetallePedido createEntity(EntityManager em) {
        EstadoDetallePedido estadoDetallePedido = new EstadoDetallePedido().nombreEstado(DEFAULT_NOMBRE_ESTADO);
        return estadoDetallePedido;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoDetallePedido createUpdatedEntity(EntityManager em) {
        EstadoDetallePedido estadoDetallePedido = new EstadoDetallePedido().nombreEstado(UPDATED_NOMBRE_ESTADO);
        return estadoDetallePedido;
    }

    @BeforeEach
    public void initTest() {
        estadoDetallePedido = createEntity(em);
    }

    @Test
    @Transactional
    void createEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeCreate = estadoDetallePedidoRepository.findAll().size();
        // Create the EstadoDetallePedido
        restEstadoDetallePedidoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isCreated());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoDetallePedido testEstadoDetallePedido = estadoDetallePedidoList.get(estadoDetallePedidoList.size() - 1);
        assertThat(testEstadoDetallePedido.getNombreEstado()).isEqualTo(DEFAULT_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void createEstadoDetallePedidoWithExistingId() throws Exception {
        // Create the EstadoDetallePedido with an existing ID
        estadoDetallePedido.setId(1L);

        int databaseSizeBeforeCreate = estadoDetallePedidoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoDetallePedidoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estadoDetallePedidoRepository.findAll().size();
        // set the field null
        estadoDetallePedido.setNombreEstado(null);

        // Create the EstadoDetallePedido, which fails.

        restEstadoDetallePedidoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isBadRequest());

        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEstadoDetallePedidos() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        // Get all the estadoDetallePedidoList
        restEstadoDetallePedidoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoDetallePedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstado").value(hasItem(DEFAULT_NOMBRE_ESTADO)));
    }

    @Test
    @Transactional
    void getEstadoDetallePedido() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        // Get the estadoDetallePedido
        restEstadoDetallePedidoMockMvc
            .perform(get(ENTITY_API_URL_ID, estadoDetallePedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estadoDetallePedido.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstado").value(DEFAULT_NOMBRE_ESTADO));
    }

    @Test
    @Transactional
    void getNonExistingEstadoDetallePedido() throws Exception {
        // Get the estadoDetallePedido
        restEstadoDetallePedidoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewEstadoDetallePedido() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();

        // Update the estadoDetallePedido
        EstadoDetallePedido updatedEstadoDetallePedido = estadoDetallePedidoRepository.findById(estadoDetallePedido.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoDetallePedido are not directly saved in db
        em.detach(updatedEstadoDetallePedido);
        updatedEstadoDetallePedido.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoDetallePedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEstadoDetallePedido.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEstadoDetallePedido))
            )
            .andExpect(status().isOk());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
        EstadoDetallePedido testEstadoDetallePedido = estadoDetallePedidoList.get(estadoDetallePedidoList.size() - 1);
        assertThat(testEstadoDetallePedido.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void putNonExistingEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();
        estadoDetallePedido.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoDetallePedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, estadoDetallePedido.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();
        estadoDetallePedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoDetallePedidoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();
        estadoDetallePedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoDetallePedidoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEstadoDetallePedidoWithPatch() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();

        // Update the estadoDetallePedido using partial update
        EstadoDetallePedido partialUpdatedEstadoDetallePedido = new EstadoDetallePedido();
        partialUpdatedEstadoDetallePedido.setId(estadoDetallePedido.getId());

        partialUpdatedEstadoDetallePedido.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoDetallePedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoDetallePedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoDetallePedido))
            )
            .andExpect(status().isOk());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
        EstadoDetallePedido testEstadoDetallePedido = estadoDetallePedidoList.get(estadoDetallePedidoList.size() - 1);
        assertThat(testEstadoDetallePedido.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void fullUpdateEstadoDetallePedidoWithPatch() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();

        // Update the estadoDetallePedido using partial update
        EstadoDetallePedido partialUpdatedEstadoDetallePedido = new EstadoDetallePedido();
        partialUpdatedEstadoDetallePedido.setId(estadoDetallePedido.getId());

        partialUpdatedEstadoDetallePedido.nombreEstado(UPDATED_NOMBRE_ESTADO);

        restEstadoDetallePedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEstadoDetallePedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEstadoDetallePedido))
            )
            .andExpect(status().isOk());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
        EstadoDetallePedido testEstadoDetallePedido = estadoDetallePedidoList.get(estadoDetallePedidoList.size() - 1);
        assertThat(testEstadoDetallePedido.getNombreEstado()).isEqualTo(UPDATED_NOMBRE_ESTADO);
    }

    @Test
    @Transactional
    void patchNonExistingEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();
        estadoDetallePedido.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoDetallePedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, estadoDetallePedido.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();
        estadoDetallePedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoDetallePedidoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isBadRequest());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEstadoDetallePedido() throws Exception {
        int databaseSizeBeforeUpdate = estadoDetallePedidoRepository.findAll().size();
        estadoDetallePedido.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEstadoDetallePedidoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(estadoDetallePedido))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EstadoDetallePedido in the database
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEstadoDetallePedido() throws Exception {
        // Initialize the database
        estadoDetallePedidoRepository.saveAndFlush(estadoDetallePedido);

        int databaseSizeBeforeDelete = estadoDetallePedidoRepository.findAll().size();

        // Delete the estadoDetallePedido
        restEstadoDetallePedidoMockMvc
            .perform(delete(ENTITY_API_URL_ID, estadoDetallePedido.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoDetallePedido> estadoDetallePedidoList = estadoDetallePedidoRepository.findAll();
        assertThat(estadoDetallePedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
