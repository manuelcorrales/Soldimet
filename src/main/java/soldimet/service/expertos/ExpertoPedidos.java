package soldimet.service.expertos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soldimet.constant.Globales;
import soldimet.converter.PedidoConverter;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPersona;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Persona;
import soldimet.domain.Proveedor;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPersonaRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PersonaRepository;
import soldimet.repository.ProveedorRepository;
import soldimet.service.dto.DTOPedidoCabecera;

@Service
public class ExpertoPedidos {

    @Autowired
    private Globales globales;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private EstadoPersonaRepository estadoPersonaRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private PedidoConverter pedidoConverter;

    public List<PedidoRepuesto> getPedidosPendientes() {

        EstadoPedidoRepuesto estadoPendiente = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);

        //Falta filtrar los pedidos por la sucursal
        List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findByEstadoPedidoRepuesto(estadoPendiente);

        return pedidos;

    }

	public List<Proveedor> getProveedoresRepuestos() {

        EstadoPersona estadoActivo = estadoPersonaRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PERSONA_ALTA);

        List<Persona> personasActivas = personaRepository.findByEstadoPersona(estadoActivo);

        List<Proveedor> proveedores = proveedorRepository.findByPersonaIn(personasActivas);

		return proveedores;
    }

    public List<DTOPedidoCabecera> getPedidosCabecera() {

        List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findAll();

        return pedidoConverter.convertirPedidosAPedidosCabeceras(pedidos);
    }

}
