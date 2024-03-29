package soldimet.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.Operacion;
import soldimet.service.dto.DTOListaPrecioManoDeObra;
import soldimet.service.expertos.ExpertoCUModificarCostosDeManoDeObra;


@RestController
@RequestMapping("/api/operaciones")
@Transactional
public class OperacionesController {

    private final Logger log = LoggerFactory.getLogger(PresupuestoController.class);

    private static final String ENTITY_NAME = "Operacion";

    @Autowired
    private ExpertoCUModificarCostosDeManoDeObra expertoOperaciones;

    @GetMapping("/getListaPreciosOperacionesActualizada")
    public List<DTOListaPrecioManoDeObra> getListaPreciosOperacionesActualizada(){
        log.info("request api/operaciones/getListaPreciosOperacionesActualizada");

        List<DTOListaPrecioManoDeObra> listaDto =  expertoOperaciones.buscarCostos();
        log.debug("response api/operaciones/getListaPreciosOperacionesActualizada: {}", listaDto);
        return listaDto;

    }

    @PostMapping("/updateLista")
    public DTOListaPrecioManoDeObra actualizarListaPRecio(@RequestBody DTOListaPrecioManoDeObra dtoLista) {
        log.info("request api/operaciones/updateLista");

        DTOListaPrecioManoDeObra dto = expertoOperaciones.modificarCostos(dtoLista);
        log.debug("response api/operaciones/updateLista: {}", dto);
        return dto;
    }

    @PostMapping("/agregar_en_listas")
    public Boolean agregarOperacionAListas(@RequestBody Operacion operacion) {
        log.info("request api/operaciones/agregar_en_listas");

        Boolean guardado = expertoOperaciones.agregarAListas(operacion);
        log.debug("response api/operaciones/agregar_en_listas: {}", operacion, guardado);
        return guardado;
    }

}
