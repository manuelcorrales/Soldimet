import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

@Component({
    selector: 'jhi-forma-de-pago-detail',
    templateUrl: './forma-de-pago-detail.component.html'
})
export class FormaDePagoDetailComponent implements OnInit {
    formaDePago: IFormaDePago;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ formaDePago }) => {
            this.formaDePago = formaDePago;
        });
    }

    previousState() {
        window.history.back();
    }
}
