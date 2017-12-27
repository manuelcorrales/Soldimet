/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Aplicacion;
import ModeloDeClases.Articulo;
import ModeloDeClases.Cilindrada;
import ModeloDeClases.Cliente;
import ModeloDeClases.CobranzaOperacion;
import ModeloDeClases.CostoOperacion;
import ModeloDeClases.DetallePedido;
import ModeloDeClases.DetallePresupuesto;
import ModeloDeClases.EstadoCobranzaOperacion;
import ModeloDeClases.EstadoDetallePedido;
import ModeloDeClases.EstadoPedidoRepuesto;
import ModeloDeClases.EstadoPresupuesto;
import ModeloDeClases.HistorialPrecio;
import ModeloDeClases.Motor;
import ModeloDeClases.Operacion;
import ModeloDeClases.PedidoRepuesto;
import ModeloDeClases.PrecioRepuesto;
import ModeloDeClases.Presupuesto;
import ModeloDeClases.TipoParteMotor;
import ModeloDeClases.TipoRepuesto;
import factoria.FactoriaPresupuestorectificacion;
import indireccion.factoriaEstrategiaBuscarRepuesto;
import indireccion.IndireccionPersistencia;
import java.awt.print.PrinterException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Manu
 */
public abstract class ExpertoCUPresupuestos extends ObservableSimple {

    //lista de mensajes de error
    private final String motorNoExiste = "No se encontraron motores.";
    private final String aplicacionNoExiste = "No se encontraron aplicaciones.";
    private final String cilindradaNoExiste = "No se encontraron 'cantidad de cilindros'.";
    private final String parteNoExiste = "No se encontraron elementos de motor.";
    private final String costoOperacionNoExiste = "No se encontraron los costos de las operaciones.";
    private final String repuestoNoExiste = "No se encontraron repuestos.";
    private final String operacionNoExiste = "La operación indicada no existe.";
    private final String operacionCancelada = "La operación se canceló, no se han guardado los cambios.";
    private final String estadoDetallePedidoNoExiste = "No se puedo dar de Alta el detalle del pedido.";

    private final String mensajeClienteNoExiste = "El cliente indicado no existe.";
    private int clienteID;
    private Motor motor;
    protected Integer idPresupuesto;
    private int cilindrada;
    protected Presupuesto presupuestoNuevo;
    protected PedidoRepuesto pedido;
    protected final ExpertoImpresionPresupuesto expertoImpresion = new ExpertoImpresionPresupuesto();

    public ExpertoCUPresupuestos(ControladorErroresSimple observador) {
        super(observador);
    }

    public int getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(int idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }

    public int getClienteID() {
        return clienteID;
    }

    public void setClienteID(int cliente) {
        this.clienteID = cliente;
    }

    public Motor getMotor() {
        return motor;
    }

    public void setMotor(Motor motor) {
        this.motor = motor;
    }

    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }

    //Busqueda de todos los motores posibles
    public ArrayList<DTOMotorCUHacerPresupuesto> buscarMotor() {
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try {
            ArrayList<DTOMotorCUHacerPresupuesto> listaDTO = new ArrayList();
            //busco todos los motores posibles
            ArrayList<Motor> motorBD = (ArrayList<Motor>) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Motor as mot", "mot.habilitado= 'true'");

            if (motorBD == null) {
                //NO HAY MOTORES
                throw new ExceptionStringSimple(motorNoExiste, this.getClass().getSimpleName());

            } else {
                //por cada motor creo un dto
                for (Motor motoR : motorBD) {
                    //Creo la cabecera y la lleno
                    DTOMotorCUHacerPresupuesto dtoMotor = new DTOMotorCUHacerPresupuesto();
                    dtoMotor.setNombreMotor(motoR.getMarcaMotor());
                    dtoMotor.setIdMotor(motoR.getMotorId());

                    // Busco las aplicaciones de este Motor
                    List<Aplicacion> listaAplicacion = motoR.getAplicaciones();
                    if (listaAplicacion == null) {
                        //No se encuentran las aplicaciones
                        throw new ExceptionStringSimple(aplicacionNoExiste, this.getClass().getSimpleName());
                    } else {
                        //por cada aplicacion que encontre creo un DTO y lo lleno
                        for (int indice = 0; indice < listaAplicacion.size(); indice++) {
                            DTOAplicacionCUHacerPresupuesto dtoAplicacion = new DTOAplicacionCUHacerPresupuesto();
                            dtoAplicacion.setnombreAplicacion(listaAplicacion.get(indice).getnombreAplicacion());
                            dtoAplicacion.setnumeroGrupo(listaAplicacion.get(indice).getLista().getNumeroGrupoLista());
                            dtoMotor.m_DTOAplicacionCUHacerPresupuesto.add(dtoAplicacion);
                        }
                    }

                    //busco las cilindradas posibles
                    //ESTO SEGURO SE CAMBIA
                    ArrayList<Cilindrada> cilindradas = (ArrayList<Cilindrada>) IndireccionPersistencia.getInstance()
                            .Buscar("*", "Cilindrada as cil", "cil.habilitado = 'true'");

                    if (cilindradas == null) {

                        //No se encuentran las cilindradas
                        throw new ExceptionStringSimple(cilindradaNoExiste, this.getClass().getSimpleName());
                    } else {
                        for (Cilindrada cilindrada1 : cilindradas) {
                            DTOCilindradaCUHacerPresupuesto dtoCilindrada = new DTOCilindradaCUHacerPresupuesto();
                            dtoCilindrada.setcantidadDeCilindros(cilindrada1.getCantidadDeCilindros());
                            dtoMotor.m_DTOCilindradaCUHacerPresupuesto.add(dtoCilindrada);
                        }
                    }

                    listaDTO.add(dtoMotor);
                }

            }
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return listaDTO;
        } catch (NullPointerException | ExceptionStringSimple e) {
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            avisarExceptionAObservadores(e);
            return null;
        }
    }

    /**
     *
     * @param motorEntrada
     * @return
     */
    //para el tipo de motor elegido busco las operaciones posibles
    public ArrayList<DTOParOperacionPresupuestoCUHacerPresupuesto> listarCosasPorHacer(DTODatosMotorCUHacerPresupuesto motorEntrada) {
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        //Dto de retorno
        ArrayList<DTOParOperacionPresupuestoCUHacerPresupuesto> listaDto = new ArrayList<>();

        try {
            Motor unMotor = (Motor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Motor as mot", "mot.marcaMotor=" + motorEntrada.getnombreMotor());
            Aplicacion aplicacion = (Aplicacion) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Aplicacion as apl", "apl.nombreAplicacion=" + motorEntrada.getnombreAplicacion());
            Cilindrada cilindradas = (Cilindrada) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Cilindrada as cil", "cil.cantidadDeCilindros=" + motorEntrada.getcilindrada());
            TipoParteMotor parte = (TipoParteMotor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "TipoParteMotor as tip", "tip.nombreTipoParteMotor=" + motorEntrada.gettipoParteMotor());

            if (unMotor == null) {
                //NO HAY MOTORES
                throw new ExceptionStringSimple(motorNoExiste, this.getClass().getSimpleName());
            }
            if (aplicacion == null) {
                throw new ExceptionStringSimple(aplicacionNoExiste, this.getClass().getSimpleName());
            }
            if (cilindradas == null) {
                //No se encuentran las cilindradas
                throw new ExceptionStringSimple(cilindradaNoExiste, this.getClass().getSimpleName());
            }
            if (parte == null) {
                //No se encuentran las cilindradas
                throw new ExceptionStringSimple(parteNoExiste, this.getClass().getSimpleName());
            }

            EstrategiaPresupuestoRectificacionCRAM estrategia = FactoriaPresupuestorectificacion.getInstance().obtenerEstrategia();

            List<CostoOperacion> listaCostoOperacion = estrategia.buscarOperaciones(cilindradas, unMotor, aplicacion, parte);

            if (listaCostoOperacion == null) {
                throw new ExceptionStringSimple(costoOperacionNoExiste, this.getClass().getSimpleName());
            } else {
                for (CostoOperacion costoOperacion : listaCostoOperacion) {
                    DTOParOperacionPresupuestoCUHacerPresupuesto dto = new DTOParOperacionPresupuestoCUHacerPresupuesto();
                    dto.setnombreOperacion(costoOperacion.getOperacion().getNombreOperacion());
                    dto.setcostoOperacion(costoOperacion.getCostoOperacion());
                    dto.setOperacionID(String.valueOf(costoOperacion.getOperacion().getOperacionId()));
                    listaDto.add(dto);
                }
            }
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return listaDto;
        } catch (NullPointerException | ExceptionStringSimple e) {
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            avisarExceptionAObservadores(e);
            return null;
        }
    }

    //para el tipo de motor busco los Tipos de repuestos posibles
    public ArrayList<DTOTipoRepuesto> listarTiposDeRepuestos(String tipoparteM) {
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        ArrayList<DTOTipoRepuesto> listaDTOTipoRepuestos = new ArrayList();

        try {
            TipoParteMotor tipoParteMotor = (TipoParteMotor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "TipoParteMotor as tip", "tip.nombreTipoParteMotor= '" + tipoparteM + "'");

            if (tipoParteMotor == null) {
                throw new ExceptionStringSimple(parteNoExiste, this.getClass().getSimpleName());
            } else {
                ArrayList<TipoRepuesto> listaTipos = (ArrayList<TipoRepuesto>) IndireccionPersistencia.getInstance()
                        .Buscar("*", "TipoRepuesto as tip", "tip.habilitado = 'true' and tipoParteMotor= '" + String.valueOf(tipoParteMotor.getOid()) + "'");

                if (listaTipos == null) {
                    throw new ExceptionStringSimple(repuestoNoExiste, this.getClass().getSimpleName());
                } else {
                    for (TipoRepuesto tipoRep : listaTipos) {
                        DTOTipoRepuesto dto = new DTOTipoRepuesto();
                        dto.setNombreTipoRepuesto(tipoRep.getNombreTipoRepuesto());
                        listaDTOTipoRepuestos.add(dto);
                    }

                    IndireccionPersistencia.getInstance().cerrarTransaccion();
                    return listaDTOTipoRepuestos;
                }

            }

        } catch (NullPointerException | ExceptionStringSimple e) {
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            avisarExceptionAObservadores(e);
            return null;
        }

    }

    //para un tipo de repuesto y un motor y parte motor busco los repuestos posibles
    public ArrayList<DTOArticuloCUHacerPresupuesto> listarRepuestos(int cilindradaEntrada, String motorEntrada, String aplicacionEntrada,
            String tipoParteEntrada) {

        ArrayList<DTOArticuloCUHacerPresupuesto> listaDTO = new ArrayList();
        IndireccionPersistencia.getInstance().iniciarTransaccion();

        try {
            Motor marcaMotor = (Motor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Motor as mot", "mot.marcaMotor= '" + motorEntrada + "'");

            Aplicacion aplicacion = (Aplicacion) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Aplicacion as apl", "apl.nombreAplicacion= '" + aplicacionEntrada + "'");

            Cilindrada cilindros = (Cilindrada) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Cilindrada as cil", "cil.cantidadDeCilindros='" + cilindradaEntrada + "'");
            TipoParteMotor tipoParte = (TipoParteMotor) IndireccionPersistencia.getInstance()
                    .Buscar("*", "TipoParteMotor as tip", "tip.nombreTipoParteMotor= '" + tipoParteEntrada + "'");

            if (marcaMotor == null) {
                //NO HAY MOTORES
                throw new ExceptionStringSimple(motorNoExiste, this.getClass().getSimpleName());
            }
            if (aplicacion == null) {
                throw new ExceptionStringSimple(aplicacionNoExiste, this.getClass().getSimpleName());
            }
            if (cilindros == null) {
                //No se encuentran las cilindradas
                throw new ExceptionStringSimple(cilindradaNoExiste, this.getClass().getSimpleName());
            }
            if (tipoParte == null) {
                //No se encuentran las cilindradas
                throw new ExceptionStringSimple(parteNoExiste, this.getClass().getSimpleName());
            }

            EstrategiaBuscarRepuesto estrategia = (EstrategiaBuscarRepuesto) factoriaEstrategiaBuscarRepuesto.getInstance()
                    .obtenerEstrategia();

            ArrayList<Articulo> listaArticulo = estrategia.buscarRepuesto(tipoParte, cilindros, marcaMotor, aplicacion);

            if (listaArticulo == null) {
                //NO HAY Articulos
                throw new ExceptionStringSimple(repuestoNoExiste, this.getClass().getSimpleName());
            } else {
                for (int index = 0; index < listaArticulo.size(); index++) {

                    DTOArticuloCUHacerPresupuesto dto = new DTOArticuloCUHacerPresupuesto();
                    dto.setNombreArticulo(listaArticulo.get(index).getDescripcionArticulo());
                    dto.setCodigoArticuloProveedor(listaArticulo.get(index).getCodigoArticuloProveedor());
                    dto.setMarca(listaArticulo.get(index).getMarca().getnombreMarca());

                    //Busco el último precio guardado en el historial
                    PrecioRepuesto ultimoPrecio = listaArticulo.get(index).getHistorial().get(0).getPrecio();
                    List<HistorialPrecio> listaHistorial = listaArticulo.get(index).getHistorial();
                    for (HistorialPrecio historia : listaHistorial) {
                        if (historia.getPrecio().getFechaHasta().after(ultimoPrecio.getFechaHasta())) {
                            ultimoPrecio = historia.getPrecio();
                        }
                    }
                    dto.setPrecio(ultimoPrecio.getPrecioRepuestoPublico());
                    dto.setProveedor(listaArticulo.get(index).getProveedor().getNombre());
                    dto.setRubro(listaArticulo.get(index).getRubro().getNombreRubro());
                    listaDTO.add(dto);

                }
                IndireccionPersistencia.getInstance().cerrarTransaccion();
                return listaDTO;
            }

        } catch (NullPointerException e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        } catch (ExceptionStringSimple e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        }

    }

    //guardo el presupuesto creado
    //y creo el pedido de repuestos en estado pendiente
    public void guardarPresupuesto(ArrayList<DTOPresupuestoFinal> presupuestoDTO, float importeTotal) {

        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try {

            Cliente cli = (Cliente) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Persona as per, Cliente as cli", "per.oid=cli.oid and cli.clienteID= '" + String.valueOf(getClienteID()) + "'");
            if (cli == null) {
                throw new ExceptionStringSimple(mensajeClienteNoExiste, this.getClass().getName());
            }

            presupuestoNuevo.setCliente(cli);

            EstadoPresupuesto estado = (EstadoPresupuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPresupuesto as est", "est.nombreEstadoPresupuesto= 'Alta'");
            presupuestoNuevo.setEstado(estado);

            //En este For creo los detalles del presupuesto
            //y tambien el detalle del pedido de repuesto asociado a cada detalle
            for (DTOPresupuestoFinal dtoPresupuesto : presupuestoDTO) {
                DetallePresupuesto nuevoDetalle = new DetallePresupuesto();

                //asigno MOTOR
                Motor motorNuevoPresupuesto = (Motor) IndireccionPersistencia.getInstance()
                        .Buscar("*", "Motor as mot", "mot.marcaMotor= '" + String.valueOf(dtoPresupuesto.getMotor()) + "'");
                if (motorNuevoPresupuesto == null) {
                    //NO EXISTE ESTE MOTOR DAR AVISO POR PANTALLA
                    throw new ExceptionStringSimple(motorNoExiste, this.getClass().getSimpleName());

                }
                nuevoDetalle.setMotor(motorNuevoPresupuesto);

                //asigno APLICACION
                Aplicacion aplicacion = (Aplicacion) IndireccionPersistencia.getInstance()
                        .Buscar("*", "Aplicacion as apl", "apl.nombreAplicacion= '" + String.valueOf(dtoPresupuesto.getAplicacion()) + "'");
                if (aplicacion == null) {
                    //NO EXISTE LA APLICACION
                    //Dar aviso por pantalla
                    throw new ExceptionStringSimple(aplicacionNoExiste, this.getClass().getSimpleName());
                }
                nuevoDetalle.setAplicacion(aplicacion);

                //asigno CILINDRADA
                Cilindrada cilindrosElegidos = (Cilindrada) IndireccionPersistencia.getInstance()
                        .Buscar("*", "Cilindrada as cil", "cil.cantidadCilindros= '" + dtoPresupuesto.getCilindrada() + "'");
                if (cilindrosElegidos == null) {
                    //no existe la cilindrada
                    //dar aviso por pantalla
                    throw new ExceptionStringSimple(cilindradaNoExiste, this.getClass().getSimpleName());
                }
                nuevoDetalle.setCilindrada(cilindrosElegidos);

                //asigno TIPOPARTEMOTOR
                TipoParteMotor tipoParte = (TipoParteMotor) IndireccionPersistencia.getInstance()
                        .Buscar("*", "TipoParteMotor as tip", "tip.nombreTipoParteMotor= '" + dtoPresupuesto.getTipoParteMotor() + "'");
                if (tipoParte == null) {
                    //no existe el tipo parte motor
                    //dar aviso por pantalla
                    throw new ExceptionStringSimple(parteNoExiste, this.getClass().getSimpleName());
                }
                nuevoDetalle.setTipoParteMotor(tipoParte);

                //Ahora sigo con las operaciones y el valor cobrado
                ArrayList<DTOCobroOperacionCUHacerPresupuesto> listaDTOCobro = dtoPresupuesto.getM_DTOCobroOperacionCUHacerPresupuesto();
                EstadoCobranzaOperacion estadoAlta = (EstadoCobranzaOperacion) IndireccionPersistencia
                            .getInstance().Buscar("*", "EstadoCobranzaOperacion as est", "est.nombreEstadoCobranzaOperacion= 'Alta'");
                for (int index = 0; index > listaDTOCobro.size(); index++) {

                    Operacion operacion = (Operacion) IndireccionPersistencia.getInstance()
                            .Buscar("*", "Operacion as op", "op.nombreOperacion= '" + listaDTOCobro.get(index).getNombreOperacion() + "'"
                                    + " and op.tipoParteMotor= '" + tipoParte.getOid() + "'");
                    if (operacion == null) {
                        //la operacion no existe
                        //dar aviso por pantalla
                        throw new ExceptionStringSimple(operacionNoExiste, this.getClass().getSimpleName());
                    }

                    CobranzaOperacion cobranza = new CobranzaOperacion();
                    cobranza.setOperacion(operacion);
                    //calculo el total de cobro= CostoOp* Cantidad
                    cobranza.setCobranzaOperacion(Float.parseFloat(listaDTOCobro.get(index).getcobroOperacion()) * listaDTOCobro.get(index).getCantidad());
                    cobranza.setCilindros(cilindrosElegidos);

                    nuevoDetalle.setOperacionIndividual(cobranza);
                    cobranza.setEstado(estadoAlta);
                    //creo un nuevo id para la cobranza
                    Integer nuevoID = IndireccionPersistencia.getInstance()
                            .buscarUltimoID("cob.cobranzaOperacionID", "CobranzaOperacion as cob");
                    if(nuevoID==null){
                        nuevoID=1;
                    }else{
                        nuevoID=+1;
                    }
                    cobranza.setIdCobranza(nuevoID);
                    //LE PASO EL OBJETO PEDIDO A HIBERNATE Y EL SE LAS ARREGLA :) asi que no guardo nada
                }

                //una vez terminado el detalle se lo asigno al presupuesto
                presupuestoNuevo.agregarDetalle(nuevoDetalle);

                //Ahora sigo con los repuestos que ya se eligieron
                ArrayList<DtoRepuestosElegidos> listaDTORepuesto = dtoPresupuesto.getM_DtoRepuestosElegidos();
                ArrayList<DetallePedido> detalles = new ArrayList(); //lista de detalles pedido
                EstadoDetallePedido estadoDetallePedido = (EstadoDetallePedido) IndireccionPersistencia.getInstance()
                            .Buscar("*", "EstadoDetallePedido as est", "est.nombreEstadoDetallePedidoRepuesto= 'Alta'");
                for (int index = 0; index > listaDTORepuesto.size(); index++) {

                    DetallePedido detallePedido = new DetallePedido();

                    Articulo articulo = (Articulo) IndireccionPersistencia.getInstance()
                            .Buscar("*", "Articulo as art", "art.descripcionArticulo= '" + listaDTORepuesto.get(index).getnombreRepuesto() + "'");


                    if (articulo == null) {
                        throw new ExceptionStringSimple(repuestoNoExiste, this.getClass().getSimpleName());
                    } else {
                        if (estadoDetallePedido == null) {
                            throw new ExceptionStringSimple(estadoDetallePedidoNoExiste, this.getClass().getSimpleName());
                        } else {
                            detallePedido.setArticulo(articulo);
                            //detallePedido.setd(nuevoDetalle); EL PEDIDO DETALLE NO APUNTA A DETALLE PRESUPUESTO
                            detallePedido.setCantidadArticulo(listaDTORepuesto.get(index).getcantidadRepuesto());
                            detallePedido.setPrecioRepuesto(listaDTORepuesto.get(index).getprecioRepuesto());

                            detallePedido.setEstado(estadoDetallePedido);
                            detalles.add(detallePedido);
                        }

                    }

                }
                pedido.setM_DetallePedido(detalles);

            }
            pedido.setfechaCreacion(new Date());
            EstadoPedidoRepuesto estadoPedido = (EstadoPedidoRepuesto) IndireccionPersistencia.getInstance()
                    .Buscar("*", "EstadoPerdidoRepuesto as est", "est.nombreEstadoPedido= 'Creado'");
            pedido.setEstadoPedidoRepuesto(estadoPedido);

            //Agregar un numero único a este presupuesto y al pedido
            asignarIDaPedidoyPresupuesto();

            presupuestoNuevo.setImporteTotal(importeTotal);
            //GUARDAR PRESUPUESTO Y PEDIDOREPUESTOS
            IndireccionPersistencia.getInstance().guardar(presupuestoNuevo);
            IndireccionPersistencia.getInstance().guardar(pedido);

            IndireccionPersistencia.getInstance().commit();
        } catch (NullPointerException | ExceptionStringSimple e) {

            IndireccionPersistencia.getInstance().rollback();
            avisarExceptionAObservadores(e);
            avisarExceptionAObservadores(new ExceptionStringSimple(operacionCancelada, this.getClass().getSimpleName()));

        }

    }

    public void guardarEImprimir(ArrayList<DTOPresupuestoFinal> presupuestoDTO, Float importeTotal) {

        try {

            IndireccionPersistencia.getInstance().iniciarTransaccion();

            //busco los datos del cliente para pasarlo al impresor
            Cliente client = (Cliente) IndireccionPersistencia.getInstance()
                    .Buscar("*", "Cliente as cli", "cli.clienteID= " + clienteID);

            expertoImpresion.imprimirPresupuesto(presupuestoDTO, importeTotal, client);

            guardarPresupuesto(presupuestoDTO, importeTotal);

            IndireccionPersistencia.getInstance().commit();
        } catch (NullPointerException | PrinterException e) {

            IndireccionPersistencia.getInstance().rollback();
            avisarExceptionAObservadores(e);
            avisarExceptionAObservadores(new ExceptionStringSimple(operacionCancelada, this.toString()));

        }

    }

    protected abstract void asignarIDaPedidoyPresupuesto();

    protected abstract void buscarPresupuestoYPedido();

}
