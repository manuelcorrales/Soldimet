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
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;
import soldimet.service.dto.DTOListaPrecioManoDeObra;
import soldimet.service.expertos.ExpertoCUModificarCostosDeManoDeObra;

import com.codahale.metrics.annotation.Timed;

@RestController
@RequestMapping("/api/operaciones")
@Transactional
@Timed
public class OperacionesController {

    private final Logger log = LoggerFactory.getLogger(PresupuestoController.class);

    private static final String ENTITY_NAME = "Operacion";

    @Autowired
    private ExpertoCUModificarCostosDeManoDeObra expertoOperaciones;

    @GetMapping("/getListaPreciosOperacionesActualizada")
    public List<DTOListaPrecioManoDeObra> getListaPreciosOperacionesActualizada(){

        return expertoOperaciones.buscarCostos();

    }

    @PostMapping("/updateLista")
    public DTOListaPrecioManoDeObra actualizarListaPRecio(@RequestBody DTOListaPrecioManoDeObra dtoLista) {
        return expertoOperaciones.modificarCostos(dtoLista);

    }

}
