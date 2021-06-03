package soldimet.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.StockArticulo;
import soldimet.service.dto.DTOStockRepuestoCabecera;
import soldimet.service.expertos.ExpertoRepuestos;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private final Logger log = LoggerFactory.getLogger(StockController.class);

    @Autowired
    private ExpertoRepuestos expertoRepuestos;

    @GetMapping("/getStockCabecera")
    public Page<DTOStockRepuestoCabecera> buscarStockCabecera(
        @RequestParam(defaultValue = "") String filtro,
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "200") Integer size
    ) {
        Pageable paging = PageRequest.of(page, size);
        log.info("request /api/stock/getStockCabecera: {}, {}, {}", filtro, page, size);

        Page<DTOStockRepuestoCabecera> repuestos = expertoRepuestos.buscarStockCabecera(filtro, paging);

        log.debug("response /api/stock/getStockCabecera: {}", repuestos);
        return repuestos;
    }

    @GetMapping("/checkStock")
    public StockArticulo checkStock(
        @RequestParam("medida_id") Long medidaId,
        @RequestParam("articulo_id") Long articuloID
    ) {
        log.info("request /api/stock/checkStock: {}, {}", medidaId, articuloID);

        StockArticulo repuestos = expertoRepuestos.checkStock(medidaId, articuloID);

        log.debug("response /api/stock/checkStock: {}", repuestos);
        return repuestos;
    }

    @PostMapping("/updateStock")
    public DTOStockRepuestoCabecera actualizarStock(@RequestBody DTOStockRepuestoCabecera stock) {
        log.debug("/updateStock, REQUEST: {}", stock);
        stock = expertoRepuestos.actualizarStock(stock);
        log.debug("/updateStock, RESPONSE: {}", stock);
        return stock;
    }

}
