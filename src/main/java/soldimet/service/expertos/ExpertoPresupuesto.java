package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.ArrayList;
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
import soldimet.domain.CostoOperacion;
import soldimet.domain.EstadoPedidoRepuesto;
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
import soldimet.repository.AplicacionRepository;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.CilindradaRepository;
import soldimet.repository.ClienteRepository;
import soldimet.repository.EstadoPedidoRepuestoRepository;
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

    //Cambio el estado del presupuesto y del pedido de repuestos
    public void aceptarPresupuesto(Long idPresupuesto) {

        Presupuesto presupuesto = buscarPresupuesto(idPresupuesto);

        EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository
            .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);
        if (presupuesto.getEstadoPresupuesto().equals(estadoAceptado)) {

            //este presupuesto ya fue aceptado
            //avisar por pantalla la fecha de aceptacion
            LocalDate fechaAceptado = presupuesto.getFechaAceptado();

        } else {
            //cambio el estado del presupuesto a aceptado y tambien del pedido de repuesto
            EstadoPresupuesto estadoCreado = estadoPresupuestoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_CREADO);
            if (presupuesto.getEstadoPresupuesto().equals(estadoCreado)) {

                presupuesto.setEstadoPresupuesto(estadoAceptado);
                presupuesto.setFechaAceptado(LocalDate.now());

                EstadoPedidoRepuesto estadoPendienteDePedido = estadoPedidoRepuestoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);

                List<PedidoRepuesto> pedidos = pedidoRepuestoRepository
                    .findByPresupuesto(presupuesto);
                for (PedidoRepuesto pedidoRepuesto : pedidos) {
                    pedidoRepuesto.setEstadoPedidoRepuesto(estadoPendienteDePedido);
                }

                //GUARDAR
                pedidoRepuestoRepository.save(pedidos);
            }
        }
    }

    //Cancelo el Presupuesto y tambien los movimientos realizados por este presupuesto
    public void cancelarPresupuesto(Long idPresupuesto) {
        //DAR AVISO POR PANTALLA QUE SI SE CANCELA, SE BORRAN LOS MOVIMIENTOS
        Presupuesto presupuesto = buscarPresupuesto(idPresupuesto);
        //primero me fijo si el presupuesto esta aceptado
        //si no lo esta, devuelvo el estado en el que se encuentra
        EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository
            .findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);

        if (presupuesto.getEstadoPresupuesto().equals(estadoAceptado)) {
            //presupuesto aceptado, comienzo el CU

        } else {

            //aviso que el presupuesto no se encuentra aceptado
            //no se puede cancelar y paso el nombre del estado
        }

    }

    private Presupuesto buscarPresupuesto(Long id) {
        try {
            return presupuestoRepository.findOne(id);
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
            Motor motorEncontrado = motorRepository.findOne(motorId);
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

    public List<DTOParOperacionPresupuestoCUHacerPresupuesto> buscarOperacionesPresupuesto(
        DTODatosMotorCUHacerPresupuesto dtoDatosMotor) {

        List<DTOParOperacionPresupuestoCUHacerPresupuesto> listaDTO = new ArrayList<DTOParOperacionPresupuestoCUHacerPresupuesto>();

        try {
            Aplicacion aplicacion = aplicacionRepository.findOne(dtoDatosMotor.getIdAplicacion());

            Motor motor = motorRepository.findOne(dtoDatosMotor.getIdMotor());
            Cilindrada cilindrada = cilindradaRepository.findOne(dtoDatosMotor.getIdCilindrada());
            List<TipoParteMotor> tiposPartesMotores = new ArrayList<>();
            tiposPartesMotores.add(tipoParteMotorRepository.findOne(dtoDatosMotor.getIdTiposPartesMotores()));


            ListaPrecioRectificacionCRAM listaPrecio = listaPrecioRectificacionCRAMRepository
                .findByNumeroGrupo(aplicacion.getNumeroGrupo());

            if(listaPrecio != null){
                ListaPrecioDesdeHasta ultimaListaPrecio = null; //listaPrecio.getFechas().iterator().next();
                for (ListaPrecioDesdeHasta listaPrecioDesde : listaPrecio.getFechas()) {
                    if (listaPrecioDesde.getFechaHasta() == null) {
                        ultimaListaPrecio = listaPrecioDesde;
                    }
                }
                for (CostoOperacion costoOperacion : ultimaListaPrecio.getCostoOperacions()) {

                    TipoParteMotor tipoParteMotorEnLista = costoOperacion.getTipoParteMotor();
                    Cilindrada cilindradaEnLista = costoOperacion.getCilindrada();
                    if (tiposPartesMotores.contains(tipoParteMotorEnLista) &&
                        cilindrada.equals(cilindradaEnLista)) {
                        Operacion operacion = costoOperacion.getOperacion();
                        Float valorOperacion = costoOperacion.getCostoOperacion();
                        DTOParOperacionPresupuestoCUHacerPresupuesto dto = new DTOParOperacionPresupuestoCUHacerPresupuesto();
                        dto.setCostoOperacion(valorOperacion);
                        dto.setNombreOperacion(operacion.getNombreOperacion());
                        dto.setOperacionID(operacion.getId());
                        listaDTO.add(dto);
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

        List<Persona> personas = personaRepository
            .findPersonasByNombreIgnoreCaseContaining(nombreCliente);

        clientes.addAll(clienteRepository.findClienteByPersonaIn(personas));

        return clientes;
    }

	public List<Articulo> buscarRepuestos() {

        TipoRepuesto tipoRepuesto = tipoRepuestoRepository.findByNombreTipoRepuesto(globales.nombre_Tipo_Repuesto_Repuesto);
		return articuloRepository.findArticuloByTipoRepuesto(tipoRepuesto);
    }

    public List<Cliente> buscarTodosLosClientes(){
        return clienteRepository.findAll();
    }

}
