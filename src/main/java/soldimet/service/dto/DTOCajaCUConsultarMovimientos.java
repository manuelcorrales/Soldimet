package soldimet.service.dto;
import java.util.Date;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:37 p.m.
 */
public class DTOCajaCUConsultarMovimientos {

	private Date fechaCaja;
	public DTOMovimientoCUConsultarMovimientos m_DTOMovimientoCUConsultarMovimientos;

	public DTOCajaCUConsultarMovimientos(){

	}

	public void finalize() throws Throwable {

	}

	public Date getfechaCaja(){
		return fechaCaja;
	}

	/**
	 *
	 * @param newVal
	 */
	public void setfechaCaja(Date newVal){
		fechaCaja = newVal;
	}

}
