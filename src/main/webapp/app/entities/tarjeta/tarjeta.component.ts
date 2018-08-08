import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { Principal } from 'app/core';
import { TarjetaService } from './tarjeta.service';

@Component({
    selector: 'jhi-tarjeta',
    templateUrl: './tarjeta.component.html'
})
export class TarjetaComponent implements OnInit, OnDestroy {
    tarjetas: ITarjeta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tarjetaService: TarjetaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tarjetaService.query().subscribe(
            (res: HttpResponse<ITarjeta[]>) => {
                this.tarjetas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTarjetas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITarjeta) {
        return item.id;
    }

    registerChangeInTarjetas() {
        this.eventSubscriber = this.eventManager.subscribe('tarjetaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
