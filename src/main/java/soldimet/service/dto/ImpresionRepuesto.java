package soldimet.service.dto;

import soldimet.domain.Articulo;

public class ImpresionRepuesto {

    private String marca;
    private String articulo;
    private String codigo;
    private Integer cantidad;

    public String getArticulo() {
        return articulo;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getMarca() {
        return marca;
    }

    public void setArticulo(Articulo articulo) {
        this.articulo = articulo.getTipoRepuesto().getNombreTipoRepuesto();
        this.marca = articulo.getMarca().getNombreMarca();
        this.codigo = articulo.getCodigoArticuloProveedor();
        this.cantidad = 1;
    }

    public void addArticulo(Articulo articulo) {
        if (this.codigo.equals(articulo.getCodigoArticuloProveedor())) {
            this.cantidad++;
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        ImpresionRepuesto objeto = (ImpresionRepuesto) obj;
        if (
            this.articulo.equals(objeto.getArticulo()) &&
            this.codigo.equals(objeto.getCodigo()) &&
            this.cantidad.equals(objeto.getCantidad())
        ) {
            return true;
        }
        return false;
    }
}
