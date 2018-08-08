import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';

@Component({
    selector: 'jhi-pago-efectivo-detail',
    templateUrl: './pago-efectivo-detail.component.html'
})
export class PagoEfectivoDetailComponent implements OnInit {
    pagoEfectivo: IPagoEfectivo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagoEfectivo }) => {
            this.pagoEfectivo = pagoEfectivo;
        });
    }

    previousState() {
        window.history.back();
    }
}
