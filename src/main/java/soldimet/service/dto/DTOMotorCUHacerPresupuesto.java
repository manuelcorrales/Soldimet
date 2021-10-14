package soldimet.service.dto;

import java.util.ArrayList;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:38 p.m.
 */
public class DTOMotorCUHacerPresupuesto {

    private int idMotor;
    private String nombreMotor;
    public ArrayList<DTOAplicacionCUHacerPresupuesto> m_DTOAplicacionCUHacerPresupuesto;
    public ArrayList<DTOCilindradaCUHacerPresupuesto> m_DTOCilindradaCUHacerPresupuesto;

    public DTOMotorCUHacerPresupuesto() {}

    public void finalize() throws Throwable {}

    public int getIdMotor() {
        return idMotor;
    }

    public void setIdMotor(int idMotor) {
        this.idMotor = idMotor;
    }

    public String getNombreMotor() {
        return nombreMotor;
    }

    public void setNombreMotor(String nombreMotor) {
        this.nombreMotor = nombreMotor;
    }

    public ArrayList<DTOAplicacionCUHacerPresupuesto> getM_DTOAplicacionCUHacerPresupuesto() {
        return m_DTOAplicacionCUHacerPresupuesto;
    }

    public void setM_DTOAplicacionCUHacerPresupuesto(ArrayList<DTOAplicacionCUHacerPresupuesto> m_DTOAplicacionCUHacerPresupuesto) {
        this.m_DTOAplicacionCUHacerPresupuesto = m_DTOAplicacionCUHacerPresupuesto;
    }

    public ArrayList<DTOCilindradaCUHacerPresupuesto> getM_DTOCilindradaCUHacerPresupuesto() {
        return m_DTOCilindradaCUHacerPresupuesto;
    }

    public void setM_DTOCilindradaCUHacerPresupuesto(ArrayList<DTOCilindradaCUHacerPresupuesto> m_DTOCilindradaCUHacerPresupuesto) {
        this.m_DTOCilindradaCUHacerPresupuesto = m_DTOCilindradaCUHacerPresupuesto;
    }
}
