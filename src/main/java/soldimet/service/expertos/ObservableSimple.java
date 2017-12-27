/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import ControladoresCU.ControladorErroresSimple;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.*;

/**
 *
 * @author Manu
 */
public class ObservableSimple {

    private final String ubicacionArchivoConfiguracionLogs = "src\\Logs\\log4j.properties.txt";
    private final String tituloMensajeCritico = "Mensaje crítico";

    public ArrayList<ControladorErroresSimple> observadores = new ArrayList();

    public ObservableSimple(ControladorErroresSimple observador) {
        try {
            LogManager.getLogManager().readConfiguration(
                    new FileInputStream(ubicacionArchivoConfiguracionLogs));

        } catch (IOException | SecurityException ex) {
            Logger.getLogger(ObservableSimple.class.getName()).log(Level.SEVERE, null, ex);
        }
        observadores.add(observador);
    }

    public void agregarObservador(ControladorErroresSimple observador) {
        observadores.add(observador);
    }

    public void eliminarObservador(ControladorErroresSimple observador) {
        observadores.remove(observador);
    }

    public void avisarExceptionAObservadores(Exception e) {

        for (ControladorErroresSimple controlador : observadores) {
            controlador.avisoGUI(e.getMessage());
        }
        Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, tituloMensajeCritico, e);
    }

    public void avisarExceptionAObservadores(Exceptions.ExceptionStringSimple e) {

        for (ControladorErroresSimple controlador : observadores) {
            controlador.avisoGUI(e.getMessage());
        }
        Logger.getLogger(e.getNombreClase()).log(Level.SEVERE, tituloMensajeCritico, e);
    }

    public ControladorErroresSimple getPrimerObservador(){
        return observadores.get(0);
    }

}
