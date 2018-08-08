import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICaja } from 'app/shared/model/caja.model';

@Component({
    selector: 'jhi-caja-detail',
    templateUrl: './caja-detail.component.html'
})
export class CajaDetailComponent implements OnInit {
    caja: ICaja;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ caja }) => {
            this.caja = caja;
        });
    }

    previousState() {
        window.history.back();
    }
}
