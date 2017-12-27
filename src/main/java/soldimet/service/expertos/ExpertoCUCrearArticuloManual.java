/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import indireccion.IndireccionPersistencia;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoCUCrearArticuloManual {


    public List<String> buscarMarcas(){



        return (List<String>)IndireccionPersistencia.getInstance()
                .Buscar("*", "Marca as mar", "mar.habilitado=  true");

    }

    public List<String> buscarTipoRepuesto(){
        return (List<String>)IndireccionPersistencia.getInstance()
                .Buscar("*", "TipoRepuesto as tip", "tip.habilitado=  true");

    }

    public List<String> buscarRubros(){
        return (List<String>)IndireccionPersistencia.getInstance()
                .Buscar("*", "Rubro as rub", "rub.habilitado=  true");

    }


}
