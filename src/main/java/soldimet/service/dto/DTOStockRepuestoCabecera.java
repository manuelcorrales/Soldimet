package soldimet.service.dto;

import java.util.ArrayList;
import java.util.List;

import soldimet.domain.Aplicacion;

public class DTOStockRepuestoCabecera {

    private Long id;
    private String codigo;
    private String marca;
    private Float costo;
    private Float venta;
    private String medida;
    private Integer cantidad;
    private String tipoRepuesto;
    private String sucursal;
    private String motoresRelacionados = "";
    private List<Aplicacion> aplicaciones = new ArrayList<>();

    public DTOStockRepuestoCabecera() {
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public String getCodigo() {
        return codigo;
    }

    public Float getCosto() {
        return costo;
    }

    public Long getId() {
        return id;
    }

    public String getMarca() {
        return marca;
    }

    public String getMedida() {
        return medida;
    }

    public Float getVenta() {
        return venta;
    }

    public String getTipoRepuesto() {
        return tipoRepuesto;
    }

    public String getSucursal() {
        return sucursal;
    }

    public String getMotoresRelacionados() {
        return motoresRelacionados;
    }

    public void setAplicaciones(List<Aplicacion> aplicaciones) {
        this.aplicaciones = aplicaciones;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setCosto(Float costo) {
        this.costo = costo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setMedida(String medida) {
        this.medida = medida;
    }

    public void setVenta(Float venta) {
        this.venta = venta;
    }

    public void setTipoRepuesto(String tipoRepuesto) {
        this.tipoRepuesto = tipoRepuesto;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }

    public List<Aplicacion> getAplicaciones() {
        return aplicaciones;
    }

    public void addAplicacion(Aplicacion aplicacion) {
        this.getAplicaciones().add(aplicacion);
        this.motoresRelacionados += " " + aplicacion.getMotor().getMarcaMotor() + " (" + aplicacion.getNombreAplicacion() + ")";
    }

    public void setMotoresRelacionados(String motoresRelacionados) {
        this.motoresRelacionados = motoresRelacionados;
    }

}
