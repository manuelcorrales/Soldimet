import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOperacion } from 'app/shared/model/operacion.model';
import { Principal } from 'app/core';
import { OperacionService } from './operacion.service';

@Component({
    selector: 'jhi-operacion',
    templateUrl: './operacion.component.html'
})
export class OperacionComponent implements OnInit, OnDestroy {
    operacions: IOperacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private operacionService: OperacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.operacionService.query().subscribe(
            (res: HttpResponse<IOperacion[]>) => {
                this.operacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOperacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOperacion) {
        return item.id;
    }

    registerChangeInOperacions() {
        this.eventSubscriber = this.eventManager.subscribe('operacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
