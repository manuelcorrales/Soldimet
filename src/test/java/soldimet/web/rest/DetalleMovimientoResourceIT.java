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
import soldimet.domain.DetalleMovimiento;
import soldimet.domain.TipoDetalleMovimiento;
import soldimet.repository.DetalleMovimientoRepository;

/**
 * Integration tests for the {@link DetalleMovimientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DetalleMovimientoResourceIT {

    private static final Float DEFAULT_VALOR_UNITARIO = 1F;
    private static final Float UPDATED_VALOR_UNITARIO = 2F;

    private static final Integer DEFAULT_CANTIDAD = 0;
    private static final Integer UPDATED_CANTIDAD = 1;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/detalle-movimientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DetalleMovimientoRepository detalleMovimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetalleMovimientoMockMvc;

    private DetalleMovimiento detalleMovimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleMovimiento createEntity(EntityManager em) {
        DetalleMovimiento detalleMovimiento = new DetalleMovimiento()
            .valorUnitario(DEFAULT_VALOR_UNITARIO)
            .cantidad(DEFAULT_CANTIDAD)
            .descripcion(DEFAULT_DESCRIPCION);
        // Add required entity
        TipoDetalleMovimiento tipoDetalleMovimiento;
        if (TestUtil.findAll(em, TipoDetalleMovimiento.class).isEmpty()) {
            tipoDetalleMovimiento = TipoDetalleMovimientoResourceIT.createEntity(em);
            em.persist(tipoDetalleMovimiento);
            em.flush();
        } else {
            tipoDetalleMovimiento = TestUtil.findAll(em, TipoDetalleMovimiento.class).get(0);
        }
        detalleMovimiento.setTipoDetalleMovimiento(tipoDetalleMovimiento);
        return detalleMovimiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleMovimiento createUpdatedEntity(EntityManager em) {
        DetalleMovimiento detalleMovimiento = new DetalleMovimiento()
            .valorUnitario(UPDATED_VALOR_UNITARIO)
            .cantidad(UPDATED_CANTIDAD)
            .descripcion(UPDATED_DESCRIPCION);
        // Add required entity
        TipoDetalleMovimiento tipoDetalleMovimiento;
        if (TestUtil.findAll(em, TipoDetalleMovimiento.class).isEmpty()) {
            tipoDetalleMovimiento = TipoDetalleMovimientoResourceIT.createUpdatedEntity(em);
            em.persist(tipoDetalleMovimiento);
            em.flush();
        } else {
            tipoDetalleMovimiento = TestUtil.findAll(em, TipoDetalleMovimiento.class).get(0);
        }
        detalleMovimiento.setTipoDetalleMovimiento(tipoDetalleMovimiento);
        return detalleMovimiento;
    }

    @BeforeEach
    public void initTest() {
        detalleMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    void createDetalleMovimiento() throws Exception {
        int databaseSizeBeforeCreate = detalleMovimientoRepository.findAll().size();
        // Create the DetalleMovimiento
        restDetalleMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isCreated());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
        assertThat(testDetalleMovimiento.getValorUnitario()).isEqualTo(DEFAULT_VALOR_UNITARIO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testDetalleMovimiento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    void createDetalleMovimientoWithExistingId() throws Exception {
        // Create the DetalleMovimiento with an existing ID
        detalleMovimiento.setId(1L);

        int databaseSizeBeforeCreate = detalleMovimientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCantidadIsRequired() throws Exception {
        int databaseSizeBeforeTest = detalleMovimientoRepository.findAll().size();
        // set the field null
        detalleMovimiento.setCantidad(null);

        // Create the DetalleMovimiento, which fails.

        restDetalleMovimientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDetalleMovimientos() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        // Get all the detalleMovimientoList
        restDetalleMovimientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].valorUnitario").value(hasItem(DEFAULT_VALOR_UNITARIO.doubleValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }

    @Test
    @Transactional
    void getDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        // Get the detalleMovimiento
        restDetalleMovimientoMockMvc
            .perform(get(ENTITY_API_URL_ID, detalleMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detalleMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.valorUnitario").value(DEFAULT_VALOR_UNITARIO.doubleValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    void getNonExistingDetalleMovimiento() throws Exception {
        // Get the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Update the detalleMovimiento
        DetalleMovimiento updatedDetalleMovimiento = detalleMovimientoRepository.findById(detalleMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleMovimiento are not directly saved in db
        em.detach(updatedDetalleMovimiento);
        updatedDetalleMovimiento.valorUnitario(UPDATED_VALOR_UNITARIO).cantidad(UPDATED_CANTIDAD).descripcion(UPDATED_DESCRIPCION);

        restDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDetalleMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDetalleMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
        assertThat(testDetalleMovimiento.getValorUnitario()).isEqualTo(UPDATED_VALOR_UNITARIO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testDetalleMovimiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    void putNonExistingDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();
        detalleMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, detalleMovimiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();
        detalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();
        detalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDetalleMovimientoWithPatch() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Update the detalleMovimiento using partial update
        DetalleMovimiento partialUpdatedDetalleMovimiento = new DetalleMovimiento();
        partialUpdatedDetalleMovimiento.setId(detalleMovimiento.getId());

        restDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetalleMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetalleMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
        assertThat(testDetalleMovimiento.getValorUnitario()).isEqualTo(DEFAULT_VALOR_UNITARIO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testDetalleMovimiento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    void fullUpdateDetalleMovimientoWithPatch() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Update the detalleMovimiento using partial update
        DetalleMovimiento partialUpdatedDetalleMovimiento = new DetalleMovimiento();
        partialUpdatedDetalleMovimiento.setId(detalleMovimiento.getId());

        partialUpdatedDetalleMovimiento.valorUnitario(UPDATED_VALOR_UNITARIO).cantidad(UPDATED_CANTIDAD).descripcion(UPDATED_DESCRIPCION);

        restDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetalleMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetalleMovimiento))
            )
            .andExpect(status().isOk());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
        assertThat(testDetalleMovimiento.getValorUnitario()).isEqualTo(UPDATED_VALOR_UNITARIO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testDetalleMovimiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    void patchNonExistingDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();
        detalleMovimiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, detalleMovimiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();
        detalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();
        detalleMovimiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        int databaseSizeBeforeDelete = detalleMovimientoRepository.findAll().size();

        // Delete the detalleMovimiento
        restDetalleMovimientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, detalleMovimiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
