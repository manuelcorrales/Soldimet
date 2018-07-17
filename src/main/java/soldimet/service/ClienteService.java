package soldimet.service;

import soldimet.domain.Cliente;
import soldimet.domain.EstadoPersona;
import soldimet.repository.ClienteRepository;
import soldimet.repository.EstadoPersonaRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Cliente.
 */
@Service
@Transactional
public class ClienteService {

    private final Logger log = LoggerFactory.getLogger(ClienteService.class);

    private final ClienteRepository clienteRepository;

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    /**
     * Save a cliente.
     *
     * @param cliente the entity to save
     * @return the persisted entity
     */
    public Cliente save(Cliente cliente) {
        log.debug("Request to save Cliente : {}", cliente);
        return clienteRepository.save(cliente);
    }

    /**
     *  Get all the clientes.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Cliente> findAll() {
        log.debug("Request to get all Clientes");
        return clienteRepository.findAll();
    }

    /**
     *  Get one cliente by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Cliente findOne(Long id) {
        log.debug("Request to get Cliente : {}", id);
        return clienteRepository.findOne(id);
    }

    /**
     *  Delete the  cliente by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Cliente : {}", id);
        EstadoPersona estadoBaja = estadoPersonaRepository.findByNombreEstado("Baja");
        Cliente cliente = clienteRepository.findOne(id);
        cliente.getPersona().setEstadoPersona(estadoBaja);
        clienteRepository.save(cliente);
    }
}
