import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategoriaPago } from 'app/shared/model/categoria-pago.model';
import { Principal } from 'app/core';
import { CategoriaPagoService } from './categoria-pago.service';

@Component({
    selector: 'jhi-categoria-pago',
    templateUrl: './categoria-pago.component.html'
})
export class CategoriaPagoComponent implements OnInit, OnDestroy {
    categoriaPagos: ICategoriaPago[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private categoriaPagoService: CategoriaPagoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.categoriaPagoService.query().subscribe(
            (res: HttpResponse<ICategoriaPago[]>) => {
                this.categoriaPagos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCategoriaPagos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICategoriaPago) {
        return item.id;
    }

    registerChangeInCategoriaPagos() {
        this.eventSubscriber = this.eventManager.subscribe('categoriaPagoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
