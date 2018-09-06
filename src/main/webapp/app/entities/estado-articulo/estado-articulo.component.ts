import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { Principal } from 'app/core';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';

@Component({
    selector: 'jhi-estado-articulo',
    templateUrl: './estado-articulo.component.html'
})
export class EstadoArticuloComponent implements OnInit, OnDestroy {
    estadoArticulos: IEstadoArticulo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoArticuloService: EstadoArticuloService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoArticuloService.query().subscribe(
            (res: HttpResponse<IEstadoArticulo[]>) => {
                this.estadoArticulos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoArticulos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoArticulo) {
        return item.id;
    }

    registerChangeInEstadoArticulos() {
        this.eventSubscriber = this.eventManager.subscribe('estadoArticuloListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
