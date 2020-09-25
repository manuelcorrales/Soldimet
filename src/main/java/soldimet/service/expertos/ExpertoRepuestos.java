package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import soldimet.constant.Globales;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.Marca;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.extendedRepository.ExtendedArticuloRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoArticuloRepository;
import soldimet.repository.extendedRepository.ExtendedMarcaRepository;
import soldimet.repository.extendedRepository.ExtendedTipoRepuestoRepository;
import soldimet.service.ErrorToURIException;

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
    private ExtendedMarcaRepository marcaRepository;

	public List<Articulo> buscarRepuestosProveedor() {
        EstadoArticulo estadoAlta = estadoArticuloRepository.findByNombreEstado(globales.NOMBRE_ESTADO_ARTICULO_ALTA);
        List<TipoRepuesto> tiposRepuestos = tipoRepuestoRepository.findAll();
        return articuloRepository.findDistinctByEstadoAndTipoRepuestoIn(estadoAlta, tiposRepuestos);
	}

	public List<Articulo> actualizarListaRepuestosProveedor(List<Articulo> articulos) {
        return articuloRepository.saveAll(articulos);
	}

	public Articulo crearRepuestoProveedor(Articulo articulo) {
        if (articuloRepository.existsByCodigoArticuloProveedor(articulo.getCodigoArticuloProveedor())){
            throw new ErrorToURIException("Ya existe este código en otro artículo!", Articulo.class.getName(), "codigoArticuloProveedorexists");
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

}
