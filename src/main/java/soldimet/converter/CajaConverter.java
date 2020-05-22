package soldimet.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import soldimet.constant.Globales;
import soldimet.domain.Caja;
import soldimet.domain.CategoriaPago;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.MedioDePago;
import soldimet.domain.MedioDePagoCheque;
import soldimet.domain.Movimiento;
import soldimet.domain.MovimientoArticulo;
import soldimet.domain.MovimientoPedido;
import soldimet.domain.MovimientoPresupuesto;
import soldimet.repository.CategoriaPagoRepository;
import soldimet.repository.MovimientoArticuloRepository;
import soldimet.repository.MovimientoPedidoRepository;
import soldimet.repository.MovimientoPresupuestoRepository;
import soldimet.repository.MovimientoRepository;
import soldimet.service.dto.DTOCaja;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;
import soldimet.service.dto.DTOMovimientoCUConsultarMovimientos;

@Component
public class CajaConverter {

    @Autowired
    private Globales globales;

    @Autowired
    private MovimientoArticuloRepository movimientoArticuloRepository;

    @Autowired
    private MovimientoPedidoRepository movimientoPedidoRepository;

    @Autowired
    private MovimientoPresupuestoRepository movimientoPresupuestoRepository;

    @Autowired
    private CategoriaPagoRepository categoriaPagoRepository;

    @Autowired
    private MovimientoRepository movimientoRepository;

    public DTOCajaCUConsultarMovimientos cajaADTO(List<Caja> listaCajas, EstadoMovimiento estado, Float totalMes) {
        DTOCajaCUConsultarMovimientos dtoCaja = new DTOCajaCUConsultarMovimientos();
        dtoCaja.setTotalMensual(totalMes);
        for(Caja caja: listaCajas) {
            List<Movimiento> movimientos = movimientoRepository.findByCajaAndEstado(caja, estado);
            DTOCaja dto = this.cajaACajaMovimiento(caja, movimientos);
            dtoCaja.addCaja(dto);
        }
        return dtoCaja;
    }


    public DTOCaja cajaACajaMovimiento(Caja caja, List<Movimiento> movimientos) {
        DTOCaja dto = new DTOCaja();
        dto.setCajaId(caja.getId());
        dto.setEstadoCaja("Sin estado");
        dto.setFechaCaja(caja.getFecha().toString());
        dto.setTotalCaja(caja.getSaldo());
        dto.setMovimientos(this.listMovimientoToListDtoMovCabecera(movimientos));
        return dto;
    }

    public DTOMovimientoCUConsultarMovimientos movimientoToDtoMovimientoCabecera( Movimiento movimiento) {
        DTOMovimientoCUConsultarMovimientos newDto = new DTOMovimientoCUConsultarMovimientos();
        newDto.setCategoria(movimiento.getSubCategoria().getNombreSubCategoria());
        newDto.setDescripcion(this.getDescripcionMovimiento(movimiento));
        newDto.setFormaDePago(movimiento.getMedioDePago().getFormaDePago().getNombreFormaDePago());
        newDto.setFormaDePagoTip(this.formaDePagoTip(movimiento.getMedioDePago()));
        if (movimiento.getImporte() < 0) {
            newDto.setMonto(movimiento.getImporte() * -1);
        } else {
            newDto.setMonto(movimiento.getImporte());
        }

        newDto.setMovimientoId(movimiento.getId());
        newDto.setTipoMovimiento(movimiento.getTipoMovimiento().getNombreTipoMovimiento());
        newDto.setEstado(movimiento.getEstado().getNombreEstado());

        return newDto;
    }

    public List<DTOMovimientoCUConsultarMovimientos> listMovimientoToListDtoMovCabecera ( List<Movimiento> movimientos) {
        List<DTOMovimientoCUConsultarMovimientos> listaDto = new ArrayList<DTOMovimientoCUConsultarMovimientos>();
        for (Movimiento movimiento: movimientos) {
            listaDto.add(this.movimientoToDtoMovimientoCabecera(movimiento));
        }

        return listaDto;
    }

    private String getDescripcionMovimiento(Movimiento movimiento) {
        String descripcion = "";

        MovimientoArticulo movimientoArticulo = movimientoArticuloRepository.findByMovimiento(movimiento);
        if (movimientoArticulo != null) {
            descripcion = movimientoArticulo.getCantidad() + " " + movimientoArticulo.getArticulo().getDescripcion();
        }

        MovimientoPedido movimientoPedido = movimientoPedidoRepository.findByMovimiento(movimiento);
        if (movimientoPedido != null) {
            descripcion = "Pedido: " + movimientoPedido.getPedidoRepuesto().getId();
        }

        MovimientoPresupuesto movimientoPresupuesto = movimientoPresupuestoRepository.findByMovimiento(movimiento);
        if (movimientoPresupuesto != null) {
            descripcion = "Presupuesto: " + movimientoPresupuesto.getPresupuesto().getId();
            if (!movimientoPresupuesto.getCostoRepuestos().isEmpty()) {
                descripcion = descripcion + " (";
                for (CostoRepuesto costoRepuesto: movimientoPresupuesto.getCostoRepuestos()) {
                    descripcion = descripcion + " " + costoRepuesto.getTipoRepuesto().getNombreTipoRepuesto();
                }
                descripcion = descripcion + ")";
            }
        }

        if (descripcion == "" && movimiento.getObservaciones() != null) {
            descripcion = movimiento.getObservaciones();
        }

        if (descripcion == "") {
            CategoriaPago categoriaPago = categoriaPagoRepository.findBySubCategoriasContaining(movimiento.getSubCategoria());
            if (categoriaPago != null) {
                descripcion = categoriaPago.getNombreCategoriaPago();
            }
        }

        return descripcion;
    }

    private String formaDePagoTip(MedioDePago medioDePago) {
        String tip = null;
        String formaDePago = medioDePago.getFormaDePago().getNombreFormaDePago();

        if (formaDePago.equals(globales.NOMBRE_FORMA_DE_PAGO_CHEQUE)) {
            MedioDePagoCheque medioDePagoCheque = medioDePago.getMedioDePagoCheque();
            tip = medioDePagoCheque.getBanco().getNombreBanco() + " (" + medioDePagoCheque.getNumeroCheque() + ") ";
        }

        return tip;
    }
}
