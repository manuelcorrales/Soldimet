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

        DTOCajaCUConsultarMovimientos movimientosDelDia = expertoCaja.buscarMovimientosDia();

        return movimientosDelDia;
    }

    @PostMapping("/nuevo_movimiento")
    public Movimiento saveNewMovimiento(@RequestBody Movimiento movimiento) {

        Movimiento movimientosDelDia = expertoCaja.guardarNuevoMovimiento(movimiento);

        return movimientosDelDia;
    }

    @PostMapping("/borrar_movimiento/{movimientoId}")
    public ResponseEntity<Movimiento> borrarMovimiento(@PathVariable("movimientoId") Long movimientoID) {
        try {
            Movimiento movimientoEliminado = expertoCaja.borrarMovimiento(movimientoID);
            return new ResponseEntity<Movimiento>(movimientoEliminado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }

    }

}
