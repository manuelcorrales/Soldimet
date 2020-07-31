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
public class DTOMetricaContable {

    private String categoria;
    private Float valor;

    public DTOMetricaContable() {

    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return this.categoria +": "+ this.valor.toString();
    }

    /**
     * @return the categoria
     */
    public String getCategoria() {
        return categoria;
    }

    /**
     * @return the valor
     */
    public Float getValor() {
        return valor;
    }
    /**
     * @param categoria the categoria to set
     */
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    /**
     * @param valor the valor to set
     */
    public void setValor(Float valor) {
        this.valor = valor;
    }


}
