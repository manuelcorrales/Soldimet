/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

import java.time.LocalDate;
import java.util.ArrayList;

/**
 *
 * @author Manu
 */
public class DTOPedidoRepuesto {

    private String cliente;
    private String motor;
    private LocalDate fechaCreacion;
    private LocalDate fechaPedido;
    private LocalDate fechaRecibo;
    private Long idPedidoRepuesto;
    private String estadoPedidoRepuesto;
    private Long idPresupuesto;

    private ArrayList<DTODetallePedidoRepuesto> m_DetallePedido;

    public DTOPedidoRepuesto() {}

    public DTOPedidoRepuesto(
        String cliente,
        String motor,
        LocalDate fechaCreacion,
        LocalDate fechaPedido,
        LocalDate fechaRecibo,
        Long idPedidoRepuesto,
        String estadoPedidoRepuesto,
        Long idPresupuesto
    ) {
        this.cliente = cliente;
        this.motor = motor;
        this.fechaCreacion = fechaCreacion;
        this.fechaPedido = fechaPedido;
        this.fechaRecibo = fechaRecibo;
        this.idPedidoRepuesto = idPedidoRepuesto;
        this.estadoPedidoRepuesto = estadoPedidoRepuesto;
        this.idPresupuesto = idPresupuesto;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getMotor() {
        return motor;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    public Long getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(Long idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }

    public void agregarDetallePedidoRepuesto(DTODetallePedidoRepuesto detalle) {
        this.m_DetallePedido.add(detalle);
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

    public ArrayList<DTODetallePedidoRepuesto> getM_DetallePedido() {
        return m_DetallePedido;
    }

    public void setM_DetallePedido(ArrayList<DTODetallePedidoRepuesto> m_DetallePedido) {
        this.m_DetallePedido = m_DetallePedido;
    }

    public String getEstadoPedidoRepuesto() {
        return estadoPedidoRepuesto;
    }

    public void setEstadoPedidoRepuesto(String estadoPedidoRepuesto) {
        this.estadoPedidoRepuesto = estadoPedidoRepuesto;
    }
}
