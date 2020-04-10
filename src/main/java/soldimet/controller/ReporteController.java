package soldimet.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public List<DTOCajaDiario> buscarCajaDiariaMensual() {
        log.debug("request api/reportes/cajaDiariaMensual");

        List<DTOCajaDiario> cajasMensual = expertoReportes.getcajaDiariaMensual();

        log.debug("response api/reportes/cajaDiariaMensual: {}", cajasMensual);
        return cajasMensual;
    }

    @GetMapping("/cajaDiaria")
    public List<DTOCajaDiario> buscarCajaDiaria() {
        log.debug("request api/reportes/cajaDiaria");

        List<DTOCajaDiario> cajasMensual = expertoReportes.getcajaDiaria();

        log.debug("response api/reportes/cajaDiaria: {}", cajasMensual);
        return cajasMensual;
    }

    @GetMapping("/metricasContables")
    public List<DTOMetricaContable> buscarMetricasContables() {
        log.debug("request api/reportes/metricasContables");

        List<DTOMetricaContable> metricas = expertoReportes.getMetricasContables();

        log.debug("response api/reportes/metricasContables: {}", metricas);
        return metricas;
    }

}
