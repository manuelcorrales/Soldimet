/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ModeloDeClases.PermisosRol;
import ModeloDeClases.RolEmpleado;
import java.util.List;

/**
 *
 * @author Manu
 */
public class ExpertoPermisos {

    private static final String BORRARMOVIMIENTOCAJAANTIGUO = "Eliminar movimientos de caja con antigüedad mayor a 24hrs";
    private static final String MODIFICARCOSTOSMANODEOBRA = "Modificar los costos de mano de obra";
    private static final String MODIFICARMOVIMIENTOSANTIGUO = "Modificar movimientos de caja con antigüedad mayor a 24hrs";
    public ExpertoPermisos() {
    }

    public Boolean verificarPermisoEliminarMovimiento(){

        return permisoPara(BORRARMOVIMIENTOCAJAANTIGUO);
    }


    public Boolean verificarPermisosModificarCostosManoObra(){
        return permisoPara(MODIFICARCOSTOSMANODEOBRA);
    }

    public Boolean verificarPermisosModificarMovimientos(){
        return permisoPara(MODIFICARMOVIMIENTOSANTIGUO);
    }



    private Boolean permisoPara(String nombrePermiso){
         //busco el rol del usuario identificado y sus permisos
        RolEmpleado rol =RolIdentificado.getInstance().getRol();

        List<PermisosRol> permisos = rol.getPermisos();

        Boolean habilitado = false;
        for(PermisosRol permiso:permisos){
            if(permiso.getPermiso().contentEquals(nombrePermiso)){
                habilitado = true;
                break;
            }
        }
        return habilitado;
    }

}
