package soldimet.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Proveedor;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.expertos.ExpertoPedidos;

import com.codahale.metrics.annotation.Timed;

@RestController
@RequestMapping("/api/pedidos")
@Transactional
@Timed
public class PedidosController {

    private final Logger log = LoggerFactory.getLogger(PedidosController.class);

    private static final String ENTITY_NAME = "PedidoRepuesto";

    @Autowired
    private ExpertoPedidos expertoPedidos;

    @GetMapping("/getPedidosPendientes")
    public ResponseEntity<List<PedidoRepuesto>> getPedidosPendientes() {

        List<PedidoRepuesto> pedidos = expertoPedidos.getPedidosPendientes();

        if (pedidos != null) {

            return new ResponseEntity<List<PedidoRepuesto>>(pedidos, HttpStatus.OK);

        } else {
            return ResponseEntity.status(500).body(null);
        }

    }


    @GetMapping("/proveedoresRepuestos")
    public ResponseEntity<List<Proveedor>> getProveedoresRepuestos() {

        List<Proveedor> pedidos = expertoPedidos.getProveedoresRepuestos();

        if (pedidos != null) {

            return new ResponseEntity<List<Proveedor>>(pedidos, HttpStatus.OK);

        } else {
            return ResponseEntity.status(500).body(null);
        }

    }

    @GetMapping("/getPedidosCabecera")
    public ResponseEntity<List<DTOPedidoCabecera>> getPedidosCabecera() {

        List<DTOPedidoCabecera> pedidos = expertoPedidos.getPedidosCabecera();

        if (pedidos != null) {

            return new ResponseEntity<List<DTOPedidoCabecera>>(pedidos, HttpStatus.OK);

        } else {
            return ResponseEntity.status(500).body(null);
        }

    }

    // @PostMapping("/updateLista")
    // public DTOListaPrecioManoDeObra actualizarListaPRecio(@RequestBody
    // DTOListaPrecioManoDeObra dtoLista) {
    // return expertoOperaciones.modificarCostos(dtoLista);

    // }

}
