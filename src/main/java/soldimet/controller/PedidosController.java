package soldimet.controller;

import java.net.URISyntaxException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.CostoRepuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.dto.DTOProveedor;
import soldimet.service.expertos.ExpertoPedidos;

@RestController
@RequestMapping("/api/pedidos")
@Transactional
public class PedidosController {

    private final Logger log = LoggerFactory.getLogger(PedidosController.class);

    private static final String ENTITY_NAME = "PedidoRepuesto";

    @Autowired
    private ExpertoPedidos expertoPedidos;

    @GetMapping("/getPedidosPendientes")
    public ResponseEntity<List<PedidoRepuesto>> getPedidosPendientes() {
        log.debug("request api/pedidos/getPedidosPendientes");
        List<PedidoRepuesto> pedidos = expertoPedidos.getPedidosPendientes();

        if (pedidos != null) {
            ResponseEntity<List<PedidoRepuesto>> response = new ResponseEntity<List<PedidoRepuesto>>(pedidos,
                    HttpStatus.OK);
            log.debug("response api/pedidos/getPedidosPendientes: {}", response);
            return response;
        } else {
            log.error("ERROR api/pedidos/getPedidosPendientes: No se encontraron pedidos pendientes");
            return ResponseEntity.status(500).body(null);
        }

    }

    @GetMapping("/proveedoresRepuestos")
    public ResponseEntity<List<DTOProveedor>> getProveedoresRepuestos() {
        log.debug("request api/pedidos/proveedoresRepuestos");

        List<DTOProveedor> pedidos = expertoPedidos.getProveedoresRepuestos();

        if (pedidos != null) {
            ResponseEntity<List<DTOProveedor>> response = new ResponseEntity<List<DTOProveedor>>(pedidos,
                    HttpStatus.OK);
            log.debug("response api/pedidos/proveedoresRepuestos: {}", response);
            return response;
        } else {
            log.error("ERROR api/pedidos/proveedoresRepuestos: No se encontraron proveedores");

            return ResponseEntity.status(500).body(null);
        }

    }

    @GetMapping("/getPedidosCabecera")
    public ResponseEntity<List<DTOPedidoCabecera>> getPedidosCabecera() {
        log.debug("request api/pedidos/getPedidosCabecera");

        List<DTOPedidoCabecera> pedidos = expertoPedidos.getPedidosCabecera();

        if (pedidos != null) {
            ResponseEntity<List<DTOPedidoCabecera>> response = new ResponseEntity<List<DTOPedidoCabecera>>(pedidos,
                    HttpStatus.OK);
            log.debug("response api/pedidos/getPedidosCabecera: {}", response);
            return response;
        } else {
            log.debug("ERROR api/pedidos/getPedidosCabecera");
            return ResponseEntity.status(500).body(null);
        }

    }

    @Transactional
    @PostMapping("/updateDetallePedido/{detallePedidoId}")
    public ResponseEntity<CostoRepuesto> updateDetallePedido(@RequestBody CostoRepuesto costoRepuesto,
            @PathVariable("detallePedidoId") Long detallePedidoId) throws URISyntaxException {
        log.debug("request api/pedidos/updateDetallePedido: DetallePedido: {}, CostoRepuesto: {}", detallePedidoId,
                costoRepuesto);

        try {
            costoRepuesto = expertoPedidos.updateDetallePedido(costoRepuesto, detallePedidoId);
            ResponseEntity<CostoRepuesto> response = new ResponseEntity<CostoRepuesto>(costoRepuesto, HttpStatus.OK);
            log.debug("response api/pedidos/updateDetallePedido: {}", response);
            return response;

        } catch (Exception e) {
            throw new URISyntaxException(e.getMessage(), ENTITY_NAME);
        }

    }

    @PostMapping("/recibirRepuesto/{detallePedidoId}")
    public ResponseEntity<CostoRepuesto> recibirRepuesto(@RequestBody CostoRepuesto costoRepuesto,
            @PathVariable("detallePedidoId") Long detallePedidoId) {
        log.debug("request api/pedidos/recibirRepuesto: DetallePedido {}, CostoRepuesto: {}", detallePedidoId,
                costoRepuesto);

        costoRepuesto = expertoPedidos.recibirRepuesto(costoRepuesto, detallePedidoId);

        if (costoRepuesto != null) {
            ResponseEntity<CostoRepuesto> response = new ResponseEntity<CostoRepuesto>(costoRepuesto, HttpStatus.OK);
            log.debug("response api/pedidos/recibirRepuesto: {}", response);
            return response;
        } else {
            log.debug("ERROR api/pedidos/recibirRepuesto");
            return ResponseEntity.status(500).body(null);
        }

    }

    @GetMapping("/get/{id}")
    public PedidoRepuesto getPedido(@PathVariable("id") Long pedidoId) {
        log.debug("request /api/pedidos: pedido id {}", pedidoId);
        PedidoRepuesto pedido = expertoPedidos.getPresupuesto(pedidoId);
        log.debug("response /api/pedidos: {}", pedido);
        return pedido;
    }

    // @PostMapping("/updateLista")
    // public DTOListaPrecioManoDeObra actualizarListaPRecio(@RequestBody
    // DTOListaPrecioManoDeObra dtoLista) {
    // return expertoOperaciones.modificarCostos(dtoLista);

    // }

}
