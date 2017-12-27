package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.PedidoRepuesto;
import ModeloDeClases.Presupuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;


/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:44 p.m.
 */
public class ExpertoCUHacerPresupuesto extends ExpertoCUPresupuestos {
    private final String presupuestoID = "presupuestoID";
    private final String presupuestoClase = "Presupuesto";
    public ExpertoCUHacerPresupuesto(ControladorErroresSimple observador) {
        super(observador);
    }




	public void finalize() throws Throwable {

	}


      /*
	public DTOClienteCUHacerPresupuesto buscarCliente(){

            //la interfaz llama a la otra interfaz y esta ejecuta el Buscar clienteID
            //DESPUES LA MISMA INTERFAZ LE ASIGNA A ESTE EXPERTO EL CLIENTE
            Cliente clienteID;

            DTOClienteCUHacerPresupuesto dto= new DTOClienteCUHacerPresupuesto();
            dto.setnombreCliente(clienteID.getnombre());
            this.setClienteID(clienteID);
		return dto;
	}*/

        /**
	 *
	 * @param nombreMotor
     * @return
	 */
        //preparo los valores para pasar a pantalla
    public ArrayList<DTOMotorCUHacerPresupuesto> iniciarCU() {
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        ArrayList<DTOMotorCUHacerPresupuesto> motores = buscarMotor();

        //creo el ultimo ID de presupuesto y se lo asigno al experto. al final busca el id que cree ahora para
        //asignarlo al presupuesto en caos de guardarlo
        //si no encuentro nada lo dejo en 0
        idPresupuesto = 0;
        idPresupuesto = (Integer) IndireccionPersistencia.getInstance().buscarUltimoID(presupuestoID, presupuestoClase);
        if (idPresupuesto == null) {

        } else {
            if (idPresupuesto > 0) {
                idPresupuesto = idPresupuesto + 1;
            } else {
                idPresupuesto = 1;
            }
        }
        IndireccionPersistencia.getInstance().cerrarTransaccion();
        return motores;
    }

        @Override
         protected void buscarPresupuestoYPedido(){
             //creo un nuevo presupuesto
            presupuestoNuevo = new Presupuesto();


            //creo el pedido y le asigno el presupuesto
            pedido =new PedidoRepuesto();
            pedido.setPresupuesto(presupuestoNuevo);

         }


        @Override
	protected void asignarIDaPedidoyPresupuesto(){
            IndireccionPersistencia.getInstance().iniciarTransaccion();
            int pedidoID =(int)IndireccionPersistencia.getInstance()
                        .buscarUltimoID("ped.pedidoID", "Pedido as ped");
            pedidoID=+1;
            pedido.setIdPedidoRepuesto(pedidoID);
            presupuestoNuevo.setPresupuestoId(this.getIdPresupuesto());
            IndireccionPersistencia.getInstance().cerrarTransaccion();
        }


//podria hacer en otra version un metodo que actualice automaticamente todos los valores con el último encontrado
//en la lista y modificarlo solo si el valor que encuentra es mayor que el que se habia puesto antes
        //LO HAGO EN OTRO EXPERTO
        }
