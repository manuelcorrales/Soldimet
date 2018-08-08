import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { Principal } from 'app/core';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';

@Component({
    selector: 'jhi-cobranza-repuesto',
    templateUrl: './cobranza-repuesto.component.html'
})
export class CobranzaRepuestoComponent implements OnInit, OnDestroy {
    cobranzaRepuestos: ICobranzaRepuesto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cobranzaRepuestoService: CobranzaRepuestoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cobranzaRepuestoService.query().subscribe(
            (res: HttpResponse<ICobranzaRepuesto[]>) => {
                this.cobranzaRepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCobranzaRepuestos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICobranzaRepuesto) {
        return item.id;
    }

    registerChangeInCobranzaRepuestos() {
        this.eventSubscriber = this.eventManager.subscribe('cobranzaRepuestoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
