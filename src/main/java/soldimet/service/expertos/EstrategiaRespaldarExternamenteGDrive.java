/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ModeloDeClases.ParametroGeneral;
import indireccion.IndireccionPersistencia;

/**
 *
 * @author Manu
 */
public class EstrategiaRespaldarExternamenteGDrive implements EstrategiaRespaldar {

    @Override
    public Boolean respaldar(String ubicacion){
        ParametroGeneral parametros =(ParametroGeneral)IndireccionPersistencia.getInstance()
                .Buscar("*", "ParametroGeneral", "oid=oid");

        //busco el adaptador de GoogleDrive


        return true;
    }

}
