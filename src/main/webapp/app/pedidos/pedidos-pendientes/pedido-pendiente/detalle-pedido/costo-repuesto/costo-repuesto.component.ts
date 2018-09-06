import { Component, OnInit, Input } from '@angular/core';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';

@Component({
    selector: 'jhi-costo-repuesto',
    templateUrl: './costo-repuesto.component.html',
    styles: []
})
export class CostoRepuestoComponent implements OnInit {
    costoRepuesto: CostoRepuesto = new CostoRepuesto();
    @Input() cobranzaRepuesto: CobranzaRepuesto;
    @Input() proveedores: Proveedor[];

    constructor() {}

    ngOnInit() {
        this.costoRepuesto.proveedor = this.proveedores[0];
    }
}
