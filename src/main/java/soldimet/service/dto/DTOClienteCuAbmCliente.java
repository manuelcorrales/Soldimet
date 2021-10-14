/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package soldimet.service.dto;

import java.util.ArrayList;

/**
 *
 * @author Manu
 */
public class DTOClienteCuAbmCliente {

    private String nombreCliente;
    private String calle;
    private int numero;
    private String apellido;
    private int idCliente;
    private ArrayList<Integer> telefonos;
    private String localidad;

    public DTOClienteCuAbmCliente() {}

    public DTOClienteCuAbmCliente(
        String nombreCliente,
        String calle,
        int numero,
        String apellido,
        int idCliente,
        ArrayList<Integer> telefonos
    ) {
        this.nombreCliente = nombreCliente;
        this.calle = calle;
        this.numero = numero;
        this.apellido = apellido;
        this.idCliente = idCliente;
        this.telefonos = telefonos;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public ArrayList<Integer> getTelefonos() {
        return telefonos;
    }

    public void addTelefono(Integer telefono) {
        this.telefonos.add(telefono);
    }
}
