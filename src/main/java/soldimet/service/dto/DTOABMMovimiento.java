/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package soldimet.service.dto;
import java.util.ArrayList;
/**
 *
 * @author Manu
 */
public class DTOABMMovimiento {


    private ArrayList<String> formaDePago;

    private ArrayList<DtoTipoMovimiento>  tiposmovimiento;

    public DTOABMMovimiento() {
    }

    public ArrayList<String> getFormaDePago() {
        return formaDePago;
    }

    public void setFormaDePago(ArrayList<String> formaDePago) {
        this.formaDePago = formaDePago;
    }
    public void agregarFormaDePago(String forma){
        this.formaDePago.add(forma);
    }

    public ArrayList<DtoTipoMovimiento> getTiposmovimiento() {
        return tiposmovimiento;
    }

    public void setTiposmovimiento(ArrayList<DtoTipoMovimiento> tiposmovimiento) {
        this.tiposmovimiento = tiposmovimiento;
    }

    public void agregarTipoMovimiento (DtoTipoMovimiento dto){
        this.tiposmovimiento.add(dto);
    }



}
