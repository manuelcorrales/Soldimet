/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

/**
 *
 * @author Manu
 */
public class ExpertoCUIdentificacionUsuario {

    public Boolean identificarUsuario(String user, String pass){

        return RolIdentificado.getInstance().identificarse(user, pass);
    }

    public String obtenerRol(){

        return RolIdentificado.getInstance().getRol().getNombreRol();
    }
}
