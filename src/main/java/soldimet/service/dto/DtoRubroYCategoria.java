/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

import java.util.ArrayList;

/**
 *
 * @author manu_
 */
public class DtoRubroYCategoria {

    private String nombreRubro;

    private ArrayList<String> categorias;

    public DtoRubroYCategoria() {}

    public DtoRubroYCategoria(String nombreRubro, ArrayList<String> categorias) {
        this.nombreRubro = nombreRubro;
        this.categorias = categorias;
    }

    public String getNombreRubro() {
        return nombreRubro;
    }

    public void setNombreRubro(String nombreRubro) {
        this.nombreRubro = nombreRubro;
    }

    public ArrayList<String> getCategorias() {
        return categorias;
    }

    public void setCategorias(ArrayList<String> categorias) {
        this.categorias = categorias;
    }

    public void agregarCategoria(String cat) {
        this.categorias.add(cat);
    }
}
