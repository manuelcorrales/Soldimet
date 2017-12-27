package soldimet.service.expertos;

import ModeloDeClases.Caja;
import ModeloDeClases.Cobranza;
import ModeloDeClases.CobranzaGenerico;
import ModeloDeClases.CobranzaPresupuesto;
import ModeloDeClases.Movimiento;
import ModeloDeClases.Pago;
import ModeloDeClases.PermisosRol;
import ModeloDeClases.RolEmpleado;
import factoria.FactoriaEstrategiaMovimiento;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:43 p.m.
 */
public class ExpertoCUConsultarMovimientosDeCaja {

    //tipos de movimientos
    private final String ingreso = "Cobro";
    private final String egreso = "Pago";


	public void finalize() throws Throwable {

	}

    public ArrayList<DTOMovimientos> consultarMovimientos() {
        no me cierra la lista de cajas que recibe y si tiene permisos para modificarlo, ver eso y termino este experto
        IndireccionPersistencia.getInstance().iniciarTransaccion();

        try {

            RolEmpleado rol = RolIdentificado.getInstance().getRol();

            EstrategiaMovimiento estrategia = FactoriaEstrategiaMovimiento.getInstance()
                    .obtenerEstrategia(rol);

            List<Caja> listaMovimientos = estrategia.buscarMovimientos();

            return crearListaDTO(listaMovimientos);

        } catch (NullPointerException e) {

            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        }

    }

    public ArrayList<DTOMovimientos> buscarMovimientosPorCriterio(String criterioBusqueda){

        IndireccionPersistencia.getInstance().iniciarTransaccion();

        try {

            List<Movimiento> listaMovimientos = (List<Movimiento>)IndireccionPersistencia.getInstance()
                    .Buscar("*",
                            "Movimiento as mov,Pago as pag, Cobranza as cob, Cliente as cli, Persona as per, PagoCliente as pagcli, PagoProveedor as pagprov, PagoEmpleado as pagemp, Empleado as emp, Proveedor as prov",

                            //cobranzas con el nombre del cliente en el criterio de busqueda
                            "(cob.oid = mov.oid and cob.cliente= cli.oid and cli.oid = per.oid and per.oid like ='"+criterioBusqueda+"') OR "

                                    //Pago con el nombre del empleado en el criterio de buqueda
                                    + "(mov.oid=pag.oid and pagemp.oid=pag.oid and pagemp.empleado =emp.oid and emp.oid = per.oid and per.nombre like ='"+criterioBusqueda+"' ) OR "

                                    //pago con el nombre del proveedor en el criterio
                                    + "(mov.oid=pag.oid and pag.oid=pagprov.oid and pagprov.proveedor= prov.oid and prov.oid=per.oid and  per.nombre like ='"+criterioBusqueda+"') OR "

                                    //pago con el nombre del cliente en el criterio
                                    + "(mov.oid=pag.oid and pag.oid=pagcli.oid and pagcli.cliente = cli.oid and cli.oid = per.oid and per.oid like ='"+criterioBusqueda+"')");

            return crearListaDTO(listaMovimientos, new ExpertoPermisos().verificarPermisosModificarMovimientos());

        } catch (NullPointerException e) {

            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;
        }


    }


    private ArrayList<DTOMovimientos> crearListaDTO(List<Caja> listaCaja){

        ArrayList<DTOMovimientos> listaDTO = new ArrayList();



        //paso  caja por caja
        listaCaja.stream().forEach((unaCaja) -> {
            List<Movimiento>  listaMovimientos= unaCaja.getM_Movimiento();

             //paso movimiento por movimiento
            listaMovimientos.stream().forEach((listaMovimiento) -> {
                DTOMovimientos dto = new DTOMovimientos();
                dto.setFormaDePago(listaMovimiento.getFormaDePago().getNombreFormaDePago());
                dto.setFecha(unaCaja.getFecha());
                dto.setEstado(listaMovimiento.getEstado().getnombreEstadoMovimiento());
                dto.setImporte(listaMovimiento.getImporte());
                dto.setEmpleado(listaMovimiento.getEmpleadoPagado().getNombre());
                dto.setPuedeModificar(modificable);
                //indico el saldo final
                dto.setSaldo(listaMovimiento.getUltimoValorDeCaja());


                //si la clase movimiento es de tipo PAGO
                if (listaMovimiento instanceof Pago ) {

                    Pago clasePago = (Pago) listaMovimiento;
                    dto.setDescripcion(clasePago.getDescripcionMovimiento());
                    dto.setPersona(clasePago.getEmpleadoPagado().getNombre());
                    dto.setIdPersona(clasePago.getEmpleadoPagado().getPersonaId());
                    dto.setIdMovimiento(clasePago.getIdPago());

                }
                //si la clase movimiento es de tipo COBRANZA
                if (listaMovimiento instanceof Cobranza) {
                    Cobranza claseCobranza = (Cobranza) listaMovimiento;
                    dto.setPersona(claseCobranza.getCliente().getNombre());
                    dto.setIdPersona(claseCobranza.getCliente().getIdClienteNegocio());

                    //si cobro un presupuesto
                    if (claseCobranza instanceof CobranzaPresupuesto) {
                        CobranzaPresupuesto cp = (CobranzaPresupuesto) claseCobranza;
                        dto.setNumeroPresupuesto(cp.getPresupuesto().getPresupuestoId());

                    }
                    //si cobro una soldadura
                    if (claseCobranza instanceof CobranzaGenerico) {
                        //NO AGREGO NADA EN PARTICULAR POR QUE NO TIENE NADA

                    }

                    listaDTO.add(dto);
                }
            });
        });




        return listaDTO;
    }

    private ArrayList<DTOMovimientos> crearListaDTO(List<Movimiento> listaMovimientos, Boolean modificable){

        ArrayList<DTOMovimientos> listaDTO = new ArrayList();
         //paso movimiento por movimiento
            listaMovimientos.stream().forEach((listaMovimiento) -> {
                DTOMovimientos dto = new DTOMovimientos();
                dto.setFormaDePago(listaMovimiento.getFormaDePago().getNombreFormaDePago());
                dto.setFecha(listaMovimiento.getFechaMovimiento());
                dto.setEstado(listaMovimiento.getEstado().getnombreEstadoMovimiento());
                dto.setImporte(listaMovimiento.getImporte());
                dto.setEmpleado(listaMovimiento.getEmpleadoPagado().getNombre());
                dto.setPuedeModificar(modificable);
                //indico el saldo final
                dto.setSaldo(listaMovimiento.getUltimoValorDeCaja());


                //si la clase movimiento es de tipo PAGO
                if (listaMovimiento instanceof Pago ) {

                    Pago clasePago = (Pago) listaMovimiento;
                    dto.setDescripcion(clasePago.getDescripcionMovimiento());
                    dto.setPersona(clasePago.getEmpleadoPagado().getNombre());
                    dto.setIdPersona(clasePago.getEmpleadoPagado().getPersonaId());
                    dto.setIdMovimiento(clasePago.getIdPago());

                }
                //si la clase movimiento es de tipo COBRANZA
                if (listaMovimiento instanceof Cobranza) {
                    Cobranza claseCobranza = (Cobranza) listaMovimiento;
                    dto.setPersona(claseCobranza.getCliente().getNombre());
                    dto.setIdPersona(claseCobranza.getCliente().getIdClienteNegocio());

                    //si cobro un presupuesto
                    if (claseCobranza instanceof CobranzaPresupuesto) {
                        CobranzaPresupuesto cp = (CobranzaPresupuesto) claseCobranza;
                        dto.setNumeroPresupuesto(cp.getPresupuesto().getPresupuestoId());

                    }
                    //si cobro una soldadura
                    if (claseCobranza instanceof CobranzaGenerico) {
                        //NO AGREGO NADA EN PARTICULAR POR QUE NO TIENE NADA

                    }

                    listaDTO.add(dto);
                }
            });
            return listaDTO;
    }

}
