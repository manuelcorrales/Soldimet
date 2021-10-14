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
import soldimet.domain.Aplicacion;
import soldimet.domain.Cilindrada;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.CostoRepuestoProveedorRepository;

/**
 * Integration tests for the {@link CostoRepuestoProveedorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CostoRepuestoProveedorResourceIT {

    private static final String ENTITY_API_URL = "/api/costo-repuesto-proveedors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CostoRepuestoProveedorRepository costoRepuestoProveedorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCostoRepuestoProveedorMockMvc;

    private CostoRepuestoProveedor costoRepuestoProveedor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoRepuestoProveedor createEntity(EntityManager em) {
        CostoRepuestoProveedor costoRepuestoProveedor = new CostoRepuestoProveedor();
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        costoRepuestoProveedor.setTipoRepuesto(tipoRepuesto);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        costoRepuestoProveedor.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoRepuestoProveedor.setCilindrada(cilindrada);
        return costoRepuestoProveedor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CostoRepuestoProveedor createUpdatedEntity(EntityManager em) {
        CostoRepuestoProveedor costoRepuestoProveedor = new CostoRepuestoProveedor();
        // Add required entity
        TipoRepuesto tipoRepuesto;
        if (TestUtil.findAll(em, TipoRepuesto.class).isEmpty()) {
            tipoRepuesto = TipoRepuestoResourceIT.createUpdatedEntity(em);
            em.persist(tipoRepuesto);
            em.flush();
        } else {
            tipoRepuesto = TestUtil.findAll(em, TipoRepuesto.class).get(0);
        }
        costoRepuestoProveedor.setTipoRepuesto(tipoRepuesto);
        // Add required entity
        Aplicacion aplicacion;
        if (TestUtil.findAll(em, Aplicacion.class).isEmpty()) {
            aplicacion = AplicacionResourceIT.createUpdatedEntity(em);
            em.persist(aplicacion);
            em.flush();
        } else {
            aplicacion = TestUtil.findAll(em, Aplicacion.class).get(0);
        }
        costoRepuestoProveedor.setAplicacion(aplicacion);
        // Add required entity
        Cilindrada cilindrada;
        if (TestUtil.findAll(em, Cilindrada.class).isEmpty()) {
            cilindrada = CilindradaResourceIT.createUpdatedEntity(em);
            em.persist(cilindrada);
            em.flush();
        } else {
            cilindrada = TestUtil.findAll(em, Cilindrada.class).get(0);
        }
        costoRepuestoProveedor.setCilindrada(cilindrada);
        return costoRepuestoProveedor;
    }

    @BeforeEach
    public void initTest() {
        costoRepuestoProveedor = createEntity(em);
    }

    @Test
    @Transactional
    void createCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeCreate = costoRepuestoProveedorRepository.findAll().size();
        // Create the CostoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isCreated());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeCreate + 1);
        CostoRepuestoProveedor testCostoRepuestoProveedor = costoRepuestoProveedorList.get(costoRepuestoProveedorList.size() - 1);
    }

    @Test
    @Transactional
    void createCostoRepuestoProveedorWithExistingId() throws Exception {
        // Create the CostoRepuestoProveedor with an existing ID
        costoRepuestoProveedor.setId(1L);

        int databaseSizeBeforeCreate = costoRepuestoProveedorRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostoRepuestoProveedorMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCostoRepuestoProveedors() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        // Get all the costoRepuestoProveedorList
        restCostoRepuestoProveedorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(costoRepuestoProveedor.getId().intValue())));
    }

    @Test
    @Transactional
    void getCostoRepuestoProveedor() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        // Get the costoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc
            .perform(get(ENTITY_API_URL_ID, costoRepuestoProveedor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(costoRepuestoProveedor.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingCostoRepuestoProveedor() throws Exception {
        // Get the costoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCostoRepuestoProveedor() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();

        // Update the costoRepuestoProveedor
        CostoRepuestoProveedor updatedCostoRepuestoProveedor = costoRepuestoProveedorRepository
            .findById(costoRepuestoProveedor.getId())
            .get();
        // Disconnect from session so that the updates on updatedCostoRepuestoProveedor are not directly saved in db
        em.detach(updatedCostoRepuestoProveedor);

        restCostoRepuestoProveedorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCostoRepuestoProveedor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCostoRepuestoProveedor))
            )
            .andExpect(status().isOk());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuestoProveedor testCostoRepuestoProveedor = costoRepuestoProveedorList.get(costoRepuestoProveedorList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();
        costoRepuestoProveedor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoRepuestoProveedorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, costoRepuestoProveedor.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();
        costoRepuestoProveedor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoProveedorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();
        costoRepuestoProveedor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoProveedorMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCostoRepuestoProveedorWithPatch() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();

        // Update the costoRepuestoProveedor using partial update
        CostoRepuestoProveedor partialUpdatedCostoRepuestoProveedor = new CostoRepuestoProveedor();
        partialUpdatedCostoRepuestoProveedor.setId(costoRepuestoProveedor.getId());

        restCostoRepuestoProveedorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCostoRepuestoProveedor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCostoRepuestoProveedor))
            )
            .andExpect(status().isOk());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuestoProveedor testCostoRepuestoProveedor = costoRepuestoProveedorList.get(costoRepuestoProveedorList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateCostoRepuestoProveedorWithPatch() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();

        // Update the costoRepuestoProveedor using partial update
        CostoRepuestoProveedor partialUpdatedCostoRepuestoProveedor = new CostoRepuestoProveedor();
        partialUpdatedCostoRepuestoProveedor.setId(costoRepuestoProveedor.getId());

        restCostoRepuestoProveedorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCostoRepuestoProveedor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCostoRepuestoProveedor))
            )
            .andExpect(status().isOk());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
        CostoRepuestoProveedor testCostoRepuestoProveedor = costoRepuestoProveedorList.get(costoRepuestoProveedorList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();
        costoRepuestoProveedor.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCostoRepuestoProveedorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, costoRepuestoProveedor.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();
        costoRepuestoProveedor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoProveedorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isBadRequest());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCostoRepuestoProveedor() throws Exception {
        int databaseSizeBeforeUpdate = costoRepuestoProveedorRepository.findAll().size();
        costoRepuestoProveedor.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCostoRepuestoProveedorMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(costoRepuestoProveedor))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CostoRepuestoProveedor in the database
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCostoRepuestoProveedor() throws Exception {
        // Initialize the database
        costoRepuestoProveedorRepository.saveAndFlush(costoRepuestoProveedor);

        int databaseSizeBeforeDelete = costoRepuestoProveedorRepository.findAll().size();

        // Delete the costoRepuestoProveedor
        restCostoRepuestoProveedorMockMvc
            .perform(delete(ENTITY_API_URL_ID, costoRepuestoProveedor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CostoRepuestoProveedor> costoRepuestoProveedorList = costoRepuestoProveedorRepository.findAll();
        assertThat(costoRepuestoProveedorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
