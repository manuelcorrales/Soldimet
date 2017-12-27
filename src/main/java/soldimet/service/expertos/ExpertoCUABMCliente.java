package soldimet.service.expertos;
import ControladoresCU.ControladorErroresSimple;
import ModeloDeClases.Cliente;
import ModeloDeClases.Persona;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
public class ExpertoCUABMCliente extends ExpertoABMPersona {

    private String apellido;

    public ExpertoCUABMCliente(ControladorErroresSimple observador) {
        super(observador);
    }


    public void finalize() throws Throwable {

    }

    public void crearCliente(String nombre, String apellido, String calle, ArrayList<String> telefonos, String localidad, int numero) {

        this.apellido = apellido;
        this.nombre=nombre;
        crearPersona(nombre,calle,telefonos,localidad,numero);
    }

    public void eliminarCliente(int clienteId) {

        eliminarPersona(clienteId);
    }

    public void modificarCliente(Integer clienteId, String nombre, String apellido, String calle, ArrayList<String> telefonos, int numeroCalle, String localidad) {

        this.apellido= apellido;
        this.nombre=nombre;
        modificarPersona(clienteId, nombre, calle,  telefonos, numeroCalle, localidad);
    }

    @Override
    protected Persona buscarPersona() {
        return (Cliente) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Cliente as cli, Persona as per",
                            "per.nombre= '" + nombre + "' and  cli.apellido = '" + apellido + "' and per.estado= '" + estado.getOidEstadoPersona() + "' and per.oid=cli.oid");

    }

    @Override
    protected Persona crearNuevaPersona() {

        return new Cliente();
    }

    @Override
    protected void terminarPersona() {

        ((Cliente)persona).setApellido(apellido);

    }

    @Override
    protected Persona buscarPersona(Integer id) {

        return (Cliente) IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "`Cliente` as cli ,`EstadoPersona` as est,`persona` as per",
                            "cli.clienteID= '" + id + "' "
                            + "cli.oid=per.oid and "
                            + "per.estado= '" + String.valueOf(estado.getOidEstadoPersona()) + "'");

    }

    @Override
    protected void guardar() {

        IndireccionPersistencia.getInstance().guardar((Cliente)persona);
    }



}
