import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';

@Component({
    selector: 'jhi-estado-cobranza-operacion-detail',
    templateUrl: './estado-cobranza-operacion-detail.component.html'
})
export class EstadoCobranzaOperacionDetailComponent implements OnInit {
    estadoCobranzaOperacion: IEstadoCobranzaOperacion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoCobranzaOperacion }) => {
            this.estadoCobranzaOperacion = estadoCobranzaOperacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
