import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

@Component({
    selector: 'jhi-lista-precio-desde-hasta-detail',
    templateUrl: './lista-precio-desde-hasta-detail.component.html'
})
export class ListaPrecioDesdeHastaDetailComponent implements OnInit {
    listaPrecioDesdeHasta: IListaPrecioDesdeHasta;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listaPrecioDesdeHasta }) => {
            this.listaPrecioDesdeHasta = listaPrecioDesdeHasta;
        });
    }

    previousState() {
        window.history.back();
    }
}
