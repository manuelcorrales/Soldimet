/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;
import java.util.ArrayList;
import javafx.util.Pair;


/**
 *
 * @author Manu
 */
public class DTODetallePresupuesto {



    private double importe;
    private String aplicacion;
    private String motor;
    private int cilindrada;
    private String elementoSoldado;
    private String tipoParteMotor;

    private ArrayList<Pair> operacionYCobro;  //se maneja de a 2, A operacion, B cobro

    public DTODetallePresupuesto() {
    }


    public double getImporte() {
        return importe;
    }

    public void setImporte(double importe) {
        this.importe = importe;
    }

    public String getAplicacion() {
        return aplicacion;
    }

    public void setAplicacion(String aplicacion) {
        this.aplicacion = aplicacion;
    }

    public String getMotor() {
        return motor;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }

    public String getElementoSoldado() {
        return elementoSoldado;
    }

    public void setElementoSoldado(String elementoSoldado) {
        this.elementoSoldado = elementoSoldado;
    }

    public String getTipoParteMotor() {
        return tipoParteMotor;
    }

    public void setTipoParteMotor(String tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }

    public ArrayList getOperacionYCobro() {
        return operacionYCobro;
    }

    public void setOperacionYCobro(ArrayList operacionYCobro) {
        this.operacionYCobro = operacionYCobro;
    }
    public void agregarParejaOpYCob(Pair pareja){

        this.operacionYCobro.add(pareja);
    }



}
