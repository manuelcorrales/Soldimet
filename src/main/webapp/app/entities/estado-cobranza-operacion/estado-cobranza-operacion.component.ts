import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { Principal } from 'app/core';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.service';

@Component({
    selector: 'jhi-estado-cobranza-operacion',
    templateUrl: './estado-cobranza-operacion.component.html'
})
export class EstadoCobranzaOperacionComponent implements OnInit, OnDestroy {
    estadoCobranzaOperacions: IEstadoCobranzaOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estadoCobranzaOperacionService.query().subscribe(
            (res: HttpResponse<IEstadoCobranzaOperacion[]>) => {
                this.estadoCobranzaOperacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstadoCobranzaOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstadoCobranzaOperacion) {
        return item.id;
    }

    registerChangeInEstadoCobranzaOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('estadoCobranzaOperacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
