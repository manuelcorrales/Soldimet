import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOperacion } from 'app/shared/model/operacion.model';

@Component({
    selector: 'jhi-operacion-detail',
    templateUrl: './operacion-detail.component.html'
})
export class OperacionDetailComponent implements OnInit {
    operacion: IOperacion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ operacion }) => {
            this.operacion = operacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
