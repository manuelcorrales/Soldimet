package soldimet.controller;

import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.Articulo;
import soldimet.service.expertos.ExpertoRepuestos;

@RestController
@RequestMapping("/api/repuestos")
public class RepuestosController {

    private final Logger log = LoggerFactory.getLogger(RepuestosController.class);

    @Autowired
    private ExpertoRepuestos expertoRepuestos;

    @GetMapping("/buscarActivosDeTipoParte")
    public List<Articulo> buscarRepuestosProveedor() {
        log.debug("/buscarActivosDeTipoParte");
        return expertoRepuestos.buscarRepuestosProveedor();
    }

    @PostMapping("/updateLista")
    public List<Articulo> actualizarListaArticulos(@RequestBody List<Articulo> articulos) throws URISyntaxException {
        log.debug("/updateListaRepuestosPoveedor, REQUEST: {}", articulos);
        articulos = expertoRepuestos.actualizarListaRepuestosProveedor(articulos);
        log.debug("/updateListaRepuestosPoveedor, RESPONSE: {}", articulos);
        return articulos;
    }

    @PostMapping("/crearRepuestoProveedor")
    public Articulo crearRepuestoProveedor(@RequestBody Articulo articulo) throws URISyntaxException {
        log.debug("/crearRepuestoProveedor, REQUEST: {}", articulo);
        articulo = expertoRepuestos.crearRepuestoProveedor(articulo);
        log.debug("/crearRepuestoProveedor, RESPONSE: {}", articulo);
        return articulo;
    }

    @PostMapping("/updateRepuestoProveedor")
    public Articulo actualizarRepuestoProveedor(@RequestBody Articulo articulo) throws URISyntaxException {
        log.debug("/actualizarRepuestoProveedor, REQUEST: {}", articulo);
        articulo = expertoRepuestos.actualizarRepuestoProveedor(articulo);
        log.debug("/actualizarRepuestoProveedor, RESPONSE: {}", articulo);
        return articulo;
    }

}
