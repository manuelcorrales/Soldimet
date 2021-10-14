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
public class DtoTipoMovimiento {

    private String tipoMovimiento;

    private ArrayList<DtoRubroYCategoria> rubrosycat;

    public DtoTipoMovimiento() {}

    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public ArrayList<DtoRubroYCategoria> getRubrosycat() {
        return rubrosycat;
    }

    public void setRubrosycat(ArrayList<DtoRubroYCategoria> rubrosycat) {
        this.rubrosycat = rubrosycat;
    }

    public void agregarRubroYCategoria(DtoRubroYCategoria dto) {
        this.rubrosycat.add(dto);
    }
}
