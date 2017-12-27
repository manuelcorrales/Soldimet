/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import Exceptions.ExceptionStringSimple;
import ModeloDeClases.Caja;
import ModeloDeClases.CategoriaRubro;
import ModeloDeClases.FormaDePago;
import ModeloDeClases.Categoria;
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
public class ExpertoCUNuevoMovimiento extends ExpertoCUManejoDeMovimientos {




    public ExpertoCUNuevoMovimiento(ControladorErroresSimple observador) {
        super(observador);
    }

    //busco las formas de mov posibles
    //busco los rubros y categorias de mov y envio todo para iniciar
    @Override
    public DTOABMMovimiento iniciarCU() {

        IndireccionPersistencia.getInstance().iniciarTransaccion();

        DTOABMMovimiento dto = new DTOABMMovimiento();

        //PRIMERO DEBO VERIFICAR QUE LA CAJA ESTE ABIERTA
        //creo una fecha actual y le doy formato (puede ser yyyy/MM/dd HH:mm:ss)
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date date = new Date();
        Caja caja = (Caja) IndireccionPersistencia.getInstance().Buscar("*", "Caja as caj", "caj.fecha=" + dateFormat.format(date));

        try {

            if (caja == null) {
                throw new Exceptions.ExceptionStringSimple(mensajeCajaCerrada, this.toString());
            }
            this.cajaDia = caja;
            //busco las formas de pago
            ArrayList<FormaDePago> formasPago = (ArrayList<FormaDePago>) IndireccionPersistencia.getInstance()
                    .Buscar("DISTINCT *",
                            "FormaDePago as form",
                            "form.oid=form.oid");



            //busco los tipos de movimientos posibles
            ArrayList<TipoMovimiento> tipoMov = (ArrayList<TipoMovimiento>) IndireccionPersistencia.getInstance()
                    .Buscar("DISTINCT *", //DISTINCT trae sin repetir (los distintos tipos)
                             "TipoMovimiento as tipo",
                            "tipo.oid = tipo.oid");

            formasPago.stream().forEach((formaPago) -> {
                dto.agregarFormaDePago(formaPago.getNombreFormaDePago());
            });

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
            IndireccionPersistencia.getInstance().cerrarTransaccion();
            return null;

        }
    }
}
