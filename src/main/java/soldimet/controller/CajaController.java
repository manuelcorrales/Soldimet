package soldimet.controller;

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

import soldimet.domain.Movimiento;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;
import soldimet.service.expertos.ExpertoCaja;

@Transactional
@RestController
@RequestMapping("/api/caja")
public class CajaController {

    private final Logger log = LoggerFactory.getLogger(CajaController.class);

    private static final String ENTITY_NAME = "caja";

    @Autowired
    private ExpertoCaja expertoCaja;

    @GetMapping("/dia")
    public DTOCajaCUConsultarMovimientos getMovimientosDia() {
        log.debug("request api/caja/día");

        DTOCajaCUConsultarMovimientos movimientosDelDia = expertoCaja.buscarMovimientosDia();

        log.debug("response api/caja/día", movimientosDelDia);
        return movimientosDelDia;
    }

    @PostMapping("/nuevo_movimiento")
    public Movimiento saveNewMovimiento(@RequestBody Movimiento movimiento) {
        log.debug("request api/caja/nuevo_movimiento");
        Movimiento movimientosDelDia = expertoCaja.guardarNuevoMovimiento(movimiento);

        log.debug("response api/caja/nuevo_movimiento", movimientosDelDia);
        return movimientosDelDia;
    }

    @PostMapping("/borrar_movimiento/{movimientoId}")
    public ResponseEntity<Movimiento> borrarMovimiento(@PathVariable("movimientoId") Long movimientoID) {
        log.debug("request api/caja/borrar_movimiento");
        try {
            Movimiento movimientoEliminado = expertoCaja.borrarMovimiento(movimientoID);
            log.debug("response api/caja/borrar_movimiento", movimientoEliminado);
            return new ResponseEntity<Movimiento>(movimientoEliminado, HttpStatus.OK);
        } catch (Exception e) {
            log.error("error api/caja/borrar_movimiento: {}", e);
            return ResponseEntity.status(500).body(null);
        }

    }

}
