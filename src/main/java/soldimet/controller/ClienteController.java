package soldimet.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
        log.debug("/activarCliente: {}", cliente);

        return expertoClientes.activarCliente(cliente);

    }

    @PostMapping("/eliminarCliente")
    public Cliente eliminarCliente(@RequestBody Long clienteId) {
        log.debug("/eliminarCliente: {}", clienteId);

        return expertoClientes.eliminarCliente(clienteId);

    }

    @GetMapping("/buscarClientes")
    public Page<Cliente> buscarClientes(@RequestParam(defaultValue = "") String filtro,
            @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "200") Integer size) {
        log.debug("/buscarClientes: Request {}, {}, {}", filtro, page, size);
        Pageable paging = PageRequest.of(page, size);

        Page<Cliente> pageResp = expertoClientes.buscarClientes(filtro, paging);

        log.debug("/buscarclientes: Response {}", pageResp);

        return pageResp;
    }

}
