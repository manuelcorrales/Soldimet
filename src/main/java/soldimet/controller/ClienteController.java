package soldimet.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.Cliente;
import soldimet.service.expertos.ExpertoClientes;

@RestController
@RequestMapping("/api/cliente")
public class ClienteController {

    private final Logger log = LoggerFactory.getLogger(ClienteController.class);

    private static final String ENTITY_NAME = "Cliente";

    @Autowired
    private ExpertoClientes expertoClientes;

    @PostMapping("/activarCliente")
    public Cliente activarCliente(@RequestBody Cliente cliente) {

        return expertoClientes.activarCliente(cliente);

    }

}
