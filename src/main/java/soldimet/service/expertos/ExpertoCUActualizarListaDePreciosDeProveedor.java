/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import com.netflix.discovery.converters.Auto;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.domain.Articulo;
import soldimet.domain.HistorialPrecio;
import soldimet.domain.PrecioRepuesto;
import soldimet.repository.ArticuloRepository;
import soldimet.repository.HistorialPrecioRepository;
import soldimet.repository.PrecioRepuestoRepository;

/**
 *
 * @author Manu
 */
@Service
public class ExpertoCUActualizarListaDePreciosDeProveedor {

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private HistorialPrecioRepository historialPrecioRepository;


    @Autowired
    private PrecioRepuestoRepository precioRepuestoRepository;


    public void actualizarPrecioArticulo(String articuloID,Float precioPublico, Float precioPrivado) {
        try{

            Long artID = Long.valueOf(articuloID);

            Articulo articulo = articuloRepository.findOne(artID);

            //Busco el ultimo precio, si es distinto creo uno nuevo
            Set<HistorialPrecio> historial = articulo.getHistorialPrecios();

            HistorialPrecio ultimoHistorial = historial.iterator().next();

            for(HistorialPrecio historia : historial){
                if(historia.getFechaHistorial().isAfter(ultimoHistorial.getFechaHistorial())){
                    ultimoHistorial = historia;
                }
            }

            if(ultimoHistorial.getPrecioRepuesto().getPrecioPublico()== precioPublico &&
                    ultimoHistorial.getPrecioRepuesto().getPrecioPrivado()== precioPrivado){
                //son iguales por lo que no actualizo nada

            } else {

                //cierro el precio anterior
                ultimoHistorial.getPrecioRepuesto().setFecha(LocalDate.now());

                historialPrecioRepository.save(ultimoHistorial);

                //creo un nuevo precio e historial y lo asigno

                HistorialPrecio nuevoHistorial = new HistorialPrecio();
                PrecioRepuesto nuevoPrecio = new PrecioRepuesto();

                nuevoPrecio.setPrecioPublico(precioPublico);
                nuevoPrecio.setPrecioPrivado(precioPrivado);

                nuevoHistorial.setPrecioRepuesto(nuevoPrecio);
                nuevoHistorial.setFechaHistorial(LocalDate.now());


                historialPrecioRepository.save(nuevoHistorial);
                precioRepuestoRepository.save(nuevoPrecio);

            }

        }catch(NullPointerException e){
            e.printStackTrace();
        }

    }



}
