import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISucursal } from 'app/shared/model/sucursal.model';

@Component({
    selector: 'jhi-sucursal-detail',
    templateUrl: './sucursal-detail.component.html'
})
export class SucursalDetailComponent implements OnInit {
    sucursal: ISucursal;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sucursal }) => {
            this.sucursal = sucursal;
        });
    }

    previousState() {
        window.history.back();
    }
}
