import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagoCheque } from 'app/shared/model/pago-cheque.model';

@Component({
    selector: 'jhi-pago-cheque-detail',
    templateUrl: './pago-cheque-detail.component.html'
})
export class PagoChequeDetailComponent implements OnInit {
    pagoCheque: IPagoCheque;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagoCheque }) => {
            this.pagoCheque = pagoCheque;
        });
    }

    previousState() {
        window.history.back();
    }
}
