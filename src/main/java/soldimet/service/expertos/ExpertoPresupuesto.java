package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.constant.Globales;
import soldimet.converter.PresupuestoConverter;
import soldimet.domain.Aplicacion;
import soldimet.domain.Articulo;
import soldimet.domain.Cilindrada;
import soldimet.domain.Cliente;
import soldimet.domain.CobranzaOperacion;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.CostoOperacion;
import soldimet.domain.DetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPersona;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.domain.Motor;
import soldimet.domain.Operacion;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Persona;
import soldimet.domain.Presupuesto;
import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.repository.AplicacionRepository;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.CilindradaRepository;
import soldimet.repository.ClienteRepository;
import soldimet.repository.EstadoCobranzaOperacionRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.EstadoPresupuestoRepository;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;
import soldimet.repository.MotorRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.PresupuestoRepository;
import soldimet.repository.TipoParteMotorRepository;
import soldimet.repository.TipoRepuestoRepository;
import soldimet.service.dto.DTODatosMotorCUHacerPresupuesto;
import soldimet.service.dto.DTOParOperacionPresupuestoCUHacerPresupuesto;
import soldimet.service.dto.DTOPresupuesto;

@Service
public class ExpertoPresupuesto {

    @Autowired
    private Globales globales;

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;
    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private EstadoPresupuestoRepository estadoPresupuestoRepository;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private AplicacionRepository aplicacionRepository;

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private PresupuestoConverter presupuestoConverter;

    @Autowired
    private ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    @Autowired
    private TipoParteMotorRepository tipoParteMotorRepository;

    @Autowired
    private CilindradaRepository cilindradaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private EstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository;

    // Cambio el estado del presupuesto y del pedido de repuestos
    public void aceptarPresupuesto(Long idPresupuesto) {

        Presupuesto presupuesto = buscarPresupuesto(idPresupuesto);

        EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);
        if (presupuesto.getEstadoPresupuesto().equals(estadoAceptado)) {

            // este presupuesto ya fue aceptado
            // avisar por pantalla la fecha de aceptacion
            LocalDate fechaAceptado = presupuesto.getFechaAceptado();

        } else {
            // cambio el estado del presupuesto a aceptado y tambien del pedido de repuesto
            EstadoPresupuesto estadoCreado = estadoPresupuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_CREADO);
            if (presupuesto.getEstadoPresupuesto().equals(estadoCreado)) {

                presupuesto.setEstadoPresupuesto(estadoAceptado);
                presupuesto.setFechaAceptado(LocalDate.now());

                EstadoPedidoRepuesto estadoPendienteDePedido = estadoPedidoRepuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);

                List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findByPresupuesto(presupuesto);
                for (PedidoRepuesto pedidoRepuesto : pedidos) {
                    pedidoRepuesto.setEstadoPedidoRepuesto(estadoPendienteDePedido);
                }

                // GUARDAR
                pedidoRepuestoRepository.saveAll(pedidos);
            }
        }
    }

    // Cancelo el Presupuesto y tambien los movimientos realizados por este
    // presupuesto
    public void cancelarPresupuesto(Long idPresupuesto) {
        // DAR AVISO POR PANTALLA QUE SI SE CANCELA, SE BORRAN LOS MOVIMIENTOS
        Presupuesto presupuesto = buscarPresupuesto(idPresupuesto);
        // primero me fijo si el presupuesto esta aceptado
        // si no lo esta, devuelvo el estado en el que se encuentra
        EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);

        if (presupuesto.getEstadoPresupuesto().equals(estadoAceptado)) {
            // presupuesto aceptado, comienzo el CU

        } else {

            // aviso que el presupuesto no se encuentra aceptado
            // no se puede cancelar y paso el nombre del estado
        }

    }

    private Presupuesto buscarPresupuesto(Long id) {
        try {
            return presupuestoRepository.findById(id).get();
        } catch (NullPointerException e) {
            return null;
        }
    }

    public List<DTOPresupuesto> buscarPresupuestos() {

        List<Presupuesto> presupuestos = presupuestoRepository.findAll();

        return presupuestoConverter.convertirEntidadesAModelos(presupuestos);
    }

    public List<Aplicacion> buscarAplicacionPorMotor(Long motorId) {
        try {
            Motor motorEncontrado = motorRepository.findById(motorId).get();
            Set<Aplicacion> aplicacionesSet = motorEncontrado.getAplicacions();
            List<Aplicacion> aplicacionesList = new ArrayList<Aplicacion>();
            for (Aplicacion aplicacion : aplicacionesSet) {
                aplicacionesList.add(aplicacion);
            }

            return aplicacionesList;
        } catch (NullPointerException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<CostoOperacion> buscarOperacionesPresupuesto(DTODatosMotorCUHacerPresupuesto dtoDatosMotor) {

        List<CostoOperacion> listaDTO = new ArrayList<CostoOperacion>();

        try {
            Aplicacion aplicacion = aplicacionRepository.findById(dtoDatosMotor.getIdAplicacion()).get();

            motorRepository.existsById(dtoDatosMotor.getIdMotor());
            Cilindrada cilindrada = cilindradaRepository.findById(dtoDatosMotor.getIdCilindrada()).get();
            TipoParteMotor tipoParteMotor = tipoParteMotorRepository.findById(dtoDatosMotor.getIdTiposPartesMotores()).get();

            ListaPrecioRectificacionCRAM listaPrecio = listaPrecioRectificacionCRAMRepository
                    .findByNumeroGrupo(aplicacion.getNumeroGrupo());

            if (listaPrecio != null) {
                ListaPrecioDesdeHasta ultimaListaPrecio = null; // listaPrecio.getFechas().iterator().next();
                for (ListaPrecioDesdeHasta listaPrecioDesde : listaPrecio.getFechas()) {
                    if (listaPrecioDesde.getFechaHasta() == null) {
                        ultimaListaPrecio = listaPrecioDesde;
                    }
                }
                for (CostoOperacion costoOperacion : ultimaListaPrecio.getCostoOperacions()) {
                    if (costoOperacion.getCilindrada() == cilindrada
                            && costoOperacion.getTipoParteMotor() == tipoParteMotor) {
                        listaDTO.add(costoOperacion);
                    }
                }
            }

        } catch (NullPointerException e) {

            e.printStackTrace();
        } finally {
            return listaDTO;
        }
    }

    public List<Cliente> buscarClientesPornombre(String nombreCliente) {

        List<Cliente> clientes = clienteRepository.findClienteByApellido(nombreCliente);

        List<Persona> personas = personaRepository.findPersonasByNombreIgnoreCaseContaining(nombreCliente);

        clientes.addAll(clienteRepository.findClienteByPersonaIn(personas));

        return clientes;
    }

    public List<TipoRepuesto> buscarRepuestos(Long idTipoParteMotor) {
        TipoParteMotor tipoParte = tipoParteMotorRepository.findById(idTipoParteMotor).get();
        List<TipoRepuesto> tipoRepuestos = tipoRepuestoRepository.findByTipoParteMotor(tipoParte);
        return tipoRepuestos;
    }

    public List<Cliente> buscarTodosLosClientes() {
        EstadoPersona estadoClienteActivo = estadoPersonaRepository.findByNombreEstado("Alta");
        List<Persona> personas = personaRepository.findByEstadoPersona(estadoClienteActivo);
        return clienteRepository.findClienteByPersonaIn(personas);
    }

    public EstadoPresupuesto buscarEstadoPresupuestoCreado() {
        return estadoPresupuestoRepository.findByNombreEstado("Creado");
    }

    public Presupuesto savePresupuesto(Presupuesto presupuesto) {
        if (presupuesto.getFechaCreacion() == null) {
            presupuesto.setFechaCreacion(LocalDate.now());
        }
        EstadoCobranzaOperacion estadoCobranzaOperacion = estadoCobranzaOperacionRepository
                .findByNombreEstado("Creado");
        for (DetallePresupuesto detalle : presupuesto.getDetallePresupuestos()) {
            Float totalDetalle = new Float(0);
            for (CobranzaOperacion cobranzaOperacion : detalle.getCobranzaOperacions()) {
                totalDetalle += cobranzaOperacion.getCobranzaOperacion();
                cobranzaOperacion.setEstadoCobranzaOperacion(estadoCobranzaOperacion);
            }
            for (CobranzaRepuesto cobranzaRepuesto : detalle.getCobranzaRepuestos()) {
                totalDetalle += cobranzaRepuesto.getValor();
            }
            detalle.setImporte(totalDetalle);
        }

        Presupuesto presupuestoNuevo = presupuestoRepository.save(presupuesto);
        return presupuestoNuevo;
    }

    public DTOPresupuesto aceptarPresupuesto(DTOPresupuesto dtoPresupuesto) {
        try {
            EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository.findByNombreEstado("Aceptado");
            Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoAceptado);
            editado = crearPedidoRepuesto(editado);
            return presupuestoConverter.convertirEntidadAModelo(editado);
        } catch (Exception e) {
            return null;
        }

    }

    private Presupuesto crearPedidoRepuesto(Presupuesto presupuesto) {
        PedidoRepuesto nuevoPedido = new PedidoRepuesto();
        EstadoPedidoRepuesto estadoCreado = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);
        nuevoPedido.setEstadoPedidoRepuesto(estadoCreado);
        nuevoPedido.setFechaCreacion(LocalDate.now());
        nuevoPedido.setPresupuesto(presupuesto);
        for(DetallePresupuesto detallePresupuesto: presupuesto.getDetallePresupuestos()){
            DetallePedido nuevoDetallePedido = new DetallePedido();
            nuevoDetallePedido.setDetallePresupuesto(detallePresupuesto);
            nuevoPedido.getDetallePedidos().add(nuevoDetallePedido);
        }
        pedidoRepuestoRepository.save(nuevoPedido);
        return presupuesto;
    }

    public DTOPresupuesto cancelarPresupuesto(DTOPresupuesto dtoPresupuesto) {
        try {
            EstadoPresupuesto estadoCancelado = estadoPresupuestoRepository.findByNombreEstado("Cancelado");
            Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoCancelado);
            return presupuestoConverter.convertirEntidadAModelo(editado);
        } catch (Exception e) {
            return null;
        }
    }

    public DTOPresupuesto entregarPresupuesto(DTOPresupuesto dtoPresupuesto) {
        try {
            EstadoPresupuesto estadoEntregado = estadoPresupuestoRepository.findByNombreEstado("Entregado");
            Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoEntregado);
            return presupuestoConverter.convertirEntidadAModelo(editado);
        } catch (Exception e) {
            return null;
        }
    }

    public DTOPresupuesto terminarPresupuesto(DTOPresupuesto dtoPresupuesto) {
        try {
            EstadoPresupuesto estadoTerminado = estadoPresupuestoRepository.findByNombreEstado("Terminado");
            Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoTerminado);
            return presupuestoConverter.convertirEntidadAModelo(editado);
        } catch (Exception e) {
            return null;
        }
    }

    private Presupuesto cambiarEstadoPresupuesto(DTOPresupuesto dtoPresupuesto, EstadoPresupuesto estado)
            throws NullPointerException {
        Presupuesto presupuesto = presupuestoRepository.findById(dtoPresupuesto.getCodigo()).get();
        presupuesto.setEstadoPresupuesto(estado);
        Presupuesto editado = presupuestoRepository.save(presupuesto);
        return editado;
    }
}
