/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.domain.Caja;
import soldimet.domain.Movimiento;
import soldimet.repository.CajaRepository;
import soldimet.repository.MovimientoRepository;
import soldimet.repository.extendedRepository.ExtendedCajaRepository;

/**
 *
 * @author Manu
 */
@Service
public class EstrategiaMovimientoUltimosCliente extends EstrategiaMovimiento {

    @Autowired
    private ExtendedCajaRepository cajaRepository;


    @Override
    public List<Caja> buscarMovimientos(){

        //busco todos los movimientos
        List<Caja> listaCaja= cajaRepository.findAll();

        return listaCaja;

    }




}
