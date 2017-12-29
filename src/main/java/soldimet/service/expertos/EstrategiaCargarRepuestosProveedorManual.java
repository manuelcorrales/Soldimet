/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.constant.Globales;
import soldimet.domain.Articulo;
import soldimet.domain.EstadoArticulo;
import soldimet.domain.HistorialPrecio;
import soldimet.domain.Marca;
import soldimet.domain.Persona;
import soldimet.domain.PrecioRepuesto;
import soldimet.domain.Rubro;
import soldimet.domain.TipoRepuesto;
import soldimet.domain.Proveedor;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.EstadoArticuloRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.HistorialPrecioRepository;
import soldimet.repository.MarcaRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.PrecioRepuestoRepository;
import soldimet.repository.ProveedorRepository;
import soldimet.repository.RubroRepository;
import soldimet.repository.TipoParteMotorRepository;
import soldimet.repository.TipoRepuestoRepository;


/**
 *
 * @author Manu
 */
@Service
@Transactional
public class EstrategiaCargarRepuestosProveedorManual  implements EstrategiaCargarRepuestosProveedor {

    @Autowired
    private Globales globales;

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private RubroRepository rubroRepository;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private EstadoArticuloRepository estadoArticuloRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private HistorialPrecioRepository historialPrecioRepository;

    @Autowired
    private PrecioRepuestoRepository precioRepuestoRepository;

    @Autowired
    private TipoParteMotorRepository tipoParteMotorRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Override
    public void cargarRepuestos(String fuente, String nombreProveedor, String rubro, String descripcion,
            String marca, String tiporepuesto, float precio,String codigoArticuloProveedor, String ubicacion){

        Set<HistorialPrecio> historiales = new HashSet();
        HistorialPrecio historial = new HistorialPrecio();
        PrecioRepuesto prec = new PrecioRepuesto();
        historial.setPrecioRepuesto(prec);
        historial.setFechaHistorial(LocalDate.now());
        prec.setPrecioPublico(precio);

        try{
            Persona personaProveedor = personaRepository.findPersonaByNombre(nombreProveedor);
            Proveedor prov = proveedorRepository.findByPersona(personaProveedor);

            Rubro rub = rubroRepository.findByNombreRubro(rubro);

            Marca marc = marcaRepository.findByNombreMarca(marca);

            TipoRepuesto tipoRep = tipoRepuestoRepository.findByNombreTipoRepuesto(tiporepuesto);

            EstadoArticulo estadoAlta =estadoArticuloRepository.findByNombreEstado(globales.NOMBRE_ESTADO_ARTICULO_ALTA);


            Articulo articulo = new Articulo();

            articulo.setMarca(marc);
            articulo.setDescripcion(descripcion);
            articulo.setEstado(estadoAlta);
            articulo.setCodigoArticuloProveedor(codigoArticuloProveedor);
            articulo.setHistorialPrecios(historiales);
            articulo.setProveedor(prov);
            articulo.setRubro(rub);
            articulo.setTipoRepuesto(tipoRep);

            articuloRepository.save(articulo);

        }catch(NullPointerException e){

    e.printStackTrace();
        }






    }
}
