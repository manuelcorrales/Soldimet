import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';
import { Principal } from 'app/core';
import { CostoOperacionService } from './costo-operacion.service';

@Component({
    selector: 'jhi-costo-operacion',
    templateUrl: './costo-operacion.component.html'
})
export class CostoOperacionComponent implements OnInit, OnDestroy {
    costoOperacions: ICostoOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private costoOperacionService: CostoOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.costoOperacionService.query().subscribe(
            (res: HttpResponse<ICostoOperacion[]>) => {
                this.costoOperacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCostoOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICostoOperacion) {
        return item.id;
    }

    registerChangeInCostoOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('costoOperacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
