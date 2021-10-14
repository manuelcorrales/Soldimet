package soldimet.service.dto;

import java.util.ArrayList;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:40 p.m.
 */
public class DTOPresupuestoFinal {

    private String clienteID;
    private String aplicacion;
    private int cilindrada;
    private String motor;
    private String tipoParteMotor;
    public ArrayList<DTOCobroOperacionCUHacerPresupuesto> m_DTOCobroOperacionCUHacerPresupuesto;
    public ArrayList<DtoRepuestosElegidos> m_DtoRepuestosElegidos;

    public DTOPresupuestoFinal() {}

    public void finalize() throws Throwable {}

    public String getAplicacion() {
        return aplicacion;
    }

    public void setAplicacion(String aplicacion) {
        this.aplicacion = aplicacion;
    }

    public int getCilindrada() {
        return cilindrada;
    }

    public void setCilindrada(int cilindrada) {
        this.cilindrada = cilindrada;
    }

    public String getMotor() {
        return motor;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }

    public String getTipoParteMotor() {
        return tipoParteMotor;
    }

    public void setTipoParteMotor(String tipoParteMotor) {
        this.tipoParteMotor = tipoParteMotor;
    }

    public ArrayList<DTOCobroOperacionCUHacerPresupuesto> getM_DTOCobroOperacionCUHacerPresupuesto() {
        return m_DTOCobroOperacionCUHacerPresupuesto;
    }

    public void setM_DTOCobroOperacionCUHacerPresupuesto(
        ArrayList<DTOCobroOperacionCUHacerPresupuesto> m_DTOCobroOperacionCUHacerPresupuesto
    ) {
        this.m_DTOCobroOperacionCUHacerPresupuesto = m_DTOCobroOperacionCUHacerPresupuesto;
    }

    public ArrayList<DtoRepuestosElegidos> getM_DtoRepuestosElegidos() {
        return m_DtoRepuestosElegidos;
    }

    public void setM_DtoRepuestosElegidos(ArrayList<DtoRepuestosElegidos> m_DtoRepuestosElegidos) {
        this.m_DtoRepuestosElegidos = m_DtoRepuestosElegidos;
    }

    public String getClienteID() {
        return clienteID;
    }

    public void setClienteID(String clienteID) {
        this.clienteID = clienteID;
    }
}
