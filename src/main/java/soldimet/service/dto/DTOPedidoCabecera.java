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
public class DTOPedidoCabecera {

    private Long id;
    private LocalDate fecha;
    private String cliente;
    private String estado;
    private String motor;
    private String tipo;
    private Long presupuestoId;

    public DTOPedidoCabecera() {
    }

    /**
     * @return the cliente
     */
    public String getCliente() {
        return cliente;
    }
    /**
     * @return the estado
     */
    public String getEstado() {
        return estado;
    }
    /**
     * @return the fecha
     */
    public LocalDate getFecha() {
        return fecha;
    }
    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }
    /**
     * @return the motor
     */
    public String getMotor() {
        return motor;
    }
    /**
     * @return the presupuestoId
     */
    public Long getPresupuestoId() {
        return presupuestoId;
    }
    /**
     * @return the tipo
     */
    public String getTipo() {
        return tipo;
    }
    /**
     * @param cliente the cliente to set
     */
    public void setCliente(String cliente) {
        this.cliente = cliente;
    }/**
     * @param estado the estado to set
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }/**
     * @param fecha the fecha to set
     */
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }/**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }
    /**
     * @param motor the motor to set
     */
    public void setMotor(String motor) {
        this.motor = motor;
    }
    /**
     * @param presupuestoId the presupuestoId to set
     */
    public void setPresupuestoId(Long presupuestoId) {
        this.presupuestoId = presupuestoId;
    }
    /**
     * @param tipo the tipo to set
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }


}
