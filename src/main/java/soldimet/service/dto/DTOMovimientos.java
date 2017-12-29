/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;
import java.util.Date;

/**
 *
 * @author Manu
 */
public class DTOMovimientos {
    private Date fecha;
   // private String tipo;
    private String formaDePago;
    private String descripcion;
    private String persona;
    private int numeroPresupuesto;
    private String estado;
    private int idPersona;
    private int idMovimiento;
    private double importe;
    private String empleado;
    private String tipoMovimiento;
    private String categoria;
    private double  saldo;
    private Boolean puedeModificar;

    public DTOMovimientos() {
    }

    public double getSaldo() {
        return saldo;
    }

    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }




    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }


    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }


    public String getEmpleado() {
        return empleado;
    }

    public void setEmpleado(String empleado) {
        this.empleado = empleado;
    }


    public double getImporte() {
        return importe;
    }

    public void setImporte(double importe) {
        this.importe = importe;
    }


    public String getEstado() {
        return estado;
    }

    public int getIdPersona() {
        return idPersona;
    }

    public int getIdMovimiento() {
        return idMovimiento;
    }

    public void setIdMovimiento(int idMovimiento) {
        this.idMovimiento = idMovimiento;
    }


    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }



    public void setEstado(String estado) {
        this.estado = estado;
    }


    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }


   /* public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }*/

    public String getFormaDePago() {
        return formaDePago;
    }

    public void setFormaDePago(String formaDePago) {
        this.formaDePago = formaDePago;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPersona() {
        return persona;
    }

    public void setPersona(String persona) {
        this.persona = persona;
    }

    public int getNumeroPresupuesto() {
        return numeroPresupuesto;
    }

    public void setNumeroPresupuesto(int numeroPresupuesto) {
        this.numeroPresupuesto = numeroPresupuesto;
    }

    public Boolean getPuedeModificar() {
        return puedeModificar;
    }

    public void setPuedeModificar(Boolean puedeModificar) {
        this.puedeModificar = puedeModificar;
    }





}
