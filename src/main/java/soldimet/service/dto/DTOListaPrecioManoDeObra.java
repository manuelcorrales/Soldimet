/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import soldimet.domain.CostoOperacion;
import soldimet.domain.Operacion;

/**
 *
 * @author Manu
 */
public class DTOListaPrecioManoDeObra {

    private int numeroLista;

    private LocalDate fechaDesde;

    private LocalDate fechaHasta;

    private List<CostoOperacion> operaciones = new ArrayList<CostoOperacion>();

    public DTOListaPrecioManoDeObra() {}

    public int getNumeroLista() {
        return numeroLista;
    }

    public void setNumeroLista(int numeroLista) {
        this.numeroLista = numeroLista;
    }

    /**
     * @return the fechaDesde
     */
    public LocalDate getFechaDesde() {
        return fechaDesde;
    }

    /**
     * @return the fechaHasta
     */
    public LocalDate getFechaHasta() {
        return fechaHasta;
    }

    /**
     * @return the operaciones
     */
    public List<CostoOperacion> getOperaciones() {
        return operaciones;
    }

    /**
     * @param fechaDesde the fechaDesde to set
     */
    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    /**
     * @param fechaHasta the fechaHasta to set
     */
    public void setFechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    /**
     * @param operaciones the operaciones to set
     */
    public void setOperaciones(ArrayList<CostoOperacion> operaciones) {
        this.operaciones = operaciones;
    }
}
