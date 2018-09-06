import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { Principal } from 'app/core';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';

@Component({
    selector: 'jhi-forma-de-pago',
    templateUrl: './forma-de-pago.component.html'
})
export class FormaDePagoComponent implements OnInit, OnDestroy {
    formaDePagos: IFormaDePago[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private formaDePagoService: FormaDePagoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.formaDePagoService.query().subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                this.formaDePagos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFormaDePagos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFormaDePago) {
        return item.id;
    }

    registerChangeInFormaDePagos() {
        this.eventSubscriber = this.eventManager.subscribe('formaDePagoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
