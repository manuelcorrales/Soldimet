import { Component, OnInit, Input } from '@angular/core';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { Observable } from '../../../../../../../../../node_modules/rxjs';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from '../../../../../../../../../node_modules/rxjs/operators';

@Component({
    selector: 'jhi-costo-repuesto',
    templateUrl: './costo-repuesto.component.html',
    styles: []
})
export class CostoRepuestoComponent implements OnInit {
    costoRepuesto: CostoRepuesto = new CostoRepuesto();
    @Input()
    cobranzaRepuesto: CobranzaRepuesto;
    @Input()
    proveedores: Proveedor[];
    search;

    constructor(config: NgbTypeaheadConfig) {
        // customize default values of typeaheads used by this component tree
        config.showHint = true;
    }

    ngOnInit() {
        this.costoRepuesto.proveedor = this.proveedores[0];
        this.cobranzaRepuesto.this.search = (text$: Observable<string>) =>
            text$.pipe(
                map(
                    term =>
                        term === ''
                            ? []
                            : this.proveedores.filter(v => v.persona.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                )
            );
    }
}
