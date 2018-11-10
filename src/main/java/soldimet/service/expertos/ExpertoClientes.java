package soldimet.service.expertos;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import org.joda.time.Days;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.constant.Globales;
import soldimet.domain.Caja;
import soldimet.domain.Cliente;
import soldimet.domain.EstadoPersona;
import soldimet.repository.CajaRepository;
import soldimet.repository.ClienteRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.PersonaRepository;
import soldimet.service.dto.DTOMensajeCerrarCaja;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
@Service
@Transactional
public class ExpertoClientes {


    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;;

    @Autowired
    private Globales globales;

    public ExpertoClientes() {

    }

    public Cliente activarCliente(Cliente cliente) {

        EstadoPersona estadoPersona = estadoPersonaRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_ALTA);

        cliente.getPersona().setEstadoPersona(estadoPersona);

        return clienteRepository.save(cliente);

    }

}
