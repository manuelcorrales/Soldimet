package soldimet.service.dto;
import java.util.List;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOCaja {

    private String fechaCaja;
    private Long cajaId;
    private String estadoCaja;
    private Float totalCaja;
	public List<DTOMovimientoCUConsultarMovimientos> movimientos;

	public DTOCaja(){

	}

    /**
     * @return the cajaId
     */
    public Long getCajaId() {
        return cajaId;
    }

    /**
     * @param cajaId the cajaId to set
     */
    public void setCajaId(Long cajaId) {
        this.cajaId = cajaId;
    }

    /**
     * @return the estadoCaja
     */
    public String getEstadoCaja() {
        return estadoCaja;
    }

    /**
     * @param estadoCaja the estadoCaja to set
     */
    public void setEstadoCaja(String estadoCaja) {
        this.estadoCaja = estadoCaja;
    }

    /**
     * @return the totalCaja
     */
    public Float getTotalCaja() {
        return totalCaja;
    }
    /**
     * @param totalCaja the totalCaja to set
     */
    public void setTotalCaja(Float totalCaja) {
        this.totalCaja = totalCaja;
    }

    /**
     * @return the fechaCaja
     */
    public String getFechaCaja() {
        return fechaCaja;
    }
    /**
     * @param fechaCaja the fechaCaja to set
     */
    public void setFechaCaja(String fechaCaja) {
        this.fechaCaja = fechaCaja;
    }

    /**
     * @return the movimientos
     */
    public List<DTOMovimientoCUConsultarMovimientos> getMovimientos() {
        return movimientos;
    }
    /**
     * @param movimientos the movimientos to set
     */
    public void setMovimientos(List<DTOMovimientoCUConsultarMovimientos> movimientos) {
        this.movimientos = movimientos;
    }

}
