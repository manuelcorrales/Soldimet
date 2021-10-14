/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Manu
 */
public class DTOPedidoCUConsultarPedidoRepuestos {

    //en pantalla tambien va el nombre del cliente y el numero de presupuesto
    private String tipoDTO;
    private String nombreCliente;
    private Long idPresupuesto;
    private LocalDate fechaCreacion;
    private LocalDate fechaPedido;
    private LocalDate fechaRecibo;
    private Long idPedidoRepuesto;

    private ArrayList<DTODetallePedidoCUConsultarPedidoRepuestos> m_DetallePedido;

    public DTOPedidoCUConsultarPedidoRepuestos() {}

    public void agregarDetalle(DTODetallePedidoCUConsultarPedidoRepuestos detalle) {
        this.m_DetallePedido.add(detalle);
    }

    public String getTipoDTO() {
        return tipoDTO;
    }

    public void setTipoDTO(String tipoDTO) {
        this.tipoDTO = tipoDTO;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public LocalDate getFechaRecibo() {
        return fechaRecibo;
    }

    public void setFechaRecibo(LocalDate fechaRecibo) {
        this.fechaRecibo = fechaRecibo;
    }

    public Long getIdPedidoRepuesto() {
        return idPedidoRepuesto;
    }

    public void setIdPedidoRepuesto(Long idPedidoRepuesto) {
        this.idPedidoRepuesto = idPedidoRepuesto;
    }

    public ArrayList<DTODetallePedidoCUConsultarPedidoRepuestos> getM_DetallePedido() {
        return m_DetallePedido;
    }

    public void setM_DetallePedido(ArrayList<DTODetallePedidoCUConsultarPedidoRepuestos> m_DetallePedido) {
        this.m_DetallePedido = m_DetallePedido;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public Long getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(Long idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }
}
