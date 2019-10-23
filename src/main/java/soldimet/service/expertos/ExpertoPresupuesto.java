package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import soldimet.constant.Globales;
import soldimet.converter.PresupuestoConverter;
import soldimet.domain.Aplicacion;
import soldimet.domain.Authority;
import soldimet.domain.Cilindrada;
import soldimet.domain.Cliente;
import soldimet.domain.CobranzaOperacion;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.CostoOperacion;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.DetallePedido;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.Empleado;
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.domain.EstadoDetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPersona;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.domain.Motor;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Persona;
import soldimet.domain.Presupuesto;
import soldimet.domain.Sucursal;
import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.AplicacionRepository;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.CilindradaRepository;
import soldimet.repository.ClienteRepository;
import soldimet.repository.EmpleadoRepository;
import soldimet.repository.EstadoCobranzaOperacionRepository;
import soldimet.repository.EstadoDetallePedidoRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.EstadoPresupuestoRepository;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;
import soldimet.repository.MotorRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.PresupuestoRepository;
import soldimet.repository.SucursalRepository;
import soldimet.repository.TipoParteMotorRepository;
import soldimet.repository.TipoRepuestoRepository;
import soldimet.security.AuthoritiesConstants;
import soldimet.service.dto.DTODatosMotorCUHacerPresupuesto;
import soldimet.service.dto.DTOEmpleado;
import soldimet.service.dto.DTOPresupuesto;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ExpertoPresupuesto {

    @Autowired
    private Globales globales;

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private TipoRepuestoRepository tipoRepuestoRepository;

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

    @Autowired
    private EstadoDetallePedidoRepository estadoDetallePedidoRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

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

                PedidoRepuesto pedido = pedidoRepuestoRepository.findByPresupuesto(presupuesto);

                pedido.setEstadoPedidoRepuesto(estadoPendienteDePedido);

                // GUARDAR
                pedidoRepuestoRepository.save(pedido);
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
        // Busco todos los presupuestos a mostrar dependiendo los permisos del usuario
        // Jefe o Admin pueden ver todos
        // Encargado y usuario pueden ver los asignados
        List<Presupuesto> presupuestos = null;
        Empleado empleado = expertoUsuarios.getEmpleadoLogeado();

        if (this.tieneAccesoATodosLosPresupuestos(empleado)) {
            presupuestos = presupuestoRepository.findAllByOrderByIdDesc();
        } else {
            presupuestos = presupuestoRepository.findBySucursal(empleado.getSucursal());
        }

        return presupuestoConverter.convertirEntidadesAModelos(presupuestos);
    }

    public List<Aplicacion> buscarAplicacionPorMotor(Long motorId) {
        try {
            Motor motorEncontrado = motorRepository.findById(motorId).get();
            List<Aplicacion> aplicacionesList = aplicacionRepository
                    .findByMotorOrderByNombreAplicacionAsc(motorEncontrado);

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
            TipoParteMotor tipoParteMotor = tipoParteMotorRepository.findById(dtoDatosMotor.getIdTiposPartesMotores())
                    .get();

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

    // public List<Cliente> buscarClientesPornombre(String nombreCliente) {

    // List<Cliente> clientes =
    // clienteRepository.findClienteByApellido(nombreCliente);

    // List<Persona> personas =
    // personaRepository.findPersonasByNombreIgnoreCaseContaining(nombreCliente);

    // clientes.addAll(clienteRepository.findClienteByPersonaIn(personas));

    // return clientes;
    // }

    public List<TipoRepuesto> buscarRepuestos(Long idTipoParteMotor) {
        TipoParteMotor tipoParte = tipoParteMotorRepository.findById(idTipoParteMotor).get();
        List<TipoRepuesto> tipoRepuestos = tipoRepuestoRepository.findByTipoParteMotor(tipoParte);
        return tipoRepuestos;
    }

    public List<Cliente> buscarTodosLosClientes() {
        EstadoPersona estadoClienteActivo = estadoPersonaRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_ALTA);
        List<Persona> personas = personaRepository.findByEstadoPersona(estadoClienteActivo);
        return clienteRepository.findClienteByPersonaIn(personas);
    }

    public EstadoPresupuesto buscarEstadoPresupuestoCreado() {
        return estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_CREADO);
    }

    public Presupuesto savePresupuesto(Presupuesto presupuesto) {
        if (presupuesto.getFechaCreacion() == null) {
            presupuesto.setFechaCreacion(LocalDate.now());
        }
        EstadoCobranzaOperacion estadoCobranzaOperacion = estadoCobranzaOperacionRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_COBRANZA_OPERACION_ALTA);

        DTOEmpleado empleado = expertoUsuarios.getEmpleadoActual();

        Sucursal sucursal = sucursalRepository.findById(empleado.getSucursalId()).get();
        presupuesto.setSucursal(sucursal);

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
            EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);
            Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoAceptado);
            if (this.validarCreacionPedido(editado)) {
                editado = crearPedidoRepuesto(editado);
            }
            return presupuestoConverter.convertirEntidadAModelo(editado);
        } catch (Exception e) {
            return null;
        }

    }

    private boolean validarCreacionPedido(Presupuesto presupuesto) {
        Boolean crearPedido = false;

        for (DetallePresupuesto detallePresupuesto : presupuesto.getDetallePresupuestos()) {
            if (!detallePresupuesto.getCobranzaRepuestos().isEmpty()) {
                crearPedido = true;
            }
        }

        return crearPedido;
    }

    private Presupuesto crearPedidoRepuesto(Presupuesto presupuesto) {
        PedidoRepuesto nuevoPedido = new PedidoRepuesto();
        EstadoPedidoRepuesto estadoCreado = estadoPedidoRepuestoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);
        nuevoPedido.setEstadoPedidoRepuesto(estadoCreado);
        nuevoPedido.setFechaCreacion(LocalDate.now());
        nuevoPedido.setPresupuesto(presupuesto);
        EstadoDetallePedido estadoPendiente = estadoDetallePedidoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_PENDIENTE_DE_PEDIDO);
        for (DetallePresupuesto detallePresupuesto : presupuesto.getDetallePresupuestos()) {
            if (!detallePresupuesto.getCobranzaRepuestos().isEmpty()) {
                DetallePedido nuevoDetallePedido = new DetallePedido();
                nuevoDetallePedido.setDetallePresupuesto(detallePresupuesto);
                nuevoDetallePedido.setEstadoDetallePedido(estadoPendiente);
                nuevoPedido.getDetallePedidos().add(nuevoDetallePedido);
            }

        }
        pedidoRepuestoRepository.save(nuevoPedido);
        return presupuesto;
    }

    public DTOPresupuesto cancelarPresupuesto(DTOPresupuesto dtoPresupuesto) {
        try {

            EstadoPresupuesto estadoPresupuestoCancelado = estadoPresupuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_CANCELADO);
            this.puedeCancelarPresupuesto(dtoPresupuesto);
            Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoPresupuestoCancelado);

            cancelarPedido(editado);

            cancelarMovimientos(editado);

            return presupuestoConverter.convertirEntidadAModelo(editado);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private void cancelarMovimientos(Presupuesto presupuesto) throws Exception {
        // falta cancelar los movimientos cuando los tenga :)
    }

    private void cancelarPedido(Presupuesto presupuesto) {
        EstadoPedidoRepuesto estadoPedidoRepuestoCancelado = estadoPedidoRepuestoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_CANCELADO);
        PedidoRepuesto pedido = pedidoRepuestoRepository.findByPresupuesto(presupuesto);
        pedido.setEstadoPedidoRepuesto(estadoPedidoRepuestoCancelado);

        EstadoDetallePedido estadoDetallePedido = estadoDetallePedidoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_DETALLE_PEDIDO_CANCELADO);
        pedido.cambiarEstadoADetalles(estadoDetallePedido);

        pedidoRepuestoRepository.save(pedido);
    }

    public DTOPresupuesto entregarPresupuesto(DTOPresupuesto dtoPresupuesto) {
        try {
            if (this.puedeEntregarPresupuesto(dtoPresupuesto)) {
                EstadoPresupuesto estadoEntregado = estadoPresupuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ENTREGADO);
                Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoEntregado);
                return presupuestoConverter.convertirEntidadAModelo(editado);
            }
            return null;

        } catch (Exception e) {
            return null;
        }
    }

    public DTOPresupuesto terminarPresupuesto(DTOPresupuesto dtoPresupuesto) {
        try {
            EstadoPresupuesto estadoTerminado = estadoPresupuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_TERMINADO);
            if (this.puedeTerminarPresupuesto(dtoPresupuesto)) {
                Presupuesto editado = cambiarEstadoPresupuesto(dtoPresupuesto, estadoTerminado);
                return presupuestoConverter.convertirEntidadAModelo(editado);
            }
            return null;

        } catch (Exception e) {
            return null;
        }
    }

    private Presupuesto cambiarEstadoPresupuesto(DTOPresupuesto dtoPresupuesto, EstadoPresupuesto estado)
            throws Exception {
        Presupuesto presupuesto = presupuestoRepository.findById(dtoPresupuesto.getCodigo()).get();
        presupuesto.setEstadoPresupuesto(estado);
        Presupuesto editado = presupuestoRepository.save(presupuesto);
        return editado;
    }

    private Boolean puedeTerminarPresupuesto(DTOPresupuesto dto) {
        Boolean puedeTerminar = false;
        Presupuesto presupuesto = presupuestoRepository.getOne(dto.getCodigo());
        PedidoRepuesto pedido = pedidoRepuestoRepository.findByPresupuesto(presupuesto);
        if (pedido.getEstadoPedidoRepuesto().getNombreEstado().equals(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO)) {
            puedeTerminar = true;
        }
        return puedeTerminar;

    }

    private Boolean puedeEntregarPresupuesto(DTOPresupuesto dto) {
        Presupuesto presupuesto = presupuestoRepository.getOne(dto.getCodigo());
        return presupuesto.getEstadoPresupuesto().getNombreEstado()
                .equals(globales.NOMBRE_ESTADO_PRESUPUESTO_TERMINADO);
    }

    private void puedeCancelarPresupuesto(DTOPresupuesto dto) throws Exception {
        Presupuesto presupuesto = presupuestoRepository.getOne(dto.getCodigo());
        if (!Arrays.asList(globales.PRESUPUESTO_POSIBLE_CANCELAR)
                .contains(presupuesto.getEstadoPresupuesto().getNombreEstado())) {
            throw new Exception();
        }
    }

    public List<CostoRepuesto> buscarCostoRepuestoPresupuesto(Long presupuestoId) {

        List<CostoRepuesto> costosRepuestos = new ArrayList<CostoRepuesto>();
        try {

            Presupuesto presupuesto = presupuestoRepository.getOne(presupuestoId);
            PedidoRepuesto pedidoRepuesto = pedidoRepuestoRepository.findByPresupuesto(presupuesto);
            String estadoPedido = pedidoRepuesto.getEstadoPedidoRepuesto().getNombreEstado();
            if (Arrays.asList(globales.PEDIDOS_POSIBLES_DE_MOVIMIENTOS).contains(estadoPedido)) {
                for (DetallePedido detallePedido : pedidoRepuesto.getDetallePedidos()) {
                    for (CostoRepuesto CostoRepuesto : detallePedido.getCostoRepuestos()) {
                        costosRepuestos.add(CostoRepuesto);
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            return costosRepuestos;
        }

    }

    private Boolean tieneAccesoATodosLosPresupuestos(Empleado empleado) {
        Set<Authority> authorities = empleado.getPersona().getUser().getAuthorities();

        List<String> authoritiesNames = new ArrayList<String>();
        // Spring permite filtrar todo a nivel de endpoint por eso filtro así
        // nternamente
        // Tambien se puede pero creando una relacion entre el objeto presupuesto y el
        // user (malisimo)
        for (Authority authority : authorities) {
            authoritiesNames.add(authority.getName());
        }

        return authoritiesNames.contains(AuthoritiesConstants.ADMIN)
                || authoritiesNames.contains(AuthoritiesConstants.JEFE);
    }
}
