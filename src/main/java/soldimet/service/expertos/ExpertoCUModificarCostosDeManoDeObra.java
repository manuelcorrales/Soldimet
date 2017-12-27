/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.CostoOperacion;
import ModeloDeClases.ListaPrecioDesdeHastaCRAM;
import ModeloDeClases.ListaPrecioRectificacionCRAM;
import indireccion.IndireccionPersistencia;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUModificarCostosDeManoDeObra extends ObservableSimple {

    private final String errorPermisoInsuficiente = "No tiene permisos suficientes para modificar estos valores";


    private ArrayList<ListaPrecioRectificacionCRAM> listaNumeroLista;

    public ExpertoCUModificarCostosDeManoDeObra(ControladorErroresSimple observador) {
        super(observador);
    }

    public void modificarCostos(String porcentaje) {
        //busco en la lista identificada por numero la lista que contiene el ultimo valor todo de nuevo
        //y despues sigo modificando valores y todo

        try {
            verificarPermisos();

            //por cada lista identificada por su numero
            for (ListaPrecioRectificacionCRAM listaPrecio : listaNumeroLista) {

                //obtengo las listas
                List<ListaPrecioDesdeHastaCRAM> listaDesde = listaPrecio.getFechas();

                //inicializo el apuntador a la ultima lista de precios con el primero que sale
                ListaPrecioDesdeHastaCRAM ultimaListaPrecios = listaDesde.get(0);

                //verifico cual tiene la ultima fecha y lo dejo en el apuntador de la ultima lista
                //y veo que tampoco este cerrada la lista
                for (ListaPrecioDesdeHastaCRAM lista : listaDesde) {

                    if (lista.getFechaDesde().after(ultimaListaPrecios.getFechaDesde())
                            && lista.getFechaHasta() != null) {
                        ultimaListaPrecios = lista;
                    }
                }

                //le indico la fecha de finalizacion de uso y creo otro nuevo con los nuevos valores
                ultimaListaPrecios.setFechaHasta(new Date());
                List<CostoOperacion> costoOperacionvieja = ultimaListaPrecios.getCostoOperacion();

                //proceso de creacion de la nueva lista
                ListaPrecioDesdeHastaCRAM listaPreciosNueva = new ListaPrecioDesdeHastaCRAM();
                listaPreciosNueva.setFechaDesde(new Date());
                int nuevoIDListaPrecio = (int) IndireccionPersistencia.getInstance()
                        .buscarUltimoID("lista.ListaPrecioDesdeHastaCRAMID", "ListaPrecioDesdeHastaCRAM as lista");

                nuevoIDListaPrecio = nuevoIDListaPrecio + 1;
                listaPreciosNueva.setListaPrecioDesdeHastaCRAMId(nuevoIDListaPrecio);

                //creo los nuevos valores y se los asigno a la lista nueva
                ArrayList<CostoOperacion> costosNuevos = new ArrayList();
                for (CostoOperacion costo : costoOperacionvieja) {

                    CostoOperacion nuevoCosto = new CostoOperacion();

                    nuevoCosto.setCilindrada(costo.getCilindrada());
                    nuevoCosto.setTipoParte(costo.getTipoParte());
                    nuevoCosto.setOperacion(costo.getOperacion());

                    Integer nuevoCostoID =IndireccionPersistencia.getInstance()
                            .buscarUltimoID("c.costoOperacionID", "CostoOperacion as c");
                    if(nuevoCostoID==null){
                        nuevoCostoID=1;
                    }else{
                        nuevoCostoID= nuevoCostoID+1;
                    }
                    nuevoCosto.setCostoOperacionIdNegocio(nuevoCostoID);
                    float precio = costo.getCostoOperacion();
                    float calculoNuevoValor;
                    Float porciento = Float.valueOf(porcentaje);
                    if (porcentaje.contains("-")) {

                        calculoNuevoValor = precio - (precio * porciento);
                    } else {
                        calculoNuevoValor = precio + (precio * porciento);
                    }
                    nuevoCosto.setCostoOperacion(calculoNuevoValor);

                    costosNuevos.add(nuevoCosto);

                }
                listaPreciosNueva.setCostoOperacion(costosNuevos);

                IndireccionPersistencia.getInstance().guardar(listaNumeroLista);
                IndireccionPersistencia.getInstance().guardar(listaPreciosNueva);
                IndireccionPersistencia.getInstance().commit();

            }

        } catch (NullPointerException e) {
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        }catch(ExceptionStringSimple e){
            avisarExceptionAObservadores(e);
            IndireccionPersistencia.getInstance().rollback();
        }

    }


    public ArrayList<DTOListaPrecioManoDeObra> buscarCostos() {

        indireccion.IndireccionPersistencia.getInstance().iniciarTransaccion();
        ArrayList<DTOListaPrecioManoDeObra> listaDTO = new ArrayList();
        try {
            //busco la lista que contiene el numero de lista
             listaNumeroLista = (ArrayList<ListaPrecioRectificacionCRAM>) indireccion.IndireccionPersistencia.getInstance()
                    .Buscar("*", "ListaPrecioRectificacionCRAM as list", "list.oid=list.oid");

            //por cada lista identificada por su numero
            for (ListaPrecioRectificacionCRAM listaPrecio : listaNumeroLista) {

                //obtengo las listas
                List<ListaPrecioDesdeHastaCRAM> listaDesde = listaPrecio.getFechas();
                //inicializo el apuntador a la ultima lista de precios con el primero que sale
                ListaPrecioDesdeHastaCRAM ultimaListaPrecios = listaDesde.get(0);

                //verifico cual tiene la ultima fecha y lo dejo en el apuntador de la ultima lista
                //y veo que tampoco este cerrada la lista
                for (ListaPrecioDesdeHastaCRAM lista : listaDesde) {

                    if (lista.getFechaDesde().after(ultimaListaPrecios.getFechaDesde())
                            && lista.getFechaHasta() != null) {
                        ultimaListaPrecios = lista;
                    }
                }

                //Por cada operacion y su costo creo un dto y lo agrego a la lista
                for (CostoOperacion costoOp : ultimaListaPrecios.getCostoOperacion()) {
                    DTOListaPrecioManoDeObra dto = new DTOListaPrecioManoDeObra();
                    dto.setNumeroLista(listaPrecio.getNumeroGrupoLista());
                    dto.agregarOperacionYPrecio(costoOp.getOperacion().getNombreOperacion(),
                            costoOp.getCostoOperacion());
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


    private void verificarPermisos () throws ExceptionStringSimple{

        if(new ExpertoPermisos().verificarPermisosModificarCostosManoObra()){

            //el usuario puede modificar los costos
            //no hago nada

        }else{

            //no tiene suficientes permisos, anulo y aviso por pantalla

            throw new ExceptionStringSimple(errorPermisoInsuficiente,this.getClass().getName());
        }

    }
}
