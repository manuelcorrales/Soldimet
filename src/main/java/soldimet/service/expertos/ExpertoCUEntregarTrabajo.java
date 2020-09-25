/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.expertos;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import soldimet.constant.Globales;
import soldimet.domain.EstadoPresupuesto;
import soldimet.domain.Presupuesto;
import soldimet.repository.extendedRepository.ExtendedEstadoPresupuestoRepository;
import soldimet.repository.extendedRepository.ExtendedPresupuestoRepository;

/**
 *
 * @author Manu
 */
public class ExpertoCUEntregarTrabajo {

    private final Logger log = LoggerFactory.getLogger(ExpertoCUEntregarTrabajo.class);

    @Autowired
    private ExtendedEstadoPresupuestoRepository estadoPresupuestoRepository;

    @Autowired
    private ExtendedPresupuestoRepository presupuestoRepository;

    @Autowired
    private Globales globales;

    public Boolean entregarTrabajo(Long idPresupuesto) {

        try {
            //verifico ademas que no este en estado baja
            EstadoPresupuesto estadoEntregado = estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ENTREGADO);

            EstadoPresupuesto estadoAceptado = estadoPresupuestoRepository.findByNombreEstado(globales.NOMBRE_ESTADO_PRESUPUESTO_ACEPTADO);

            Presupuesto presupuesto = presupuestoRepository.findById(idPresupuesto).get();

            if (presupuesto != null && !presupuesto.getEstadoPresupuesto().equals(estadoAceptado)) {
                //modifico y guardo el presupuesto
                presupuesto.setEstadoPresupuesto(estadoEntregado);
                presupuestoRepository.save(presupuesto);
                return true;
            }
            return false;
        } catch (NullPointerException e) {
            log.error(e.getMessage());
            return false;
        }

    }
}
