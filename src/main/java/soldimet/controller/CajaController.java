package soldimet.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;

@RestController
@RequestMapping("/api/caja")
public class CajaController {

    private final Logger log = LoggerFactory.getLogger(CajaController.class);

    private static final String ENTITY_NAME = "caja";

    public List<DTOCajaCUConsultarMovimientos> getMovimientos(){

        return null;
    }

}
