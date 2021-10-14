package soldimet.service.expertos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.constant.Globales;
import soldimet.domain.Cliente;
import soldimet.domain.EstadoPersona;
import soldimet.repository.extendedRepository.ExtendedClienteRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoPersonaRepository;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
@Service
@Transactional
public class ExpertoClientes {

    private final Logger log = LoggerFactory.getLogger(ExpertoClientes.class);

    @Autowired
    private ExtendedClienteRepository clienteRepository;

    @Autowired
    private ExtendedEstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private Globales globales;

    public ExpertoClientes() {}

    public Cliente activarCliente(Cliente cliente) {
        EstadoPersona estadoPersona = estadoPersonaRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_ALTA);

        cliente.getPersona().setEstadoPersona(estadoPersona);

        return clienteRepository.save(cliente);
    }

    public Page<Cliente> buscarClientes(String filtro, Pageable paging) {
        // filtro = "%"+ filtro +"%";

        return clienteRepository.findClienteByPersonaNombreContainsOrPersonaApellidoContainsOrPersonaDireccionCalleContainsOrderByIdDesc(
            filtro,
            filtro,
            filtro,
            paging
        );
    }

    public Cliente eliminarCliente(Long clienteId) {
        EstadoPersona estadoPersona = estadoPersonaRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_BAJA);

        Cliente cliente = clienteRepository.findById(clienteId).get();

        cliente.getPersona().setEstadoPersona(estadoPersona);

        return clienteRepository.save(cliente);
    }

    public Cliente getClienteCompleto(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId).get();
        cliente.getPersona().getDireccion();
        return cliente;
    }
}
