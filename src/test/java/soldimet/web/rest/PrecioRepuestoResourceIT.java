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
import soldimet.domain.PrecioRepuesto;
import soldimet.repository.PrecioRepuestoRepository;

/**
 * Integration tests for the {@link PrecioRepuestoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PrecioRepuestoResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_PRECIO_PRIVADO = 0F;
    private static final Float UPDATED_PRECIO_PRIVADO = 1F;

    private static final Float DEFAULT_PRECIO_PUBLICO = 0F;
    private static final Float UPDATED_PRECIO_PUBLICO = 1F;

    private static final String ENTITY_API_URL = "/api/precio-repuestos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PrecioRepuestoRepository precioRepuestoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrecioRepuestoMockMvc;

    private PrecioRepuesto precioRepuesto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrecioRepuesto createEntity(EntityManager em) {
        PrecioRepuesto precioRepuesto = new PrecioRepuesto()
            .fecha(DEFAULT_FECHA)
            .precioPrivado(DEFAULT_PRECIO_PRIVADO)
            .precioPublico(DEFAULT_PRECIO_PUBLICO);
        return precioRepuesto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrecioRepuesto createUpdatedEntity(EntityManager em) {
        PrecioRepuesto precioRepuesto = new PrecioRepuesto()
            .fecha(UPDATED_FECHA)
            .precioPrivado(UPDATED_PRECIO_PRIVADO)
            .precioPublico(UPDATED_PRECIO_PUBLICO);
        return precioRepuesto;
    }

    @BeforeEach
    public void initTest() {
        precioRepuesto = createEntity(em);
    }

    @Test
    @Transactional
    void createPrecioRepuesto() throws Exception {
        int databaseSizeBeforeCreate = precioRepuestoRepository.findAll().size();
        // Create the PrecioRepuesto
        restPrecioRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isCreated());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeCreate + 1);
        PrecioRepuesto testPrecioRepuesto = precioRepuestoList.get(precioRepuestoList.size() - 1);
        assertThat(testPrecioRepuesto.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testPrecioRepuesto.getPrecioPrivado()).isEqualTo(DEFAULT_PRECIO_PRIVADO);
        assertThat(testPrecioRepuesto.getPrecioPublico()).isEqualTo(DEFAULT_PRECIO_PUBLICO);
    }

    @Test
    @Transactional
    void createPrecioRepuestoWithExistingId() throws Exception {
        // Create the PrecioRepuesto with an existing ID
        precioRepuesto.setId(1L);

        int databaseSizeBeforeCreate = precioRepuestoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrecioRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = precioRepuestoRepository.findAll().size();
        // set the field null
        precioRepuesto.setFecha(null);

        // Create the PrecioRepuesto, which fails.

        restPrecioRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isBadRequest());

        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrecioPublicoIsRequired() throws Exception {
        int databaseSizeBeforeTest = precioRepuestoRepository.findAll().size();
        // set the field null
        precioRepuesto.setPrecioPublico(null);

        // Create the PrecioRepuesto, which fails.

        restPrecioRepuestoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isBadRequest());

        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPrecioRepuestos() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        // Get all the precioRepuestoList
        restPrecioRepuestoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(precioRepuesto.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].precioPrivado").value(hasItem(DEFAULT_PRECIO_PRIVADO.doubleValue())))
            .andExpect(jsonPath("$.[*].precioPublico").value(hasItem(DEFAULT_PRECIO_PUBLICO.doubleValue())));
    }

    @Test
    @Transactional
    void getPrecioRepuesto() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        // Get the precioRepuesto
        restPrecioRepuestoMockMvc
            .perform(get(ENTITY_API_URL_ID, precioRepuesto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(precioRepuesto.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.precioPrivado").value(DEFAULT_PRECIO_PRIVADO.doubleValue()))
            .andExpect(jsonPath("$.precioPublico").value(DEFAULT_PRECIO_PUBLICO.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingPrecioRepuesto() throws Exception {
        // Get the precioRepuesto
        restPrecioRepuestoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPrecioRepuesto() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();

        // Update the precioRepuesto
        PrecioRepuesto updatedPrecioRepuesto = precioRepuestoRepository.findById(precioRepuesto.getId()).get();
        // Disconnect from session so that the updates on updatedPrecioRepuesto are not directly saved in db
        em.detach(updatedPrecioRepuesto);
        updatedPrecioRepuesto.fecha(UPDATED_FECHA).precioPrivado(UPDATED_PRECIO_PRIVADO).precioPublico(UPDATED_PRECIO_PUBLICO);

        restPrecioRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPrecioRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPrecioRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
        PrecioRepuesto testPrecioRepuesto = precioRepuestoList.get(precioRepuestoList.size() - 1);
        assertThat(testPrecioRepuesto.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testPrecioRepuesto.getPrecioPrivado()).isEqualTo(UPDATED_PRECIO_PRIVADO);
        assertThat(testPrecioRepuesto.getPrecioPublico()).isEqualTo(UPDATED_PRECIO_PUBLICO);
    }

    @Test
    @Transactional
    void putNonExistingPrecioRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();
        precioRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrecioRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, precioRepuesto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPrecioRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();
        precioRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrecioRepuestoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPrecioRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();
        precioRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrecioRepuestoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(precioRepuesto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePrecioRepuestoWithPatch() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();

        // Update the precioRepuesto using partial update
        PrecioRepuesto partialUpdatedPrecioRepuesto = new PrecioRepuesto();
        partialUpdatedPrecioRepuesto.setId(precioRepuesto.getId());

        partialUpdatedPrecioRepuesto.precioPrivado(UPDATED_PRECIO_PRIVADO);

        restPrecioRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrecioRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrecioRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
        PrecioRepuesto testPrecioRepuesto = precioRepuestoList.get(precioRepuestoList.size() - 1);
        assertThat(testPrecioRepuesto.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testPrecioRepuesto.getPrecioPrivado()).isEqualTo(UPDATED_PRECIO_PRIVADO);
        assertThat(testPrecioRepuesto.getPrecioPublico()).isEqualTo(DEFAULT_PRECIO_PUBLICO);
    }

    @Test
    @Transactional
    void fullUpdatePrecioRepuestoWithPatch() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();

        // Update the precioRepuesto using partial update
        PrecioRepuesto partialUpdatedPrecioRepuesto = new PrecioRepuesto();
        partialUpdatedPrecioRepuesto.setId(precioRepuesto.getId());

        partialUpdatedPrecioRepuesto.fecha(UPDATED_FECHA).precioPrivado(UPDATED_PRECIO_PRIVADO).precioPublico(UPDATED_PRECIO_PUBLICO);

        restPrecioRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPrecioRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPrecioRepuesto))
            )
            .andExpect(status().isOk());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
        PrecioRepuesto testPrecioRepuesto = precioRepuestoList.get(precioRepuestoList.size() - 1);
        assertThat(testPrecioRepuesto.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testPrecioRepuesto.getPrecioPrivado()).isEqualTo(UPDATED_PRECIO_PRIVADO);
        assertThat(testPrecioRepuesto.getPrecioPublico()).isEqualTo(UPDATED_PRECIO_PUBLICO);
    }

    @Test
    @Transactional
    void patchNonExistingPrecioRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();
        precioRepuesto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrecioRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, precioRepuesto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPrecioRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();
        precioRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrecioRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isBadRequest());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPrecioRepuesto() throws Exception {
        int databaseSizeBeforeUpdate = precioRepuestoRepository.findAll().size();
        precioRepuesto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPrecioRepuestoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(precioRepuesto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PrecioRepuesto in the database
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePrecioRepuesto() throws Exception {
        // Initialize the database
        precioRepuestoRepository.saveAndFlush(precioRepuesto);

        int databaseSizeBeforeDelete = precioRepuestoRepository.findAll().size();

        // Delete the precioRepuesto
        restPrecioRepuestoMockMvc
            .perform(delete(ENTITY_API_URL_ID, precioRepuesto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrecioRepuesto> precioRepuestoList = precioRepuestoRepository.findAll();
        assertThat(precioRepuestoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
