/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Caja;
import ModeloDeClases.Categoria;
import ModeloDeClases.CategoriaRubro;
import ModeloDeClases.FormaDePago;
import ModeloDeClases.TipoMovimiento;
import indireccion.IndireccionPersistencia;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 *
 * @author Manu
 */
public class ExpertoCUModificarMovimiento extends ExpertoCUManejoDeMovimientos {
    private final String errorPermisoInsuficiente ="Este movimiento fue creado hace mas de 24hrs, necesita permisos para eliminar eliminar";

    public ExpertoCUModificarMovimiento(ControladorErroresSimple observador) {
        super(observador);
    }




    /*
    public DTOModificarMovimiento iniciarCU(String movimientoID){



        DTOModificarMovimiento dtoParaGUI = new DTOModificarMovimiento();
        IndireccionPersistencia.getInstance().iniciarTransaccion();
        try{

            verificarPermisos();
            Movimiento mov = (Movimiento)IndireccionPersistencia.getInstance()
                    .Buscar("mov", "Movimiento as mov", "mov.movimientoID= "+movimientoID);

            terminar la busqueda de datos para modificar el movimiento


        }catch(NullPointerException |ExceptionStringSimple e){
            IndireccionPersistencia.getInstance().rollback();
            avisarExceptionAObservadores(e);
        }



        return dtoParaGUI;
    }
    */
    //busco las formas de mov posibles
    //busco los rubros y categorias de mov y envio todo para iniciar
    public DTOABMMovimiento buscarValoresDeInterfaz(){
          DTOABMMovimiento dto = new DTOABMMovimiento();

        //PRIMERO DEBO VERIFICAR QUE LA CAJA ESTE ABIERTA
        //creo una fecha actual y le doy formato (puede ser yyyy/MM/dd HH:mm:ss)
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date date = new Date();
        Caja caja = (Caja) IndireccionPersistencia.getInstance().Buscar("*", "Caja", "fecha=" + dateFormat.format(date));

        try {

            if (caja == null) {
                throw new Exceptions.ExceptionStringSimple(mensajeCajaCerrada, this.toString());
            }
            this.cajaDia = caja;
            //busco las formas de pago
            ArrayList<FormaDePago> formasPago = (ArrayList<FormaDePago>) IndireccionPersistencia.getInstance()
                    .Buscar("forma",
                            "FormaDePago as forma",
                            "forma.oid=forma.oid");

            formasPago.stream().forEach((formaPago) -> {
                dto.agregarFormaDePago(formaPago.getNombreFormaDePago());
            });

            //busco los tipos de movimientos posibles
            ArrayList<TipoMovimiento> tipoMov = (ArrayList<TipoMovimiento>) IndireccionPersistencia.getInstance()
                    .Buscar("tipo" //DISTINCT trae sin repetir (los distintos tipos)
                            ,
                             "TipoMovimiento as tipo",
                            "tipo.oid = tipo.oid");

            //cargo los tipo de movimiento, adentro los rubros y categorias
            for (TipoMovimiento tipo : tipoMov) {
                DtoTipoMovimiento dtoTipo = new DtoTipoMovimiento();
                dtoTipo.setTipoMovimiento(tipo.getNombreTipoMovimiento());

                //busco lus rubros y categorias (esta lista contiene las categorias de cobranza y pagos)
                List<CategoriaRubro> rubros = tipo.getRubros();

                //agrego la lista al dto
                for (CategoriaRubro categoriaRubro : rubros) {

                    DtoRubroYCategoria dtocat = new DtoRubroYCategoria();
                    dtocat.setNombreRubro(categoriaRubro.getNombreCategoriaPago());

                    List<Categoria> categorias = categoriaRubro.getCategorias();

                    for (Categoria categoria : categorias) {

                        dtocat.agregarCategoria(categoria.getNombreCategoria());

                    }
                    dtoTipo.agregarRubroYCategoria(dtocat);

                }
                dto.agregarTipoMovimiento(dtoTipo);
            }

            return dto;

        } catch (NullPointerException | ExceptionStringSimple e) {

            //la caja esta cerrada, aviso por pantalla
            avisarExceptionAObservadores(e);

            return new DTOABMMovimiento();

        }
    }




    @Override
    public DTOABMMovimiento iniciarCU() {

        return null;
    }




}
