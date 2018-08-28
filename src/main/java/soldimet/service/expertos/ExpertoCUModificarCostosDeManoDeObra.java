/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soldimet.domain.CostoOperacion;
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.repository.ListaPrecioDesdeHastaRepository;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;
import soldimet.service.dto.DTOListaPrecioManoDeObra;

/**
 *
 * @author Manu
 */
@Service
public class ExpertoCUModificarCostosDeManoDeObra {

    private final String errorPermisoInsuficiente = "No tiene permisos suficientes para modificar estos valores";

    @Autowired
    private ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    @Autowired
    private ListaPrecioDesdeHastaRepository listaPrecioDesdeHastaRepository;

    private List<ListaPrecioRectificacionCRAM> listaNumeroLista;

    public void modificarCostos(String porcentaje) {
        // busco en la lista identificada por numero la lista que contiene el ultimo
        // valor todo de nuevo
        // y despues sigo modificando valores y todo

        try {

            // por cada lista identificada por su numero
            for (ListaPrecioRectificacionCRAM listaPrecio : listaNumeroLista) {

                // obtengo las listas
                Set<ListaPrecioDesdeHasta> listaDesde = listaPrecio.getFechas();

                // inicializo el apuntador a la ultima lista de precios con el primero que sale
                ListaPrecioDesdeHasta ultimaListaPrecios = listaDesde.iterator().next();

                // verifico cual tiene la ultima fecha y lo dejo en el apuntador de la ultima
                // lista
                // y veo que tampoco este cerrada la lista
                for (ListaPrecioDesdeHasta lista : listaDesde) {

                    if (lista.getFechaDesde().isAfter(ultimaListaPrecios.getFechaDesde())
                            && lista.getFechaHasta() != null) {
                        ultimaListaPrecios = lista;
                    }
                }

                // le indico la fecha de finalizacion de uso y creo otro nuevo con los nuevos
                // valores
                ultimaListaPrecios.setFechaHasta(LocalDate.now());
                Set<CostoOperacion> costoOperacionvieja = ultimaListaPrecios.getCostoOperacions();

                // proceso de creacion de la nueva lista
                ListaPrecioDesdeHasta listaPreciosNueva = new ListaPrecioDesdeHasta();
                listaPreciosNueva.setFechaDesde(LocalDate.now());

                // creo los nuevos valores y se los asigno a la lista nueva
                Set<CostoOperacion> costosNuevos = new HashSet<>();
                for (CostoOperacion costo : costoOperacionvieja) {

                    CostoOperacion nuevoCosto = new CostoOperacion();

                    nuevoCosto.setCilindrada(costo.getCilindrada());
                    nuevoCosto.setTipoParteMotor(costo.getTipoParteMotor());
                    nuevoCosto.setOperacion(costo.getOperacion());

                    float precio = costo.getCostoOperacion();
                    float calculoNuevoValor;
                    Float porciento = Float.valueOf(porcentaje);
                    if (porcentaje.contains("-")) {

                        calculoNuevoValor = precio - (precio * porciento);
                    } else {
                        calculoNuevoValor = precio + (precio * porciento);
                    }
                    nuevoCosto.setCostoOperacion(calculoNuevoValor);

                    costosNuevos.add(nuevoCosto);

                }
                listaPreciosNueva.setCostoOperacions(costosNuevos);

                listaPrecio.getFechas().add(listaPreciosNueva);

                listaPrecioDesdeHastaRepository.save(listaPreciosNueva);
                listaPrecioRectificacionCRAMRepository.save(listaPrecio);

            }

        } catch (NullPointerException e) {
            e.printStackTrace();
        }

    }

    public List<DTOListaPrecioManoDeObra> buscarCostos() {

        List<DTOListaPrecioManoDeObra> listaDTO = new ArrayList();
        try {
            // busco la lista que contiene el numero de lista
            listaNumeroLista = listaPrecioRectificacionCRAMRepository.findAll();

            // por cada lista identificada por su numero
            for (ListaPrecioRectificacionCRAM listaPrecio : listaNumeroLista) {

                // obtengo las listas
                Set<ListaPrecioDesdeHasta> listaDesde = listaPrecio.getFechas();
                // inicializo el apuntador a la ultima lista de precios con el primero que sale
                ListaPrecioDesdeHasta ultimaListaPrecios = listaDesde.iterator().next();

                // verifico cual tiene la ultima fecha y lo dejo en el apuntador de la ultima
                // lista
                // y veo que tampoco este cerrada la lista
                for (ListaPrecioDesdeHasta lista : listaDesde) {

                    if (lista.getFechaDesde().isAfter(ultimaListaPrecios.getFechaDesde())
                            && lista.getFechaHasta() != null) {
                        ultimaListaPrecios = lista;
                    }
                }

                if (ultimaListaPrecios != null) {
                    DTOListaPrecioManoDeObra dto = new DTOListaPrecioManoDeObra();
                    dto.setNumeroLista(listaPrecio.getNumeroGrupo());
                    dto.setFechaDesde(listaPrecio.getFechaVigenciaDesde());
                    dto.setFechaHasta(listaPrecio.getFechaVigenciaHasta());
                    // Por cada operacion y su costo creo un dto y lo agrego a la lista
                    for (CostoOperacion costoOp : ultimaListaPrecios.getCostoOperacions()) {
                        dto.getOperaciones().add(costoOp);
                        listaDTO.add(dto);
                    }
                }

            }
            return listaDTO;
        } catch (NullPointerException e) {
            e.printStackTrace();
            return null;
        }
    }

}
