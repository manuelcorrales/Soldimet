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
public class DTOImpresionCadena {

    private String nombreCadena;
    private String valorCadena;
    private int X;
    private int Y;

    public DTOImpresionCadena() {
    }

    public DTOImpresionCadena(String nombreCadena, String valorCadena, int X, int Y) {
        this.nombreCadena = nombreCadena;
        this.valorCadena = valorCadena;
        this.X = X;
        this.Y = Y;
    }

    public int getY() {
        return Y;
    }

    public void setY(int Y) {
        this.Y = Y;
    }

    public String getNombreCadena() {
        return nombreCadena;
    }

    public void setNombreCadena(String nombreCadena) {
        this.nombreCadena = nombreCadena;
    }

    public String getValorCadena() {
        return valorCadena;
    }

    public void setValorCadena(String valorCadena) {
        this.valorCadena = valorCadena;
    }

    public int getX() {
        return X;
    }

    public void setX(int X) {
        this.X = X;
    }


}
