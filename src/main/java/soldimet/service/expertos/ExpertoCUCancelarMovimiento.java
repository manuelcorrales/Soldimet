/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import org.springframework.beans.factory.annotation.Autowired;
import soldimet.constant.Globales;
import soldimet.domain.EstadoMovimiento;
import soldimet.domain.Movimiento;
import soldimet.repository.EstadoMovimientoRepository;
import soldimet.repository.MovimientoRepository;

/**
 *
 * @author Manu
 */
public class ExpertoCUCancelarMovimiento {

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private EstadoMovimientoRepository estadoMovimientoRepository;

    @Autowired
    private Globales globales;


    public void eliminarMovimiento(Long movimiento){


        EstadoMovimiento estadoBaja = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_BAJA);

        EstadoMovimiento estadoAlta = estadoMovimientoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_MOVIMIENTO_ALTA);

        Movimiento mov =movimientoRepository.findOne(movimiento);

        mov.setEstado(estadoBaja);

        //GUARDAR MOVIMIENDO CAMBIADO
        movimientoRepository.save(mov);

    }

}
