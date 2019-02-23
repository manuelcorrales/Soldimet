package soldimet.converter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.joda.time.DateTime;
import org.joda.time.DateTimeUtils;
import org.springframework.stereotype.Component;

import soldimet.domain.Caja;
import soldimet.domain.DetalleMovimiento;
import soldimet.domain.Movimiento;
import soldimet.service.dto.DTOCajaCUConsultarMovimientos;
import soldimet.service.dto.DTOMovimientoCUConsultarMovimientos;

@Component
public class CajaConverter {


    public DTOCajaCUConsultarMovimientos cajaACajaMovimiento(Caja caja, List<Movimiento> movimientos) {
        DTOCajaCUConsultarMovimientos dto = new DTOCajaCUConsultarMovimientos();
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
        newDto.setDescripcion("Sin descrpicion por ahora");
        newDto.setFormaDePago(movimiento.getMedioDePago().getFormaDePago().getNombreFormaDePago());
        newDto.setMonto(movimiento.getImporte());
        newDto.setMovimientoId(movimiento.getId());
        newDto.setTipoMovimiento(movimiento.getTipoMovimiento().getNombreTipoMovimiento());

        return newDto;
    }

    public List<DTOMovimientoCUConsultarMovimientos> listMovimientoToListDtoMovCabecera ( List<Movimiento> movimientos) {
        List<DTOMovimientoCUConsultarMovimientos> listaDto = new ArrayList<DTOMovimientoCUConsultarMovimientos>();
        for (Movimiento movimiento: movimientos) {
            listaDto.add(this.movimientoToDtoMovimientoCabecera(movimiento));
        }

        return listaDto;
    }
}
