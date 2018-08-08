import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';

@Component({
    selector: 'jhi-estado-operacion-detail',
    templateUrl: './estado-operacion-detail.component.html'
})
export class EstadoOperacionDetailComponent implements OnInit {
    estadoOperacion: IEstadoOperacion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoOperacion }) => {
            this.estadoOperacion = estadoOperacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
