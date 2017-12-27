/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Direccion;
import ModeloDeClases.EstadoPersona;
import ModeloDeClases.Departamento;
import ModeloDeClases.Persona;
import ModeloDeClases.PersonaTelefono;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;

/**
 *
 * @author manu_
 */
public abstract class ExpertoABMPersona extends ObservableSimple {

    protected final String mensajeNoHayLocalidades = "No hay Localidades cargadas en el sistema.";
    protected final String mensajePersonaNoEncontrada = "La persona indicada no se encontró en la base de datos.\n La operacion no se pudo realizar.";
    protected final String mensajeLocalidadNoExiste = "La localidad indicada no existe.\n No se puede realizar la operación.";
    protected final String mensajePersonaYaExiste = "Ya existe esta persona en la base de datos.\n Operación anulada.";

    protected Persona persona;
    protected EstadoPersona estado;
    protected String nombre;

    protected abstract Persona buscarPersona();

    protected abstract Persona crearNuevaPersona();

    protected abstract void terminarPersona() throws ExceptionStringSimple;

    protected abstract Persona buscarPersona(Integer id);

    protected abstract void guardar();

    protected void crearPersona(String nombre, String calle, ArrayList<String> telefonos, String localidad, int numero) {
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try {
            estado = buscarEstadoAlta();
            persona = buscarPersona();

            if (persona == null) {
                persona = crearNuevaPersona();
                persona.setNombre(nombre);

                //creo las entidades de telefono
                //el cliente tiene la relacion
                for (String telefono : telefonos) {
                    PersonaTelefono tel = new PersonaTelefono();
                    tel.setTelefono(telefono);
                    persona.agregarTelefono(tel);
                }

                //Creo la entidad calle con su localidad
                if (calle != null) {
                    Direccion dir = new Direccion();
                    dir.setCalle(calle);
                    dir.setNumero(numero);

                    Integer idDir;
                    idDir = IndireccionPersistencia.getInstance()
                            .buscarUltimoID("direccionID", "Direccion");
                    if (idDir == null) {

                    } else {
                        idDir = idDir + 1;
                    }

                    dir.setDireccionId(idDir);

                    //Busco la localidad asociada
                    Departamento loc = (Departamento) IndireccionPersistencia.getInstance().Buscar("*", "Localidad as loc", "loc.nombreLocalidad= " + localidad);
                    if (loc != null) {
                        dir.setLocalidad(loc);//asigno la localidad que encontro
                    } else {
                        //CREAR AVISO DE QUE LA LOCALIDAD NO EXISTE Y CERRAR CASO DE USO
                        throw new ExceptionStringSimple(mensajeLocalidadNoExiste, this.toString());

                    }

                    persona.setDireccion(dir);//aisgno la clase direccion
                }

                persona.setEstado(estado);
                //busco el último id de los cliente
                Integer id = IndireccionPersistencia.getInstance().buscarUltimoID("clienteId", "Cliente");
                if (id == null) {
                    id = 1;
                } else {
                    id = id + 1;
                }
                persona.setPersonaId(id);

                //guardo el cliente
                IndireccionPersistencia.getInstance().guardar(persona);

                IndireccionPersistencia.getInstance().commit();
            } else {

                //DAR AVISO DE QUE YA EXISTE ALGUIEN CON ESTOS DATOS
                throw new ExceptionStringSimple(mensajePersonaYaExiste, this.toString());
                //en futura iteracion comparar
            }
        } catch (NullPointerException e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        } catch (ExceptionStringSimple e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        }
    }

    protected void eliminarPersona(Integer id) {

        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try {

            estado = buscarEstadoAlta();

            persona = buscarPersona(id);

            if (persona == null) {
                throw new ExceptionStringSimple(mensajePersonaNoEncontrada, this.toString());
            } else {

                estado = buscarEstadoBaja();

                persona.setEstado(estado);

                IndireccionPersistencia.getInstance().guardar(persona);

            }
        } catch (NullPointerException e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        } catch (ExceptionStringSimple e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        }
    }

    protected void modificarPersona(Integer id, String nombre, String calle, ArrayList<String> telefonos, int numeroCalle, String localidad) {

        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try {

            estado = buscarEstadoAlta();//busco el estado alta

            //busco cliente en alta e ID
            persona = buscarPersona(id);

            if (persona == null) {

                //dar aviso de que no se encontro cliente
                throw new ExceptionStringSimple(mensajePersonaNoEncontrada, this.toString());

            } else { //hago los cambios en la instancia cliente

                persona.setNombre(nombre);
                ArrayList<PersonaTelefono> listaTel = new ArrayList();
            telefonos.stream().map((_item) -> new PersonaTelefono()).forEach((tel) -> {
                listaTel.add(tel);
            });
            persona.setTelefonos(listaTel);

            //Creo la entidad calle con su localidad
            if (calle != null) {
                Direccion dir = new Direccion();
                dir.setCalle(calle);
                dir.setNumero(numeroCalle);

                //busco la ultima clave de negocio de calle y le sumo 1 para el siguiente
                Integer idDir = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("direccionID", "Direccion");
                if (idDir == null) {
                    idDir = 1;
                } else {
                    idDir = idDir + 1;
                }

                dir.setDireccionId(idDir);

                //Busco la localidad asociada
                Departamento loc = (Departamento) IndireccionPersistencia.getInstance().Buscar("*", "Localidad as loc", "loc.nombreLocalidad= " + localidad);
                if (loc != null) {
                    dir.setLocalidad(loc);//asigno la localidad que encontro
                } else {
                    //CREAR AVISO DE QUE LA LOCALIDAD NO EXISTE Y CERRAR CASO DE USO
                    throw new ExceptionStringSimple(mensajeLocalidadNoExiste, this.toString());
                }

                persona.setDireccion(dir);//aisgno la clase calle
            }

            persona.setEstado(estado);
            terminarPersona();

            //guardo la persona
            guardar();

            IndireccionPersistencia.getInstance().commit();
            }


        } catch (NullPointerException e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        } catch (ExceptionStringSimple e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        }
    }

    public ExpertoABMPersona(ControladorErroresSimple observador) {
        super(observador);
    }

    protected EstadoPersona buscarEstadoAlta() {
        return (EstadoPersona) IndireccionPersistencia.getInstance().Buscar("*", "EstadoPersonaas est", "est.nombreEstadoPersona= 'Alta'");
    }

    protected EstadoPersona buscarEstadoBaja() {
        return (EstadoPersona) IndireccionPersistencia.getInstance().Buscar("*", "EstadoPersona as est", "est.nombreEstadoPersona= 'Baja'");
    }

    public ArrayList<DTOLocalidad> buscarLocalidades(){

        IndireccionPersistencia.getInstance().iniciarTransaccion();
        ArrayList<DTOLocalidad> listaDTO = new ArrayList();
        try{

            ArrayList<Departamento> listLocalidades = (ArrayList<Departamento>)IndireccionPersistencia.getInstance()
                    .Buscar("*", "Localidad as loc", "loc.habilitado='true'");

            if(listLocalidades ==null){
                throw new ExceptionStringSimple(mensajeNoHayLocalidades, this.toString());
            }else{
                for(Departamento localidad:listLocalidades){
                    DTOLocalidad dto = new DTOLocalidad(localidad.getNombreDepartamento());
                    listaDTO.add(dto);
                }
            }

            return listaDTO;
        }catch(NullPointerException e){

            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        }catch(ExceptionStringSimple e){
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        }


    }

}
