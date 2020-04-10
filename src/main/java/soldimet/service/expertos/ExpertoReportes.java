package soldimet.service.expertos;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soldimet.constant.Globales;
import soldimet.domain.Caja;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.Movimiento;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Sucursal;
import soldimet.repository.CostoRepuestoRepository;
import soldimet.repository.DetallePedidoRepository;
import soldimet.repository.EstadoCostoRepuestoRepository;
import soldimet.repository.EstadoMovimientoRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPresupuestoRepository;
import soldimet.repository.MovimientoRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PresupuestoRepository;
import soldimet.repository.SucursalRepository;
import soldimet.service.dto.DTOCajaDiario;
import soldimet.service.dto.DTOMetricaContable;
import soldimet.service.dto.DTOSerie;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
@Service
@Transactional
public class ExpertoReportes {

    private final Logger log = LoggerFactory.getLogger(ExpertoReportes.class);

    @Autowired
    private Globales globales;

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private EstadoMovimientoRepository estadoMovimientoRepository;

    @Autowired
    private ExpertoCaja expertoCaja;

    @Autowired
    private EstadoPresupuestoRepository estadoPresupuestoRepository;

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private EstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

    @Autowired
    private CostoRepuestoRepository costoRepuestoRepository;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    public ExpertoReportes() {

    }

    public List<DTOCajaDiario> getcajaDiariaMensual() {

        List<DTOCajaDiario> reportes = new ArrayList<DTOCajaDiario>();

        try {

            for (Sucursal sucursal: sucursalRepository.findAll()) {
                DTOCajaDiario report = new DTOCajaDiario();
                report.setName(sucursal.getNombreSucursal());
                // Ordeno las cajas por fecha para ir acumulando resultados día a día
                Float cajaAcumulado = new Float(0);
                for (Caja caja: expertoCaja.findCajasDelMes(sucursal)) {
                    cajaAcumulado += caja.getSaldo();
                    DTOSerie serieCaja = new DTOSerie(caja.getFecha().toString(), cajaAcumulado);
                    report.addSerie(serieCaja);
                }
                reportes.add(report);
            }

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return reportes;

    }

    public List<DTOCajaDiario> getcajaDiaria() {

        List<DTOCajaDiario> reportes = new ArrayList<DTOCajaDiario>();

        try {

            EstadoMovimiento estadoAlta = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);

            for (Sucursal sucursal: sucursalRepository.findAll()) {
                DTOCajaDiario report = new DTOCajaDiario();
                report.setName(sucursal.getNombreSucursal());
                Caja cajaDia = expertoCaja.findCajaDelDia(sucursal);

                List<Movimiento> movimientos = movimientoRepository.findByCajaAndEstado(cajaDia, estadoAlta);
                Float totalIngresos = new Float(0);
                Float totalEgresos = new Float(0);
                for (Movimiento movimiento: movimientos) {
                    if (movimiento.getTipoMovimiento().getNombreTipoMovimiento().equals(globales.nombre_Tipo_Movimiento_Ingreso)) {
                        totalIngresos += movimiento.getImporte();
                    } else {
                        // Los movimientos tienen signo y yo lo quiero mostrar todo positivo en el gráfico
                        totalEgresos -= movimiento.getImporte();
                    }
                }

                DTOSerie serieIngresos = new DTOSerie(globales.nombre_Tipo_Movimiento_Ingreso, totalIngresos);
                report.addSerie(serieIngresos);

                DTOSerie serieEgreso = new DTOSerie(globales.nombre_Tipo_Movimiento_Egreso, totalEgresos);
                report.addSerie(serieEgreso);

                reportes.add(report);
            }

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return reportes;

    }

    public List<DTOMetricaContable> getMetricasContables() {

        List<DTOMetricaContable> metricas = new ArrayList<DTOMetricaContable>();

        // Presupuestos en progreso
        try {
            EstadoPresupuesto estadoPresupuestoAceptado = estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);
            Long cantidadPresupuestos = presupuestoRepository.countByEstadoPresupuesto(estadoPresupuestoAceptado);
            DTOMetricaContable metricaCantidadPresupuestosEnProceso = new DTOMetricaContable();
            metricaCantidadPresupuestosEnProceso.setValor(new Float(cantidadPresupuestos));
            metricaCantidadPresupuestosEnProceso.setCategoria("Presupuestos en Proceso");
            metricas.add(metricaCantidadPresupuestosEnProceso);

        } catch (Exception e) {
            e.printStackTrace();
        }

        // Presupuestos por entregar
        try {
            EstadoPresupuesto estadoPresupuestoTerminados = estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_TERMINADO);
            Long cantidadPresupuestos = presupuestoRepository.countByEstadoPresupuesto(estadoPresupuestoTerminados);
            DTOMetricaContable metricaCantidadPresupuestosPorEntregar = new DTOMetricaContable();
            metricaCantidadPresupuestosPorEntregar.setValor(new Float(cantidadPresupuestos));
            metricaCantidadPresupuestosPorEntregar.setCategoria("Presupuestos por Entregar");
            metricas.add(metricaCantidadPresupuestosPorEntregar);

        } catch (Exception e) {
            e.printStackTrace();
        }

        // Cantidad de Presupuestos pendientes de pedido
        try {
            EstadoPedidoRepuesto estadoPedidoPendiente = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);
            EstadoPedidoRepuesto estadoPedidoPedidoParcial = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_PEDIDO_PARCIAL);
            Long cantidadPendientes = pedidoRepuestoRepository.countByEstadoPedidoRepuesto(estadoPedidoPendiente);
            Long cantidadPedidosParcial = pedidoRepuestoRepository.countByEstadoPedidoRepuesto(estadoPedidoPedidoParcial);

            DTOMetricaContable metricaCantidadRepuestosPorPedir = new DTOMetricaContable();
            metricaCantidadRepuestosPorPedir.setValor(new Float(cantidadPendientes + cantidadPedidosParcial));
            metricaCantidadRepuestosPorPedir.setCategoria("Presupuestos sin repuestos");
            metricas.add(metricaCantidadRepuestosPorPedir);

        } catch (Exception e) {
            e.printStackTrace();
        }

        // Cantidad de repuestos por recibir
        try {
            EstadoCostoRepuesto estadoCostoRepuestoPedido = estadoCostoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PEDIDO);
            Long cantidadPorRecibir = costoRepuestoRepository.countByEstado(estadoCostoRepuestoPedido);
            DTOMetricaContable metricaCantidadRepuestosParaRecibir = new DTOMetricaContable();
            metricaCantidadRepuestosParaRecibir.setValor(new Float(cantidadPorRecibir));
            metricaCantidadRepuestosParaRecibir.setCategoria("Repuestos para Recibir");
            metricas.add(metricaCantidadRepuestosParaRecibir);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return metricas;

    }
}
