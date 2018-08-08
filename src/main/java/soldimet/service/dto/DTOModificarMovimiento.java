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
public class DTOModificarMovimiento {

    private DTOMovimientoExistente movimientoExistente;
    private DTOABMMovimiento parametrosParaLLenarGUI;

    public DTOModificarMovimiento(DTOMovimientoExistente movimientoExistente, DTOABMMovimiento parametrosParaLLenarGUI) {
        this.movimientoExistente = movimientoExistente;
        this.parametrosParaLLenarGUI = parametrosParaLLenarGUI;
    }

    public DTOModificarMovimiento() {
    }

    public DTOMovimientoExistente getMovimientoExistente() {
        return movimientoExistente;
    }

    public void setMovimientoExistente(DTOMovimientoExistente movimientoExistente) {
        this.movimientoExistente = movimientoExistente;
    }

    public DTOABMMovimiento getParametrosParaLLenarGUI() {
        return parametrosParaLLenarGUI;
    }

    public void setParametrosParaLLenarGUI(DTOABMMovimiento parametrosParaLLenarGUI) {
        this.parametrosParaLLenarGUI = parametrosParaLLenarGUI;
    }




}
