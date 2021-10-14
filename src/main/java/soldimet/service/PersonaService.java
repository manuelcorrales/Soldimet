package soldimet.service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.domain.Persona;
import soldimet.repository.PersonaRepository;

/**
 * Service Implementation for managing {@link Persona}.
 */
@Service
@Transactional
public class PersonaService {

    private final Logger log = LoggerFactory.getLogger(PersonaService.class);

    private final PersonaRepository personaRepository;

    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * Save a persona.
     *
     * @param persona the entity to save.
     * @return the persisted entity.
     */
    public Persona save(Persona persona) {
        log.debug("Request to save Persona : {}", persona);
        return personaRepository.save(persona);
    }

    /**
     * Partially update a persona.
     *
     * @param persona the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Persona> partialUpdate(Persona persona) {
        log.debug("Request to partially update Persona : {}", persona);

        return personaRepository
            .findById(persona.getId())
            .map(
                existingPersona -> {
                    if (persona.getNumeroTelefono() != null) {
                        existingPersona.setNumeroTelefono(persona.getNumeroTelefono());
                    }
                    if (persona.getNombre() != null) {
                        existingPersona.setNombre(persona.getNombre());
                    }
                    if (persona.getApellido() != null) {
                        existingPersona.setApellido(persona.getApellido());
                    }

                    return existingPersona;
                }
            )
            .map(personaRepository::save);
    }

    /**
     * Get all the personas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Persona> findAll(Pageable pageable) {
        log.debug("Request to get all Personas");
        return personaRepository.findAll(pageable);
    }

    /**
     * Get one persona by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Persona> findOne(Long id) {
        log.debug("Request to get Persona : {}", id);
        return personaRepository.findById(id);
    }

    /**
     * Delete the persona by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Persona : {}", id);
        personaRepository.deleteById(id);
    }
}
