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
import soldimet.domain.Direccion;
import soldimet.domain.EstadoPersona;
import soldimet.domain.Persona;
import soldimet.domain.User;
import soldimet.repository.PersonaRepository;
import soldimet.service.criteria.PersonaCriteria;

/**
 * Integration tests for the {@link PersonaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PersonaResourceIT {

    private static final String DEFAULT_NUMERO_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/personas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonaMockMvc;

    private Persona persona;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Persona createEntity(EntityManager em) {
        Persona persona = new Persona().numeroTelefono(DEFAULT_NUMERO_TELEFONO).nombre(DEFAULT_NOMBRE).apellido(DEFAULT_APELLIDO);
        return persona;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Persona createUpdatedEntity(EntityManager em) {
        Persona persona = new Persona().numeroTelefono(UPDATED_NUMERO_TELEFONO).nombre(UPDATED_NOMBRE).apellido(UPDATED_APELLIDO);
        return persona;
    }

    @BeforeEach
    public void initTest() {
        persona = createEntity(em);
    }

    @Test
    @Transactional
    void createPersona() throws Exception {
        int databaseSizeBeforeCreate = personaRepository.findAll().size();
        // Create the Persona
        restPersonaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isCreated());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate + 1);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNumeroTelefono()).isEqualTo(DEFAULT_NUMERO_TELEFONO);
        assertThat(testPersona.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(DEFAULT_APELLIDO);
    }

    @Test
    @Transactional
    void createPersonaWithExistingId() throws Exception {
        // Create the Persona with an existing ID
        persona.setId(1L);

        int databaseSizeBeforeCreate = personaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setNombre(null);

        // Create the Persona, which fails.

        restPersonaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPersonas() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList
        restPersonaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persona.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroTelefono").value(hasItem(DEFAULT_NUMERO_TELEFONO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO)));
    }

    @Test
    @Transactional
    void getPersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get the persona
        restPersonaMockMvc
            .perform(get(ENTITY_API_URL_ID, persona.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(persona.getId().intValue()))
            .andExpect(jsonPath("$.numeroTelefono").value(DEFAULT_NUMERO_TELEFONO))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.apellido").value(DEFAULT_APELLIDO));
    }

    @Test
    @Transactional
    void getPersonasByIdFiltering() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        Long id = persona.getId();

        defaultPersonaShouldBeFound("id.equals=" + id);
        defaultPersonaShouldNotBeFound("id.notEquals=" + id);

        defaultPersonaShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultPersonaShouldNotBeFound("id.greaterThan=" + id);

        defaultPersonaShouldBeFound("id.lessThanOrEqual=" + id);
        defaultPersonaShouldNotBeFound("id.lessThan=" + id);
    }

    @Test
    @Transactional
    void getAllPersonasByNumeroTelefonoIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where numeroTelefono equals to DEFAULT_NUMERO_TELEFONO
        defaultPersonaShouldBeFound("numeroTelefono.equals=" + DEFAULT_NUMERO_TELEFONO);

        // Get all the personaList where numeroTelefono equals to UPDATED_NUMERO_TELEFONO
        defaultPersonaShouldNotBeFound("numeroTelefono.equals=" + UPDATED_NUMERO_TELEFONO);
    }

    @Test
    @Transactional
    void getAllPersonasByNumeroTelefonoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where numeroTelefono not equals to DEFAULT_NUMERO_TELEFONO
        defaultPersonaShouldNotBeFound("numeroTelefono.notEquals=" + DEFAULT_NUMERO_TELEFONO);

        // Get all the personaList where numeroTelefono not equals to UPDATED_NUMERO_TELEFONO
        defaultPersonaShouldBeFound("numeroTelefono.notEquals=" + UPDATED_NUMERO_TELEFONO);
    }

    @Test
    @Transactional
    void getAllPersonasByNumeroTelefonoIsInShouldWork() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where numeroTelefono in DEFAULT_NUMERO_TELEFONO or UPDATED_NUMERO_TELEFONO
        defaultPersonaShouldBeFound("numeroTelefono.in=" + DEFAULT_NUMERO_TELEFONO + "," + UPDATED_NUMERO_TELEFONO);

        // Get all the personaList where numeroTelefono equals to UPDATED_NUMERO_TELEFONO
        defaultPersonaShouldNotBeFound("numeroTelefono.in=" + UPDATED_NUMERO_TELEFONO);
    }

    @Test
    @Transactional
    void getAllPersonasByNumeroTelefonoIsNullOrNotNull() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where numeroTelefono is not null
        defaultPersonaShouldBeFound("numeroTelefono.specified=true");

        // Get all the personaList where numeroTelefono is null
        defaultPersonaShouldNotBeFound("numeroTelefono.specified=false");
    }

    @Test
    @Transactional
    void getAllPersonasByNumeroTelefonoContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where numeroTelefono contains DEFAULT_NUMERO_TELEFONO
        defaultPersonaShouldBeFound("numeroTelefono.contains=" + DEFAULT_NUMERO_TELEFONO);

        // Get all the personaList where numeroTelefono contains UPDATED_NUMERO_TELEFONO
        defaultPersonaShouldNotBeFound("numeroTelefono.contains=" + UPDATED_NUMERO_TELEFONO);
    }

    @Test
    @Transactional
    void getAllPersonasByNumeroTelefonoNotContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where numeroTelefono does not contain DEFAULT_NUMERO_TELEFONO
        defaultPersonaShouldNotBeFound("numeroTelefono.doesNotContain=" + DEFAULT_NUMERO_TELEFONO);

        // Get all the personaList where numeroTelefono does not contain UPDATED_NUMERO_TELEFONO
        defaultPersonaShouldBeFound("numeroTelefono.doesNotContain=" + UPDATED_NUMERO_TELEFONO);
    }

    @Test
    @Transactional
    void getAllPersonasByNombreIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre equals to DEFAULT_NOMBRE
        defaultPersonaShouldBeFound("nombre.equals=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre equals to UPDATED_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.equals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void getAllPersonasByNombreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre not equals to DEFAULT_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.notEquals=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre not equals to UPDATED_NOMBRE
        defaultPersonaShouldBeFound("nombre.notEquals=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void getAllPersonasByNombreIsInShouldWork() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre in DEFAULT_NOMBRE or UPDATED_NOMBRE
        defaultPersonaShouldBeFound("nombre.in=" + DEFAULT_NOMBRE + "," + UPDATED_NOMBRE);

        // Get all the personaList where nombre equals to UPDATED_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.in=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void getAllPersonasByNombreIsNullOrNotNull() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre is not null
        defaultPersonaShouldBeFound("nombre.specified=true");

        // Get all the personaList where nombre is null
        defaultPersonaShouldNotBeFound("nombre.specified=false");
    }

    @Test
    @Transactional
    void getAllPersonasByNombreContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre contains DEFAULT_NOMBRE
        defaultPersonaShouldBeFound("nombre.contains=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre contains UPDATED_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.contains=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void getAllPersonasByNombreNotContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where nombre does not contain DEFAULT_NOMBRE
        defaultPersonaShouldNotBeFound("nombre.doesNotContain=" + DEFAULT_NOMBRE);

        // Get all the personaList where nombre does not contain UPDATED_NOMBRE
        defaultPersonaShouldBeFound("nombre.doesNotContain=" + UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    void getAllPersonasByApellidoIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido equals to DEFAULT_APELLIDO
        defaultPersonaShouldBeFound("apellido.equals=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido equals to UPDATED_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.equals=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void getAllPersonasByApellidoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido not equals to DEFAULT_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.notEquals=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido not equals to UPDATED_APELLIDO
        defaultPersonaShouldBeFound("apellido.notEquals=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void getAllPersonasByApellidoIsInShouldWork() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido in DEFAULT_APELLIDO or UPDATED_APELLIDO
        defaultPersonaShouldBeFound("apellido.in=" + DEFAULT_APELLIDO + "," + UPDATED_APELLIDO);

        // Get all the personaList where apellido equals to UPDATED_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.in=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void getAllPersonasByApellidoIsNullOrNotNull() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido is not null
        defaultPersonaShouldBeFound("apellido.specified=true");

        // Get all the personaList where apellido is null
        defaultPersonaShouldNotBeFound("apellido.specified=false");
    }

    @Test
    @Transactional
    void getAllPersonasByApellidoContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido contains DEFAULT_APELLIDO
        defaultPersonaShouldBeFound("apellido.contains=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido contains UPDATED_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.contains=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void getAllPersonasByApellidoNotContainsSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList where apellido does not contain DEFAULT_APELLIDO
        defaultPersonaShouldNotBeFound("apellido.doesNotContain=" + DEFAULT_APELLIDO);

        // Get all the personaList where apellido does not contain UPDATED_APELLIDO
        defaultPersonaShouldBeFound("apellido.doesNotContain=" + UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void getAllPersonasByDireccionIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);
        Direccion direccion = DireccionResourceIT.createEntity(em);
        em.persist(direccion);
        em.flush();
        persona.setDireccion(direccion);
        personaRepository.saveAndFlush(persona);
        Long direccionId = direccion.getId();

        // Get all the personaList where direccion equals to direccionId
        defaultPersonaShouldBeFound("direccionId.equals=" + direccionId);

        // Get all the personaList where direccion equals to (direccionId + 1)
        defaultPersonaShouldNotBeFound("direccionId.equals=" + (direccionId + 1));
    }

    @Test
    @Transactional
    void getAllPersonasByEstadoPersonaIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);
        EstadoPersona estadoPersona = EstadoPersonaResourceIT.createEntity(em);
        em.persist(estadoPersona);
        em.flush();
        persona.setEstadoPersona(estadoPersona);
        personaRepository.saveAndFlush(persona);
        Long estadoPersonaId = estadoPersona.getId();

        // Get all the personaList where estadoPersona equals to estadoPersonaId
        defaultPersonaShouldBeFound("estadoPersonaId.equals=" + estadoPersonaId);

        // Get all the personaList where estadoPersona equals to (estadoPersonaId + 1)
        defaultPersonaShouldNotBeFound("estadoPersonaId.equals=" + (estadoPersonaId + 1));
    }

    @Test
    @Transactional
    void getAllPersonasByUserIsEqualToSomething() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        persona.setUser(user);
        personaRepository.saveAndFlush(persona);
        Long userId = user.getId();

        // Get all the personaList where user equals to userId
        defaultPersonaShouldBeFound("userId.equals=" + userId);

        // Get all the personaList where user equals to (userId + 1)
        defaultPersonaShouldNotBeFound("userId.equals=" + (userId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultPersonaShouldBeFound(String filter) throws Exception {
        restPersonaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persona.getId().intValue())))
            .andExpect(jsonPath("$.[*].numeroTelefono").value(hasItem(DEFAULT_NUMERO_TELEFONO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO)));

        // Check, that the count call also returns 1
        restPersonaMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultPersonaShouldNotBeFound(String filter) throws Exception {
        restPersonaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restPersonaMockMvc
            .perform(get(ENTITY_API_URL + "/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    void getNonExistingPersona() throws Exception {
        // Get the persona
        restPersonaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Update the persona
        Persona updatedPersona = personaRepository.findById(persona.getId()).get();
        // Disconnect from session so that the updates on updatedPersona are not directly saved in db
        em.detach(updatedPersona);
        updatedPersona.numeroTelefono(UPDATED_NUMERO_TELEFONO).nombre(UPDATED_NOMBRE).apellido(UPDATED_APELLIDO);

        restPersonaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPersona.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPersona))
            )
            .andExpect(status().isOk());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNumeroTelefono()).isEqualTo(UPDATED_NUMERO_TELEFONO);
        assertThat(testPersona.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void putNonExistingPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();
        persona.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, persona.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(persona))
            )
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();
        persona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(persona))
            )
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();
        persona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePersonaWithPatch() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Update the persona using partial update
        Persona partialUpdatedPersona = new Persona();
        partialUpdatedPersona.setId(persona.getId());

        partialUpdatedPersona.apellido(UPDATED_APELLIDO);

        restPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersona.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersona))
            )
            .andExpect(status().isOk());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNumeroTelefono()).isEqualTo(DEFAULT_NUMERO_TELEFONO);
        assertThat(testPersona.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void fullUpdatePersonaWithPatch() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Update the persona using partial update
        Persona partialUpdatedPersona = new Persona();
        partialUpdatedPersona.setId(persona.getId());

        partialUpdatedPersona.numeroTelefono(UPDATED_NUMERO_TELEFONO).nombre(UPDATED_NOMBRE).apellido(UPDATED_APELLIDO);

        restPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersona.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersona))
            )
            .andExpect(status().isOk());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNumeroTelefono()).isEqualTo(UPDATED_NUMERO_TELEFONO);
        assertThat(testPersona.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPersona.getApellido()).isEqualTo(UPDATED_APELLIDO);
    }

    @Test
    @Transactional
    void patchNonExistingPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();
        persona.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, persona.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(persona))
            )
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();
        persona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(persona))
            )
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();
        persona.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        int databaseSizeBeforeDelete = personaRepository.findAll().size();

        // Delete the persona
        restPersonaMockMvc
            .perform(delete(ENTITY_API_URL_ID, persona.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
