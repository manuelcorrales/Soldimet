package soldimet.controller;

import java.util.List;
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
import soldimet.domain.Articulo;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.service.expertos.ExpertoRepuestos;
import soldimet.web.rest.errors.BadRequestAlertException;

@RestController
@RequestMapping("/api/repuestos")
public class RepuestosController {

    private final Logger log = LoggerFactory.getLogger(RepuestosController.class);

    @Autowired
    private ExpertoRepuestos expertoRepuestos;

    @GetMapping("/buscarActivosDeTipoParte")
    public Page<Articulo> buscarPresupuestos(
        @RequestParam(required = true) Long marca,
        @RequestParam(defaultValue = "") String filtro,
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "200") Integer size
    ) {
        Pageable paging = PageRequest.of(page, size);
        log.info("request /api/repuestos/buscarActivosDeTipoParte: marca: {}, filtro: {}", marca, filtro);

        Page<Articulo> repuestos = expertoRepuestos.buscarRepuestosProveedor(marca, filtro, paging);

        log.debug("response /api/repuestos/buscarActivosDeTipoParte: {}", repuestos);
        return repuestos;
    }

    @GetMapping("/filtrarRepuestoProveedor")
    public Page<CostoRepuestoProveedor> buscarPresupuestos(
        @RequestParam(defaultValue = "") String filtro,
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "200") Integer size
    ) {
        Pageable paging = PageRequest.of(page, size);
        log.info("request /api/repuestos/filtrarRepuestoProveedor: filtro: {}", filtro);

        Page<CostoRepuestoProveedor> repuestos = expertoRepuestos.buscarCostoRepuestosProveedor(filtro, paging);

        log.debug("response /api/repuestos/filtrarRepuestoProveedor: {}", repuestos);
        return repuestos;
    }

    @PostMapping("/updateLista")
    public List<Articulo> actualizarListaArticulos(@RequestBody List<Articulo> articulos) {
        log.info("/updateListaRepuestosPoveedor, REQUEST: {}", articulos);
        articulos = expertoRepuestos.actualizarListaRepuestosProveedor(articulos);
        log.debug("/updateListaRepuestosPoveedor, RESPONSE: {}", articulos);
        return articulos;
    }

    @PostMapping("/crearRepuestoProveedor")
    public Articulo crearRepuestoProveedor(@RequestBody Articulo articulo) {
        log.info("/crearRepuestoProveedor, REQUEST: {}", articulo);
        try {
            articulo = expertoRepuestos.crearRepuestoProveedor(articulo);
        } catch (Exception e) {
            throw new BadRequestAlertException(
                "Ya existe este código en otro artículo!",
                Articulo.class.getName(),
                "codigoArticuloProveedorexists"
            );
        }
        log.debug("/crearRepuestoProveedor, RESPONSE: {}", articulo);
        return articulo;
    }

    @PostMapping("/updateRepuestoProveedor")
    public Articulo actualizarRepuestoProveedor(@RequestBody Articulo articulo) {
        log.info("/actualizarRepuestoProveedor, REQUEST: {}", articulo);
        articulo = expertoRepuestos.actualizarRepuestoProveedor(articulo);
        log.debug("/actualizarRepuestoProveedor, RESPONSE: {}", articulo);
        return articulo;
    }
}
