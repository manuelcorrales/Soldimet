import { Component, OnInit, Input } from '@angular/core';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { Observable } from '../../../../../../../../../node_modules/rxjs';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from '../../../../../../../../../node_modules/rxjs/operators';
import { Persona } from 'app/shared/model/persona.model';

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
    nombreProveedor = '';
    nombreArticulo = '';

    formatter = result => result.persona.nombre;

    constructor(config: NgbTypeaheadConfig) {
        // customize default values of typeaheads used by this component tree
        config.showHint = true;
        config.container = true;
    }

    ngOnInit() {
        this.costoRepuesto.tipoRepuesto = this.cobranzaRepuesto.tipoRepuesto;

        this.search = (text$: Observable<string>) =>
            text$.pipe(
                map(
                    term =>
                        term === ''
                            ? []
                            : this.proveedores.filter(v => v.persona.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                )
            );
    }

    selectedItem(proveedor) {
        this.costoRepuesto.proveedor = proveedor;
    }

    getCostoRepuesto() {
        return this.costoRepuesto;
    }
}
