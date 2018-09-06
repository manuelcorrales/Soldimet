import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { Principal } from 'app/core';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta/tipo-tarjeta.service';

@Component({
    selector: 'jhi-tipo-tarjeta',
    templateUrl: './tipo-tarjeta.component.html'
})
export class TipoTarjetaComponent implements OnInit, OnDestroy {
    tipoTarjetas: ITipoTarjeta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoTarjetaService: TipoTarjetaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoTarjetaService.query().subscribe(
            (res: HttpResponse<ITipoTarjeta[]>) => {
                this.tipoTarjetas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoTarjetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoTarjeta) {
        return item.id;
    }

    registerChangeInTipoTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe('tipoTarjetaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
