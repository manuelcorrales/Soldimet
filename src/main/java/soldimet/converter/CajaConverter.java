package soldimet.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import soldimet.repository.extendedRepository.ExtendedCategoriaPagoRepository;
import soldimet.repository.extendedRepository.ExtendedMovimientoArticuloRepository;
import soldimet.repository.extendedRepository.ExtendedMovimientoPedidoRepository;
import soldimet.repository.extendedRepository.ExtendedMovimientoPresupuestoRepository;
import soldimet.repository.extendedRepository.ExtendedMovimientoRepository;
import soldimet.service.dto.DTOCaja;
import soldimet.service.dto.DTOMovimientos;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;
import soldimet.service.dto.DTOMovimientoCUConsultarMovimientos;

@Component
public class CajaConverter {

    @Autowired
    private Globales globales;

    @Autowired
    private ExtendedMovimientoArticuloRepository movimientoArticuloRepository;

    @Autowired
    private ExtendedMovimientoPedidoRepository movimientoPedidoRepository;

    @Autowired
    private ExtendedMovimientoPresupuestoRepository movimientoPresupuestoRepository;

    @Autowired
    private ExtendedCategoriaPagoRepository categoriaPagoRepository;

    @Autowired
    private ExtendedMovimientoRepository movimientoRepository;

    public DTOCaja cajaADTO(Caja caja, Float totalMes) {
        DTOCaja dtoCaja = new DTOCaja();
        dtoCaja.setTotalMensual(totalMes);
        dtoCaja.setCajaId(caja.getId());
        dtoCaja.setTotalCaja(caja.getSaldo());
        dtoCaja.setFechaCaja(caja.getFecha().toString());
        return dtoCaja;
    }

    public DTOMovimientos movimientoToDtoMovimiento(Movimiento movimiento) {
        DTOMovimientos newDto = new DTOMovimientos();
        newDto.setMovimientoId(movimiento.getId());
        newDto.setFecha(movimiento.getFecha().toString());
        newDto.setEstado(movimiento.getEstado().getNombreEstado());
        if (movimiento.getImporte() < 0) {
            newDto.setImporte(movimiento.getImporte() * -1);
        } else {
            newDto.setImporte(movimiento.getImporte());
        }
        newDto.setTipoMovimiento(movimiento.getTipoMovimiento().getNombreTipoMovimiento());
        newDto.setFormaDePago(movimiento.getMedioDePago().getFormaDePago().getNombreFormaDePago());
        newDto.setFormaDePagoTip(this.formaDePagoTip(movimiento.getMedioDePago()));
        newDto.setDescripcion(movimiento.getSubCategoria().getNombreSubCategoria());
        newDto.setEmpleado(movimiento.getEmpleado().getPersona().getNombre());
        CategoriaPago categoriaPago = categoriaPagoRepository.findBySubCategoriasContaining(movimiento.getSubCategoria());
        newDto.setCategoria(categoriaPago.getNombreCategoriaPago());
        newDto.setObservaciones(movimiento.getObservaciones());

        this.completePresupuestoData(newDto, movimiento);
        this.completeArticuloData(newDto, movimiento);

        return newDto;
    }

    public List<DTOMovimientos> movimientosToMovCabecera (List<Movimiento> movimientos) {
        List<DTOMovimientos> dtoMovs = new ArrayList();
        for (Movimiento movimiento: movimientos) {
            dtoMovs.add(movimientoToDtoMovimiento(movimiento));
        }
        return dtoMovs;
    }

    public Page<DTOMovimientos> movimientosToMovCabecera (Page<Movimiento> movimientos) {
        return movimientos.map(movimiento -> movimientoToDtoMovimiento(movimiento));
    }

    private void completePresupuestoData(DTOMovimientos newDto, Movimiento movimiento) {
        MovimientoPresupuesto movimientoPresupuesto = movimientoPresupuestoRepository.findByMovimiento(movimiento);
        if (movimientoPresupuesto != null) {
            Long presupuestoID = movimientoPresupuesto.getPresupuesto().getId();
            newDto.setPresupuestoId(presupuestoID);
        }
    }

    private void completeArticuloData(DTOMovimientos newDto, Movimiento movimiento) {
        List<String> articulos = new ArrayList<>();
        List<MovimientoArticulo> movimientosArticulos = movimientoArticuloRepository.findByMovimiento(movimiento);
        for(MovimientoArticulo movimientoArticulo: movimientosArticulos) {
            String descripcion =  movimientoArticulo.getArticulo().getTipoRepuesto().getNombreTipoRepuesto() +
                " - '" + movimientoArticulo.getArticulo().getCodigoArticuloProveedor() + "'" +
                " (" + movimientoArticulo.getCantidad() + " Un)";
            articulos.add(descripcion);
        }
        newDto.setArticulos(articulos);
    }

    private String formaDePagoTip(MedioDePago medioDePago) {
        String tip = "";
        String formaDePago = medioDePago.getFormaDePago().getNombreFormaDePago();

        if (formaDePago.equals(globales.NOMBRE_FORMA_DE_PAGO_CHEQUE)) {
            MedioDePagoCheque medioDePagoCheque = medioDePago.getMedioDePagoCheque();
            tip = medioDePagoCheque.getBanco().getNombreBanco() + " (" + medioDePagoCheque.getNumeroCheque() + ") ";
        }

        return tip;
    }
}
