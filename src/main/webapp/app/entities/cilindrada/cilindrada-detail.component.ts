import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICilindrada } from 'app/shared/model/cilindrada.model';

@Component({
    selector: 'jhi-cilindrada-detail',
    templateUrl: './cilindrada-detail.component.html'
})
export class CilindradaDetailComponent implements OnInit {
    cilindrada: ICilindrada;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cilindrada }) => {
            this.cilindrada = cilindrada;
        });
    }

    previousState() {
        window.history.back();
    }
}
