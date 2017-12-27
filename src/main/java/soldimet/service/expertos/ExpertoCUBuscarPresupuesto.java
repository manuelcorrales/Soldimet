package soldimet.service.expertos;
import ModeloDeClases.Cliente;
import ModeloDeClases.DetallePresupuesto;
import ModeloDeClases.EstadoPersona;
import ModeloDeClases.EstadoPresupuesto;
import ModeloDeClases.Presupuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.List;
/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
public class ExpertoCUBuscarPresupuesto {

	public ExpertoCUBuscarPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

        //variable hardcodeadas
        private final String presupuestoNombreClase = "Presupuesto as pre";

        //manejo la transaccion en este metodo
        public ArrayList<DTOPresupuestoDetalleCUBuscarPresupuesto> buscarPresupuestoClienteTransaccionCompleta(String busqueda){

            IndireccionPersistencia.getInstance().iniciarTransaccion();
            ArrayList<DTOPresupuestoDetalleCUBuscarPresupuesto> buscarPresupuestoCliente = buscarPresupuestoCliente(busqueda);
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return buscarPresupuestoCliente;
        }

        //busco el presupuesto por nombre, apellido ,numero presupuesto o marca de motor
	public ArrayList<DTOPresupuestoDetalleCUBuscarPresupuesto> buscarPresupuestoCliente(String busqueda){


            ArrayList <DTOPresupuestoDetalleCUBuscarPresupuesto> listaDto;
            listaDto = new ArrayList();

            EstadoPersona estado= (EstadoPersona)IndireccionPersistencia.getInstance()
                    . Buscar("*","EstadoPersona as est","est.nombreEstadoPersona= 'Alta'");


            //busco por nombre de cliente
            ArrayList<Cliente> listaCliente =(ArrayList<Cliente>)IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "Cliente as cli, Persona as per, EstadoPersona as est",
                            "per.nombre= '"+busqueda+"' and per.oid=cli.oid and "
                            + "per.estado= '"+String.valueOf(estado.getOidEstadoPersona())+"'");

            //ahora busco por apellido del cliente y lo agrego a la lista anterior
            ArrayList<Cliente> listaporapellido = (ArrayList<Cliente>)IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "Cliente as cli, Persona as per, EstadoPersona as est",
                            "cli.apellido= '"+busqueda+"' and per.oid=cli.oid and "
                            + "per.estado= '"+String.valueOf(estado.getOidEstadoPersona())+"'");

            if(listaporapellido ==null){
                //esta vacia, no hago nada sigo con la cantidad anterior
            } else {
                //agrego los cliente encontrados a la lista anterior
                if (listaCliente == null) {
                    listaCliente = new ArrayList(); //creo el objeto lista asi lo lleno con la otra lista
                    for (Cliente lista : listaporapellido) {
                        listaCliente.add(lista); //agrego en la lista
                    }
                } else {
                    for (Cliente lista : listaporapellido) {
                        listaCliente.add(lista); //agrego en la lista
                    }

                }
            }

            //busco los estados posibles del presupuesto (podria haber hecho la busqueda que sea
            // not estado, asi hago menos busquedas
            EstadoPresupuesto estadoPresupuestoCreado = (EstadoPresupuesto)IndireccionPersistencia.getInstance()
                            .Buscar("*","EstadoPresupuesto as est",  "est.nombreEstadoPresupuesto= 'Creado'");
            EstadoPresupuesto estadoPresupuestoAceptado = (EstadoPresupuesto)IndireccionPersistencia.getInstance()
                            .Buscar("*","EstadoPresupuesto as est", " est.nombreEstadoPresupuesto= 'Aceptado'");
            EstadoPresupuesto estadoPresupuestoEntregado = (EstadoPresupuesto)IndireccionPersistencia.getInstance()
                            .Buscar("*","EstadoPresupuesto as est", "est.nombreEstadoPresupuesto= 'Entregado'");

            //busco los presupuestos de este cliente
            if(listaCliente==null){

                //no se encontro busqueda con ese nombre


            }else{

                for (Cliente clienteEncontrado : listaCliente) {


                    //BUSCO LOS PRESUPUESTOS QUE NO ESTAN DADOS DE BAJA DE UN CLIENTE
                    ArrayList<Presupuesto> listaPresupuesto = (ArrayList<Presupuesto>) IndireccionPersistencia.getInstance()
                            .Buscar("*",
                                    "Presupuesto as pre, Persona as per, Cliente as cli ",
                                    "cli.clienteID="+clienteEncontrado.getIdClienteNegocio()
                                            + " and cli.oid = per.oid"
                                            + " and (per.estado= '" +estadoPresupuestoCreado.getNombreEstadoPresupuesto()+"'"
                                            +"O per.estado= '"+estadoPresupuestoAceptado.getNombreEstadoPresupuesto()+"'"
                                            + "O per.estado= '"+estadoPresupuestoEntregado.getNombreEstadoPresupuesto()+"')");

                    if(listaPresupuesto ==null){

                        //No se encontraron presupuestos

                    }else{
                        //este busqueda si tiene presupuestos

                        armarDTO(listaPresupuesto, listaDto);

                    }
                }
            }


            //ahora busco por numero de presupuesto
            Presupuesto pre = (Presupuesto)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Presupuesto as pre",
                            "pre.presupuestoID = '"+busqueda+"'");
            if(pre==null){

            }else{
                //armo el DTO
                ArrayList<Presupuesto> pres = new ArrayList();
                pres.add(pre);
                armarDTO(pres, listaDto);
            }

            //ahora busco por marca de motor
           ArrayList<Presupuesto> pres = (ArrayList<Presupuesto>)IndireccionPersistencia.getInstance()
                   .Buscar("*",
                           "Presupuesto as pre, Motor as mot, DetallePresupuesto as det",
                           "mot.marcamotor= '"+busqueda+"' and det.motor=mot.oid "
                                   + "and det.presupuesto=pre.oid");
            if(pres==null){
                //vacio, no hago nada
            }else{
                //creo el DTO
                armarDTO(pres, listaDto);
            }

            return listaDto;
            //si es null, no se encontro nada en la busqueda
}

    private void armarDTO(ArrayList<Presupuesto> listaPresupuesto, ArrayList<DTOPresupuestoDetalleCUBuscarPresupuesto> listaDto) {

        listaPresupuesto.stream().map((listaPresupuesto1) -> {

            Cliente clienteEncontrado = listaPresupuesto1.getCliente();
            DTOPresupuestoDetalleCUBuscarPresupuesto dto = new DTOPresupuestoDetalleCUBuscarPresupuesto();

            //con un presupuesto de la busqueda, cargo la cabecera
            dto.setCliente(clienteEncontrado.getApellido() + " " + clienteEncontrado.getNombre());
            dto.setFechaCreacion(listaPresupuesto1.getFechaCreacion());
            dto.setImporteTotal(listaPresupuesto1.getImporteTotal());
            dto.setEstado(listaPresupuesto1.getEstado().getNombreEstadoPresupuesto());
            dto.setIdPresupuesto(listaPresupuesto1.getPresupuestoId());

            //ahora por cada detalle del presupuesto voy creando detalles del DTO
            List<DetallePresupuesto> listaDetallePresupuesto = listaPresupuesto1.getM_DetallePresupuesto();
            listaDetallePresupuesto.stream().map((listaDetallePresupuesto1) -> {

                DTOPresupuestoDetalleParteCUBuscarPresupuesto detalle = new DTOPresupuestoDetalleParteCUBuscarPresupuesto();
                detalle.setaplicacion(listaDetallePresupuesto1.getAplicacion().getnombreAplicacion());
                detalle.setcilindrada(listaDetallePresupuesto1.getCilindrada().getCantidadDeCilindros());
                detalle.setmotor(listaDetallePresupuesto1.getMotor().getMarcaMotor());
                return detalle;
            }).forEach((detalle) -> {
                //agrego el detalle al DTO
                dto.addDetalle(detalle);
            });
            return dto;
        }).forEach((dto) -> {
            //agrego el DTO a la lista de retorno
            listaDto.add(dto);
        });
    }

    public String BuscarUltimoIdPresupuesto() {

        Integer ultimoID = IndireccionPersistencia.getInstance().buscarUltimoID("pre.presupuestoID", presupuestoNombreClase);
        if(ultimoID!=null){
            ultimoID= ultimoID+1;
            return String.valueOf(ultimoID);
        }else{
            return String.valueOf(1);
        }


    }

        public Boolean existeEstePresupuestoID(String presupuestoID){

            Boolean existencia;
            Presupuesto pre=(Presupuesto)IndireccionPersistencia.getInstance()
                    .Buscar("*", presupuestoNombreClase, "pre.presupuestoID= '"+presupuestoID+"'");
            if(pre==null){
                existencia = false;
            }else{
                existencia = true;
            }
            return existencia;
        }

}
