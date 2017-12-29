/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;
import java.util.Date;
import java.util.ArrayList;

/**
 *
 * @author Manu
 */
public class DTOPresupuesto {
    private String nombreCliente;
    private int idCliente;
    private int idPresupuesto;
    private Date fechaAceptado;
    private Date fechaCreado;
    private Date fechaEntregado;
    private double importeTotal;
    private ArrayList<DTODetallePresupuesto> detalles;
    private DTOPedidoRepuesto pedido;

    public DTOPresupuesto() {
    }
    public void agregarDetalle(DTODetallePresupuesto unDetalle){

        this.detalles.add(unDetalle);
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }


    public Date getFechaAceptado() {
        return fechaAceptado;
    }

    public void setFechaAceptado(Date fechaAceptado) {
        this.fechaAceptado = fechaAceptado;
    }

    public Date getFechaCreado() {
        return fechaCreado;
    }

    public void setFechaCreado(Date fechaCreado) {
        this.fechaCreado = fechaCreado;
    }

    public Date getFechaEntregado() {
        return fechaEntregado;
    }

    public void setFechaEntregado(Date fechaEntregado) {
        this.fechaEntregado = fechaEntregado;
    }

    public double getImporteTotal() {
        return importeTotal;
    }

    public void setImporteTotal(double importeTotal) {
        this.importeTotal = importeTotal;
    }

    public ArrayList<DTODetallePresupuesto> getDetalles() {
        return detalles;
    }

    public void setDetalles(ArrayList<DTODetallePresupuesto> detalles) {
        this.detalles = detalles;
    }

    public DTOPedidoRepuesto getPedido() {
        return pedido;
    }

    public void setPedido(DTOPedidoRepuesto pedido) {
        this.pedido = pedido;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public int getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(int idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }




}
