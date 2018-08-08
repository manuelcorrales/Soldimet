import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

@Component({
    selector: 'jhi-precio-repuesto-detail',
    templateUrl: './precio-repuesto-detail.component.html'
})
export class PrecioRepuestoDetailComponent implements OnInit {
    precioRepuesto: IPrecioRepuesto;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ precioRepuesto }) => {
            this.precioRepuesto = precioRepuesto;
        });
    }

    previousState() {
        window.history.back();
    }
}
