import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { Principal } from 'app/core';
import { CilindradaService } from './cilindrada.service';

@Component({
    selector: 'jhi-cilindrada',
    templateUrl: './cilindrada.component.html'
})
export class CilindradaComponent implements OnInit, OnDestroy {
    cilindradas: ICilindrada[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cilindradaService: CilindradaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cilindradaService.query().subscribe(
            (res: HttpResponse<ICilindrada[]>) => {
                this.cilindradas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCilindradas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICilindrada) {
        return item.id;
    }

    registerChangeInCilindradas() {
        this.eventSubscriber = this.eventManager.subscribe('cilindradaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
