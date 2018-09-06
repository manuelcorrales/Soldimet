import { Component, OnInit, Input } from '@angular/core';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'jhi-operacion-lista-precio',
    templateUrl: './operacion-lista-precio.component.html',
    styles: []
})
export class OperacionListaPrecioComponent implements OnInit {
    @Input() costoOperacion: CostoOperacion;
    precioOperacion;

    constructor(private decimalPipe: DecimalPipe) {}

    ngOnInit() {
        this.precioOperacion = this.costoOperacion.costoOperacion;
    }

    modificarPrecio(porcentage: number) {
        const calculo = this.precioOperacion * (1 + porcentage / 100);
        this.costoOperacion.costoOperacion = calculo;
    }

    // redondear(valor: number): number {
    //     const flotante = Math.round(valor).toFixed(2);
    //     console.log(flotante);
    //    const enEntero = Number.parseFloat(flotante).toFixed(2);
    //    console.log( enEntero);
    //    return enEntero;
    // }
}
