package soldimet.service.expertos;

import java.io.File;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;

import org.javatuples.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import soldimet.constant.Globales;
import soldimet.converter.PresupuestoConverter;
import soldimet.domain.Aplicacion;
import soldimet.domain.Authority;
import soldimet.domain.Cilindrada;
import soldimet.domain.Cliente;
import soldimet.domain.Cliente_;
import soldimet.domain.CobranzaOperacion;
import soldimet.domain.CobranzaRepuesto;
import soldimet.domain.CostoOperacion;
import soldimet.domain.CostoRepuesto;
import soldimet.domain.CostoRepuestoProveedor;
import soldimet.domain.DetallePedido;
import soldimet.domain.DetallePresupuesto;
import soldimet.domain.Empleado;
import soldimet.domain.EstadoCobranzaOperacion;
import soldimet.domain.EstadoCostoRepuesto;
import soldimet.domain.EstadoDetallePedido;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPersona;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.domain.Motor;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Persona;
import soldimet.domain.Persona_;
import soldimet.domain.Presupuesto;
import soldimet.domain.Presupuesto_;
import soldimet.domain.Sucursal;
import soldimet.domain.Sucursal_;
import soldimet.domain.TipoParteMotor;
import soldimet.domain.TipoRepuesto;
import soldimet.repository.CilindradaRepository;
import soldimet.repository.CobranzaRepuestoRepository;
import soldimet.repository.MotorRepository;
import soldimet.repository.SucursalRepository;
import soldimet.repository.extendedRepository.ExtendedAplicacionRepository;
import soldimet.repository.extendedRepository.ExtendedClienteRepository;
import soldimet.repository.extendedRepository.ExtendedCostoRepuestoProveedorRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoCobranzaOperacionRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoCostoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoDetallePedidoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoPedidoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoPersonaRepository;
import soldimet.repository.extendedRepository.ExtendedEstadoPresupuestoRepository;
import soldimet.repository.extendedRepository.ExtendedListaPrecioRectificacionCRAMRepository;
import soldimet.repository.extendedRepository.ExtendedPedidoRepuestoRepository;
import soldimet.repository.extendedRepository.ExtendedPersonaRepository;
import soldimet.repository.extendedRepository.ExtendedPresupuestoRepository;
import soldimet.repository.extendedRepository.ExtendedTipoParteMotorRepository;
import soldimet.repository.extendedRepository.ExtendedTipoRepuestoRepository;
import soldimet.security.AuthoritiesConstants;
import soldimet.service.ErrorToURIException;
import soldimet.service.dto.DTODatosMotorCUHacerPresupuesto;
import soldimet.service.dto.DTOEmpleado;
import soldimet.service.dto.DTOPresupuesto;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class ExpertoPresupuesto {

    private final Logger log = LoggerFactory.getLogger(ExpertoCaja.class);

    @Autowired
    private Globales globales;

    @Autowired
    private ExpertoUsuarios expertoUsuarios;

    @Autowired
    private ExpertoImpresionPresupuesto expertoImpresionPresupuesto;

    @Autowired
    private SucursalRepository sucursalRepository;

    @Autowired
    private ExtendedTipoRepuestoRepository tipoRepuestoRepository;

    @Autowired
    private ExtendedEstadoPresupuestoRepository estadoPresupuestoRepository;

    @Autowired
    private ExtendedEstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private ExtendedPedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private ExtendedPresupuestoRepository presupuestoRepository;

    @Autowired
    private ExtendedAplicacionRepository aplicacionRepository;

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private PresupuestoConverter presupuestoConverter;

    @Autowired
    private ExtendedListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    @Autowired
    private ExtendedTipoParteMotorRepository tipoParteMotorRepository;

    @Autowired
    private CilindradaRepository cilindradaRepository;

    @Autowired
    private ExtendedClienteRepository clienteRepository;

    @Autowired
    private ExtendedPersonaRepository personaRepository;

    @Autowired
    private ExtendedEstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private ExtendedEstadoCobranzaOperacionRepository estadoCobranzaOperacionRepository;

    @Autowired
    private ExtendedEstadoDetallePedidoRepository estadoDetallePedidoRepository;

    @Autowired
    private ExtendedEstadoCostoRepuestoRepository estadoCostoRepuestoRepository;

    @Autowired
    private ExtendedCostoRepuestoProveedorRepository costoRepuestoProveedorRepository;

    @Autowired
    private CobranzaRepuestoRepository cobranzaRepuestoRepository;

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
            log.error(e.getMessage());
            return null;
        }
    }

    public Page<DTOPresupuesto> buscarPresupuestos(String filtro, Pageable pageable) {
        // Busco todos los presupuestos a mostrar dependiendo los permisos del usuario
        // Jefe o Admin pueden ver todos
        // Encargado y usuario pueden ver los asignados
        Page<Presupuesto> presupuestos = null;
        Empleado empleado = expertoUsuarios.getEmpleadoLogeado();

        if (this.tieneAccesoATodosLosPresupuestos(empleado)) {
            presupuestos = presupuestoRepository
                    .findDistinctByClientePersonaNombreContainsOrClientePersonaApellidoContainsOrDetallePresupuestosMotorMarcaMotorContainsOrDetallePresupuestosAplicacionNombreAplicacionContainsOrderByIdDesc(
                            filtro, filtro, filtro, filtro, pageable);
        } else {
            Sucursal sucursal = empleado.getSucursal();
            Specification<Presupuesto> specs = Specification.where(
                    (root, query, builder) -> {
                        final Join<Presupuesto, Sucursal> sucursales = root.join(Presupuesto_.SUCURSAL, JoinType.INNER);
                        final Join<Presupuesto, Cliente> clientes = root.join(Presupuesto_.CLIENTE, JoinType.INNER);
                        final Join<Persona, Cliente> personas = clientes.join(Cliente_.PERSONA, JoinType.INNER);
                        Predicate isSucursal = builder.equal(builder.lower(sucursales.get(Sucursal_.ID)),
                                sucursal.getId());
                        Predicate isModelo = builder.equal(root.get(Presupuesto_.MODELO), true);
                        Predicate isPersona = builder.or(
                            builder.like(builder.lower(personas.get(Persona_.NOMBRE)), filtro),
                            builder.like(builder.lower(personas.get(Persona_.APELLIDO)), filtro)
                        );
                        Predicate and = builder.and(isSucursal, isPersona);
                        return builder.or(and, isModelo);

                }
            );
            presupuestos = presupuestoRepository.findAll(specs, pageable);

            // presupuestos = presupuestoRepository
            //         .findByClientePersonaNombreContainsOrClientePersonaApellidoContainsOrDetallePresupuestosMotorMarcaMotorContainsOrDetallePresupuestosAplicacionNombreAplicacionContainsAndSucursalAndModeloOrderByIdDesc(
            //                 filtro, filtro, filtro, sucursal, true, pageable);
        }

        return presupuestoConverter.convertirEntidadesAModelos(presupuestos);
    }



    public Page<Aplicacion> buscarAplicaciones(String filtro, Pageable pageable) {
        Page<Aplicacion> aplicaciones = aplicacionRepository
                    .findByNombreAplicacionContainsOrMotorMarcaMotorContainsOrderByIdDesc(
                            filtro, filtro, pageable);


        return aplicaciones;
    }

    public List<Aplicacion> buscarAplicacionPorMotor(Long motorId) {
        try {
            Motor motorEncontrado = motorRepository.findById(motorId).get();
            List<Aplicacion> aplicacionesList = aplicacionRepository
                    .findByMotorOrderByNombreAplicacionAsc(motorEncontrado);

            return aplicacionesList;
        } catch (NullPointerException e) {
            log.error(e.getMessage());
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
            log.error(e.getMessage());
        } finally {
            return listaDTO;
        }
    }

    public List<TipoRepuesto> buscarRepuestos(Long idTipoParteMotor) {
        TipoParteMotor tipoParte = tipoParteMotorRepository.findById(idTipoParteMotor).get();
        TipoParteMotor tipoParte2 = tipoParteMotorRepository.findById(globales.tipoParteMotorYTapaID).get();
        List<TipoParteMotor> tipos = new ArrayList();
        tipos.add(tipoParte);
        tipos.add(tipoParte2);
        List<TipoRepuesto> tipoRepuestos = tipoRepuestoRepository.findByTipoParteMotorIn(tipos);
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
                // Fuerzo a guardar cuando el objeto no es nuevo
                cobranzaRepuesto = cobranzaRepuestoRepository.save(cobranzaRepuesto);
                this.actualizarListaDeCostoRepuestoProvedor(cobranzaRepuesto, detalle.getAplicacion(),
                        detalle.getCilindrada());
                totalDetalle += cobranzaRepuesto.getValor();
            }
            detalle.setImporte(totalDetalle);
        }

        return presupuestoRepository.save(presupuesto);
    }

    private void actualizarListaDeCostoRepuestoProvedor(CobranzaRepuesto cobranzaRepuesto, Aplicacion aplicacion,
            Cilindrada cilindrada) {
        // Reviso si ya existe la union del artículo con todos los detalles del motor
        // sino creo una nueva para que despues sea más facil encontrarla
        if (cobranzaRepuesto.getArticulo() != null) {
            List<CostoRepuestoProveedor> costosRepuestos = costoRepuestoProveedorRepository
                    .findByAplicacionAndCilindradaAndTipoRepuestoAndArticulo(aplicacion, cilindrada,
                            cobranzaRepuesto.getTipoRepuesto(), cobranzaRepuesto.getArticulo());
            if (costosRepuestos.isEmpty()) {
                CostoRepuestoProveedor nRepuestoProveedor = new CostoRepuestoProveedor();
                nRepuestoProveedor.setAplicacion(aplicacion);
                nRepuestoProveedor.setArticulo(cobranzaRepuesto.getArticulo());
                nRepuestoProveedor.setCilindrada(cilindrada);
                nRepuestoProveedor.setTipoRepuesto(cobranzaRepuesto.getTipoRepuesto());
                costoRepuestoProveedorRepository.save(nRepuestoProveedor);
            }
        }

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
            log.error(e.getMessage());
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
                EstadoCostoRepuesto costoPendientePedido = estadoCostoRepuestoRepository
                        .findByNombreEstado(globales.NOMBRE_ESTADO_COSTO_REPUESTO_PENDIENTE);
                DetallePedido nuevoDetallePedido = new DetallePedido();
                for (CobranzaRepuesto cobranza : detallePresupuesto.getCobranzaRepuestos()) {
                    CostoRepuesto newCosto = new CostoRepuesto();
                    newCosto.setArticulo(cobranza.getArticulo());
                    newCosto.setEstado(costoPendientePedido);
                    newCosto.setTipoRepuesto(cobranza.getTipoRepuesto());
                    nuevoDetallePedido.getCostoRepuestos().add(newCosto);
                }
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
            log.error(e.getMessage());
            throw new ErrorToURIException("No se puede cancelar este presupuesto", ExpertoPresupuesto.class.getName(), "ErrorCancelarPresupuesto");
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
            log.error(e.getMessage());
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
            log.error(e.getMessage());
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
        if (pedido == null
                || pedido.getEstadoPedidoRepuesto().getNombreEstado().equals(globales.NOMBRE_ESTADO_PEDIDO_RECIBIDO)) {
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
        if (!Arrays.asList(globales.PRESUPUESTO_POSIBLE_CANCELAR)
                .contains(dto.getEstado())) {
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
            log.error(e.getMessage());
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

    public Presupuesto getPresupuesto(Long presupuestoId) throws EntityNotFoundException {
        Presupuesto pres = presupuestoRepository.getOne(presupuestoId);
        for (DetallePresupuesto det : pres.getDetallePresupuestos()) {
            det.getTotalOperaciones();
            det.getTotalRepuestos();
        }
        pres.getCliente().getPersona().getDireccion();
        pres.getSucursal();

        return pres;
    }

    public Pair<File, String> imprimirPresupuesto(Long idPresupuesto) throws Exception {

        Optional<Presupuesto> optPresupuesto = presupuestoRepository.findById(idPresupuesto);
        if (!optPresupuesto.isPresent()) {
            throw new Exception("No se encontro este presupuesto");
        }
        Presupuesto presupuesto = optPresupuesto.get();

        File reporte = expertoImpresionPresupuesto.imprimirPresupuesto(presupuesto, presupuesto.getImporteTotal(),
                presupuesto.getCliente());

        return new Pair(reporte, presupuesto.getId());
    }

    public Presupuesto buscarPresupuestoExistente(Long aplicacionId, Long cilindradaId) {

        return presupuestoRepository
                .findFirstByDetallePresupuestosAplicacionIdAndDetallePresupuestosCilindradaIdOrderByModeloDescIdDesc(
                        aplicacionId, cilindradaId);
    }

    public List<CostoRepuestoProveedor> buscarCostoRepuestoProveedor(Long aplicacionId, Long cilindradaId,
            Long tipoParteMotorId) {
        Aplicacion aplicacion = aplicacionRepository.getOne(aplicacionId);
        Cilindrada cilindrada = cilindradaRepository.getOne(cilindradaId);
        TipoParteMotor tipoParteMotor = tipoParteMotorRepository.getOne(tipoParteMotorId);
        TipoParteMotor tipoParte2 = tipoParteMotorRepository.findById(globales.tipoParteMotorYTapaID).get();
        List<TipoParteMotor> tipos = new ArrayList();
        tipos.add(tipoParteMotor);
        tipos.add(tipoParte2);
        List<TipoRepuesto> tipoRepuestos = tipoRepuestoRepository.findByTipoParteMotorIn(tipos);

        return costoRepuestoProveedorRepository.findByAplicacionAndCilindradaAndTipoRepuestoIn(aplicacion, cilindrada,
                tipoRepuestos);

    }

    public List<TipoParteMotor> buscarTiposPartesPresupuesto() {
        List<Long> lista = new ArrayList<Long>();
        lista.add(globales.tipoParteMotorBlockID);
        lista.add(globales.tipoParteMotorTapaID);
        return tipoParteMotorRepository.findByIdIn(lista);
    }
}
