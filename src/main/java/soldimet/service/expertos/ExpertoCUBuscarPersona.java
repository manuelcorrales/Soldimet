/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Cliente;
import ModeloDeClases.Empleado;
import ModeloDeClases.EstadoPersona;
import ModeloDeClases.Persona;
import ModeloDeClases.PersonaTelefono;
import ModeloDeClases.Presupuesto;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUBuscarPersona {

    private final String mensajeSinPersonaEncontrada = "No se encontraron proveedores.";

    private final String tipoPersonaCliente = "Cliente";
    private final String tipoPersonaEmpleado = "Empleado";
    private final String tipoPersonaProveedor = "Proveedor";

    private final String cadenaVacia = "";

    public String buscarUltimoIdCliente() {

        return String.valueOf(IndireccionPersistencia.getInstance().buscarUltimoID("*", tipoPersonaCliente + " as cli"));
    }

    private ArrayList<Persona> buscarPersona(String busqueda, String tipoPersona) {

        //las busquedas se hacen por nombre, apellido, telefono y numero de presupuesto
        EstadoPersona estado = (EstadoPersona) IndireccionPersistencia.getInstance().Buscar("*", "EstadoPersona as est", "est.nombreEstadoPersona= 'Alta'");
        int idEstado = estado.getOidEstadoPersona();
        //busco por nombre
        ArrayList<Persona> listaPersonas = (ArrayList<Persona>) IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPersona as est,Persona as per, " + tipoPersona + " as subPersona",
                        "per.nombre= '" + busqueda + "' and per.oid= subPersona.oid and per.estado= "
                        + "est.oid and est.oid= '" + String.valueOf(idEstado) + "'");

        //busco por telefono
        ArrayList<PersonaTelefono> telefonos = (ArrayList<PersonaTelefono>) IndireccionPersistencia.getInstance()
                .Buscar("*", "PersonaTelefono as per, " + tipoPersona + " as subPersona",
                        "per.personatelefono= '" + String.valueOf(busqueda) + "' and per.oid= subPersona.oid");//busco los telefonos
        if (telefonos != null) {   //verifico que no sea un apuntador nulo
            for (PersonaTelefono telefono : telefonos) {
                //obtengo la persona asociada al telefono y lo agrego
                Persona personaConTelefono = (Persona) IndireccionPersistencia.getInstance()
                        .Buscar("*",
                                "Persona as per, PersonaTelefono as tel," + tipoPersona + " as subPersona ",
                                "subPersona.oid=per.oid and per.oid=tel.persona and tel.oid= '" + telefono.getOid() + "'");
                //si su estado es ALTA
                if (personaConTelefono.getEstado().equals(estado)) {
                    listaPersonas.add(personaConTelefono);//agrego la persona
                }
            }
        }

        //busco por numero de presupuesto
        Presupuesto presupuesto = (Presupuesto) IndireccionPersistencia.getInstance()
                .Buscar("*", "Presupuesto as pre", "pre.presupuestoID= '" + busqueda + "'");
        //si el estado es ALTA lo agrego a la lista
        if (presupuesto != null) {  //verifico que exista el presupuesto
            if (presupuesto.getCliente().getEstado().equals(estado)) {
                listaPersonas.add(presupuesto.getCliente());
            }
        }

        //si el tipo de persona es cliente hago esta busqueda
        if (tipoPersona.contentEquals(tipoPersonaCliente)) {
            //busco por apellido
            ArrayList<Persona> listaCliente3 = (ArrayList<Persona>) IndireccionPersistencia.getInstance().
                    Buscar("*", "EstadoPersona as est,Persona as per, Cliente as cli",
                            "cli.apellido= '" + busqueda + "' and cli.oid=per.oid and per.estado= "
                            + "est.oid and est.estadoPersonaID= '" + String.valueOf(idEstado) + "'");

            //agrego los persona a la lista
            if (listaCliente3 != null) {   //verifico que no este vacia
                listaCliente3.stream().forEach((listaCliente31) -> {
                    listaPersonas.add(listaCliente31);
                });
            }
        }

        return listaPersonas;

    }

    public ArrayList<DTOClienteCuAbmCliente> buscar(String busqueda, String tipoPersona) {

        ArrayList<DTOClienteCuAbmCliente> listadto = new ArrayList();
        ArrayList<Persona> personas = buscarPersona(busqueda, tipoPersona);
        if (personas != null) {
            for (Persona persona : personas) {
                DTOClienteCuAbmCliente dto = new DTOClienteCuAbmCliente();

                //un proveedor no tiene apellido, y como lo manejo como persona lo deberia castear por
                //ese atributo nada mas
                if (tipoPersonaEmpleado.equals(tipoPersona)) {
                    dto.setApellido(((Empleado) persona).getApellido());
                } else {
                    if (!tipoPersonaCliente.equals(tipoPersona)) {
                        dto.setApellido(((Cliente) persona).getApellido());
                    } else {
                        //no es ninguno de los 2
                        dto.setApellido(null);
                    }
                }

                dto.setIdCliente(persona.getPersonaId());
                dto.setNombreCliente(persona.getNombre());
                dto.setCalle(persona.getDireccion().getCalle());
                dto.setNumero(persona.getDireccion().getNumero());

                List<PersonaTelefono> telefonos = persona.getTelefonos();//obtengo las lista personatelefono
                telefonos.stream().forEach((telefono) -> {
                    dto.addTelefono(telefono.getPersonaTelefonoId());//agrego cada telefono en la lista de telefono
                });
                listadto.add(dto);//agrego el dto a la lista de dto
            }
        }
        return listadto;
    }

    public ArrayList<DTOClienteCuAbmCliente> buscarCliente(String busqueda) {

        return this.buscar(busqueda, tipoPersonaCliente);

    }

    public ArrayList<DTOEmpleado> buscarTodosEmpleados() {

        ArrayList<DTOEmpleado> listaDTO = new ArrayList();

        ArrayList<DTOClienteCuAbmCliente> buscarPersona = buscar(cadenaVacia, tipoPersonaEmpleado);

        //hago el pasaje de persona a cliente
        for (DTOClienteCuAbmCliente persona : buscarPersona) {

            DTOEmpleado dto = new DTOEmpleado();
            dto.setNombre(persona.getNombreCliente());
            dto.setApellido(persona.getApellido());
            dto.setEmpleadoID(persona.getIdCliente());
            listaDTO.add(dto);
        }
        return listaDTO;

    }

    public ArrayList<DTOClienteCuAbmCliente> buscarClienteTransaccionCompleta(String busqueda) {

        IndireccionPersistencia.getInstance().iniciarTransaccion();
        ArrayList<DTOClienteCuAbmCliente> listaDto = buscar(busqueda, tipoPersonaCliente);
        IndireccionPersistencia.getInstance().cerrarTransaccion();
        return listaDto;

    }

    public ArrayList<DTOProveedor> buscarTodosProveedores() throws ExceptionStringSimple {

        IndireccionPersistencia.getInstance().iniciarTransaccion();

        EstadoPersona estado = (EstadoPersona) IndireccionPersistencia.getInstance().Buscar("*", "EstadoPersona as est", "est.nombreEstadoPersona= 'Alta'");

        ArrayList<Persona> listaPersonas = (ArrayList<Persona>) IndireccionPersistencia.getInstance()
                .Buscar("*", "EstadoPersona as est,Persona as per, Proveedor as subPersona",
                        "per.oid= subPersona.oid and per.estado= "
                        + "est.oid and est.oid= '" + String.valueOf(estado.getOidEstadoPersona()) + "'");

        IndireccionPersistencia.getInstance().cerrarTransaccion();

        if (listaPersonas == null) {
            throw new ExceptionStringSimple(mensajeSinPersonaEncontrada, this.toString());
        } else {
            ArrayList<DTOProveedor> listaDTO = new ArrayList();

            for (Persona persona : listaPersonas) {
                DTOProveedor dto = new DTOProveedor();
                dto.setNombreProveedor(persona.getNombre());
                dto.setIdProveedor(String.valueOf(persona.getPersonaId()));
                listaDTO.add(dto);

            }
            return listaDTO;
        }

    }
}
