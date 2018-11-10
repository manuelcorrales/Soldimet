package soldimet.controller;

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

import soldimet.domain.CobranzaOperacion;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Proveedor;
import soldimet.service.dto.DTOPedidoCabecera;
import soldimet.service.dto.DTOProveedor;
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
    public ResponseEntity<List<DTOProveedor>> getProveedoresRepuestos() {

        List<DTOProveedor> pedidos = expertoPedidos.getProveedoresRepuestos();

        if (pedidos != null) {

            return new ResponseEntity<List<DTOProveedor>>(pedidos, HttpStatus.OK);

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

    @PostMapping("/updateDetallePedido/{detallePedidoId}")
    public ResponseEntity<CostoRepuesto> updateDetallePedido(@RequestBody CostoRepuesto costoRepuesto,
            @PathVariable("detallePedidoId") Long detallePedidoId) {

        costoRepuesto = expertoPedidos.updateDetallePedido(costoRepuesto, detallePedidoId);

        if (costoRepuesto != null) {

            return new ResponseEntity<CostoRepuesto>(costoRepuesto, HttpStatus.OK);

        } else {
            return ResponseEntity.status(500).body(null);
        }

    }

    @PostMapping("/recibirRepuesto/{detallePedidoId}")
    public ResponseEntity<CostoRepuesto> recibirRepuesto(@RequestBody CostoRepuesto costoRepuesto,
            @PathVariable("detallePedidoId") Long detallePedidoId) {

        costoRepuesto = expertoPedidos.recibirRepuesto(costoRepuesto, detallePedidoId);

        if (costoRepuesto != null) {

            return new ResponseEntity<CostoRepuesto>(costoRepuesto, HttpStatus.OK);

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
