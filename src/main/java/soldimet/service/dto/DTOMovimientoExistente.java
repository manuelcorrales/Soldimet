/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;

import java.util.Date;

/**
 *
 * @author Manu
 */
public class DTOMovimientoExistente {

    //DATOS DE EMPLEADO QUE REALIZO EL MOVIMIENTO
    private String nombreEmpleado;

    //DATOS DE FORMA DE PAGO
    private String tipoFormaDePago;
    //DATOS FORMA DE PAGO CHEQUE
    private String pagoChequeNombreBanco;
    private Date pagoChequefechaRecibo;
    private Date pagoChequefechaCobro;
    private String pagoChequeNumeroCheque;
    private float pagoChequeimporteCheque;

    //DATOS FORMA DE PAGO TARJETA

    private String pagoTarjetaTipoTarjeta;
    private String pagoTarjetaNombreTarjeta;
    private String pagoTarjetaUltimosDigitos;
    private String pagoTarjetaCantidadDeCuotas;
    //DATOS FORMA DE PAGO EFECTIVO

    //DATOS DE COBRANZA

    //DATOS DE PAGO

}
