import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

@Component({
    selector: 'jhi-tipo-repuesto-detail',
    templateUrl: './tipo-repuesto-detail.component.html'
})
export class TipoRepuestoDetailComponent implements OnInit {
    tipoRepuesto: ITipoRepuesto;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoRepuesto }) => {
            this.tipoRepuesto = tipoRepuesto;
        });
    }

    previousState() {
        window.history.back();
    }
}
