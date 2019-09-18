import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { Principal } from 'app/core';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';

@Component({
    selector: 'jhi-medio-de-pago-cheque',
    templateUrl: './medio-de-pago-cheque.component.html'
})
export class MedioDePagoChequeComponent implements OnInit, OnDestroy {
    medioDePagoCheques: IMedioDePagoCheque[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private medioDePagoChequeService: MedioDePagoChequeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.medioDePagoChequeService.query().subscribe(
            (res: HttpResponse<IMedioDePagoCheque[]>) => {
                this.medioDePagoCheques = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMedioDePagoCheques();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedioDePagoCheque) {
        return item.id;
    }

    registerChangeInMedioDePagoCheques() {
        this.eventSubscriber = this.eventManager.subscribe('medioDePagoChequeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
