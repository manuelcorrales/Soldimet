/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Articulo;
import ModeloDeClases.Banco;
import ModeloDeClases.Caja;
import ModeloDeClases.Cliente;
import ModeloDeClases.Cobranza;
import ModeloDeClases.CobranzaPresupuesto;
import ModeloDeClases.CobranzaGenerico;
import ModeloDeClases.DetallePedido;
import ModeloDeClases.Empleado;
import ModeloDeClases.EstadoMovimiento;
import ModeloDeClases.FormaDePago;
import ModeloDeClases.Movimiento;
import ModeloDeClases.Pago;
import ModeloDeClases.PagoCheque;
import ModeloDeClases.PagoCliente;
import ModeloDeClases.PagoEfectivo;
import ModeloDeClases.PagoEmpleado;
import ModeloDeClases.PagoProveedorInsumo;
import ModeloDeClases.PagoProveedorPedido;
import ModeloDeClases.PagoTarjeta;
import ModeloDeClases.Persona;
import ModeloDeClases.Presupuesto;
import ModeloDeClases.Proveedor;
import ModeloDeClases.Categoria;
import ModeloDeClases.HistorialPrecio;
import ModeloDeClases.Tarjeta;
import ModeloDeClases.TipoTarjeta;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Manu
 */
public abstract class ExpertoCUManejoDeMovimientos extends VerificarPermisoManejoMovimiento {

    //experto para verificar el estado de la caja antes de permitir cualquier movimiento
    private final ExpertoCUAbrirCaja expertoAbrirCaja = new ExpertoCUAbrirCaja();

    //tipos de movimiento
    private final String pago = "Pago";
    private final String cobranza = "Cobranza";

    //mensaje error
    protected final String mensajeCajaCerrada = "La caja se encuentra cerrada, no se puede realizar operaciones.";
    protected final String mensajeNoExisteTipoMovimiento = "No existe este tipo de movimiento en el sistema.";
    protected final String mensajeNoExisteformaDePago = "No existe esta forma de pago en el sistema.";

    protected Caja cajaDia;
    protected Movimiento mov;


    public Boolean comprobarEstadoCaja(){

        return cajaDia!=null;

    }

    /*la gui llama a la nueva venta y le pasa los datos del cliente que encontro

    falta definir como voy a buscar cada cliente, empleado y proveedor segun la categoria que elija*/
    public ExpertoCUManejoDeMovimientos(ControladorErroresSimple observador) {
        super(observador);
    }

    //busco articulos por descripcion
    public ArrayList<DTOBusquedaArticulo> buscarArticulo() {

        ArrayList<DTOBusquedaArticulo> listaDTO = new ArrayList();

        try {

            ArrayList<Proveedor> proveedores = (ArrayList<Proveedor>) IndireccionPersistencia.getInstance()
                    .Buscar("prov", "Proveedor as prov, Persona as per",
                            "prov.oid=per.oid");

            for (Proveedor prov : proveedores) {
                ArrayList<Articulo> articulos = (ArrayList<Articulo>) IndireccionPersistencia.getInstance()
                        .Buscar("art", "Articulo as art",
                                "art.proveedor = " + prov.getOid());

                for (Articulo articulo : articulos) {
                    DTOBusquedaArticulo dto = new DTOBusquedaArticulo();
                    dto.setArticuloID(articulo.getIdArticulo());
                    dto.setDescripcion(articulo.getDescripcionArticulo());
                    dto.setProveedor(articulo.getProveedor().getNombre());
                    dto.setRubro(articulo.getRubro().getNombreRubro());
                    dto.setMarca(articulo.getMarca().getnombreMarca());
                    dto.setCodArtProv(articulo.getCodigoArticuloProveedor());
                    dto.setProveedorID(articulo.getProveedor().getPersonaId());
                    //Busco el ultimo Precio
                    List<HistorialPrecio> historial = articulo.getHistorial();
                    HistorialPrecio historialUltimo = historial.get(0);
                    for (HistorialPrecio historia : historial) {
                        if (historia.getFechadesde().after(historialUltimo.getFechadesde())) {
                            historialUltimo = historia;
                        }
                    }
                    dto.setPrecioPublico(historialUltimo.getPrecio().getPrecioRepuestoPublico());
                    dto.setPrecioPrivado(historialUltimo.getPrecio().getPrecioRespuestoPrivado());

                    listaDTO.add(dto);
                }

            }

            return listaDTO;
        } catch (NullPointerException e) {
            IndireccionPersistencia.getInstance().rollback();
            avisarExceptionAObservadores(e);
            return null;
        }
    }

    //busco los pedidos con estado pedido o recibido
    public ArrayList<DTOPedidoRepuesto> buscarPedidos() {
        return new ExpertoCUBuscarPedidoDeRepuestos().buscarPedidosACobrar();

    }

//segun las categorias posibles realizo la busqueda de la persona, segun el TIPO
    public ArrayList<DTOClienteCuAbmCliente> buscar(String busqueda, String tipo) {
        ExpertoCUBuscarPersona buscadorExperto = new ExpertoCUBuscarPersona();
        return buscadorExperto.buscar(busqueda, tipo);

    }

//Guardo un nuevo mov
    public void guardarMovimiento(int movimientoID, int personaID, String tipoMovimiento, String descripcion,
            int presupuesto, String formaDePago, float importe, String tipoPersona,
            String categoria, String subCategoriaOtros,
            String forma, String banco, Date fechaRec, Date fechaCobro,
            String numeroChecue, double importeCheque,
            String tipoTarjeta, String nombreTarj, ArrayList<DTODetalle> detalles,
            Boolean seña, String articulosID) {

        try {
            //verifico si este movimiento ya existe y lo modifico o creo uno nuevo
            mov = (Movimiento) IndireccionPersistencia.getInstance()
                    .Buscar("mov", Movimiento.class.getCanonicalName()+" as mov", "mov.movimientoID= " + movimientoID);

            int ultimoID;
            //SI EXISTE, LO PISO, SINO EXISTE EL APUNTADOR ES NULO Y CREO UNO NUEVO
            if (mov == null) {
                ultimoID = IndireccionPersistencia.getInstance()
                        .buscarUltimoID("mov.movimientoID", Movimiento.class.getCanonicalName()+" as mov") + 1;
            } else {
                ultimoID = movimientoID;
            }
            EstadoMovimiento estado = (EstadoMovimiento) IndireccionPersistencia.getInstance()
                    .Buscar("est", EstadoMovimiento.class.getCanonicalName()+" as est", "est.nombreEstadoMovimiento= Alta");

            //segun el tipo de mov ingresado
            //le paso la forma de mov totalmente armada para relacionar al mov
            FormaDePago nuevaforma = asignarFormaDePago(forma, banco, fechaRec, fechaCobro,
                    numeroChecue, importeCheque,
                    tipoTarjeta, nombreTarj);
            switch (tipoMovimiento) {

                case pago:

                    guardarPago(descripcion,
                            personaID, nuevaforma, importe,
                            tipoPersona, estado,
                            detalles, articulosID, ultimoID,categoria);
                    break;

                case cobranza:
                    guardarCobranza(descripcion, nuevaforma, importe, presupuesto, estado, personaID, mov, ultimoID, categoria);

                    break;

                default:
                    //DAR AVISO POR PANTALLA QUE NO EXISTE EL TIPO DE MOVIMIENTO Y NO SE PUEDE SEGUIT
                    throw new ExceptionStringSimple(mensajeNoExisteTipoMovimiento, this.toString());
            }
        } catch (NullPointerException |ExceptionStringSimple e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();

        }
        IndireccionPersistencia.getInstance().commit();

    }

    //creo el mov mov y la persona segun el tipo y guardo
    private void guardarPago(String descripcion,
            Integer personaID, FormaDePago formaPago, float importeMovimiento,
            String tipoPersona, EstadoMovimiento estado,
            ArrayList<DTODetalle> detalles, String articulo, int ultimoID,
            String categoria) throws NullPointerException {
        //crear un ID de mov, la hora de mov
        //EL TIPO DE PAGO SE SACA DE LA SUBCATEGORIA

        mov = new PagoEmpleado();//la inicializo para que no de error

        //SEGUN LA PERSONA ES EL PAGO QUE CREO
        Persona persona = (Persona) IndireccionPersistencia.getInstance()
                .Buscar("per", "Persona as per", "per.idPersona= " + personaID);

        switch (tipoPersona) {
            case "Empleado":
                mov = new PagoEmpleado();
                ((PagoEmpleado) mov).setEmpleadoPagado((Empleado) persona);

                break;
            case "Proveedor":
                if (categoria.equalsIgnoreCase("Pago Insumos")) {
                    crearPagoProveedorInsumo(articulo, ultimoID);

                } else {
                    crearPagoProveedorRepuesto(persona, detalles, ultimoID);
                }

            case "Cliente":
                mov = new PagoCliente();
                ((PagoCliente) mov).setCliente((Cliente) persona);

                break;

        }

        Pago nuevoPago = (Pago) mov;

        nuevoPago.setDescripcionMovimiento(descripcion);
        nuevoPago.setImporte(importeMovimiento);
        nuevoPago.setFormaDePago(formaPago);
        nuevoPago.setEstado(estado);
        nuevoPago.setFechaMovimiento(new Date());
        nuevoPago.setIdPago(ultimoID);
        nuevoPago.setMovimientoId(0 + ultimoID);

        //busco el ultimo movimiento y obtengo su valor de caja, asi modifico el nuevo movimiento
        Movimiento mo = (Movimiento) IndireccionPersistencia.getInstance()
                .Buscar("*", "Movimiento as mov", "mov.movimientoID= " + ultimoID);
        nuevoPago.setUltimoValorDeCaja(mo.getUltimoValorDeCaja() - importeMovimiento);

        //guardo la nueva caja y el movimiento
        cajaDia.agregarMovimiento(nuevoPago);


        IndireccionPersistencia.getInstance().guardar(nuevoPago);

    }

    //creo una cobranza y segun el numero de presupuesto le tipo que creo
    private void guardarCobranza(String descripcion, FormaDePago forma, float importe, int presupuesto,
            EstadoMovimiento estado, int personaID, Movimiento mov, int ultimoID, String categoriaString) throws NullPointerException {

        if (presupuesto == 0) {//si es 0 lo tomo como nulo, no hay ningun presupuesto

             CobranzaGenerico cob= new CobranzaGenerico();
             cob.setDescripcion(descripcion);
             mov = cob;
        } else {


            CobranzaPresupuesto cob = new CobranzaPresupuesto();
            cob.setDescripcion(descripcion);
            mov = cob;
            Presupuesto presu = (Presupuesto) IndireccionPersistencia.getInstance()
                    .Buscar("pre", "Presupuesto as pre", "pre.idPresupuesto=" + presupuesto);
            ((CobranzaPresupuesto) mov).setPresupuesto(presu);
        }

        Cliente cli = (Cliente) IndireccionPersistencia.getInstance()
                .Buscar("cli", "Cliente as cli", "cli.idCliente=" + personaID);

        ((Cobranza) mov).setCliente(cli);


        Categoria categoria = (Categoria)IndireccionPersistencia.getInstance()
                .Buscar("cat",Categoria.class.getSimpleName()+" as cat", "cat.nombreSubCategoria= "+categoriaString);
        mov.setCategoria(categoria);

        mov.setImporte(importe);
        mov.setFormaDePago(forma);
        mov.setEstado(estado);
        mov.setFechaMovimiento(new Date());
        mov.setMovimientoId(ultimoID);
        ((Cobranza) mov).setCobranzaId(1 + ultimoID);

        //busco el ultimo movimiento y obtengo su valor de caja, asi modifico el nuevo movimiento
        Movimiento mo = (Movimiento) IndireccionPersistencia.getInstance()
                .Buscar("mov", "Movimiento as mov", "mov.movimientoID= " + ultimoID);
        mov.setUltimoValorDeCaja(mo.getUltimoValorDeCaja() + importe);

        IndireccionPersistencia.getInstance().guardar(mov);

        //guardo la nueva caja y el movimiento
        cajaDia.agregarMovimiento(mov);


        IndireccionPersistencia.getInstance().guardar(mov);
    }

    private FormaDePago asignarFormaDePago(String forma, String banco, Date fechaRec, Date fechaCobro,
            String numeroChecue, double importeCheque,
            String tipoTarjeta, String nombreTarj) throws ExceptionStringSimple {

        FormaDePago nuevaForma;

        FormaDePago formaBuscada = (FormaDePago) IndireccionPersistencia.getInstance()
                .Buscar("*", "FormaDePago as form", "form.nombreFormaDePago= " + forma);

        //CREO UN NUEVO ID
        int ultimoIDFormaPago = (int) IndireccionPersistencia.getInstance()
                .Buscar("*", "FormaDePago as form", "form.formaDePagoID= form.formaDePagoID order by form.formaDePagoID DESC limit 1");
        ultimoIDFormaPago = +1;

        switch (formaBuscada.getNombreFormaDePago()) {

            case "Efectivo":

                nuevaForma = new PagoEfectivo(2 + ultimoIDFormaPago, formaBuscada.getNombreFormaDePago(),
                        ultimoIDFormaPago);

                break;
            case "Cheque":

                Banco banc = (Banco) IndireccionPersistencia.getInstance()
                        .Buscar("banc", "Banco as banc", "banc.nombreBanco= " + banco);

                nuevaForma = new PagoCheque(banc, fechaCobro, fechaRec, numeroChecue,
                        1 + ultimoIDFormaPago, formaBuscada.getNombreFormaDePago(), ultimoIDFormaPago);

                break;
            case "Tarjeta":

                Tarjeta tarjeta = (Tarjeta) IndireccionPersistencia.getInstance()
                        .Buscar("tarj", "Tarjeta as tarj", "tarj.nombreTarjeta= " + nombreTarj);
                TipoTarjeta tipoTarj = (TipoTarjeta) IndireccionPersistencia.getInstance()
                        .Buscar("tip", "TipoTarjeta as tip", "tip.nombreTipoTarjeta= " + tipoTarjeta);

                nuevaForma = new PagoTarjeta(tarjeta, tipoTarj,
                        3 + ultimoIDFormaPago, formaBuscada.getNombreFormaDePago(), ultimoIDFormaPago);

                break;
            default:
                nuevaForma = new FormaDePago();//esto va a tirar error
                //DAR AVISO POR PANTALLA DE QUE NO EXISTE LA FORMA DE PAGO INDICADA Y CERRAR EL CU
                throw new ExceptionStringSimple(mensajeNoExisteformaDePago, this.toString());


        }

        return nuevaForma;
    }

    protected void crearPagoProveedorRepuesto(Persona persona, ArrayList<DTODetalle> detalles, int id) {

        PagoProveedorPedido movimiento = new PagoProveedorPedido();

        movimiento.setProveedor((Proveedor) persona);
        movimiento.setPagoProveedorPedidoID(id);

        ArrayList<DetallePedido> listaDetalles = new ArrayList();
        for (DTODetalle dtoDetalle : detalles) {
            DetallePedido detalle = (DetallePedido) IndireccionPersistencia.getInstance()
                    .Buscar("det", "DetallePedido as det", "det.detallePedidoID= " + dtoDetalle.getIdDetalle());
            listaDetalles.add(detalle);
        }
        movimiento.setDetallePedido(listaDetalles);

        mov = movimiento;
    }

    protected void crearPagoProveedorInsumo(String art, int id) {

        Articulo articulo = (Articulo) IndireccionPersistencia.getInstance()
                .Buscar("art", "Articulo as art", "art.articuloID=" + art);
        PagoProveedorInsumo movimiento = new PagoProveedorInsumo();

        movimiento.setArticulo(articulo);
        movimiento.setPagoProveedorInsumoID(id);

        mov = movimiento;
    }

    public void buscarMovimientos() {
        ExpertoCUIdentificacionUsuario experto = new ExpertoCUIdentificacionUsuario();

    }

    public String crearIDNuevoMovimiento(){

            Integer ultimoID =IndireccionPersistencia.getInstance()
                    .buscarUltimoID("movimientoId", Movimiento.class.getCanonicalName());
            if(ultimoID==null){
                return "1";
            }else{
                int idNuevo = ultimoID+1;

            return String.valueOf(idNuevo);
            }



    }

    public abstract DTOABMMovimiento iniciarCU();

    public ArrayList<DTOEmpleado> buscarTodosEmpleados(){
        ExpertoCUBuscarPersona expertoBuscaPersona = new ExpertoCUBuscarPersona();
        return expertoBuscaPersona.buscarTodosEmpleados();
    }
}
