/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soldimet.domain.Caja;
import soldimet.repository.CajaRepository;

/**
 *
 * @author Manu
 */
@Service
public class EstrategiaMovimiento30dia extends EstrategiaMovimiento{

    private final int meses = -1; //busco lo que esta 31 dias antes (ultimo mes)

    @Autowired
    private CajaRepository cajaRepository;

    public List<Caja> buscarMovimientos(){

        DateTime fecha = new DateTime().minusMonths(meses);
        LocalDate fechaPasada = LocalDate.of(fecha.getYear(),fecha.getMonthOfYear(),fecha.getDayOfWeek());
        /*
        Date fecha = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(fecha); // Configuramos la fecha del dia
        calendar.add(Calendar.MONTH, meses);  // numero de días a añadir, o restar en caso de días<0 (resto 30)


        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        */
        //formateo la fecha despues que restarle los 30 dias y  busco--dateFormat.format(calendar.getTime())
        List<Caja> listaCaja = cajaRepository.findByFechaGreaterThanEqual(fechaPasada);

    return listaCaja;
}
}
