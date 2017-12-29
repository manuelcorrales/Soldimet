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
public class DTOListaPrecioManoDeObra {

    private int numeroLista;

    private ArrayList<String> nombreOperaciones;

    private ArrayList precioOperaciones;

    public DTOListaPrecioManoDeObra() {
    }

    public int getNumeroLista() {
        return numeroLista;
    }

    public void setNumeroLista(int numeroLista) {
        this.numeroLista = numeroLista;
    }

    public ArrayList<String> getNombreOperaciones() {
        return nombreOperaciones;
    }

    public void setNombreOperaciones(ArrayList<String> nombreOperaciones) {
        this.nombreOperaciones = nombreOperaciones;
    }

    public ArrayList getPrecioOperaciones() {
        return precioOperaciones;
    }

    public void setPrecioOperaciones(ArrayList precioOperaciones) {
        this.precioOperaciones = precioOperaciones;
    }

    public void agregarOperacion(String op){
        this.nombreOperaciones.add(op);
    }
    public void agregarPrecio(float precio){
        this.precioOperaciones.add(precio);
    }


    public void agregarOperacionYPrecio(String op, float precio){
        this.nombreOperaciones.add(op);
        this.precioOperaciones.add(precio);
    }


}
