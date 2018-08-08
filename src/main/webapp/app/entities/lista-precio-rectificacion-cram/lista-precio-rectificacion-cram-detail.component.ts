import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-detail',
    templateUrl: './lista-precio-rectificacion-cram-detail.component.html'
})
export class ListaPrecioRectificacionCRAMDetailComponent implements OnInit {
    listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listaPrecioRectificacionCRAM }) => {
            this.listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
        });
    }

    previousState() {
        window.history.back();
    }
}
