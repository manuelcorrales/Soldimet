import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { Principal } from 'app/core';
import { CobranzaOperacionService } from 'app/entities/cobranza-operacion/cobranza-operacion.service';

@Component({
    selector: 'jhi-cobranza-operacion',
    templateUrl: './cobranza-operacion.component.html'
})
export class CobranzaOperacionComponent implements OnInit, OnDestroy {
    cobranzaOperacions: ICobranzaOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cobranzaOperacionService: CobranzaOperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cobranzaOperacionService.query().subscribe(
            (res: HttpResponse<ICobranzaOperacion[]>) => {
                this.cobranzaOperacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCobranzaOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICobranzaOperacion) {
        return item.id;
    }

    registerChangeInCobranzaOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('cobranzaOperacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
