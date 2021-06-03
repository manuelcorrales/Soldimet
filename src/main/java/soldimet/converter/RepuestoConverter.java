package soldimet.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import soldimet.domain.Articulo;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.StockArticulo;
import soldimet.repository.extendedRepository.ExtendedCostoRepuestoProveedorRepository;
import soldimet.service.dto.DTOStockRepuestoCabecera;

@Component
public class RepuestoConverter {

    @Autowired
    private ExtendedCostoRepuestoProveedorRepository costoRepuestoProveedorRepository;

    public DTOStockRepuestoCabecera convertirEntidadAModelo(StockArticulo stock) {
        DTOStockRepuestoCabecera dtoStockRepuestoCabecera = new DTOStockRepuestoCabecera();
        Articulo repuesto = stock.getArticulo();
        List<CostoRepuestoProveedor> costosProveedores = costoRepuestoProveedorRepository.findByArticulo(repuesto);
        for (CostoRepuestoProveedor costoProveedor : costosProveedores) {
            dtoStockRepuestoCabecera.addAplicacion(costoProveedor.getAplicacion());
        }
        dtoStockRepuestoCabecera.setCantidad(stock.getCantidad());
        dtoStockRepuestoCabecera.setSucursal(stock.getSucursal().getNombreSucursal());
        dtoStockRepuestoCabecera.setCodigo(repuesto.getCodigoArticuloProveedor());
        dtoStockRepuestoCabecera.setCosto(repuesto.getCostoProveedor());
        dtoStockRepuestoCabecera.setId(stock.getId());
        dtoStockRepuestoCabecera.setMarca(repuesto.getMarca().getNombreMarca());
        dtoStockRepuestoCabecera.setMedida(stock.getMedida().getMedida());
        dtoStockRepuestoCabecera.setVenta(repuesto.getValor());
        dtoStockRepuestoCabecera.setTipoRepuesto(repuesto.getTipoRepuesto().getNombreTipoRepuesto());



        return dtoStockRepuestoCabecera;
    }


    public Page<DTOStockRepuestoCabecera> convertirEntidadesAModelos(Page<StockArticulo> stockList) {
        ArrayList<DTOStockRepuestoCabecera> lista = new ArrayList<DTOStockRepuestoCabecera>();
        for (StockArticulo stockArticulo : stockList.getContent()) {
            lista.add(convertirEntidadAModelo(stockArticulo));
        }
        Page<DTOStockRepuestoCabecera> page = new PageImpl<DTOStockRepuestoCabecera>(
            lista,
            stockList.getPageable(),
            stockList.getTotalElements()
        );
        return page;
    }
}
