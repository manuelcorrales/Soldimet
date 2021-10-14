package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.constant.Globales;
import soldimet.converter.RepuestoConverter;
import soldimet.domain.Articulo;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.Empleado;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.Marca;
import soldimet.domain.MedidaArticulo;
import soldimet.domain.StockArticulo;
import soldimet.domain.TipoRepuesto;
import soldimet.domain.User;
import soldimet.repository.extendedRepository.ExtendedArticuloRepository;
import soldimet.repository.extendedRepository.ExtendedCostoRepuestoProveedorRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoArticuloRepository;
import soldimet.repository.extendedRepository.ExtendedMarcaRepository;
import soldimet.repository.extendedRepository.ExtendedStockArticuloRepository;
import soldimet.repository.extendedRepository.ExtendedTipoRepuestoRepository;
import soldimet.service.ErrorToURIException;
import soldimet.service.UserService;
import soldimet.service.dto.DTOStockRepuestoCabecera;

@Service
@Transactional
public class ExpertoRepuestos {

    @Autowired
    private Globales globales;

    @Autowired
    private ExtendedEstadoArticuloRepository estadoArticuloRepository;

    @Autowired
    private ExtendedTipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private ExtendedArticuloRepository articuloRepository;

    @Autowired
    private ExtendedCostoRepuestoProveedorRepository costoRepuestoProveedorRepository;

    @Autowired
    private ExtendedMarcaRepository marcaRepository;

    @Autowired
    private RepuestoConverter repuestoConverter;

    @Autowired
    private ExtendedStockArticuloRepository stockRepository;

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    public Page<Articulo> buscarRepuestosProveedor(Long marca, String filtro, Pageable paging) {
        EstadoArticulo estadoAlta = estadoArticuloRepository.findByNombreEstado(globales.NOMBRE_ESTADO_ARTICULO_ALTA);
        return articuloRepository.findByEstadoAndCodigoArticuloProveedorContainsAndMarcaIdOrderByIdDesc(estadoAlta, filtro, marca, paging);
    }

    public Page<CostoRepuestoProveedor> buscarCostoRepuestosProveedor(String filtro, Pageable paging) {
        return costoRepuestoProveedorRepository.findByAplicacionNombreAplicacionContainsOrAplicacionMotorMarcaMotorContainsOrTipoRepuestoNombreTipoRepuestoContainsOrArticuloCodigoArticuloProveedorContainsOrderByIdDesc(
            filtro,
            filtro,
            filtro,
            filtro,
            paging
        );
    }

    public List<Articulo> actualizarListaRepuestosProveedor(List<Articulo> articulos) {
        return articuloRepository.saveAll(articulos);
    }

    public Articulo crearRepuestoProveedor(Articulo articulo) {
        if (articuloRepository.existsByCodigoArticuloProveedor(articulo.getCodigoArticuloProveedor())) {
            throw new ErrorToURIException(
                "Ya existe este código en otro artículo!",
                Articulo.class.getName(),
                "codigoArticuloProveedorexists"
            );
        }

        return this.guardarArticulo(articulo);
    }

    public Articulo actualizarRepuestoProveedor(Articulo articulo) {
        return this.guardarArticulo(articulo);
    }

    private Articulo guardarArticulo(Articulo articulo) {
        EstadoArticulo estadoAlta = estadoArticuloRepository.findByNombreEstado(globales.NOMBRE_ESTADO_ARTICULO_ALTA);
        TipoRepuesto tiposRepuesto = tipoRepuestoRepository.getOne(articulo.getTipoRepuesto().getId());
        Marca marca = marcaRepository.getOne(articulo.getMarca().getId());
        articulo.setEstado(estadoAlta);
        articulo.setTipoRepuesto(tiposRepuesto);
        articulo.setMarca(marca);
        articulo.setFechaCosto(LocalDate.now());

        return articuloRepository.save(articulo);
    }

    public Page<DTOStockRepuestoCabecera> buscarStockCabecera(String filtro, Pageable pageable) {
        Empleado empleado = expertoUsuarios.getEmpleadoLogeado();
        List<CostoRepuestoProveedor> repuestosProveedor = costoRepuestoProveedorRepository.findByAplicacionNombreAplicacionContainsOrAplicacionMotorMarcaMotorContainsOrTipoRepuestoNombreTipoRepuestoContainsOrArticuloCodigoArticuloProveedorContainsOrderByIdDesc(
            filtro,
            filtro,
            filtro,
            filtro
        );
        List<Articulo> articulos = new ArrayList<>();
        for (CostoRepuestoProveedor repuesto : repuestosProveedor) {
            articulos.add(repuesto.getArticulo());
        }
        Page<StockArticulo> stocks = stockRepository.findBySucursalAndArticuloEstadoNombreEstadoAndArticuloCodigoArticuloProveedorContainsOrArticuloInAndSucursalOrderByArticuloCodigoArticuloProveedorAsc(
            empleado.getSucursal(),
            globales.NOMBRE_ESTADO_ARTICULO_ALTA,
            filtro,
            articulos,
            empleado.getSucursal(),
            pageable
        );

        return repuestoConverter.convertirEntidadesAModelos(stocks);
    }

    public DTOStockRepuestoCabecera actualizarStock(DTOStockRepuestoCabecera stock) {
        Optional<StockArticulo> optionalStockArticulo = stockRepository.findById(stock.getId());
        if (!optionalStockArticulo.isPresent()) {
            new ErrorToURIException("No se pudo actualizar el stock", ExpertoRepuestos.class.getName(), "StockInexistente");
        }
        StockArticulo stockArticulo = optionalStockArticulo.get();
        stockArticulo.setCantidad(stock.getCantidad());
        return repuestoConverter.convertirEntidadAModelo(stockRepository.save(stockArticulo));
    }

    public StockArticulo descontarStockDesdeArticuloyMedida(Articulo articulo, MedidaArticulo medida, Integer cantidadUsada) {
        Integer cantidadEnStock = 0;
        Empleado empleado = expertoUsuarios.getEmpleadoLogeado();
        StockArticulo stock = stockRepository.findBySucursalAndArticuloIdAndMedidaId(
            empleado.getSucursal(),
            articulo.getId(),
            medida.getId()
        );
        // Si no se encuentra stock lo creo y lo marco como negativo
        if (stock == null) {
            stock = new StockArticulo();
            stock.setArticulo(articulo);
            stock.setSucursal(empleado.getSucursal());
            stock.setMedida(medida);
            cantidadEnStock = 0;
        } else {
            cantidadEnStock = stock.getCantidad();
        }
        stock.setCantidad(cantidadEnStock - cantidadUsada);
        return stockRepository.save(stock);
    }

    public StockArticulo checkStock(Long medidaId, Long articuloID) {
        Empleado empleado = expertoUsuarios.getEmpleadoLogeado();
        return stockRepository.findBySucursalAndArticuloIdAndMedidaId(empleado.getSucursal(), articuloID, medidaId);
    }
}
