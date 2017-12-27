/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresConBarraDeProgreso;
import java.util.ArrayList;

/**
 *
 * @author Manu
 */
public class ObservableParaBarraDeProgreso extends ObservableSimple{

    private final ControladorErroresConBarraDeProgreso observador;

    public ObservableParaBarraDeProgreso(ControladorErroresConBarraDeProgreso observador) {
        super(observador);
        this.observador = observador;
    }

    public void avisarEventoABarraDeProgreso(String evento){
        observador.avisarEventoABarra(evento);
    }

    public void avisarEventoABarraDeProgreso(Integer valor){
        observador.avisarNuevoPorcentajeDeBarra(valor);
    }





}
