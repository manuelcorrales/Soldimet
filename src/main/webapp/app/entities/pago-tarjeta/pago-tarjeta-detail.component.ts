import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';

@Component({
    selector: 'jhi-pago-tarjeta-detail',
    templateUrl: './pago-tarjeta-detail.component.html'
})
export class PagoTarjetaDetailComponent implements OnInit {
    pagoTarjeta: IPagoTarjeta;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagoTarjeta }) => {
            this.pagoTarjeta = pagoTarjeta;
        });
    }

    previousState() {
        window.history.back();
    }
}
