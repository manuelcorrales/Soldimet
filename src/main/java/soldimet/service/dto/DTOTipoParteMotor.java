/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

/**
 *
 * @author Manu
 */
public class DTOTipoParteMotor {

    private String nombretipoParteMotor;
    private Integer oid;

    public DTOTipoParteMotor(String nombretipoParteMotor, Integer oid) {
        this.nombretipoParteMotor = nombretipoParteMotor;
        this.oid = oid;
    }

    public DTOTipoParteMotor() {
    }

    public String getNombretipoParteMotor() {
        return nombretipoParteMotor;
    }

    public void setNombretipoParteMotor(String nombretipoParteMotor) {
        this.nombretipoParteMotor = nombretipoParteMotor;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }




}
