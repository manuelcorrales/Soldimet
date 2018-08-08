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
public class DTOABMmovimientoSubcategorias {

    private ArrayList<String> subcategorias;
    private String categoria;

    public DTOABMmovimientoSubcategorias() {
    }

    public DTOABMmovimientoSubcategorias(ArrayList<String> subcategoriasPago, String categoriaPago) {
        this.subcategorias = subcategoriasPago;
        this.categoria = categoriaPago;
    }

    public ArrayList<String> getSubcategorias() {
        return subcategorias;
    }

    public void setSubcategorias(ArrayList<String> subcategorias) {
        this.subcategorias = subcategorias;


    }

    public void addsubcategoria(String subcategoria){

        this.subcategorias.add(subcategoria);
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }










}
