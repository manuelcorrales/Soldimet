/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;
import java.util.List;
import org.springframework.stereotype.Service;
import soldimet.domain.Caja;
import soldimet.domain.Movimiento;

/**
 *
 * @author Manu
 */
@Service
public abstract class EstrategiaMovimiento {

    public abstract List<Caja> buscarMovimientos();

}
