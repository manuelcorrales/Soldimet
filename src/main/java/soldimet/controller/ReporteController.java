package soldimet.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import soldimet.service.dto.DTOCajaDiario;
import soldimet.service.dto.DTOMetricaContable;
import soldimet.service.expertos.ExpertoReportes;

@Transactional
@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    private final Logger log = LoggerFactory.getLogger(CajaController.class);

    @Autowired
    private ExpertoReportes expertoReportes;

    @GetMapping("/cajaDiariaMensual")
    public List<DTOCajaDiario> buscarCajaDiariaMensual(
        @RequestParam("fecha_inicio") @DateTimeFormat(iso = ISO.DATE) Optional<LocalDate> fechaInicio,
        @RequestParam("fecha_fin") @DateTimeFormat(iso = ISO.DATE) Optional<LocalDate> fechaFin
    ) {
        log.info("request api/reportes/cajaDiariaMensual: {},{}", fechaInicio, fechaFin);

        List<DTOCajaDiario> cajasMensual = expertoReportes.getcajaDiariaMensual(fechaInicio, fechaFin);

        log.debug("response api/reportes/cajaDiariaMensual: {}", cajasMensual);
        return cajasMensual;
    }

    @GetMapping("/cajaDiaria")
    public List<DTOCajaDiario> buscarCajaDiaria() {
        log.info("request api/reportes/cajaDiaria");

        List<DTOCajaDiario> cajasMensual = expertoReportes.getcajaDiaria();

        log.debug("response api/reportes/cajaDiaria: {}", cajasMensual);
        return cajasMensual;
    }

    @GetMapping("/metricasContables")
    public List<DTOMetricaContable> buscarMetricasContables(
        @RequestParam("fecha_inicio") @DateTimeFormat(iso = ISO.DATE) Optional<LocalDate> fechaInicio,
        @RequestParam("fecha_fin") @DateTimeFormat(iso = ISO.DATE) Optional<LocalDate> fechaFin
    ) {
        log.info("request api/reportes/metricasContables");

        List<DTOMetricaContable> metricas = expertoReportes.getMetricasContables(fechaInicio, fechaFin);

        log.debug("response api/reportes/metricasContables: {}", metricas);
        return metricas;
    }

    @GetMapping("/imprimirRepuestos")
    @ResponseBody
    public ResponseEntity<Resource> imprimirRepuestos(
        @RequestParam("fecha_inicio") @DateTimeFormat(iso = ISO.DATE) LocalDate fechaInicio,
        @RequestParam("fecha_fin") @DateTimeFormat(iso = ISO.DATE) LocalDate fechaFin,
        @RequestParam("sucursal") Long sucursal
    ) throws IOException {
        log.info(
            "request api/reportes/imprimirRepuestos: fechaIn {}, fechaFin {}, sucursal {}",
            fechaInicio,
            fechaFin,
            sucursal
        );
        Pair<File, String> response = expertoReportes.imprimirRepuestos(fechaInicio, fechaFin, sucursal);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=Listado repuestos.xlsx");
        headers.add("Content-type", "application/excel");
        InputStreamResource file = new InputStreamResource(new FileInputStream(response.getValue0()));

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(file);
    }

}
