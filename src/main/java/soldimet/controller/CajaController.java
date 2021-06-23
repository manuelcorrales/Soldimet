package soldimet.controller;

import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoArticulo;
import soldimet.service.dto.DTOMovimientos;
import soldimet.service.dto.DTOCaja;
import soldimet.service.expertos.ExpertoCaja;

@Transactional
@RestController
@RequestMapping("/api/caja")
public class CajaController {

    private final Logger log = LoggerFactory.getLogger(CajaController.class);

    @Autowired
    private ExpertoCaja expertoCaja;

    // Uso un post por que no encontre forma de pasar las fechas para filtrar (si, una poronga)
    @GetMapping("/movimientos/")
    public Page<DTOMovimientos> findMovimientosSucursal(
        @RequestParam(defaultValue = "") String filtro,
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "20") Integer size,
        @RequestParam("sucursal") Long sucursal,
        @RequestParam("fecha_inicio") @DateTimeFormat(iso = ISO.DATE) Optional<LocalDate> fechaInicio,
        @RequestParam("fecha_fin") @DateTimeFormat(iso = ISO.DATE) Optional<LocalDate> fechaFin
    ) {
        log.debug("request api/caja/movimientos. sucursal: {}, fechaInicio: {}, fechaFin: {}, filtro: {}, page: {}, size: {}",
            sucursal,
            fechaInicio,
            fechaFin,
            filtro,
            page,
            size
        );

        Pageable paging = PageRequest.of(page, size);

        Page<DTOMovimientos> movimientos = expertoCaja.getMovimientosSucursal(
            filtro,
            sucursal,
            fechaInicio,
            fechaFin,
            paging
        );

        log.debug("response api/caja/movimientos: {}", movimientos);
        return movimientos;
    }

    @GetMapping("/movimientos_presupuesto/")
    public List<DTOMovimientos> findMovimientosSucursal(@RequestParam("presupuestoId") Long presupuestoId) {
        log.debug("request api/caja/movimientos_presupuesto. presupuesto: {}", presupuestoId);

        List<DTOMovimientos> movimientos = expertoCaja.buscarMovimientosPresupuesto(presupuestoId);

        log.debug("response api/caja/movimientos_presupuesto: {}", movimientos);
        return movimientos;
    }

    // Uso un post por que no encontre forma de pasar las fechas para filtrar (si, una poronga)
    @GetMapping("/cajaDia/")
    public DTOCaja findCajaDia(@RequestParam("sucursalId") Long sucursalId) {
        log.debug("request api/caja/cajaDia. sucursal: {}", sucursalId);

        DTOCaja caja = expertoCaja.findCajaDia(sucursalId);

        log.debug("response api/caja/cajaDia: {}", caja);
        return caja;
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

    @PostMapping("/nuevos_movimientos_articulos/")
    public ResponseEntity<List<MovimientoArticulo>> crearMovimientosArticulos(
        @RequestParam("movimientoId") Long movimientoID,
        @RequestBody List<MovimientoArticulo> movimientosArticulos
    ) {
        log.debug("request api/caja/nuevos_movimientos_articulos: {}, {}", movimientoID, movimientosArticulos);
        try {
            List<MovimientoArticulo> movimientos = expertoCaja.crearMovimientosArticulos(movimientoID, movimientosArticulos);
            log.debug("response api/caja/nuevos_movimientos_articulos", movimientos);
            return new ResponseEntity<List<MovimientoArticulo>>(movimientos, HttpStatus.OK);
        } catch (Exception e) {
            log.error("error api/caja/nuevos_movimientos_articulos: {}", e);
            return ResponseEntity.status(500).body(null);
        }

    }

}
