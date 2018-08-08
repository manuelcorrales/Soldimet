import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';

@Component({
    selector: 'jhi-costo-operacion-detail',
    templateUrl: './costo-operacion-detail.component.html'
})
export class CostoOperacionDetailComponent implements OnInit {
    costoOperacion: ICostoOperacion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ costoOperacion }) => {
            this.costoOperacion = costoOperacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
