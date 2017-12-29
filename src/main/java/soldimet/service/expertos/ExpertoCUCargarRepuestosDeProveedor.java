package soldimet.service.expertos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.service.abstractFactory.FactoriaEstrategiaCargarRepuestos;

/**
 *
 * @author Manu
 */
@Service
public class ExpertoCUCargarRepuestosDeProveedor extends ExpertoCUManejoRepuestoYArticulo{


    EstrategiaCargarRepuestosProveedor estrategia;

    @Autowired
    private FactoriaEstrategiaCargarRepuestos factoriaEstrategiaCargarRepuestos;


    public void cargarRepuestosDeProveedor(String fuente, String Proveedor, String rubro, String descripcion,
            String marca, String tiporepuesto, float precio,String codigoArticuloProveedor, String ubicacion){

        estrategia = factoriaEstrategiaCargarRepuestos.getEstrategia(Proveedor, fuente);

        estrategia.cargarRepuestos(fuente, Proveedor, rubro, descripcion, marca, tiporepuesto, precio, codigoArticuloProveedor, ubicacion);

    }




}
