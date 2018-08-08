import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { Principal } from 'app/core';
import { EstadoOperacionService } from './estado-operacion.service';

@Component({
    selector: 'jhi-estado-operacion',
    templateUrl: './estado-operacion.component.html'
})
export class EstadoOperacionComponent implements OnInit, OnDestroy {
    estadoOperacions: IEstadoOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoOperacionService: EstadoOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoOperacionService.query().subscribe(
            (res: HttpResponse<IEstadoOperacion[]>) => {
                this.estadoOperacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoOperacion) {
        return item.id;
    }

    registerChangeInEstadoOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('estadoOperacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
