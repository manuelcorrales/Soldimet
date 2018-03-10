package soldimet.service.dto;
import java.time.LocalDate;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Manu
 * @version 1.0
 * @created 04-ene-2016 12:39:40 p.m.
 */
public class DTOPresupuestoDetalleCUBuscarPresupuesto {

        private Long idPresupuesto;
	private String cliente;
	private LocalDate fechaCreacion;
	private Float importeTotal;
    private String estado;
	public List<DTOPresupuestoDetalleParteCUBuscarPresupuesto> m_DTOPresupuestoDetalleParteCUBuscarPresupuesto;

	public DTOPresupuestoDetalleCUBuscarPresupuesto(){

	}

	public void finalize() throws Throwable {

	}

    public Long getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(Long idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }



	/**
	 *
	 * @param parte
	 */
	public void addDetalle(DTOPresupuestoDetalleParteCUBuscarPresupuesto parte){

            m_DTOPresupuestoDetalleParteCUBuscarPresupuesto.add(parte);

	}


    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public float getImporteTotal() {
        return importeTotal;
    }

    public void setImporteTotal(float importeTotal) {
        this.importeTotal = importeTotal;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


}
