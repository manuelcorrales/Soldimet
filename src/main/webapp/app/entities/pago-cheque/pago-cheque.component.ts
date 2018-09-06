import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPagoCheque } from 'app/shared/model/pago-cheque.model';
import { Principal } from 'app/core';
import { PagoChequeService } from 'app/entities/pago-cheque/pago-cheque.service';

@Component({
    selector: 'jhi-pago-cheque',
    templateUrl: './pago-cheque.component.html'
})
export class PagoChequeComponent implements OnInit, OnDestroy {
    pagoCheques: IPagoCheque[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pagoChequeService: PagoChequeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.pagoChequeService.query().subscribe(
            (res: HttpResponse<IPagoCheque[]>) => {
                this.pagoCheques = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPagoCheques();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPagoCheque) {
        return item.id;
    }

    registerChangeInPagoCheques() {
        this.eventSubscriber = this.eventManager.subscribe('pagoChequeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
