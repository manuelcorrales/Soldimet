/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soldimet.domain.CostoOperacion;
import soldimet.domain.ListaPrecioDesdeHasta;
import soldimet.domain.ListaPrecioRectificacionCRAM;
import soldimet.repository.ListaPrecioRectificacionCRAMRepository;
import soldimet.service.dto.DTOListaPrecioManoDeObra;

/**
 *
 * @author Manu
 */
@Service
public class ExpertoCUModificarCostosDeManoDeObra {
    private final Logger log = LoggerFactory.getLogger(ExpertoCUModificarCostosDeManoDeObra.class);


    private final String errorPermisoInsuficiente = "No tiene permisos suficientes para modificar estos valores";

    @Autowired
    private ListaPrecioRectificacionCRAMRepository listaPrecioRectificacionCRAMRepository;

    public DTOListaPrecioManoDeObra modificarCostos(DTOListaPrecioManoDeObra dtoLista) {
        // busco en la lista identificada por numero la lista que no tiene fechs hasta y
        // la cierro
        // luego creo una nueva

        try {
            ListaPrecioRectificacionCRAM listaNumero = listaPrecioRectificacionCRAMRepository
                    .findByNumeroGrupo(dtoLista.getNumeroLista());
            ListaPrecioDesdeHasta listaACerrar = listaNumero.getUltimaListaActiva();
            listaACerrar.setFechaHasta(LocalDate.now());

            ListaPrecioDesdeHasta nuevaListaPrecios = new ListaPrecioDesdeHasta();
            for (CostoOperacion costoRecibido : dtoLista.getOperaciones()) {
                CostoOperacion nuevoCostoOperacion = new CostoOperacion();
                nuevoCostoOperacion.setCilindrada(costoRecibido.getCilindrada());
                nuevoCostoOperacion.setCostoOperacion(costoRecibido.getCostoOperacion());
                nuevoCostoOperacion.setOperacion(costoRecibido.getOperacion());
                nuevoCostoOperacion.setTipoParteMotor(costoRecibido.getTipoParteMotor());
                nuevaListaPrecios.addCostoOperacion(nuevoCostoOperacion);
            }
            nuevaListaPrecios.setFechaDesde(LocalDate.now());
            listaNumero.addFechas(nuevaListaPrecios);

            ListaPrecioRectificacionCRAM listaNueva = listaPrecioRectificacionCRAMRepository.save(listaNumero);

            return crearDtoConUltimaLista(listaNueva);

        } catch (NullPointerException e) {
            log.error(e.getMessage());
            return null;
        }

    }

    public List<DTOListaPrecioManoDeObra> buscarCostos() {

        List<DTOListaPrecioManoDeObra> listaDTO = new ArrayList<DTOListaPrecioManoDeObra>();
        try {
            // busco la lista que contiene el numero de lista
            List<ListaPrecioRectificacionCRAM> listaNumeroLista = listaPrecioRectificacionCRAMRepository.findAll();

            // por cada lista identificada por su numero
            for (ListaPrecioRectificacionCRAM listaPrecio : listaNumeroLista) {

                DTOListaPrecioManoDeObra dtoLista = crearDtoConUltimaLista(listaPrecio);
                if (dtoLista != null) {
                    listaDTO.add(crearDtoConUltimaLista(listaPrecio));
                }
            }
            return listaDTO;
        } catch (NullPointerException e) {
            log.error(e.getMessage());
            return null;
        }
    }

    private DTOListaPrecioManoDeObra crearDtoConUltimaLista(ListaPrecioRectificacionCRAM listaPrecio) {

        DTOListaPrecioManoDeObra dto = new DTOListaPrecioManoDeObra();

        ListaPrecioDesdeHasta listaActiva = listaPrecio.getUltimaListaActiva();

        if (listaActiva == null) {
            // Esta lista todavía no tiene precios cargados
            return null;
        }

        dto.setNumeroLista(listaPrecio.getNumeroGrupo());
        dto.setFechaDesde(listaActiva.getFechaDesde());
        dto.setFechaHasta(listaActiva.getFechaHasta());

        // Por cada operacion y su costo creo un dto y lo agrego a la lista
        for (CostoOperacion costoOp : listaActiva.getCostoOperacions()) {
            dto.getOperaciones().add(costoOp);
        }
        return dto;

    }

}
