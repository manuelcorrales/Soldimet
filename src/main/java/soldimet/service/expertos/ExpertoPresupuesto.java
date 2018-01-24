package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import javax.swing.JOptionPane;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.constant.Globales;
import soldimet.converter.PresupuestoConverter;
import soldimet.domain.EstadoPedidoRepuesto;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.PedidoRepuesto;
import soldimet.domain.Presupuesto;
import soldimet.repository.EstadoPedidoRepuestoRepository;
import soldimet.repository.EstadoPresupuestoRepository;
import soldimet.repository.PedidoRepuestoRepository;
import soldimet.repository.PresupuestoRepository;
import soldimet.service.dto.DTOPresupuesto;


/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
@Service
public class ExpertoPresupuesto {

    @Autowired
    private Globales globales;

    @Autowired
    private EstadoPresupuestoRepository  estadoPresupuestoRepository;

    @Autowired
    private EstadoPedidoRepuestoRepository estadoPedidoRepuestoRepository;

    @Autowired
    private PedidoRepuestoRepository pedidoRepuestoRepository;

    @Autowired
    private PresupuestoRepository presupuestoRepository;


    @Autowired
    private PresupuestoConverter presupuestoConverter;
    //Cambio el estado del presupuesto y del pedido de repuestos
    public void aceptarPresupuesto(Long idPresupuesto) {

        Presupuesto presupuesto = buscarPresupuesto(idPresupuesto);

        EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);
        if (presupuesto.getEstadoPresupuesto().equals(estadoAceptado)) {

                //este presupuesto ya fue aceptado
            //avisar por pantalla la fecha de aceptacion
            LocalDate fechaAceptado = presupuesto.getFechaAceptado();

        } else {
            //cambio el estado del presupuesto a aceptado y tambien del pedido de repuesto
            EstadoPresupuesto estadoCreado = estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_CREADO);
            if (presupuesto.getEstadoPresupuesto().equals(estadoCreado)) {

                presupuesto.setEstadoPresupuesto(estadoAceptado);
                presupuesto.setFechaAceptado(LocalDate.now());

                EstadoPedidoRepuesto estadoPendienteDePedido = estadoPedidoRepuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PEDIDO_REPUESTO_PENDIENTE_DE_PEDIDO);


                List<PedidoRepuesto> pedidos = pedidoRepuestoRepository.findByPresupuesto(presupuesto);
                for(PedidoRepuesto pedidoRepuesto: pedidos){
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
        EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);

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

    public List<DTOPresupuesto> buscarPresupuestos(){

        List<Presupuesto> presupuestos = presupuestoRepository.findAll();

        return presupuestoConverter.convertirEntidadesAModelos(presupuestos);
    }
}
