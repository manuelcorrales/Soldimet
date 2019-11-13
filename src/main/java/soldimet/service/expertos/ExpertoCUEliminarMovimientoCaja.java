/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import soldimet.constant.Globales;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.Movimiento;
import soldimet.repository.EstadoMovimientoRepository;
import soldimet.repository.MovimientoRepository;

/**
 * @author Manu
 */
@Service
@Transactional
public class ExpertoCUEliminarMovimientoCaja {

    private final Logger log = LoggerFactory.getLogger(ExpertoCUEliminarMovimientoCaja.class);


    private final String errorEstadoMovimiento = "Este movimiento no esta dado de alta";
    private final String errorPermisoInsuficiente = "Este movimiento fue creado hace mas de 24hrs, necesita permisos para eliminar eliminar";

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private EstadoMovimientoRepository estadoMovimientoRepository;

    @Autowired
    private Globales globales;

    public Boolean eliminarMovimiento(Long movimientoID) {

        try {
            Movimiento mov = movimientoRepository.findById(movimientoID).get();

            EstadoMovimiento estadoAlta = estadoMovimientoRepository
                .findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);

            if (mov.getEstado().equals(estadoAlta)) {
                //cambio el estado del movimiento
                EstadoMovimiento estadoBaja = estadoMovimientoRepository
                    .findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_BAJA);

                mov.setEstado(estadoBaja);

                movimientoRepository.save(mov);

                return true;
            }
            return false;

        } catch (NullPointerException e) {
            log.error(e.getMessage());
            return false;
        }


    }

}
